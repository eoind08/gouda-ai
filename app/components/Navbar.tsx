'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('gouda-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldUseDark = saved ? saved === 'dark' : prefersDark

    setDark(shouldUseDark)
    document.documentElement.classList.toggle('dark', shouldUseDark)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('gouda-theme', next ? 'dark' : 'light')
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="brand">
          <Image
            src="/gouda.png"
            width={48}
            height={48}
            alt="Gouda AI"
            className="brand-logo"
            priority
          />
          <span>Gouda AI</span>
        </Link>

        <div className="nav-links">
          <Link href="/about">About</Link>
          <Link href="/updates">Updates</Link>

          <button
            onClick={toggleTheme}
            className="theme-button"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {mounted && dark ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.35 15.35A9 9 0 018.65 3.65 9 9 0 1012 21a9 9 0 008.35-5.65z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}