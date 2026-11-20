// À COMPLÉTER : renseignez `account` (numéro ou adresse) et `holder` (nom du titulaire).
// Tant que `account` est vide, le site indique que le numéro est communiqué sur WhatsApp.
export type PaymentMethod = { id: string; name: string; account: string; holder?: string; instruction: string }

export const paymentMethods: PaymentMethod[] = [
  { id: 'moncash', name: 'MonCash', account: '', instruction: 'Envoyez le montant par transfert MonCash.' },
  { id: 'natcash', name: 'NatCash', account: '', instruction: 'Envoyez le montant par transfert NatCash.' },
  { id: 'usdt', name: 'USDT (TRC20)', account: '', instruction: 'Envoyez l’équivalent en USDT sur le réseau TRC20.' },
  { id: 'paypal', name: 'PayPal', account: '', instruction: 'Envoyez le montant via PayPal (« Amis et famille » si possible).' },
]
