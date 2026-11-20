import { Palette, Monitor, Video, Megaphone, Coins, LayoutTemplate, Store, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// À COMPLÉTER : renseignez `price` (nombre) pour chaque formation. `null` affiche « Prix à confirmer ».
export type Formation = { id: string; name: string; description: string; icon: LucideIcon; price: number | null; currency: 'HTG' | 'USD'; duration?: string; format?: string }

export const formations: Formation[] = [
  { id: 'design-graphique', name: 'Design graphique', description: 'Apprenez les principes de composition, de couleur et de typographie.', icon: Palette, price: null, currency: 'HTG' },
  { id: 'site-internet', name: 'Création de site internet', description: 'Découvrez comment structurer et publier un site web.', icon: Monitor, price: null, currency: 'HTG' },
  { id: 'montage-video', name: 'Montage vidéo', description: 'Transformez vos séquences en vidéos rythmées et lisibles.', icon: Video, price: null, currency: 'HTG' },
  { id: 'boostage', name: 'Boostage publicitaire', description: 'Apprenez à préparer une campagne et à lire ses résultats.', icon: Megaphone, price: null, currency: 'HTG' },
  { id: 'monetisation', name: 'Monétisation', description: 'Explorez des modèles de revenus adaptés à vos contenus.', icon: Coins, price: null, currency: 'HTG' },
  { id: 'canva', name: 'Canva', description: 'Créez des supports cohérents grâce aux modèles et aux outils de mise en page.', icon: LayoutTemplate, price: null, currency: 'HTG' },
  { id: 'e-commerce', name: 'Commerce en ligne', description: 'Préparez votre catalogue et les étapes clés d’une boutique en ligne.', icon: Store, price: null, currency: 'HTG' },
  { id: 'ia', name: 'Intelligence artificielle', description: 'Découvrez des usages concrets de l’IA dans votre travail quotidien.', icon: Sparkles, price: null, currency: 'HTG' },
]

export const formatPrice = (formation: Formation) => formation.price === null
  ? 'Prix à confirmer'
  : `${formation.price.toLocaleString('fr-FR')} ${formation.currency}`
