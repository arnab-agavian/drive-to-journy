import { useState } from 'react'
import StationBoard from './StationBoard'

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

export default function MethodStation({ isActive }) {
  const [activePhase, setActivePhase] = useState(0)

  return (
    <section className="method station-section" id="method" data-station="2" aria-hidden={!isActive} inert={!isActive}>
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
  )
}
