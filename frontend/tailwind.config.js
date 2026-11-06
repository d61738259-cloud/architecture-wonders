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
          white: '#FFFFFF',
          soft: '#F8F9FA',
          stone: '#EFECE6',
          stoneDark: '#E4DFD5',
          charcoal: '#141718',
          charcoalLight: '#232627',
          muted: '#6C7275',
          border: '#E8E8E3',
          borderDark: '#D1D1C7',
          // Brand accent colors derived from official Architecture Wonders logo
          teal: '#1E5762',
          tealDark: '#143E46',
          tealLight: '#EDF5F6',
          coral: '#D47A60',
          coralDark: '#B95E46',
          coralLight: '#FDF1EE',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        wideEditorial: '0.12em',
        widestEditorial: '0.22em',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'elevated': '0 12px 30px rgba(0, 0, 0, 0.06)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
