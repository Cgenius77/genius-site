import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, Copy, ShieldCheck, X } from 'lucide-react'
import { formations, formatPrice } from '../data/formations'
import type { Formation } from '../data/formations'
import { paymentMethods } from '../data/payments'
import { GlassCard, Section, whatsapp } from '../components/ui'

const steps = ['Choisissez votre formation', 'Payez par MonCash, NatCash, USDT ou PayPal', 'Envoyez la référence de paiement', 'Recevez votre accès après vérification']

export function Formations() {
  const [selected, setSelected] = useState<Formation | null>(null)
  return <>
    <Section id="formations" heading="h1" label="FORMATIONS" title="Apprenez avec Genius Agency" description="Des formations pratiques pour développer vos compétences numériques. Payez avec le moyen qui vous convient.">
      <ol className="mini-steps">{steps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol>
    </Section>
    <section className="shell section" aria-label="Liste des formations">
      <div className="service-grid">{formations.map(formation => <GlassCard className="service-card formation-card" key={formation.id}>
        <span className="tile-icon"><formation.icon aria-hidden="true" /></span>
        <h3>{formation.name}</h3><p>{formation.description}</p>
        <span className={`price-tag ${formation.price === null ? '' : 'is-set'}`}>{formatPrice(formation)}</span>
        <button type="button" className="button button-primary" onClick={() => setSelected(formation)}>S’inscrire et payer</button>
      </GlassCard>)}</div>
    </section>
    <PaymentDialog formation={selected} onClose={() => setSelected(null)} />
  </>
}

function PaymentDialog({ formation, onClose }: { formation: Formation | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [methodId, setMethodId] = useState(paymentMethods[0].id)
  const [copied, setCopied] = useState(false)
  const method = paymentMethods.find(m => m.id === methodId) ?? paymentMethods[0]

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (formation && !dialog.open) { setCopied(false); dialog.showModal() }
    if (!formation && dialog.open) dialog.close()
  }, [formation])

  const copy = async () => {
    try { await navigator.clipboard.writeText(method.account); setCopied(true) } catch { setCopied(false) }
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formation) return
    const fields = new FormData(event.currentTarget)
    const read = (key: string) => String(fields.get(key) ?? '').trim()
    window.location.assign(whatsapp(`Bonjour Genius Agency, je souhaite m’inscrire à une formation.\nFormation : ${formation.name}\nPrix : ${formatPrice(formation)}\nMoyen de paiement : ${method.name}\nRéférence / ID de transaction : ${read('reference') || 'Paiement pas encore effectué'}\nNom : ${read('name')}\nTéléphone : ${read('phone')}`))
  }

  return <dialog ref={ref} className="glass pay-dialog" aria-labelledby="pay-title" onClose={onClose} onClick={event => { if (event.target === ref.current) ref.current?.close() }}>
    {formation && <form onSubmit={submit}>
      <div className="pay-head"><div><span className="eyebrow">INSCRIPTION</span><h2 id="pay-title">{formation.name}</h2><p className="pay-price">{formatPrice(formation)}</p></div>
        <button type="button" className="icon-button" aria-label="Fermer" onClick={() => ref.current?.close()}><X size={18} /></button></div>

      <fieldset><legend>Moyen de paiement</legend><div className="method-grid">
        {paymentMethods.map(m => <label key={m.id} className={`method ${m.id === methodId ? 'is-active' : ''}`}><input type="radio" name="method" value={m.id} checked={m.id === methodId} onChange={() => { setMethodId(m.id); setCopied(false) }} />{m.name}</label>)}
      </div></fieldset>

      <div className="pay-instructions">
        <p>{method.instruction}{formation.price === null && ' Le montant exact vous est confirmé sur WhatsApp.'}</p>
        {method.account
          ? <div className="account-line"><code>{method.account}</code>{method.holder && <span>{method.holder}</span>}<button type="button" className="chip" onClick={copy}><Copy size={14} aria-hidden="true" />{copied ? 'Copié' : 'Copier'}</button></div>
          : <p className="optional">Le numéro de paiement vous est communiqué sur WhatsApp.</p>}
      </div>

      <div className="form-row">
        <label>Nom complet <input name="name" autoComplete="name" maxLength={100} required /></label>
        <label>Téléphone <input name="phone" type="tel" autoComplete="tel" maxLength={32} required /></label>
      </div>
      <label>Référence de paiement <span className="optional">(si déjà payé)</span><input name="reference" maxLength={80} placeholder="ID de transaction" /></label>
      <p className="form-note"><ShieldCheck size={15} aria-hidden="true" /> Votre accès est activé après vérification du paiement par notre équipe.</p>
      <button className="button button-primary" type="submit">Envoyer sur WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></button>
    </form>}
  </dialog>
}
