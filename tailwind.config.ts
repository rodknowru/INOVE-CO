import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'warm-cream': '#F5F0EB',
        'dark-brown': '#2C2420',
        'card-brown': '#3C3228',
        'charcoal': '#3D3935',
        'soft-white': '#FDFCFB',
        'amber-accent': '#D4A574',
        'accent-gold': '#8B6914',
        'success-green': '#2d5a3d',
        'input-border': '#D5CBBD',
        'error-red': '#D94040',
        'cdek-green': '#00B33C',
        'yandex-red': '#FC3F1D',
        'pochta-blue': '#005BAC',
        'tab-inactive': '#8C7E6F',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'container': '1440px',
      },
    },
  },
  plugins: [],
}
export default config
