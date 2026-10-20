'use client'

import { useEffect, useState } from 'react'
import { AsentarLogo } from '@/brand/logo'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '#como-funciona', label: 'Producto' },
  { href: '#sello', label: 'Cierre verificable' },
  { href: '#para-quien', label: 'Para quién' },
  { href: '#preguntas', label: 'Preguntas' },
]

export function SiteHeader() {
  const [overHero, setOverHero] = useState(true)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    // The header height (4rem) is trimmed from the top so it flips to paper
    // exactly when the hero's bottom edge passes under it.
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: '-64px 0px 0px 0px' },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-background text-foreground transition-colors duration-300',
        overHero ? 'dark border-transparent' : 'border-border',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 lg:px-16">
        <a href="#top" className="rounded-md" aria-label="Asentar, ir al inicio">
          <AsentarLogo size={22} />
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-sm text-body text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#piloto"
          className="inline-flex h-9 items-center rounded-md bg-primary px-3.5 text-body font-semibold text-primary-foreground transition-colors hover:bg-primary/90 md:h-11 md:px-5"
        >
          Sumarme al piloto
        </a>
      </div>
    </header>
  )
}
