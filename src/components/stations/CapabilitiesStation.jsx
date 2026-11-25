import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import StationBoard from './StationBoard'

const capabilities = [
  { title: 'Brand consulting', text: 'Make the idea unmistakable', altitude: 'Identity', outcome: 'A sharper promise people can recognise, repeat and choose.' },
  { title: 'Marketing strategy', text: 'Build the route to relevance', altitude: 'Market', outcome: 'A focused path from audience truth to commercial action.' },
  { title: 'Demand generation', text: 'Turn attention into motion', altitude: 'Growth', outcome: 'Connected demand systems that turn interest into momentum.' },
  { title: 'Leadership development', text: 'Equip people to carry it', altitude: 'Leadership', outcome: 'Leaders with the language and confidence to move the room.' },
  { title: 'Team building', text: 'Align the room around the work', altitude: 'Culture', outcome: 'Teams that understand the destination and their role in reaching it.' },
  { title: 'Content strategy', text: 'Give the point of view a pulse', altitude: 'Voice', outcome: 'A living narrative that compounds trust over time.' },
]

export default function CapabilitiesStation({ isActive }) {
  const [activeCapability, setActiveCapability] = useState(0)
  const selected = capabilities[activeCapability]

  return (
    <section className="capabilities station-section" id="capabilities" data-station="3" aria-hidden={!isActive} inert={!isActive}>
      <StationBoard index={3} />
      <div className="section-index">03 / FIELD OF WORK</div>
      <div className="capabilities-intro">
        <h2>One mind.<br /><span>Many altitudes.</span></h2>
        <p>Strategy only matters when it can travel: from leadership rooms to customer moments, from a sharp idea to repeatable behaviour.</p>
      </div>

      <div className="capabilities-workbench">
        <div className="capability-list">
          {capabilities.map((capability, index) => (
            <button
              className={`capability ${activeCapability === index ? 'is-active' : ''}`}
              key={capability.title}
              onPointerEnter={() => setActiveCapability(index)}
              onFocus={() => setActiveCapability(index)}
              onClick={() => setActiveCapability(index)}
              aria-pressed={activeCapability === index}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{capability.title}</h3>
              <p>{capability.text}</p>
              <i><ArrowUpRight /> EXPLORE</i>
            </button>
          ))}
        </div>

        <aside className="capability-detail" aria-live="polite">
          <div className="capability-orbit" aria-hidden="true"><i /><i /><b>{String(activeCapability + 1).padStart(2, '0')}</b></div>
          <span>ACTIVE ALTITUDE / {selected.altitude}</span>
          <h3>{selected.title}</h3>
          <p>{selected.outcome}</p>
          <div><i /> FIELD CONNECTED</div>
        </aside>
      </div>
    </section>
  )
}
