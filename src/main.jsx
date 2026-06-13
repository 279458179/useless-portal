import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { uselessSites } from './sites.js'

const STORAGE_KEY = 'useless-portal-remaining-sites'
const desktopOnlySites = new Set(['https://shovelandshoot.com/'])
const fallbackSite = uselessSites[0]

function isDesktopPointer() {
  if (typeof window === 'undefined' || !window.matchMedia) return true
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function getAvailableSites() {
  const baseSites = isDesktopPointer()
    ? uselessSites
    : uselessSites.filter((site) => !desktopOnlySites.has(site.url))

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const validUrls = new Set(baseSites.map((site) => site.url))
    const filtered = saved.filter((url) => validUrls.has(url))
    if (filtered.length > 0) {
      return filtered.map((url) => baseSites.find((site) => site.url === url))
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }

  return baseSites
}

function pickSite(remainingSites) {
  const range = Math.min(6, remainingSites.length)
  const index = Math.floor(Math.random() * range)
  const site = remainingSites[index]
  const nextSites = remainingSites.filter((_, itemIndex) => itemIndex !== index)
  return { site, nextSites }
}

function App() {
  const [lastSite, setLastSite] = useState(null)
  const siteCount = useMemo(() => getAvailableSites().length, [])

  const prepareRandomLaunch = (event) => {
    const availableSites = getAvailableSites()
    const { site, nextSites } = pickSite(availableSites)
    const savedSites = nextSites.length > 0 ? nextSites : getAvailableSites()

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(savedSites.map((item) => item.url)),
    )

    setLastSite(site)
    event.currentTarget.href = site.url
  }

  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <div className="orb orb-one" />
        <div className="orb orb-two" />

        <p className="eyebrow">A gorgeous waste of a perfectly good click</p>
        <h1 id="page-title">Launch me into something useless.</h1>
        <p className="subhead">
          One clean button. Dozens of strange little web experiments. No feed,
          no login, no productivity theater.
        </p>

        <a
          className="launch-button"
          href={fallbackSite.url}
          target="_blank"
          rel="noopener"
          onClick={prepareRandomLaunch}
        >
          Take me somewhere pointless
          <span aria-hidden="true">-&gt;</span>
        </a>

        <div className="signal-row" aria-label="Site stats">
          <span>{siteCount}+ destinations</span>
          <span>No algorithm</span>
          <span>Instant detour</span>
        </div>

        {lastSite && (
          <p className="last-site" aria-live="polite">
            Last portal opened: <strong>{lastSite.name}</strong>
          </p>
        )}
      </section>

      <section className="details" aria-label="Why this exists">
        <article>
          <span>01</span>
          <h2>Sharper than boredom</h2>
          <p>
            Built as a tiny, fast doorway to the same kind of wonderfully absurd
            internet energy that made random web buttons addictive.
          </p>
        </article>
        <article>
          <span>02</span>
          <h2>Curated chaos</h2>
          <p>
            The destination pool favors playful, visual, interactive pages and
            keeps track locally so your next click feels fresh.
          </p>
        </article>
        <article>
          <span>03</span>
          <h2>SEO without clutter</h2>
          <p>
            Search engines get rich metadata and structured data. Humans get a
            button that knows exactly what it is.
          </p>
        </article>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
