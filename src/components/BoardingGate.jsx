import { useLayoutEffect, useRef } from 'react'
import { TrainFront } from 'lucide-react'
import { gsap } from 'gsap'

export default function BoardingGate({ departed, onBoard }) {
  const gateRef = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

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
        .from('.boarding-mark', { scale: .55, rotate: -10, autoAlpha: 0, duration: .75 }, .42)
        .from('.boarding-visual-meta, .boarding-visual-caption', { y: 12, autoAlpha: 0, duration: .45, stagger: .1 }, .7)
        .from('.ticket-stub', { y: 24, autoAlpha: 0, duration: .55 }, .9)
    }, gateRef)

    return () => context.revert()
  }, [])

  return (
    <div ref={gateRef} className={`boarding-gate ${departed ? 'has-departed' : ''}`} aria-hidden={departed}>
      <div className="boarding-panel">
        <div className="boarding-content">
          <p className="boarding-overline"><span>LIVE</span> PLATFORM 01 · GURUGRAM</p>
          <h1 aria-label="The Soniaa Line">
            <span className="boarding-title-mask"><span className="boarding-title-line">The Soniaa</span></span>
            <span className="boarding-title-mask"><span className="boarding-title-line"><em>Line.</em></span></span>
          </h1>
          <p className="boarding-copy">Six stations. One widening field of view.<br />A journey through strategy, leadership and motion.</p>
          <div className="boarding-cta">
            <button className="boarding-button" onClick={onBoard} tabIndex={departed ? -1 : 0}>
              <span>Board the train</span><TrainFront />
            </button>
            <span className="boarding-cta-note" aria-hidden="true"><i /> Next departure is ready</span>
          </div>
          <div className="boarding-route" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
        </div>

        <div className="boarding-visual" aria-hidden="true">
          <div className="boarding-visual-meta"><span>EXPRESS ROUTE</span><b>01</b></div>
          <div className="boarding-mark"><TrainFront /></div>
          <p className="boarding-visual-caption">NEXT DEPARTURE <b>NOW</b></p>
          <div className="ticket-stub">
            <span>ONE WAY</span><b>CLARITY → MOVEMENT</b><i>SS / 2026</i>
          </div>
        </div>
      </div>
    </div>
  )
}
