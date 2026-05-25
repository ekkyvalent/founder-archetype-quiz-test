import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Aspire brand palette
        mint: '#BEFFCF',
        'mint-tint': '#BEFFCF',
        'near-black': '#181818',
        charcoal: '#3C3C3C',
        cloud: '#F0F0EB',
      },
      fontFamily: {
        display: ['Satoshi', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
