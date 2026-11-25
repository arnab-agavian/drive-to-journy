import { ArrowLeft, TrainFront } from 'lucide-react'
import { stations } from './stations/stationData'

function TrainEngine() {
  return (
    <svg className="train-engine" viewBox="0 0 112 62" role="img" aria-label="Animated train">
      <g className="train-smoke">
        <circle cx="82" cy="12" r="4" />
        <circle cx="91" cy="7" r="3" />
        <circle cx="99" cy="3" r="2" />
      </g>
      <g className="train-body">
        <path className="train-cabin" d="M18 16h37v31H18z" />
        <path className="train-window" d="M26 22h20v12H26z" />
        <path className="train-boiler" d="M51 25h36a15 15 0 0 1 15 15v7H51z" />
        <path className="train-nose" d="M96 35h11v12H96z" />
        <path className="train-chimney" d="M72 12h13l-2 18H74z" />
        <path className="train-roof" d="M13 13h47v7H13z" />
        <path className="train-cowcatcher" d="m101 43 10 10H94z" />
        <circle className="train-light" cx="100" cy="34" r="3" />
      </g>
      <g className="train-wheels">
        <circle className="train-wheel" cx="31" cy="49" r="10" />
        <circle className="train-wheel" cx="76" cy="49" r="10" />
        <path className="wheel-rod" d="M31 49h45" />
      </g>
    </svg>
  )
}

export default function StationRail({ activeStation, targetStation, travelling, trainRef, progressRef, onPrevious, onNext }) {
  const displayStation = targetStation ?? activeStation
  const trainPosition = `${(activeStation / (stations.length - 1)) * 100}%`
  const isComplete = activeStation === stations.length - 1

  return (
    <aside className={`journey-dock ${travelling ? 'is-travelling' : 'is-stopped'}`} aria-label="Journey by train">
      <div className="dock-status" aria-live="polite">
        <span>{travelling ? 'EN ROUTE TO' : isComplete ? 'FINAL STATION' : 'NOW STOPPED AT'}</span>
        <b>{stations[displayStation].name}</b>
        <i>{String(displayStation + 1).padStart(2, '0')} / {String(stations.length).padStart(2, '0')}</i>
      </div>

      <div className="dock-route">
        <div className="dock-track"><i /><i /></div>
        <div ref={progressRef} className="dock-progress" style={{ width: trainPosition }} />
        {stations.map((station, index) => {
          const stopPosition = `${(index / (stations.length - 1)) * 100}%`
          return (
            <div
              key={station.id}
              className={`dock-stop ${index === activeStation ? 'is-active' : ''} ${index < activeStation ? 'is-passed' : ''} ${index === targetStation ? 'is-target' : ''}`}
              style={{ '--stop-position': stopPosition }}
              aria-label={`Station ${index + 1}: ${station.name}`}
            >
              <i />
              <span>{station.code}</span>
            </div>
          )
        })}
        <div ref={trainRef} className="dock-train" style={{ left: trainPosition }}>
          <span className="train-state">{travelling ? 'EXPRESS' : 'STOPPED'}</span>
          <TrainEngine />
        </div>
      </div>

      <div className="dock-actions">
        <button
          className="dock-back"
          onClick={onPrevious}
          disabled={travelling || activeStation === 0}
          aria-label={activeStation === 0 ? 'You are at the first station' : `Back to ${stations[activeStation - 1].name}`}
        >
          <ArrowLeft />
          <span>Previous</span>
        </button>
        <button className="dock-next" onClick={onNext} disabled={travelling || isComplete}>
          <span>{travelling ? 'Travelling…' : isComplete ? 'Journey complete' : 'Next station'}</span>
          {!isComplete && <b>{stations[Math.min(activeStation + 1, stations.length - 1)].name}</b>}
          <TrainFront />
        </button>
      </div>
    </aside>
  )
}
