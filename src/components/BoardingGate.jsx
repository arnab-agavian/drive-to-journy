import { useLayoutEffect, useRef } from 'react'
import { TrainFront } from 'lucide-react'
import { gsap } from 'gsap'

export default function BoardingGate({ departed, onBoard }) {
  const gateRef = useRef(null)
  const visualRef = useRef(null)
  const markCoreRef = useRef(null)
  const coordinateRef = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const gate = gateRef.current
    const visual = visualRef.current
    const markCore = markCoreRef.current
    const coordinate = coordinateRef.current

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline
        .from('.boarding-panel', { scale: .975, autoAlpha: 0, duration: .65 })
        .from('.boarding-visual', { xPercent: 12, autoAlpha: 0, duration: .8 }, .12)
        .from('.boarding-overline', { y: -14, autoAlpha: 0, duration: .45 }, .2)
        .from('.boarding-title-line', { yPercent: 115, rotate: 2, duration: .85, stagger: .12 }, .3)
        .from('.boarding-copy', { y: 18, autoAlpha: 0, duration: .55 }, .72)
        .from('.boarding-cta', { y: 18, autoAlpha: 0, duration: .55 }, .88)
        .from('.boarding-route span', { scale: 0, duration: .3, stagger: .09 }, .92)
        .from('.boarding-scanner', { scale: .72, rotate: -35, autoAlpha: 0, duration: .8 }, .28)
        .from('.boarding-signal-field i', { scale: 0, autoAlpha: 0, duration: .3, stagger: .07 }, .55)
        .from('.boarding-mark', { scale: .55, rotate: -10, autoAlpha: 0, duration: .75 }, .42)
        .from('.boarding-visual-meta, .boarding-coordinate, .boarding-visual-caption', { y: 12, autoAlpha: 0, duration: .45, stagger: .08 }, .7)
        .from('.ticket-stub', { y: 24, autoAlpha: 0, duration: .55 }, .9)
    }, gateRef)

    const moveMarkX = gsap.quickTo(markCore, 'x', { duration: .65, ease: 'power3.out' })
    const moveMarkY = gsap.quickTo(markCore, 'y', { duration: .65, ease: 'power3.out' })
    const clamp = gsap.utils.clamp(0, 1)

    const handlePointerMove = (event) => {
      const bounds = visual.getBoundingClientRect()
      const x = clamp((event.clientX - bounds.left) / bounds.width)
      const y = clamp((event.clientY - bounds.top) / bounds.height)

      visual.style.setProperty('--cursor-x', `${x * 100}%`)
      visual.style.setProperty('--cursor-y', `${y * 100}%`)
      moveMarkX((x - .5) * 22)
      moveMarkY((y - .5) * 22)
      coordinate.textContent = `${String(Math.round(x * 99)).padStart(2, '0')} / ${String(Math.round(y * 99)).padStart(2, '0')}`
    }

    const resetPointer = () => {
      visual.style.setProperty('--cursor-x', '50%')
      visual.style.setProperty('--cursor-y', '50%')
      moveMarkX(0)
      moveMarkY(0)
      coordinate.textContent = '50 / 50'
    }

    gate.addEventListener('pointermove', handlePointerMove)
    gate.addEventListener('pointerleave', resetPointer)

    return () => {
      gate.removeEventListener('pointermove', handlePointerMove)
      gate.removeEventListener('pointerleave', resetPointer)
      context.revert()
    }
  }, [])

  return (
    <div ref={gateRef} className={`boarding-gate ${departed ? 'has-departed' : ''}`} aria-hidden={departed}>
      <div className="boarding-panel">
        <div className="boarding-content">
          <p className="boarding-overline"><span>LIVE</span> PLATFORM 01 · GURUGRAM</p>
          <h1 aria-label="The Soniaa Line">
            <span className="boarding-title-mask"><span className="boarding-title-line">The Soniaa</span></span>
            <span className="boarding-title-mask"><span className="boarding-title-line boarding-title-line--accent"><em>Line.</em></span></span>
          </h1>
          <p className="boarding-copy">Six stations. One widening field of view.<br />A journey through strategy, leadership and motion.</p>
          <div className="boarding-cta">
            <button className="boarding-button" onClick={onBoard} tabIndex={departed ? -1 : 0}>
              <span>Board the train</span><TrainFront />
            </button>
            <span className="boarding-cta-note" aria-hidden="true"><i /> 6 signals waiting beyond</span>
          </div>
          <div className="boarding-route" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
        </div>

        <div ref={visualRef} className="boarding-visual" aria-hidden="true">
          <div className="boarding-visual-grid" />
          <div className="boarding-scanner"><i /></div>
          <div className="boarding-signal-field">
            <i /><i /><i /><i /><i /><i />
          </div>
          <div className="boarding-visual-meta"><span>EXPRESS ROUTE</span><b>01</b></div>
          <div className="boarding-coordinate"><span>CURSOR VECTOR</span><b ref={coordinateRef}>50 / 50</b></div>
          <div className="boarding-mark">
            <div ref={markCoreRef} className="boarding-mark-core">
              <TrainFront />
              <span>SIGNAL<br />ACQUIRED</span>
            </div>
          </div>
          <p className="boarding-visual-caption">NEXT DEPARTURE <b>NOW</b></p>
          <div className="ticket-stub">
            <span>ONE WAY</span><b>CLARITY → MOVEMENT</b><i>SS / 2026</i>
          </div>
        </div>
      </div>
    </div>
  )
}
