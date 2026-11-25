import { useRef, useState } from 'react'
import { ScanLine } from 'lucide-react'
import StationBoard from './StationBoard'

const signals = [
  {
    code: 'BR',
    label: 'Brand promise',
    title: 'What you promise',
    copy: 'The idea customers and teams are expected to recognise, remember and believe.',
  },
  {
    code: 'CP',
    label: 'Commercial pressure',
    title: 'What growth demands',
    copy: 'The targets, trade-offs and urgency that shape what must move next.',
  },
  {
    code: 'HB',
    label: 'Human behaviour',
    title: 'What people actually do',
    copy: 'The habits, incentives and hidden friction that determine whether strategy survives.',
  },
  {
    code: 'OR',
    label: 'Operating reality',
    title: 'What the system supports',
    copy: 'The processes, capabilities and constraints underneath the polished presentation.',
  },
]

export default function ManifestoStation({ isActive }) {
  const [activeSignal, setActiveSignal] = useState(0)
  const sectionRef = useRef(null)
  const signal = signals[activeSignal]

  const handlePointerMove = (event) => {
    const bounds = sectionRef.current.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    sectionRef.current.style.setProperty('--manifesto-x', `${x}%`)
    sectionRef.current.style.setProperty('--manifesto-y', `${y}%`)
  }

  return (
    <section
      ref={sectionRef}
      className="manifesto station-section"
      id="manifesto"
      data-station="1"
      aria-hidden={!isActive}
      inert={!isActive}
      onPointerMove={handlePointerMove}
    >
      <StationBoard index={1} />

      <div className="manifesto-head">
        <div className="section-index">01 / POINT OF VIEW</div>
        <div className="manifesto-mode"><i /> LIVE SIGNAL DIAGNOSTIC</div>
      </div>

      <div className="manifesto-copy">
        <div className="manifesto-line manifesto-line--idea">
          <span className="manifesto-line-number">01</span>
          <p>Most businesses don’t have an <em>idea problem.</em></p>
        </div>
        <div className="manifesto-line manifesto-line--connection">
          <span className="manifesto-line-number">02</span>
          <p>They have a <em>connection problem.</em></p>
        </div>
      </div>

      <div className="manifesto-detail">
        <div className="manifesto-context">
          <span>THE WORK BETWEEN</span>
          <p>Soniaa works in the space between the slides and the street—where ambition meets behaviour and every disconnected signal becomes visible.</p>
          <p className="micro">Explore the diagnostic. The opportunity is rarely inside one signal; it appears in the relationship between them.</p>
        </div>

        <div className="manifesto-console">
          <div className="manifesto-console-head">
            <span><ScanLine /> SIGNAL MAP</span>
            <i>HOVER / FOCUS TO DECODE</i>
          </div>

          <div className="manifesto-signal-map">
            <div className="manifesto-map-axis axis-x" />
            <div className="manifesto-map-axis axis-y" />
            {signals.map((item, index) => (
              <button
                key={item.code}
                className={`manifesto-signal signal-${index + 1} ${activeSignal === index ? 'is-active' : ''}`}
                onPointerEnter={() => setActiveSignal(index)}
                onFocus={() => setActiveSignal(index)}
                onClick={() => setActiveSignal(index)}
                aria-pressed={activeSignal === index}
              >
                <b>{item.code}</b>
                <span>{item.label}</span>
              </button>
            ))}
            <div className="manifesto-core">
              <i />
              <span>CLARITY</span>
            </div>
          </div>

          <div className="manifesto-readout" aria-live="polite">
            <span>ACTIVE SIGNAL / {signal.code}</span>
            <h3>{signal.title}</h3>
            <p>{signal.copy}</p>
            <div><i /> CONNECTION FOUND</div>
          </div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div>CLARITY IS A GROWTH STRATEGY · CLARITY IS A GROWTH STRATEGY · CLARITY IS A GROWTH STRATEGY ·</div>
      </div>
    </section>
  )
}
