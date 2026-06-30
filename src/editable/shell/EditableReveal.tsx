'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/*
  Progressive scroll-reveal.

  Elements tagged with `.reveal` are fully visible by default, so the page works
  with JavaScript disabled. On mount this component arms the hidden start state
  by adding `.reveal-on` to <html> (see editable-global.css), then uses one
  IntersectionObserver to add `.is-visible` as each element scrolls into view.
  It re-scans on every route change so freshly rendered content animates too.
*/
export function EditableReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    root.classList.add('reveal-on')

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)'))
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )

    nodes.forEach((node) => observer.observe(node))

    // Safety net: reveal anything still hidden shortly after load (e.g. above
    // the fold or if the observer never fires for tiny viewports).
    const timer = window.setTimeout(() => {
      nodes.forEach((node) => node.classList.add('is-visible'))
    }, 1200)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [pathname])

  return null
}
