import { useEffect, useRef, useState } from 'react'
import { Asterisk, ExternalLink, Menu, TrainFront, X } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const stations = [
  { id: 'departure', name: 'Signal Central', code: 'SC' },
  { id: 'manifesto', name: 'Clarity Junction', code: 'CJ' },
  { id: 'method', name: 'Motion Works', code: 'MW' },
  { id: 'capabilities', name: 'Many Altitudes', code: 'MA' },
  { id: 'journey', name: 'The Through-Line', code: 'TL' },
  { id: 'connect', name: 'Open Channel', code: 'OC' },
]

const phases = [
  {
    code: '01',
    label: 'Observe',
    title: 'See the gap',
    copy: 'Find the friction hiding between a business goal and the people expected to move it forward.',
    note: 'Pattern recognition',
  },
  {
    code: '02',
    label: 'Orient',
    title: 'Name the truth',
    copy: 'Turn scattered signals into a shared point of view — clear enough for a team to act on.',
    note: 'Strategic clarity',
  },
  {
    code: '03',
    label: 'Activate',
    title: 'Move the room',
    copy: 'Connect brand, demand and operations so the strategy survives contact with the real world.',
    note: 'Momentum by design',
  },
]

const capabilities = [
  ['Brand consulting', 'Make the idea unmistakable'],
  ['Marketing strategy', 'Build the route to relevance'],
  ['Demand generation', 'Turn attention into motion'],
  ['Leadership development', 'Equip people to carry it'],
  ['Team building', 'Align the room around the work'],
  ['Content strategy', 'Give the point of view a pulse'],
]

const journey = [
  { year: '2006', title: 'The operating lens', text: 'Built an early foundation across marketing, systems and the discipline of execution.' },
  { year: '2013', title: 'The independent instinct', text: 'Stepped into entrepreneurship and began shaping a distinct specialist practice.' },
  { year: '2018', title: 'The digital frontier', text: 'Led digital marketing work where experience, behaviour and brand began to converge.' },
  { year: '2020', title: 'The fractional era', text: 'Expanded into embedded leadership — working across strategy, marketing and operations.' },
  { year: 'NOW', title: 'The connective role', text: 'Advising ambitious teams at the point where clarity must become coordinated movement.' },
]

function StationBoard({ index }) {
  const station = stations[index]
  return (
    <div className="station-board" aria-label={`Station ${index + 1}: ${station.name}`}>
      <span>STATION {String(index + 1).padStart(2, '0')}</span>
      <b>{station.name}</b>
      <i>{station.code}</i>
    </div>
  )
}

function TrainEngine() {
  return (
    <svg className="train-engine" viewBox="0 0 112 62" role="img" aria-label="Animated train">
      <g className="train-smoke">
        <circle cx="82" cy="12" r="4" />
        <circle cx="91" cy="7" r="3" />
        <circle cx="99" cy="3" r="2" />
      </g>
      <g className="train-body">
        <path className="train-cabin" d="M18 16h37v31H18z" />
        <path className="train-window" d="M26 22h20v12H26z" />
        <path className="train-boiler" d="M51 25h36a15 15 0 0 1 15 15v7H51z" />
        <path className="train-nose" d="M96 35h11v12H96z" />
        <path className="train-chimney" d="M72 12h13l-2 18H74z" />
        <path className="train-roof" d="M13 13h47v7H13z" />
        <path className="train-cowcatcher" d="m101 43 10 10H94z" />
        <circle className="train-light" cx="100" cy="34" r="3" />
      </g>
      <g className="train-wheels">
        <circle className="train-wheel" cx="31" cy="49" r="10" />
        <circle className="train-wheel" cx="76" cy="49" r="10" />
        <path className="wheel-rod" d="M31 49h45" />
      </g>
    </svg>
  )
}

function StationRail({ activeStation, targetStation, travelling, trainRef, progressRef, onNext }) {
  const displayStation = targetStation ?? activeStation
  const trainPosition = `${(activeStation / (stations.length - 1)) * 100}%`
  const isComplete = activeStation === stations.length - 1

  return (
    <aside className={`journey-dock ${travelling ? 'is-travelling' : 'is-stopped'}`} aria-label="Journey by train">
      <div className="dock-status" aria-live="polite">
        <span>{travelling ? 'EN ROUTE TO' : isComplete ? 'FINAL STATION' : 'NOW STOPPED AT'}</span>
        <b>{stations[displayStation].name}</b>
        <i>{String(displayStation + 1).padStart(2, '0')} / {String(stations.length).padStart(2, '0')}</i>
      </div>

      <div className="dock-route">
        <div className="dock-track"><i /><i /></div>
        <div ref={progressRef} className="dock-progress" style={{ width: trainPosition }} />
        {stations.map((station, index) => {
          const stopPosition = `${(index / (stations.length - 1)) * 100}%`
          return (
            <div
              key={station.id}
              className={`dock-stop ${index === activeStation ? 'is-active' : ''} ${index < activeStation ? 'is-passed' : ''} ${index === targetStation ? 'is-target' : ''}`}
              style={{ '--stop-position': stopPosition }}
              aria-label={`Station ${index + 1}: ${station.name}`}
            >
              <i />
              <span>{station.code}</span>
            </div>
          )
        })}
        <div ref={trainRef} className="dock-train" style={{ left: trainPosition }}>
          <span className="train-state">{travelling ? 'EXPRESS' : 'STOPPED'}</span>
          <TrainEngine />
        </div>
      </div>

      <button className="dock-next" onClick={onNext} disabled={travelling || isComplete}>
        <span>{travelling ? 'Travelling…' : isComplete ? 'Journey complete' : 'Next station'}</span>
        {!isComplete && <b>{stations[Math.min(activeStation + 1, stations.length - 1)].name}</b>}
        <TrainFront />
      </button>
    </aside>
  )
}

function App() {
  const [activePhase, setActivePhase] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900)
  const [journeyStarted, setJourneyStarted] = useState(() => new URLSearchParams(window.location.search).has('autostart'))
  const [activeStation, setActiveStation] = useState(0)
  const [targetStation, setTargetStation] = useState(null)
  const [travelling, setTravelling] = useState(false)
  const [cursor, setCursor] = useState({ x: -100, y: -100 })
  const [scrolled, setScrolled] = useState(false)
  const pageRef = useRef(null)
  const trainRef = useRef(null)
  const progressRef = useRef(null)
  const tripTimelineRef = useRef(null)
  const travellingRef = useRef(false)

  useEffect(() => {
    const onMove = (event) => setCursor({ x: event.clientX, y: event.clientY })
    const onScroll = () => setScrolled(window.scrollY > 40)
    const onResize = () => setIsMobile(window.innerWidth <= 900)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('journey-locked', !journeyStarted)
    return () => document.body.classList.remove('journey-locked')
  }, [journeyStarted])

  useEffect(() => {
    const sections = [...document.querySelectorAll('[data-station]')]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const nextStation = Number(visible.target.dataset.station)
          if (!travellingRef.current) {
            const position = `${(nextStation / (stations.length - 1)) * 100}%`
            setActiveStation(nextStation)
            gsap.to(trainRef.current, { left: position, duration: .45, ease: 'power2.out', overwrite: true })
            gsap.to(progressRef.current, { width: position, duration: .45, ease: 'power2.out', overwrite: true })
          }
        }
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: '-12% 0px -12% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => () => tripTimelineRef.current?.kill(), [])

  const travelToStation = (stationIndex) => {
    if (!journeyStarted || travellingRef.current || stationIndex === activeStation) return

    const destination = document.getElementById(stations[stationIndex].id)
    if (!destination) return

    const position = `${(stationIndex / (stations.length - 1)) * 100}%`
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reducedMotion ? .01 : 1.8

    travellingRef.current = true
    setTravelling(true)
    setTargetStation(stationIndex)
    setMenuOpen(false)
    tripTimelineRef.current?.kill()

    tripTimelineRef.current = gsap.timeline({
      defaults: { duration, ease: 'power3.inOut' },
      onComplete: () => {
        setActiveStation(stationIndex)
        setTargetStation(null)
        setTravelling(false)
        travellingRef.current = false
      },
    })
      .to(window, { scrollTo: { y: destination, offsetY: 62, autoKill: false } }, 0)
      .to(trainRef.current, { left: position }, 0)
      .to(progressRef.current, { width: position }, 0)
      .fromTo('.train-smoke circle', { opacity: 0, scale: .35 }, { opacity: 1, scale: 1.5, stagger: .12, duration: .35, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 0)
  }

  const jumpTo = (id) => {
    const stationIndex = stations.findIndex((station) => station.id === id)
    if (stationIndex >= 0 && journeyStarted) travelToStation(stationIndex)
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const startJourney = () => {
    setJourneyStarted(true)
    window.setTimeout(() => document.getElementById('departure')?.scrollIntoView({ behavior: 'smooth' }), 500)
  }

  const travelNext = () => travelToStation(Math.min(activeStation + 1, stations.length - 1))

  return (
    <div className="site-shell" ref={pageRef}>
      <div className="cursor-glow" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} />
      <div className="noise" aria-hidden="true" />

      <div className={`boarding-gate ${journeyStarted ? 'has-departed' : ''}`} aria-hidden={journeyStarted}>
        <div className="boarding-route" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
        <div className="boarding-mark"><TrainFront /></div>
        <p className="boarding-overline">PLATFORM 01 · GURUGRAM · BOARDING NOW</p>
        <h1>The Soniaa<br /><em>Line.</em></h1>
        <p className="boarding-copy">Six stations. One widening field of view.<br />A journey through strategy, leadership and motion.</p>
        <button className="boarding-button" onClick={startJourney} tabIndex={journeyStarted ? -1 : 0}>
          <span>Board the train</span><TrainFront />
        </button>
        <div className="ticket-stub">
          <span>ONE WAY</span><b>CLARITY → MOVEMENT</b><i>SS / 2026</i>
        </div>
      </div>

      {journeyStarted && (
        <StationRail
          activeStation={activeStation}
          targetStation={targetStation}
          travelling={travelling}
          trainRef={trainRef}
          progressRef={progressRef}
          onNext={travelNext}
        />
      )}

      <header className={scrolled ? 'topbar topbar--scrolled' : 'topbar'}>
        <button className="wordmark" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
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

      <main>
        <section className="hero station-section" id="departure" data-station="0" aria-labelledby="hero-title">
          <StationBoard index={0} />
          <div className="hero-kicker"><Asterisk /> SONIAA SPECIALIST · STRATEGY / GROWTH / LEADERSHIP</div>
          <h1 id="hero-title">
            I notice what<br />
            <span>others don’t.</span>
          </h1>
          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit orbit--one" />
            <div className="orbit orbit--two" />
            <div className="sonia-mark">S</div>
            <div className="orbit-label label--one">BRAND</div>
            <div className="orbit-label label--two">PEOPLE</div>
            <div className="orbit-label label--three">MOTION</div>
          </div>
          <div className="hero-footer">
            <p>Not a title. Not a tidy lane.<br />A connective force between <em>what is</em> and <em>what could move.</em></p>
            <button className="discover" onClick={() => jumpTo('manifesto')}>
              Depart for Clarity Junction <TrainFront />
            </button>
          </div>
          <div className="edge-copy">SCROLL TO DECODE · 01—05</div>
        </section>

        <section className="manifesto station-section" id="manifesto" data-station="1">
          <StationBoard index={1} />
          <div className="section-index">01 / POINT OF VIEW</div>
          <div className="manifesto-copy">
            <p>Most businesses don’t have an <span>idea problem.</span></p>
            <p>They have a <span>connection problem.</span></p>
          </div>
          <div className="manifesto-detail">
            <p>Soniaa works in the space between the slides and the street — where brand promise, commercial pressure and human behaviour collide.</p>
            <p className="micro">Her work connects the signals so teams can see clearly, decide honestly and move together.</p>
          </div>
          <div className="marquee" aria-hidden="true">
            <div>CLARITY IS A GROWTH STRATEGY · CLARITY IS A GROWTH STRATEGY · CLARITY IS A GROWTH STRATEGY ·</div>
          </div>
        </section>

        <section className="method station-section" id="method" data-station="2">
          <StationBoard index={2} />
          <div className="section-index light">02 / LEADERSHIP OS</div>
          <div className="method-heading">
            <h2>From signal<br />to <i>movement.</i></h2>
            <p>A three-part operating instinct. Select a signal to see how strategy becomes action.</p>
          </div>

          <div className="method-console">
            <div className="radar" style={{ '--phase': activePhase }}>
              <div className="radar-sweep" />
              <div className="radar-ring r1" />
              <div className="radar-ring r2" />
              <div className="radar-ring r3" />
              {phases.map((phase, index) => (
                <button
                  key={phase.code}
                  className={`radar-node n${index + 1} ${activePhase === index ? 'is-active' : ''}`}
                  onClick={() => setActivePhase(index)}
                  aria-label={`Select ${phase.label}`}
                >
                  {phase.code}
                </button>
              ))}
              <div className="radar-center">SS</div>
            </div>

            <div className="phase-list">
              {phases.map((phase, index) => (
                <button
                  key={phase.code}
                  className={activePhase === index ? 'phase is-active' : 'phase'}
                  onClick={() => setActivePhase(index)}
                >
                  <span>{phase.code}</span>
                  <b>{phase.label}</b>
                  <i>{phase.note}</i>
                </button>
              ))}
            </div>

            <div className="phase-output" aria-live="polite">
              <span>ACTIVE SIGNAL / {phases[activePhase].code}</span>
              <h3>{phases[activePhase].title}</h3>
              <p>{phases[activePhase].copy}</p>
            </div>
          </div>
        </section>

        <section className="capabilities station-section" id="capabilities" data-station="3">
          <StationBoard index={3} />
          <div className="section-index">03 / FIELD OF WORK</div>
          <div className="capabilities-intro">
            <h2>One mind.<br /><span>Many altitudes.</span></h2>
            <p>Strategy only matters when it can travel: from leadership rooms to customer moments, from a sharp idea to repeatable behaviour.</p>
          </div>
          <div className="capability-list">
            {capabilities.map(([title, text], index) => (
              <div className="capability" key={title} tabIndex="0">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <i>EXPLORE</i>
              </div>
            ))}
          </div>
        </section>

        <section className="journey station-section" id="journey" data-station="4">
          <StationBoard index={4} />
          <div className="section-index light">04 / THE THROUGH-LINE</div>
          <div className="journey-title">
            <span>Not a ladder.</span>
            <h2>A widening<br />field of view.</h2>
          </div>
          <div className="journey-track">
            <div className="track-line" />
            {journey.map((item, index) => (
              <article className="journey-stop" key={item.year}>
                <span className="year">{item.year}</span>
                <div className="stop-node"><i /></div>
                <div className="stop-copy">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="journey-footnote">Across corporate, entrepreneurial and advisory roles, the through-line stays the same: see the whole system, then help people move through it.</p>
        </section>

        <section className="connect station-section" id="connect" data-station="5">
          <StationBoard index={5} />
          <div className="connect-bg" aria-hidden="true">LET’S<br />MOVE</div>
          <div className="section-index">05 / OPEN CHANNEL</div>
          <div className="connect-content">
            <p>FOR FOUNDERS · LEADERS · TEAMS IN MOTION</p>
            <h2>Bring the messy<br />question.</h2>
            <a href="https://www.linkedin.com/in/soniaspecialist/" target="_blank" rel="noreferrer">
              Start a conversation <ExternalLink />
            </a>
          </div>
          <footer>
            <div className="footer-mark">S∕S</div>
            <p>STRATEGY · BRAND · GROWTH · LEADERSHIP</p>
            <p>GURUGRAM / INDIA</p>
            <a href="https://www.linkedin.com/in/soniaspecialist/" target="_blank" rel="noreferrer">LINKEDIN</a>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default App
