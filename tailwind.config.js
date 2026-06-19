/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF8F3',
          50: '#FDFCF9',
          100: '#FAF8F3',
          200: '#F3EFE5',
          300: '#EAE3D2',
          400: '#DDD3BC',
        },
        sand: {
          DEFAULT: '#E8E0CC',
          light: '#F0EAD8',
        },
        // Primary brand: indigo-violet
        indigo: {
          DEFAULT: '#5552C9',
          light: '#7370E0',
          dark: '#3B38A8',
          pale: '#EEEDF9',
        },
        // Secondary: teal
        teal: {
          DEFAULT: '#1A9E7C',
          light: '#2BBF97',
          dark: '#0F6050',
          pale: '#E0F4EF',
        },
        // Keep terracotta for any legacy references
        terracotta: {
          DEFAULT: '#5552C9',
          light: '#7370E0',
          dark: '#3B38A8',
          pale: '#EEEDF9',
        },
        forest: {
          DEFAULT: '#1A9E7C',
          light: '#2BBF97',
          dark: '#0F6050',
          pale: '#E0F4EF',
        },
        ink: {
          DEFAULT: '#1A1830',
          2: '#2C2945',
          3: '#52506E',
          4: '#8280A0',
          5: '#B0AECE',
          6: '#D8D6F0',
        },
        amber: { DEFAULT: '#C4922A', pale: '#FBF3E0' },
        rose: { DEFAULT: '#C45252', pale: '#FAE8E8' },
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        md: '12px',
        lg: '16px',
        xl: '22px',
      },
    },
  },
  plugins: [],
};
