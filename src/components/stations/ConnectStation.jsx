import { ExternalLink } from 'lucide-react'
import StationBoard from './StationBoard'

const linkedInUrl = 'https://www.linkedin.com/in/soniaspecialist/'

export default function ConnectStation({ isActive }) {
  return (
    <section className="connect station-section" id="connect" data-station="5" aria-hidden={!isActive} inert={!isActive}>
      <StationBoard index={5} />
      <div className="connect-bg" aria-hidden="true">LET’S<br />MOVE</div>
      <div className="section-index">05 / OPEN CHANNEL</div>
      <div className="connect-content">
        <p>FOR FOUNDERS · LEADERS · TEAMS IN MOTION</p>
        <h2>Bring the messy<br />question.</h2>
        <a href={linkedInUrl} target="_blank" rel="noreferrer">
          Start a conversation <ExternalLink />
        </a>
      </div>
      <footer>
        <div className="footer-mark">S∕S</div>
        <p>STRATEGY · BRAND · GROWTH · LEADERSHIP</p>
        <p>GURUGRAM / INDIA</p>
        <a href={linkedInUrl} target="_blank" rel="noreferrer">LINKEDIN</a>
      </footer>
    </section>
  )
}
