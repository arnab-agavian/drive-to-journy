import StationBoard from './StationBoard'

const capabilities = [
  ['Brand consulting', 'Make the idea unmistakable'],
  ['Marketing strategy', 'Build the route to relevance'],
  ['Demand generation', 'Turn attention into motion'],
  ['Leadership development', 'Equip people to carry it'],
  ['Team building', 'Align the room around the work'],
  ['Content strategy', 'Give the point of view a pulse'],
]

export default function CapabilitiesStation({ isActive }) {
  return (
    <section className="capabilities station-section" id="capabilities" data-station="3" aria-hidden={!isActive} inert={!isActive}>
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
  )
}
