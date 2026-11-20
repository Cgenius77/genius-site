import { ArrowUpRight, GraduationCap, Link2, ShoppingBag, UserPlus, Users, Wallet } from 'lucide-react'
import { GlassCard, Section, whatsapp } from '../components/ui'

// À COMPLÉTER : taux de commission. `null` affiche « Taux à venir ».
const earnings: { icon: typeof Wallet; title: string; text: string; rate: string | null }[] = [
  { icon: ShoppingBag, title: 'Commission sur les services', text: 'Touchez une commission sur chaque service commandé par un client que vous avez apporté.', rate: null },
  { icon: GraduationCap, title: 'Commission sur les formations', text: 'Gagnez sur chaque formation vendue grâce à votre lien.', rate: null },
  { icon: Users, title: 'Commission sur les nouveaux agents', text: 'Recrutez de nouveaux agents et touchez une commission sur leur activité.', rate: null },
]

const steps = [
  { icon: UserPlus, title: 'Inscrivez-vous', text: 'Devenez agent Genius Agency.' },
  { icon: Link2, title: 'Partagez votre lien', text: 'Recevez un lien et un code d’agent personnels.' },
  { icon: ShoppingBag, title: 'Vos clients commandent', text: 'Chaque vente via votre lien vous est attribuée.' },
  { icon: Wallet, title: 'Touchez vos commissions', text: 'Retirez vos gains par MonCash, NatCash ou USDT.' },
]

const dashboard = ['Solde disponible', 'Commissions du mois', 'Clients apportés', 'Agents recrutés']

export function Affiliation() {
  const join = whatsapp('Bonjour Genius Agency, je souhaite devenir agent affilié.')
  return <>
    <Section id="affiliation" heading="h1" label="PROGRAMME D’AFFILIATION" title="Gagnez avec Genius Agency" description="Recommandez nos services et nos formations, recrutez de nouveaux agents et touchez des commissions sur chaque vente.">
      <a className="button button-primary" href={join}>Devenir agent <ArrowUpRight size={18} aria-hidden="true" /></a>
    </Section>

    <Section id="gains" label="3 FAÇONS DE GAGNER" title="Vos sources de commission">
      <div className="pole-grid three">{earnings.map(({ icon: Icon, title, text, rate }) => <GlassCard key={title} className="service-card">
        <span className="tile-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p>
        <span className={`price-tag ${rate ? 'is-set' : ''}`}>{rate ?? 'Taux à venir'}</span>
      </GlassCard>)}</div>
    </Section>

    <Section id="fonctionnement" label="EN 4 ÉTAPES" title="Comment ça marche ?">
      <ol className="timeline">{steps.map(({ icon: Icon, title, text }, index) => <li key={title}><span className="step-number">0{index + 1}</span><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></li>)}</ol>
    </Section>

    <Section id="tableau-de-bord" label="VOTRE ESPACE AGENT" title="Un tableau de bord personnel" description="Chaque agent disposera de son propre tableau de bord pour suivre ses ventes et ses commissions en temps réel.">
      <GlassCard className="dash-preview">
        <div className="dash-top"><span className="eyebrow">APERÇU</span><span className="soon-badge">Bientôt disponible</span></div>
        <div className="dash-grid">{dashboard.map(label => <div key={label} className="dash-tile"><small>{label}</small><strong>—</strong></div>)}</div>
        <div className="dash-link"><Link2 size={16} aria-hidden="true" /><span>Votre lien d’agent apparaîtra ici</span></div>
      </GlassCard>
    </Section>
  </>
}
