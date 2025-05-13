module.exports = {
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#E74C3C', // Vibrant basketball orange
            dark: '#C0392B',
          },
          secondary: {
            DEFAULT: '#2C3E50', // Dark slate
            light: '#34495E',
          },
          accent: '#F39C12', // Gold for highlights
        },
        fontFamily: {
          sans: ['"Proxima Nova"', 'sans-serif'],
          title: ['"Bebas Neue"', 'sans-serif'],
        },
        animation: {
          'float': 'float 3s ease-in-out infinite',
          'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }
      },
    },
  }