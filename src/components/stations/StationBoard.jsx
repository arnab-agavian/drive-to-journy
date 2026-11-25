import { stations } from './stationData'

export default function StationBoard({ index }) {
  const station = stations[index]

  return (
    <div className="station-board" aria-label={`Station ${index + 1}: ${station.name}`}>
      <span>STATION {String(index + 1).padStart(2, '0')}</span>
      <b>{station.name}</b>
      <i>{station.code}</i>
    </div>
  )
}
