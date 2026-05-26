/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'medical-blue': '#FFFFFF',
        'cyan-glow': '#0EA5E9',
        'deep-blue': '#F3F4F6',
        'light-cyan': '#E0F2FE',
        'surface': '#FFFFFF',
        'surface-2': '#F9FAFB',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'accent-blue': '#0369A1',
        'accent-light': '#E0F2FE',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'glow-md': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'glow-lg': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'glow-xl': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
        'glass': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'premium': '0 10px 25px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 20px 25px rgba(0, 0, 0, 0.1), 0 0px 0px rgba(3, 105, 161, 0)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.5)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
        'spin-slower': 'spin-slow 40s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'blob': 'blob 8s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'scan-line': 'scan-line 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-up': 'slide-up 0.7s ease-out forwards',
        'border-glow': 'border-glow 4s linear infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { 'box-shadow': '0 10px 15px rgba(0, 0, 0, 0.08)' },
          '50%': { 'box-shadow': '0 20px 25px rgba(0, 0, 0, 0.12)' },
        },
        'pulse-glow': {
          '0%, 100%': { 'box-shadow': '0 0 0 0 rgba(3, 105, 161, 0.5)' },
          '50%': { 'box-shadow': '0 0 0 10px rgba(3, 105, 161, 0)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        blob: {
          '0%, 100%': { 'border-radius': '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { 'border-radius': '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'border-glow': {
          '0%, 100%': { 'border-color': 'rgba(0, 240, 255, 0.2)' },
          '50%': { 'border-color': 'rgba(0, 240, 255, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
