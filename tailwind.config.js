/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg': {
          'base': '#0B0F14',
          'surface': '#0E141B',
          'card': 'rgba(255, 255, 255, 0.04)',
          'glass': 'rgba(255, 255, 255, 0.08)',
        },
        // Text colors
        'text': {
          'primary': '#E6F1FF',
          'secondary': '#A6B3C2',
          'muted': '#7B8794',
        },
        // Accent colors
        'accent': {
          'cyan': '#00F0FF',
          'purple': '#8A2BE2',
          'lime': '#B8FF00',
          'magenta': '#FF3AF2',
        },
        // Semantic colors
        'semantic': {
          'success': '#19F579',
          'warning': '#FFD166',
          'error': '#FF5C5C',
        },
        // Border colors
        'border': {
          'default': 'rgba(255, 255, 255, 0.08)',
          'accent': 'rgba(0, 240, 255, 0.2)',
          'glass': 'rgba(255, 255, 255, 0.12)',
        }
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.4' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.6' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'scan': 'scan 3s linear infinite',
        'matrix': 'matrix 20s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 240, 255, 0.6), 0 0 40px rgba(0, 240, 255, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        matrix: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 240, 255, 0.3)',
        'neon-lg': '0 0 40px rgba(0, 240, 255, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
        'matrix-dots': 'radial-gradient(circle, rgba(0, 240, 255, 0.3) 1px, transparent 1px)',
      },
      backgroundSize: {
        'cyber-grid': '50px 50px',
        'matrix-dots': '20px 20px',
      },
    },
  },
  plugins: [],
}
