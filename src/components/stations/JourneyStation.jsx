import StationBoard from './StationBoard'

const journey = [
  { year: '2006', title: 'The operating lens', text: 'Built an early foundation across marketing, systems and the discipline of execution.' },
  { year: '2013', title: 'The independent instinct', text: 'Stepped into entrepreneurship and began shaping a distinct specialist practice.' },
  { year: '2018', title: 'The digital frontier', text: 'Led digital marketing work where experience, behaviour and brand began to converge.' },
  { year: '2020', title: 'The fractional era', text: 'Expanded into embedded leadership — working across strategy, marketing and operations.' },
  { year: 'NOW', title: 'The connective role', text: 'Advising ambitious teams at the point where clarity must become coordinated movement.' },
]

export default function JourneyStation({ isActive }) {
  return (
    <section className="journey station-section" id="journey" data-station="4" aria-hidden={!isActive} inert={!isActive}>
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
  )
}
