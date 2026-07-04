/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        overcast: '#EEF1F4',
        station: '#FFFFFF',
        ink: '#1B2430',
        inkmuted: '#5B6675',
        steel: '#3D5A80',
        steeldark: '#2B4059',
        coral: '#EE6C4D',
        hairline: '#C6CDD3',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(27,36,48,0.06), 0 1px 1px 0 rgba(27,36,48,0.04)',
      },
    },
  },
  plugins: [],
}
