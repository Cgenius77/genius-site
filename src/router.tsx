import { useEffect, useState } from 'react'

// Hash-based routing (#/services, #/formations…) so the site works on any static host without server rewrites.
export const routes = ['accueil', 'services', 'formations', 'affiliation', 'contact'] as const
export type Route = typeof routes[number]

export const navLinks: [label: string, route: Route][] = [
  ['Accueil', 'accueil'], ['Services', 'services'], ['Formations', 'formations'], ['Affiliation', 'affiliation'], ['Contact', 'contact'],
]

export const href = (route: Route) => route === 'accueil' ? '#/' : `#/${route}`

function parse(): Route {
  const path = window.location.hash.replace(/^#\/?/, '')
  return (routes as readonly string[]).includes(path) ? path as Route : 'accueil'
}

export function useRoute() {
  const [route, setRoute] = useState<Route>(parse)
  useEffect(() => {
    const onChange = () => { setRoute(parse()); window.scrollTo({ top: 0, behavior: 'instant' }) }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

// In-page jumps must not touch the hash, otherwise the router would leave the current page.
export function scrollToId(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView()
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}
