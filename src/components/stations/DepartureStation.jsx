import { Asterisk, TrainFront } from 'lucide-react'
import StationBoard from './StationBoard'

export default function DepartureStation({ isActive, onDepart }) {
  return (
    <section className="hero station-section" id="departure" data-station="0" aria-labelledby="hero-title" aria-hidden={!isActive} inert={!isActive}>
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
        <button className="discover" onClick={onDepart}>
          Depart for Clarity Junction <TrainFront />
        </button>
      </div>
      <div className="edge-copy">SCROLL TO DECODE · 01—05</div>
    </section>
  )
}
