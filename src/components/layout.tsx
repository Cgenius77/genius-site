import { ArrowUpRight, Instagram, Facebook, Home, Wallet, GraduationCap, HandCoins, MessageCircle } from 'lucide-react'
import { categories } from '../data/services'
import { href, navLinks } from '../router'
import type { Route } from '../router'
import { Logo, phones, whatsapp } from './ui'

export function Navbar({ route }: { route: Route }) {
  return <header className="nav-wrap"><nav className="shell glass navbar" aria-label="Navigation principale">
    <a href={href('accueil')} className="brand"><Logo /><span>GENIUS <small>AGENCY</small></span></a>
    <div className="desktop-nav">{navLinks.map(([label, target]) => <a key={target} href={href(target)} aria-current={route === target ? 'page' : undefined}>{label}</a>)}</div>
    <a className="button button-primary nav-cta" href={whatsapp()}>Réservez maintenant <ArrowUpRight size={16} aria-hidden="true" /></a>
    <a className="button button-primary nav-wa" href={whatsapp()} aria-label="Contacter Genius Agency sur WhatsApp"><MessageCircle size={18} aria-hidden="true" />WhatsApp</a>
  </nav></header>
}

const tabIcons: Record<Route, typeof Home> = { accueil: Home, services: Wallet, formations: GraduationCap, affiliation: HandCoins, contact: MessageCircle }

// App-style bottom navigation for phones and tablets (hidden on desktop, where the top nav is shown).
export function BottomNav({ route }: { route: Route }) {
  return <nav className="bottom-nav" aria-label="Navigation mobile">
    {navLinks.map(([label, target]) => {
      const Icon = tabIcons[target]
      return <a key={target} href={href(target)} aria-current={route === target ? 'page' : undefined}><Icon size={21} aria-hidden="true" /><span>{label}</span></a>
    })}
  </nav>
}

const socialLinks: { label: string; href?: string; icon: typeof Facebook }[] = [{ label: 'Facebook', icon: Facebook }, { label: 'Instagram', icon: Instagram }]

export function Footer() {
  return <footer className="footer"><div className="shell footer-grid">
    <div><a href={href('accueil')} className="brand"><Logo dark={false} /><span>GENIUS <small>AGENCY</small></span></a><p>Agence digitale en Haïti : de la stratégie à la réalisation, avec une équipe à votre écoute.</p></div>
    <div><h2>Navigation</h2>{navLinks.map(([label, target]) => <a key={target} href={href(target)}>{label}</a>)}</div>
    <div><h2>Nos services</h2>{categories.map(category => <a key={category.id} href={href('services')}>{category.short}</a>)}<a href={href('formations')}>Formations</a></div>
    <div><h2>WhatsApp</h2>{phones.map(([number, label]) => <a key={number} href={whatsapp(undefined, number)}>{label}</a>)}<div className="socials">{socialLinks.map(({label, href: link, icon: Icon}) => link ? <a className="icon-button" key={label} href={link} aria-label={label}><Icon size={18} /></a> : <span className="icon-button" key={label} title={`${label} — lien à venir`}><Icon size={18} aria-hidden="true" /><span className="sr-only">{label} — lien à venir</span></span>)}</div></div>
  </div><div className="footer-band bg-brand-band"><div className="shell">© 2026 Genius Agency</div></div></footer>
}
