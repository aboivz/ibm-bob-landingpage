import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Carbon color tokens mapped to Tailwind
        'carbon-blue-60': '#0F62FE',
        'carbon-blue-70': '#0353E9',
        'carbon-blue-80': '#002D9C',
        'carbon-gray-100': '#161616',
        'carbon-gray-90': '#262626',
        'carbon-gray-80': '#393939',
        'carbon-gray-70': '#525252',
        'carbon-gray-60': '#6F6F6F',
        'carbon-gray-50': '#8D8D8D',
        'carbon-gray-30': '#C6C6C6',
        'carbon-gray-20': '#E0E0E0',
        'carbon-gray-10': '#F4F4F4',
        'carbon-teal-40': '#08BDBA',
        'carbon-teal-60': '#007D79',
        'carbon-yellow-30': '#F1C21B',
        'carbon-green-50': '#24A148',
        'carbon-red-60': '#DA1E28',
        'carbon-purple-60': '#8A3FFC',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        display: ['72px', { lineHeight: '1.1', fontWeight: '600' }],
        'heading-1': ['48px', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-2': ['36px', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-3': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-4': ['22px', { lineHeight: '1.35', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.5' }],
        body: ['16px', { lineHeight: '1.5' }],
        caption: ['14px', { lineHeight: '1.43' }],
        code: ['14px', { lineHeight: '1.6' }],
      },
      maxWidth: {
        content: '1312px',
      },
      spacing: {
        section: '96px',
        'section-mobile': '64px',
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
