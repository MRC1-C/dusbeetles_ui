import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      container: {
        screens: {
          sm: '640px',    // Full width on small screens and up
          md: '768px',    // Full width on medium screens and up
          lg: '1024px',   // 960px wide on large screens and up
          xl: '1280px',
        },
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false // <== disable this!
  },
}
export default config
