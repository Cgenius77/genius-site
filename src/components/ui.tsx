import { useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import type { Service } from '../data/services'

export const phones = [['50939431714', '+509 3943 1714'], ['50943722419', '+509 4372 2419']] as const
export const whatsapp = (message = 'Bonjour Genius Agency, je souhaite discuter de mon projet.', phone: string = phones[0][0]) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

export function Logo({ hero = false, dark = true }: { hero?: boolean; dark?: boolean }) {
  const [failed, setFailed] = useState(false)
  return <span className={`logo ${hero ? 'logo-hero' : ''}`}>
    {failed ? <span role="img" aria-label="Genius Agency" className="monogram"><b>G</b><b>A</b></span> :
      <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Genius Agency" width={hero ? 450 : 57} height={hero ? 332 : 42} loading={dark || hero ? 'eager' : 'lazy'} onError={() => setFailed(true)} />}
  </span>
}

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`glass card ${className}`} onPointerMove={(event) => {
    if (event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - bounds.top}px`)
  }}>{children}</div>
}

export function Section({ id, label, title, description, children, heading = 'h2' }: { id: string; label: string; title: string; description?: string; children: ReactNode; heading?: 'h1' | 'h2' }) {
  const reduced = useReducedMotion()
  const Heading = heading
  return <section id={id} className={`shell section ${heading === 'h1' ? 'page-head' : ''}`} aria-labelledby={`${id}-titre`}>
    <motion.header className="section-head" initial={reduced ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : .45 }}>
      <span className="eyebrow">{label}</span><Heading id={`${id}-titre`}>{title}</Heading>{description && <p>{description}</p>}
    </motion.header>
    {children}
  </section>
}

export function ServiceCard({ service, category }: { service: Service; category: string }) {
  const { name, description, icon: Icon, price } = service
  return <GlassCard className="service-card"><span className="tile-icon"><Icon aria-hidden="true" /></span><h3>{name}</h3><p>{description}</p>
    <span className="price-tag">{price ?? 'Prix sur demande'}</span>
    <a className="text-link" href={whatsapp(`Bonjour Genius Agency, je souhaite commander « ${name} » (${category}). Pouvez-vous me préciser le prix et les modalités ?`)} aria-label={`Commander : ${name}`}>Commander sur WhatsApp <ArrowUpRight size={15} aria-hidden="true" /></a>
  </GlassCard>
}

export function WhatsAppButton({ floating = false, children }: { floating?: boolean; children?: ReactNode }) {
  return <a className={floating ? 'float-whatsapp' : 'button button-glass'} href={whatsapp()} aria-label={floating ? 'Contacter Genius Agency sur WhatsApp' : undefined}><MessageCircle aria-hidden="true" size={floating ? 23 : 19} />{children}</a>
}
