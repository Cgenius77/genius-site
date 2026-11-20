import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import '@fontsource-variable/montserrat'
import '@fontsource-variable/nunito-sans'
import './styles.css'
import { Footer, Navbar } from './components/layout'
import { Contact, FAQ } from './components/content'
import { WhatsAppButton } from './components/ui'
import { FontPicker } from './components/font-picker'
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { Formations } from './pages/Formations'
import { Affiliation } from './pages/Affiliation'
import { scrollToId, useRoute } from './router'

const titles = { accueil: 'Accueil', services: 'Services', formations: 'Formations', affiliation: 'Affiliation', contact: 'Contact' }

function App() {
  const route = useRoute()
  useEffect(() => { document.title = `${titles[route]} | Genius Agency` }, [route])
  return <MotionConfig reducedMotion="user">
    <button type="button" className="skip-link" onClick={() => scrollToId('contenu')}>Aller au contenu</button><Navbar route={route} />
    <main id="contenu" tabIndex={-1} key={route}>
      {route === 'accueil' && <Home />}
      {route === 'services' && <Services />}
      {route === 'formations' && <Formations />}
      {route === 'affiliation' && <Affiliation />}
      {route === 'contact' && <><Contact /><FAQ /></>}
    </main>
    <Footer /><div className="floating-actions"><FontPicker /><button type="button" className="glass icon-button" aria-label="Retour en haut" onClick={() => window.scrollTo({ top: 0 })}><ArrowUp size={19} aria-hidden="true" /></button><WhatsAppButton floating /></div>
  </MotionConfig>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
