import { ArrowRight, ArrowUpRight, BadgeCheck, GraduationCap, HandCoins, LayoutDashboard, PackageSearch, UserPlus, Wallet } from 'lucide-react'
import { About, FAQ, Testimonials } from '../components/content'
import { GlassCard, Logo, Section, whatsapp, WhatsAppButton } from '../components/ui'
import { href, scrollToId } from '../router'
import type { Route } from '../router'

const sections: { route: Route; icon: typeof Wallet; title: string; text: string; cta: string }[] = [
  { route: 'services', icon: Wallet, title: 'Services', text: 'Recharge Meru, USDT, cartes cadeaux, marketing et design : tout notre catalogue.', cta: 'Voir les services' },
  { route: 'formations', icon: GraduationCap, title: 'Formations', text: 'Des formations pratiques avec leurs prix, payables par MonCash, NatCash et plus.', cta: 'Voir les formations' },
  { route: 'affiliation', icon: HandCoins, title: 'Affiliation', text: 'Devenez agent et touchez des commissions sur les services, les formations et les nouveaux agents.', cta: 'Devenir agent' },
]

const accountPerks = [
  { icon: PackageSearch, text: 'Suivez vos commandes et vos paiements' },
  { icon: GraduationCap, text: 'Accédez à vos formations' },
  { icon: LayoutDashboard, text: 'Votre tableau de bord d’agent et vos commissions' },
  { icon: BadgeCheck, text: 'Des offres réservées aux membres' },
]

export function Home() {
  return <>
    <section className="hero shell" aria-labelledby="titre-principal">
      <div className="hero-copy">
        <h1 id="titre-principal">Propulsez votre business <em>dans le digital.</em></h1>
        <p>Recharges et paiements, marketing, design et formations : Genius Agency réunit tout ce qu’il faut pour faire avancer votre projet en Haïti.</p>
        <div className="hero-actions">
          <button type="button" className="button button-primary" onClick={() => scrollToId('compte')}>Créer mon compte <UserPlus size={18} aria-hidden="true" /></button>
          <WhatsAppButton>Écrire sur WhatsApp</WhatsAppButton>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true"><div className="art-logo"><Logo hero /></div></div>
    </section>

    <Section id="decouvrir" label="DÉCOUVRIR" title="Tout Genius Agency en un seul endroit">
      <div className="pole-grid three">{sections.map(({ route, icon: Icon, title, text, cta }) => <GlassCard className="pole-card" key={route}>
        <a href={href(route)}><span className="tile-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p><span className="text-link">{cta} <ArrowRight size={16} aria-hidden="true" /></span></a>
      </GlassCard>)}</div>
    </Section>

    <About />

    <Section id="compte" label="VOTRE ESPACE" title="Créez votre compte Genius Agency" description="Un seul compte pour commander, suivre vos formations et gérer vos commissions d’agent.">
      <GlassCard className="account-card">
        <ul className="perk-list">{accountPerks.map(({ icon: Icon, text }) => <li key={text}><span className="tile-icon"><Icon aria-hidden="true" /></span>{text}</li>)}</ul>
        <div className="account-actions">
          <span className="soon-badge">Ouverture des comptes très bientôt</span>
          <p>En attendant, notre équipe vous accompagne directement sur WhatsApp.</p>
          <a className="button button-primary" href={whatsapp('Bonjour Genius Agency, je souhaite créer mon compte et être informé(e) de l’ouverture.')}>Être prévenu sur WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </GlassCard>
    </Section>

    <Testimonials />
    <FAQ />
  </>
}
