import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { gsap } from 'gsap'
import { useDispatch } from 'react-redux'
import BoardingGate from './components/BoardingGate'
import StationRail from './components/StationRail'
import CapabilitiesStation from './components/stations/CapabilitiesStation'
import ConnectStation from './components/stations/ConnectStation'
import DepartureStation from './components/stations/DepartureStation'
import JourneyStation from './components/stations/JourneyStation'
import ManifestoStation from './components/stations/ManifestoStation'
import MethodStation from './components/stations/MethodStation'
import { stations } from './components/stations/stationData'
import { recordUserActivity } from './features/activity/activitySlice'
import { getVisitorLocation } from './utils/visitorLocation'

const stationEntranceProfiles = [
  { selector: '.hero-kicker, .hero h1, .hero-footer, .hero-orbit', y: 24, scale: .98, stagger: .08 },
  { selector: '.section-index, .manifesto-copy p, .manifesto-detail, .marquee', x: 28, stagger: .09 },
  { selector: '.section-index, .method-heading > *, .radar, .phase-list, .phase-output', y: 28, stagger: .07 },
  { selector: '.section-index, .capabilities-intro > *, .capability', x: 34, stagger: .055 },
  { selector: '.section-index, .journey-title, .journey-stop, .journey-footnote', y: 30, stagger: .065 },
  { selector: '.section-index, .connect-content > *, .connect-bg, footer', y: 26, scale: .985, stagger: .08 },
]

function getStationEntrance(section, stationIndex, direction = 1) {
  const profile = stationEntranceProfiles[stationIndex]
  const targets = gsap.utils.toArray(section.querySelectorAll(profile.selector))
  return {
    targets,
    from: {
      autoAlpha: 0,
      x: (profile.x ?? 0) * direction,
      y: (profile.y ?? 0) * direction,
      scale: profile.scale ?? 1,
    },
    stagger: profile.stagger,
  }
}

function playStationEntrance(section, stationIndex, direction = 1) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const entrance = getStationEntrance(section, stationIndex, direction)
  gsap.killTweensOf(entrance.targets)
  return gsap.fromTo(entrance.targets, entrance.from, {
    autoAlpha: 1,
    x: 0,
    y: 0,
    scale: 1,
    duration: reducedMotion ? .01 : .72,
    stagger: reducedMotion ? 0 : entrance.stagger,
    ease: 'power2.out',
    clearProps: 'opacity,visibility,transform',
  })
}

function App() {
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900)
  const [journeyStarted, setJourneyStarted] = useState(() => new URLSearchParams(window.location.search).has('autostart'))
  const [activeStation, setActiveStation] = useState(0)
  const [targetStation, setTargetStation] = useState(null)
  const [travelling, setTravelling] = useState(false)
  const [cursor, setCursor] = useState({ x: -100, y: -100 })
  const pageRef = useRef(null)
  const trainRef = useRef(null)
  const progressRef = useRef(null)
  const tripTimelineRef = useRef(null)
  const travellingRef = useRef(false)

  const trackActivity = useCallback(async (activity, eventKey) => {
    const location = await getVisitorLocation()
    dispatch(recordUserActivity({ activity, eventKey, location }))
  }, [dispatch])

  useEffect(() => {
    trackActivity('journey.landing.viewed', 'journey:landing')
  }, [trackActivity])

  useEffect(() => {
    if (!journeyStarted) return
    trackActivity('journey.started', 'journey:started')
  }, [journeyStarted, trackActivity])

  useEffect(() => {
    if (!journeyStarted) return

    const station = stations[activeStation]
    trackActivity(`journey.station.${station.id}.viewed`, `journey:station:${station.id}`)

    if (activeStation === stations.length - 1) {
      trackActivity('journey.completed', 'journey:completed')
    }
  }, [activeStation, journeyStarted, trackActivity])

  useEffect(() => {
    const onMove = (event) => setCursor({ x: event.clientX, y: event.clientY })
    const onResize = () => setIsMobile(window.innerWidth <= 900)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('journey-locked')
    document.body.classList.add('journey-locked')
    return () => {
      document.documentElement.classList.remove('journey-locked')
      document.body.classList.remove('journey-locked')
    }
  }, [])

  useEffect(() => {
    if (!journeyStarted) return undefined
    const sections = gsap.utils.toArray('.station-section')
    sections.forEach((section, index) => {
      gsap.set(section, {
        yPercent: index === 0 ? 0 : 100,
        autoAlpha: index === 0 ? 1 : 0,
        pointerEvents: index === 0 ? 'auto' : 'none',
        zIndex: index === 0 ? 2 : 1,
      })
    })
    const entrance = playStationEntrance(sections[0], 0)
    return () => {
      entrance.kill()
      gsap.set(sections, { clearProps: 'transform,opacity,visibility,pointerEvents,zIndex' })
    }
  }, [journeyStarted])

  useEffect(() => {
    if (!journeyStarted) return undefined
    const activeSection = document.querySelector(`[data-station="${activeStation}"]`)
    if (!activeSection) return undefined

    const onWheel = (event) => {
      if (event.target instanceof Element && event.target.closest('.journey-dock')) return
      event.preventDefault()
      const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? activeSection.clientHeight : 1
      activeSection.scrollBy({ top: event.deltaY * multiplier, left: 0, behavior: 'auto' })
    }

    const onKeyDown = (event) => {
      if (event.target instanceof Element && event.target.closest('button, a, input, textarea, select')) return
      const distances = {
        ArrowDown: 72,
        ArrowUp: -72,
        PageDown: activeSection.clientHeight * .75,
        PageUp: activeSection.clientHeight * -.75,
        ' ': event.shiftKey ? activeSection.clientHeight * -.75 : activeSection.clientHeight * .75,
      }
      if (!(event.key in distances)) return
      event.preventDefault()
      activeSection.scrollBy({ top: distances[event.key], left: 0, behavior: 'smooth' })
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeStation, journeyStarted])

  useEffect(() => () => tripTimelineRef.current?.kill(), [])

  const travelToStation = (stationIndex) => {
    if (!journeyStarted || travellingRef.current || stationIndex === activeStation) return

    const currentSection = document.querySelector(`[data-station="${activeStation}"]`)
    const destination = document.querySelector(`[data-station="${stationIndex}"]`)
    if (!currentSection || !destination) return

    const position = `${(stationIndex / (stations.length - 1)) * 100}%`
    const direction = stationIndex > activeStation ? 1 : -1
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reducedMotion ? .01 : 1.8
    const entrance = getStationEntrance(destination, stationIndex, direction)

    travellingRef.current = true
    setTravelling(true)
    setTargetStation(stationIndex)
    setMenuOpen(false)
    tripTimelineRef.current?.kill()
    destination.scrollTop = 0
    gsap.set(destination, { yPercent: 100 * direction, autoAlpha: 1, pointerEvents: 'auto', zIndex: 3 })
    gsap.set(currentSection, { zIndex: 2 })
    gsap.set(entrance.targets, entrance.from)

    tripTimelineRef.current = gsap.timeline({
      defaults: { duration, ease: 'power3.inOut' },
      onComplete: () => {
        gsap.set(currentSection, { autoAlpha: 0, pointerEvents: 'none', zIndex: 1 })
        gsap.set(destination, { yPercent: 0, autoAlpha: 1, pointerEvents: 'auto', zIndex: 2 })
        setActiveStation(stationIndex)
        setTargetStation(null)
        setTravelling(false)
        travellingRef.current = false
        gsap.set(entrance.targets, { clearProps: 'opacity,visibility,transform' })
      },
    })
      .to(currentSection, { yPercent: -100 * direction }, 0)
      .to(destination, { yPercent: 0 }, 0)
      .to(trainRef.current, { left: position }, 0)
      .to(progressRef.current, { width: position }, 0)
      .to(entrance.targets, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: reducedMotion ? .01 : .72,
        stagger: reducedMotion ? 0 : entrance.stagger,
        ease: 'power2.out',
      }, reducedMotion ? 0 : .82)
      .fromTo('.train-smoke circle', { opacity: 0, scale: .35 }, { opacity: 1, scale: 1.5, stagger: .12, duration: .35, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 0)
  }

  const jumpTo = (id) => {
    const stationIndex = stations.findIndex((station) => station.id === id)
    if (stationIndex >= 0 && journeyStarted) travelToStation(stationIndex)
    setMenuOpen(false)
  }

  const startJourney = () => {
    setJourneyStarted(true)
  }

  const travelNext = () => travelToStation(Math.min(activeStation + 1, stations.length - 1))
  const travelPrevious = () => travelToStation(Math.max(activeStation - 1, 0))

  return (
    <div className="site-shell" ref={pageRef}>
      <div className="cursor-glow" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} />
      <div className="noise" aria-hidden="true" />

      <BoardingGate departed={journeyStarted} onBoard={startJourney} />

      {journeyStarted && (
        <StationRail
          activeStation={activeStation}
          targetStation={targetStation}
          travelling={travelling}
          trainRef={trainRef}
          progressRef={progressRef}
          onPrevious={travelPrevious}
          onNext={travelNext}
          onSelectStation={travelToStation}
        />
      )}

      <header className={activeStation > 0 ? 'topbar topbar--scrolled' : 'topbar'}>
        <button className="wordmark" onClick={() => travelToStation(0)} aria-label="Return to Signal Central">
          S<span>∕</span>S
        </button>
        <div className="status"><i /> {journeyStarted ? 'TRAIN EN ROUTE' : 'LINE READY'} <span>GURUGRAM · INDIA</span></div>
        <nav aria-label="Primary navigation">
          <button onClick={() => jumpTo('method')}>Method</button>
          <button onClick={() => jumpTo('journey')}>Journey</button>
          <button onClick={() => jumpTo('connect')}>Connect</button>
        </nav>
        {isMobile && (
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
            <span>MENU</span>{menuOpen ? <X /> : <Menu />}
          </button>
        )}
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => jumpTo('method')}>Method</button>
          <button onClick={() => jumpTo('journey')}>Journey</button>
          <button onClick={() => jumpTo('connect')}>Connect</button>
        </div>
      )}

      <main className="journey-stage">
        <DepartureStation isActive={activeStation === 0} onDepart={() => jumpTo('manifesto')} />
        <ManifestoStation isActive={activeStation === 1} />

        <MethodStation isActive={activeStation === 2} />

        <CapabilitiesStation isActive={activeStation === 3} />

        <JourneyStation isActive={activeStation === 4} />
        <ConnectStation isActive={activeStation === 5} />
      </main>
    </div>
  )
}

export default App
