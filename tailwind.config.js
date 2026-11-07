/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          dark: '#080c14',
          card: '#0f172a',
          cardLight: '#1e293b',
          border: 'rgba(255, 255, 255, 0.08)',
          navy: '#0f172a',
          navyAccent: '#1e3a8a',
          gold: '#f59e0b',
          goldGlow: '#fbbf24',
          royal: '#3b82f6',
          purple: '#8b5cf6',
          pink: '#ec4899',
          emerald: '#10b981'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'brand-glow': '0 0 25px rgba(59, 130, 246, 0.25)',
        'gold-glow': '0 0 25px rgba(245, 158, 11, 0.25)',
        'purple-glow': '0 0 25px rgba(139, 92, 246, 0.25)',
      }
    },
  },
  plugins: [],
}
