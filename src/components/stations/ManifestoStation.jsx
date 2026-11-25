import StationBoard from './StationBoard'

export default function ManifestoStation({ isActive }) {
  return (
    <section className="manifesto station-section" id="manifesto" data-station="1" aria-hidden={!isActive} inert={!isActive}>
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
  )
}
