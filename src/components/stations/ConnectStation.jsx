import { useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import StationBoard from './StationBoard'

const linkedInUrl = 'https://www.linkedin.com/in/soniaspecialist/'
const prompts = [
  { label: 'A brand question', cta: 'brand conversation' },
  { label: 'A growth knot', cta: 'growth conversation' },
  { label: 'A team in motion', cta: 'leadership conversation' },
]

export default function ConnectStation({ isActive }) {
  const [activePrompt, setActivePrompt] = useState(0)
  const sectionRef = useRef(null)

  const handlePointerMove = (event) => {
    const bounds = sectionRef.current.getBoundingClientRect()
    sectionRef.current.style.setProperty('--connect-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
    sectionRef.current.style.setProperty('--connect-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
  }

  return (
    <section ref={sectionRef} className="connect station-section" id="connect" data-station="5" aria-hidden={!isActive} inert={!isActive} onPointerMove={handlePointerMove}>
      <StationBoard index={5} />
      <div className="connect-bg" aria-hidden="true">LET’S<br />MOVE</div>
      <div className="section-index">05 / OPEN CHANNEL</div>
      <div className="connect-content">
        <p>FOR FOUNDERS · LEADERS · TEAMS IN MOTION</p>
        <h2>Bring the messy<br />question.</h2>
        <div className="connect-prompts" aria-label="Choose a conversation starter">
          {prompts.map((prompt, index) => (
            <button
              key={prompt.label}
              className={activePrompt === index ? 'is-active' : ''}
              onClick={() => setActivePrompt(index)}
              onPointerEnter={() => setActivePrompt(index)}
              onFocus={() => setActivePrompt(index)}
              aria-pressed={activePrompt === index}
            >
              <i /> {prompt.label}
            </button>
          ))}
        </div>
        <a href={linkedInUrl} target="_blank" rel="noreferrer">
          Start a {prompts[activePrompt].cta} <ExternalLink />
        </a>
        <div className="connect-channel"><i /> CHANNEL OPEN · RESPONSE HUMAN</div>
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
