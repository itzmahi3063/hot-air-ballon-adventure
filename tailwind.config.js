/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        tma: {
          bg: '#0c0a06',
          card: '#14120c',
          cardLight: '#1d1911',
          border: 'rgba(234, 179, 8, 0.28)',
          glow: 'rgba(234, 179, 8, 0.45)',
          purpleBg: '#0b061a',
          purpleCard: '#150d2e',
          purpleBorder: 'rgba(168, 85, 247, 0.35)',
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(234, 179, 8, 0.35)',
        'gold-sm': '0 0 10px rgba(234, 179, 8, 0.25)',
        'purple-glow': '0 0 30px rgba(217, 70, 239, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float': 'float 3s infinite ease-in-out',
        'sheen': 'sheen 3s infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(234, 179, 8, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 30px rgba(234, 179, 8, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      }
    },
  },
  plugins: [],
};
