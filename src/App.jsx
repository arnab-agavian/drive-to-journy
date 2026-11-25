import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Asterisk, ExternalLink, Menu, X } from 'lucide-react'

const phases = [
  {
    code: '01',
    label: 'Observe',
    title: 'See the gap',
    copy: 'Find the friction hiding between a business goal and the people expected to move it forward.',
    note: 'Pattern recognition',
  },
  {
    code: '02',
    label: 'Orient',
    title: 'Name the truth',
    copy: 'Turn scattered signals into a shared point of view — clear enough for a team to act on.',
    note: 'Strategic clarity',
  },
  {
    code: '03',
    label: 'Activate',
    title: 'Move the room',
    copy: 'Connect brand, demand and operations so the strategy survives contact with the real world.',
    note: 'Momentum by design',
  },
]

const capabilities = [
  ['Brand consulting', 'Make the idea unmistakable'],
  ['Marketing strategy', 'Build the route to relevance'],
  ['Demand generation', 'Turn attention into motion'],
  ['Leadership development', 'Equip people to carry it'],
  ['Team building', 'Align the room around the work'],
  ['Content strategy', 'Give the point of view a pulse'],
]

const journey = [
  { year: '2006', title: 'The operating lens', text: 'Built an early foundation across marketing, systems and the discipline of execution.' },
  { year: '2013', title: 'The independent instinct', text: 'Stepped into entrepreneurship and began shaping a distinct specialist practice.' },
  { year: '2018', title: 'The digital frontier', text: 'Led digital marketing work where experience, behaviour and brand began to converge.' },
  { year: '2020', title: 'The fractional era', text: 'Expanded into embedded leadership — working across strategy, marketing and operations.' },
  { year: 'NOW', title: 'The connective role', text: 'Advising ambitious teams at the point where clarity must become coordinated movement.' },
]

function App() {
  const [activePhase, setActivePhase] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900)
  const [cursor, setCursor] = useState({ x: -100, y: -100 })
  const [scrolled, setScrolled] = useState(false)
  const pageRef = useRef(null)

  useEffect(() => {
    const onMove = (event) => setCursor({ x: event.clientX, y: event.clientY })
    const onScroll = () => setScrolled(window.scrollY > 40)
    const onResize = () => setIsMobile(window.innerWidth <= 900)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="site-shell" ref={pageRef}>
      <div className="cursor-glow" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} />
      <div className="noise" aria-hidden="true" />

      <header className={scrolled ? 'topbar topbar--scrolled' : 'topbar'}>
        <button className="wordmark" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          S<span>∕</span>S
        </button>
        <div className="status"><i /> SIGNAL ONLINE <span>GURUGRAM · INDIA</span></div>
        <nav aria-label="Primary navigation">
          <button onClick={() => jumpTo('method')}>Method</button>
          <button onClick={() => jumpTo('journey')}>Journey</button>
          <button onClick={() => jumpTo('connect')}>Connect</button>
        </nav>
        {isMobile && (
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
            <span>MENU</span>{menuOpen ? <X /> : <Menu />}
          </button>
        )}
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => jumpTo('method')}>Method</button>
          <button onClick={() => jumpTo('journey')}>Journey</button>
          <button onClick={() => jumpTo('connect')}>Connect</button>
        </div>
      )}

      <main>
        <section className="hero" aria-labelledby="hero-title">
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
            <button className="discover" onClick={() => jumpTo('manifesto')}>
              Enter the signal <ArrowDown />
            </button>
          </div>
          <div className="edge-copy">SCROLL TO DECODE · 01—05</div>
        </section>

        <section className="manifesto" id="manifesto">
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

        <section className="method" id="method">
          <div className="section-index light">02 / LEADERSHIP OS</div>
          <div className="method-heading">
            <h2>From signal<br />to <i>movement.</i></h2>
            <p>A three-part operating instinct. Select a signal to see how strategy becomes action.</p>
          </div>

          <div className="method-console">
            <div className="radar" style={{ '--phase': activePhase }}>
              <div className="radar-sweep" />
              <div className="radar-ring r1" />
              <div className="radar-ring r2" />
              <div className="radar-ring r3" />
              {phases.map((phase, index) => (
                <button
                  key={phase.code}
                  className={`radar-node n${index + 1} ${activePhase === index ? 'is-active' : ''}`}
                  onClick={() => setActivePhase(index)}
                  aria-label={`Select ${phase.label}`}
                >
                  {phase.code}
                </button>
              ))}
              <div className="radar-center">SS</div>
            </div>

            <div className="phase-list">
              {phases.map((phase, index) => (
                <button
                  key={phase.code}
                  className={activePhase === index ? 'phase is-active' : 'phase'}
                  onClick={() => setActivePhase(index)}
                >
                  <span>{phase.code}</span>
                  <b>{phase.label}</b>
                  <i>{phase.note}</i>
                </button>
              ))}
            </div>

            <div className="phase-output" aria-live="polite">
              <span>ACTIVE SIGNAL / {phases[activePhase].code}</span>
              <h3>{phases[activePhase].title}</h3>
              <p>{phases[activePhase].copy}</p>
            </div>
          </div>
        </section>

        <section className="capabilities" id="capabilities">
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

        <section className="journey" id="journey">
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

        <section className="connect" id="connect">
          <div className="connect-bg" aria-hidden="true">LET’S<br />MOVE</div>
          <div className="section-index">05 / OPEN CHANNEL</div>
          <div className="connect-content">
            <p>FOR FOUNDERS · LEADERS · TEAMS IN MOTION</p>
            <h2>Bring the messy<br />question.</h2>
            <a href="https://www.linkedin.com/in/soniaspecialist/" target="_blank" rel="noreferrer">
              Start a conversation <ExternalLink />
            </a>
          </div>
          <footer>
            <div className="footer-mark">S∕S</div>
            <p>STRATEGY · BRAND · GROWTH · LEADERSHIP</p>
            <p>GURUGRAM / INDIA</p>
            <a href="https://www.linkedin.com/in/soniaspecialist/" target="_blank" rel="noreferrer">LINKEDIN</a>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default App
