import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, ChartNoAxesCombined, ChevronDown, ClipboardList, Clock, HandCoins, Headphones, MapPin, MessageCircle, PackageCheck, Quote, Sparkles, Target } from 'lucide-react'
import { categories, serviceCount } from '../data/services'
import { formations } from '../data/formations'
import { GlassCard, phones, Section, whatsapp } from './ui'

const strengths = [
  { icon: Clock, title: 'Délais clairs', text: 'Un calendrier défini ensemble avant le lancement.' },
  { icon: Target, title: 'Accompagnement personnalisé', text: 'Des choix adaptés à vos objectifs et à vos ressources.' },
  { icon: HandCoins, title: 'Prix accessibles', text: 'Un devis selon vos besoins, communiqué avant tout engagement.' },
  { icon: MapPin, title: 'Expertise locale', text: 'Une équipe basée en Haïti, proche de votre réalité.' },
  { icon: ChartNoAxesCombined, title: 'Résultats mesurables', text: 'Des indicateurs définis ensemble pour évaluer vos campagnes.' },
  { icon: Headphones, title: 'Support sur WhatsApp', text: 'Un canal direct pour poser vos questions et suivre votre projet.' },
]

const steps = [
  { icon: MessageCircle, title: 'Contact WhatsApp', text: 'Présentez-nous votre projet en quelques mots.' },
  { icon: ClipboardList, title: 'Analyse de vos besoins', text: 'Nous précisons les objectifs, le budget et les délais.' },
  { icon: Sparkles, title: 'Réalisation', text: 'Nous réalisons le travail convenu et vous informons de son avancement.' },
  { icon: PackageCheck, title: 'Livraison et suivi', text: 'Recevez vos livrables et faites le point avec notre équipe.' },
]

// Valeurs de démonstration : remplacer les nombres non vérifiés et retirer la mention avant publication.
const figures = [{ value: serviceCount, label: 'Services au catalogue', demo: false }, { value: formations.length, label: 'Formations disponibles', demo: false }, { value: 120, label: 'Projets réalisés', demo: true }]

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const [count, setCount] = useState(value)
  useEffect(() => {
    if (!visible || reduced) return
    const animation = animate(0, value, { duration: .9, onUpdate: current => setCount(Math.round(current)) })
    return () => animation.stop()
  }, [visible, reduced, value])
  return <><span className="sr-only">{value}</span><span ref={ref} aria-hidden="true">{reduced ? value : count}</span></>
}

export function About() {
  return <><Section id="a-propos" label="QUI SOMMES-NOUS" title="Pourquoi choisir Genius Agency ?" description="Nous accompagnons les entrepreneurs et les équipes en Haïti, du premier échange jusqu’à la livraison.">
    <div className="service-grid">{strengths.map(({icon: Icon, title, text}) => <GlassCard key={title}><span className="tile-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></GlassCard>)}</div>
  </Section><Section id="processus" label="EN 4 ÉTAPES" title="Notre processus">
    <ol className="timeline">{steps.map(({icon: Icon, title, text}, index) => <li key={title}><span className="step-number">0{index + 1}</span><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></li>)}</ol>
  </Section><Section id="chiffres" label="EN CHIFFRES" title="Genius Agency en chiffres">
    <div className="stat-grid">{figures.map(({value, label, demo}) => <GlassCard className="stat" key={label}><strong><Counter value={value} /></strong><p>{label}</p>{demo && <small>Donnée de démonstration</small>}</GlassCard>)}</div>
  </Section></>
}

// À REMPLACER par de vrais avis clients
const reviews = [
  { title: 'Marketing', text: 'Emplacement réservé à un retour client sur une campagne.' },
  { title: 'Design', text: 'Emplacement réservé à un retour client sur une identité visuelle.' },
  { title: 'Formation', text: 'Emplacement réservé à un retour de participant après une formation.' },
]

export function Testimonials() {
  const [active, setActive] = useState(0)
  const move = (direction: number) => setActive(index => (index + direction + reviews.length) % reviews.length)
  return <Section id="temoignages" label="RETOURS CLIENTS" title="Témoignages" description="Aucun avis client n’est publié pour le moment.">
    <GlassCard className="testimonial"><Quote size={30} aria-hidden="true" /><div aria-live="polite"><span className="eyebrow">APERÇU · {reviews[active].title} · {active + 1}/{reviews.length}</span><p>{reviews[active].text}</p></div>
      <div className="carousel-controls"><button className="icon-button" type="button" onClick={() => move(-1)} aria-label="Carte précédente"><ArrowLeft size={19} /></button><button className="icon-button" type="button" onClick={() => move(1)} aria-label="Carte suivante"><ArrowRight size={19} /></button></div>
    </GlassCard>
  </Section>
}

const questions = [
  ['Quels sont les délais de réalisation ?', 'Le délai dépend du service, du volume et des éléments à fournir. Nous vous communiquons un calendrier avant de démarrer.'],
  ['Quels moyens de paiement acceptez-vous ?', 'MonCash, NatCash, USDT et PayPal. Les frais et modalités vous sont confirmés avant tout paiement.'],
  ['Comment se déroulent les formations ?', 'Choisissez une formation, payez avec le moyen de votre choix, puis envoyez votre preuve de paiement. Votre accès est confirmé après vérification.'],
  ['Comment devenir agent affilié ?', 'Rendez-vous sur la page Affiliation et contactez-nous sur WhatsApp. Le tableau de bord des agents sera bientôt disponible sur le site.'],
]

export function FAQ() {
  return <Section id="faq" label="QUESTIONS FRÉQUENTES" title="Vos questions, nos réponses">
    <div className="faq-list">{questions.map(([question, answer]) => <details name="faq" className="glass" key={question}><summary>{question}<ChevronDown aria-hidden="true" size={19} /></summary><p>{answer}</p></details>)}</div>
  </Section>
}

export function Contact() {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    const read = (key: string) => String(fields.get(key) ?? '').trim()
    if (!read('name') || !read('phone')) {
      const field = event.currentTarget.elements.namedItem(!read('name') ? 'name' : 'phone') as HTMLInputElement
      field.setCustomValidity('Veuillez renseigner ce champ.')
      field.reportValidity()
      return
    }
    window.location.assign(whatsapp(`Bonjour Genius Agency, je vous contacte depuis le site.\nNom : ${read('name')}\nTéléphone : ${read('phone')}\nSujet : ${read('service')}\nMessage : ${read('message') || 'Non renseigné'}`))
  }
  return <Section id="contact" heading="h1" label="CONTACT" title="Parlons de votre projet." description="Écrivez-nous via le formulaire ou contactez directement notre équipe sur WhatsApp.">
    <div className="contact-grid"><GlassCard><h3>Joindre notre équipe</h3><p>Basée en Haïti · Échanges en français et en créole</p><div className="phone-list">{phones.map(([number, label]) => <a className="button button-glass" key={number} href={whatsapp(undefined, number)}><MessageCircle size={18} aria-hidden="true" />{label}</a>)}</div></GlassCard>
      <GlassCard><form onSubmit={submit}><div className="form-row"><label>Nom complet <input name="name" autoComplete="name" maxLength={100} required onInput={event => event.currentTarget.setCustomValidity('')} /></label><label>Téléphone <input name="phone" type="tel" autoComplete="tel" maxLength={32} required onInput={event => event.currentTarget.setCustomValidity('')} /></label></div>
        <label>Sujet <select name="service" required defaultValue=""><option disabled value="">Sélectionnez un sujet</option>
          {categories.map(category => <optgroup key={category.id} label={category.title}>{category.services.map(({ name }) => <option key={name} value={`${category.short} — ${name}`}>{name}</option>)}</optgroup>)}
          <optgroup label="Formations">{formations.map(({ id, name }) => <option key={id} value={`Formation — ${name}`}>{name}</option>)}</optgroup>
          <optgroup label="Autre"><option value="Programme d’affiliation">Programme d’affiliation</option><option value="Autre demande">Autre demande</option></optgroup>
        </select></label>
        <label>Votre message <span className="optional">(facultatif)</span><textarea name="message" rows={4} maxLength={1000} /></label><p id="contact-aide" className="form-note">Relisez votre message dans WhatsApp avant de l’envoyer.</p><button className="button button-primary" aria-describedby="contact-aide" type="submit">Continuer sur WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></button>
      </form></GlassCard></div>
  </Section>
}
