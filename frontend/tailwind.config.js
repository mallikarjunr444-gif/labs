/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'medical-blue': '#0A1828',
        'cyan-glow': '#00F0FF',
        'deep-blue': '#1A2B42',
        'light-cyan': '#22D3EE',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 240, 255, 0.3)',
        'glow-md': '0 0 20px rgba(0, 240, 255, 0.5)',
        'glow-lg': '0 0 30px rgba(0, 240, 255, 0.7)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'xl': '40px',
      },
      animation: {
        'gradient-shift': 'gradientShift 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-fast': 'float-fast 7s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'glow-slow': 'glow-slow 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(15px)' },
        },
        glow: {
          '0%, 100%': { 'box-shadow': '0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)' },
          '50%': { 'box-shadow': '0 0 30px rgba(0, 240, 255, 0.6), 0 0 60px rgba(0, 240, 255, 0.3)' },
        },
        'glow-slow': {
          '0%, 100%': { 'box-shadow': '0 0 15px rgba(0, 240, 255, 0.3)' },
          '50%': { 'box-shadow': '0 0 25px rgba(0, 240, 255, 0.5)' },
        },
        pulseGlow: {
          '0%, 100%': { 'box-shadow': '0 0 0 0 rgba(0, 240, 255, 0.7)' },
          '50%': { 'box-shadow': '0 0 0 10px rgba(0, 240, 255, 0)' },
        },
      },
    },
  },
  plugins: [],
};
