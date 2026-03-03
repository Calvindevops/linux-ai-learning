import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        card: '#0a0a0a',
        'card-border': 'rgba(255,255,255,0.08)',
        accent: {
          blue: '#155eef',
          'blue-light': '#4f8cff',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(90deg, #155eef, #4f8cff)',
        'card-gradient': 'linear-gradient(135deg, rgba(21,94,239,0.1), rgba(79,140,255,0.05))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'progress-fill': 'progressFill 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        progressFill: {
          '0%': { strokeDashoffset: '283' },
          '100%': { strokeDashoffset: 'var(--target-offset)' },
        },
      },
      boxShadow: {
        'card-hover': '0 0 0 1px rgba(21,94,239,0.35), 0 18px 40px rgba(21,94,239,0.25)',
        'card': '0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
export default config
