/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        retro: ['"Silkscreen"', 'monospace'],
        game: ['"MedievalSharp"', 'cursive', 'sans-serif'],
      },
      colors: {
        game: {
          bg: '#0a0c19',
          dark: '#070810',
          panel: '#13172e',
          'panel-dark': '#0c0e1f',
          'panel-light': '#1c2242',
          border: '#373e6b',
          'border-light': '#5e68ab',
          'border-gold': '#b48628',
          gold: '#f6ad55',
          'gold-light': '#fbd38d',
          'gold-dark': '#c05621',
          xp: '#a855f7',
          'xp-light': '#c084fc',
          hp: '#ef4444',
          mana: '#3b82f6',
          stamina: '#10b981',
          parchment: '#fef3c7',
          'parchment-dark': '#ebd399',
          wood: '#452615',
          'wood-dark': '#2e190d',
          'wood-light': '#6c3e23',
        }
      },
      boxShadow: {
        'pixel-sm': '2px 2px 0px #000000',
        'pixel': '4px 4px 0px #000000',
        'pixel-lg': '6px 6px 0px #000000',
        'pixel-gold': '0 0 12px rgba(246, 173, 85, 0.4), 4px 4px 0px #000000',
        'pixel-inset': 'inset 3px 3px 0px rgba(0,0,0,0.6), inset -3px -3px 0px rgba(255,255,255,0.05)',
        'pixel-button': 'inset -3px -3px 0px rgba(0,0,0,0.5), inset 3px 3px 0px rgba(255,255,255,0.25)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-short': 'bounceShort 0.5s ease-in-out infinite alternate',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        bounceShort: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 4px rgba(246, 173, 85, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 12px rgba(246, 173, 85, 0.9))' },
        }
      }
    },
  },
  plugins: [],
}

