import { Megaphone, Palette, Wallet, Target, TrendingUp, Users, Eye, ShoppingBag, Compass, Crosshair, PenTool, Fingerprint, Contact, Music, Flag, Calendar, FileImage, Images, CreditCard, Globe, ArrowLeftRight, Smartphone, Gift } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// `price` is optional: leave it undefined and the card shows "Prix sur demande".
export type Service = { name: string; description: string; icon: LucideIcon; price?: string }
export type Category = { id: string; short: string; title: string; description: string; icon: LucideIcon; services: Service[] }

export const categories: Category[] = [
  { id: 'paiements', short: 'Recharges et paiements', title: 'Recharges, USDT et cartes cadeaux', icon: Wallet, description: 'Rechargez vos comptes, échangez de l’USDT et obtenez vos cartes cadeaux. Les taux et frais sont confirmés avant chaque opération.', services: [
    { name: 'Recharge Meru', description: 'Rechargez votre compte Meru rapidement.', icon: Smartphone },
    { name: 'Recharge Wise', description: 'Demandez les modalités et la disponibilité de la recharge.', icon: Wallet },
    { name: 'Achat et vente d’USDT', description: 'Taux du jour communiqué sur WhatsApp avant toute opération.', icon: ArrowLeftRight },
    { name: 'Cartes cadeaux (gift cards)', description: 'Apple, Google Play, Amazon, Steam et autres : demandez la disponibilité.', icon: Gift },
    { name: 'Création de carte virtuelle', description: 'Obtenez une carte pour vos paiements en ligne.', icon: CreditCard },
    { name: 'Création de compte PayPal', description: 'Vérifiez votre admissibilité et les options proposées.', icon: Users },
    { name: 'Achat en ligne', description: 'Nous vous accompagnons pour vos commandes sur les sites étrangers.', icon: Globe },
  ] },
  { id: 'marketing', short: 'Boostage marketing', title: 'Boostage marketing', icon: Megaphone, description: 'Touchez les bonnes personnes et pilotez vos campagnes avec des objectifs clairs.', services: [
    { name: 'Gestion de campagnes publicitaires', description: 'Structurez vos campagnes et suivez leurs performances.', icon: Target },
    { name: 'Boostage Facebook et TikTok', description: 'Diffusez vos contenus auprès de publics pertinents.', icon: TrendingUp },
    { name: 'Acquisition de clients', description: 'Attirez des prospects avec des messages adaptés à leur parcours.', icon: Users },
    { name: 'Développement de visibilité', description: 'Renforcez votre présence auprès de votre marché.', icon: Eye },
    { name: 'Promotion de produits', description: 'Mettez en valeur vos offres au bon moment.', icon: ShoppingBag },
    { name: 'Stratégie marketing', description: 'Définissez vos priorités, vos canaux et vos indicateurs.', icon: Compass },
    { name: 'Ciblage des audiences', description: 'Identifiez les segments à privilégier pour votre campagne.', icon: Crosshair },
  ] },
  { id: 'design', short: 'Design et création', title: 'Design et création digitale', icon: Palette, description: 'Construisez une identité reconnaissable, à l’écran comme sur vos supports imprimés.', services: [
    { name: 'Création de logo', description: 'Obtenez un signe distinctif adapté à vos supports.', icon: PenTool },
    { name: 'Branding', description: 'Harmonisez les couleurs, les typographies et l’univers de votre marque.', icon: Fingerprint },
    { name: 'Cartes de visite et badges', description: 'Soignez la première impression lors de vos rencontres.', icon: Contact },
    { name: 'Pochettes musicales', description: 'Donnez à votre sortie musicale un visuel à son image.', icon: Music },
    { name: 'Bannières et roll-up', description: 'Rendez votre message lisible en ligne et sur vos événements.', icon: Flag },
    { name: 'Calendriers et étiquettes', description: 'Personnalisez vos supports et vos emballages.', icon: Calendar },
    { name: 'Flyers publicitaires', description: 'Présentez votre offre dans un format facile à distribuer.', icon: FileImage },
    { name: 'Affiches promotionnelles', description: 'Mettez en avant une annonce avec une composition percutante.', icon: FileImage },
    { name: 'Visuels pour réseaux sociaux', description: 'Créez des publications cohérentes et adaptées à chaque format.', icon: Images },
  ] },
]

export const serviceCount = categories.reduce((total, category) => total + category.services.length, 0)
