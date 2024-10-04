/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,jsx,ts,tsx}", // Add this line
  ],
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      'xxl': '1400px',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

