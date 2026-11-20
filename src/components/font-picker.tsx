import { useEffect, useRef, useState } from 'react'
import { Check, Type } from 'lucide-react'

type FontOption = { id: string; label: string; display: string; body: string; google?: string }

// Option 1 keeps the site's original pairing (bundled locally); the others load from Google Fonts on demand.
const fonts: FontOption[] = [
  { id: 'original', label: 'Montserrat + Nunito Sans', display: 'Montserrat Variable', body: 'Nunito Sans Variable' },
  { id: 'poppins', label: 'Poppins', display: 'Poppins', body: 'Poppins', google: 'Poppins:wght@400;500;600;700;800;900' },
  { id: 'inter', label: 'Inter', display: 'Inter', body: 'Inter', google: 'Inter:wght@400..900' },
  { id: 'roboto', label: 'Roboto', display: 'Roboto', body: 'Roboto', google: 'Roboto:wght@400..900' },
  { id: 'open-sans', label: 'Open Sans', display: 'Open Sans', body: 'Open Sans', google: 'Open+Sans:wght@400..800' },
  { id: 'lato', label: 'Lato', display: 'Lato', body: 'Lato', google: 'Lato:wght@400;700;900' },
  { id: 'raleway', label: 'Raleway', display: 'Raleway', body: 'Raleway', google: 'Raleway:wght@400..900' },
  { id: 'outfit', label: 'Outfit', display: 'Outfit', body: 'Outfit', google: 'Outfit:wght@400..900' },
  { id: 'dm-sans', label: 'DM Sans', display: 'DM Sans', body: 'DM Sans', google: 'DM+Sans:wght@400..900' },
  { id: 'urbanist', label: 'Urbanist', display: 'Urbanist', body: 'Urbanist', google: 'Urbanist:wght@400..900' },
]

const STORAGE_KEY = 'genius-font'

function loadGoogleFont(font: FontOption) {
  if (!font.google) return
  const id = `gf-${font.id}`
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${font.google}&display=swap`
  document.head.appendChild(link)
}

function applyFont(font: FontOption) {
  loadGoogleFont(font)
  const root = document.documentElement.style
  root.setProperty('--font-display', `'${font.display}', sans-serif`)
  root.setProperty('--font-body', `'${font.body}', sans-serif`)
}

function readSaved() {
  try { return localStorage.getItem(STORAGE_KEY) } catch { return null }
}

export function FontPicker() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(() => readSaved() ?? 'original')
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    applyFont(fonts.find(f => f.id === current) ?? fonts[0])
    try { localStorage.setItem(STORAGE_KEY, current) } catch { /* storage unavailable */ }
  }, [current])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const onClick = (e: PointerEvent) => { if (!wrapRef.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClick)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onClick) }
  }, [open])

  return <div className="font-picker" ref={wrapRef}>
    {open && <div className="glass font-menu" role="listbox" aria-label="Choisir une police">
      {fonts.map(font => <button key={font.id} type="button" role="option" aria-selected={font.id === current}
        className="font-option" style={{ fontFamily: `'${font.display}', sans-serif` }}
        onPointerEnter={() => loadGoogleFont(font)}
        onClick={() => { setCurrent(font.id); setOpen(false) }}>
        <span>{font.label}</span>{font.id === current && <Check size={16} aria-hidden="true" />}
      </button>)}
    </div>}
    <button type="button" className="glass icon-button" aria-label="Changer la police" aria-expanded={open}
      onClick={() => { if (!open) fonts.forEach(loadGoogleFont); setOpen(!open) }}>
      <Type size={19} aria-hidden="true" />
    </button>
  </div>
}
