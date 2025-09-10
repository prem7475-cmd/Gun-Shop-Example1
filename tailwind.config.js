/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        black: '#000000',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 5s infinite alternate',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'blood-drip': 'blood-drip 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glitch: {
          '0%, 100%': { 
            textShadow: '0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 20px #ff0000' 
          },
          '20%': { textShadow: '-2px 0 #ff0000' },
          '40%': { textShadow: '2px 0 #ff0000' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
        'blood-drip': {
          '0%': { height: '0', opacity: '0' },
          '10%': { height: '10px', opacity: '0.8' },
          '80%': { height: '70px', opacity: '0.7' },
          '100%': { height: '100px', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
