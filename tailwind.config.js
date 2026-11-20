export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { orange: '#FF7A00', 'orange-hover': '#FF8F26', sky: '#0A7CFF', 'sky-light': '#2F95FF', navy: '#020A1A', panel: '#0A1630', muted: '#B8C4D9' },
    backgroundImage: { 'brand-band': 'linear-gradient(90deg, #0A5BC4, #2A8CFF)' },
    fontFamily: { display: ['var(--font-display)'], sans: ['var(--font-body)'] },
  } },
}
