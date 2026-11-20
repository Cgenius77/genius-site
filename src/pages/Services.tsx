import { categories, serviceCount } from '../data/services'
import { Section, ServiceCard } from '../components/ui'
import { scrollToId } from '../router'

export function Services() {
  return <>
    <Section id="services" heading="h1" label={`${serviceCount} SERVICES`} title="Nos services" description="Choisissez une catégorie, puis commandez directement sur WhatsApp. Les prix et taux sont confirmés avant chaque opération.">
      <div className="chip-row">{categories.map(({ id, short, icon: Icon }) => <button key={id} type="button" className="chip" onClick={() => scrollToId(id)}><Icon size={16} aria-hidden="true" />{short}</button>)}</div>
    </Section>
    <div className="service-zone">{categories.map(category => <Section key={category.id} id={category.id} label={category.short.toUpperCase()} title={category.title} description={category.description}>
      <div className="service-grid">{category.services.map(service => <ServiceCard key={service.name} service={service} category={category.short} />)}</div>
    </Section>)}</div>
  </>
}
