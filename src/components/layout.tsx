import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Instagram, Facebook, Menu, X } from 'lucide-react'
import { categories } from '../data/services'
import { href, navLinks } from '../router'
import type { Route } from '../router'
import { Logo, phones, whatsapp } from './ui'

export function Navbar({ route }: { route: Route }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  useEffect(() => setOpen(false), [route])
  useEffect(() => {
    if (!open) return
    const dismiss = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      document.getElementById('menu-button')?.focus()
    }
    document.addEventListener('keydown', dismiss)
    return () => document.removeEventListener('keydown', dismiss)
  }, [open])
  const link = ([label, target]: [string, Route]) => <a key={target} href={href(target)} aria-current={route === target ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>
  return <header className="nav-wrap"><nav className="shell glass navbar" aria-label="Navigation principale">
    <a href={href('accueil')} className="brand" onClick={() => setOpen(false)}><Logo /><span>GENIUS <small>AGENCY</small></span></a>
    <div className="desktop-nav">{navLinks.map(link)}</div>
    <a className="button button-primary nav-cta" href={whatsapp()}>Réservez maintenant <ArrowUpRight size={16} aria-hidden="true" /></a>
    <button className="icon-button burger" type="button" id="menu-button" aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <div id="menu-mobile" className="mobile-menu" inert={!open}><AnimatePresence>{open && <motion.div className="glass mobile-nav" initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .2 }}>
      {navLinks.map(link)}
      <a className="button button-primary" href={whatsapp()}>Réservez maintenant</a>
    </motion.div>}</AnimatePresence></div>
  </nav></header>
}

const socialLinks: { label: string; href?: string; icon: typeof Facebook }[] = [{ label: 'Facebook', icon: Facebook }, { label: 'Instagram', icon: Instagram }]

export function Footer() {
  return <footer className="footer"><div className="shell footer-grid">
    <div><a href={href('accueil')} className="brand"><Logo dark={false} /><span>GENIUS <small>AGENCY</small></span></a><p>Agence digitale en Haïti : de la stratégie à la réalisation, avec une équipe à votre écoute.</p></div>
    <div><h2>Navigation</h2>{navLinks.map(([label, target]) => <a key={target} href={href(target)}>{label}</a>)}</div>
    <div><h2>Nos services</h2>{categories.map(category => <a key={category.id} href={href('services')}>{category.short}</a>)}<a href={href('formations')}>Formations</a></div>
    <div><h2>WhatsApp</h2>{phones.map(([number, label]) => <a key={number} href={whatsapp(undefined, number)}>{label}</a>)}<div className="socials">{socialLinks.map(({label, href: link, icon: Icon}) => link ? <a className="icon-button" key={label} href={link} aria-label={label}><Icon size={18} /></a> : <span className="icon-button" key={label} title={`${label} — lien à venir`}><Icon size={18} aria-hidden="true" /><span className="sr-only">{label} — lien à venir</span></span>)}</div></div>
  </div><div className="footer-band bg-brand-band"><div className="shell">© 2026 Genius Agency <span>Basée en Haïti</span></div></div></footer>
}
