import { useRef, useState } from 'react'
import { Asterisk, TrainFront } from 'lucide-react'
import StationBoard from './StationBoard'

const lenses = [
  { label: 'Brand', copy: 'The promise people should recognise and remember.' },
  { label: 'People', copy: 'The belief, behaviour and energy that make change real.' },
  { label: 'Motion', copy: 'The operating rhythm that turns clarity into progress.' },
]

export default function DepartureStation({ isActive, onDepart }) {
  const [activeLens, setActiveLens] = useState(0)
  const sectionRef = useRef(null)

  const handlePointerMove = (event) => {
    const bounds = sectionRef.current.getBoundingClientRect()
    sectionRef.current.style.setProperty('--hero-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
    sectionRef.current.style.setProperty('--hero-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
  }

  return (
    <section ref={sectionRef} className="hero station-section" id="departure" data-station="0" aria-labelledby="hero-title" aria-hidden={!isActive} inert={!isActive} onPointerMove={handlePointerMove}>
      <StationBoard index={0} />
      <div className="hero-kicker"><Asterisk /> SONIAA SPECIALIST · STRATEGY / GROWTH / LEADERSHIP</div>
      <h1 id="hero-title">
        I notice what<br />
        <span>others don’t.</span>
      </h1>
      <div className="hero-orbit" aria-label="Explore Soniaa's three strategic lenses">
        <div className="orbit orbit--one" />
        <div className="orbit orbit--two" />
        <div className="sonia-mark">S</div>
        {lenses.map((lens, index) => (
          <button
            key={lens.label}
            className={`orbit-label label--${['one', 'two', 'three'][index]} ${activeLens === index ? 'is-active' : ''}`}
            onPointerEnter={() => setActiveLens(index)}
            onFocus={() => setActiveLens(index)}
            onClick={() => setActiveLens(index)}
            aria-pressed={activeLens === index}
          >
            {lens.label}
          </button>
        ))}
        <div className="hero-signal-readout" aria-live="polite">
          <span>ACTIVE LENS / 0{activeLens + 1}</span>
          <b>{lenses[activeLens].label}</b>
          <p>{lenses[activeLens].copy}</p>
        </div>
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
