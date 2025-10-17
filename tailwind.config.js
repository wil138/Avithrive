/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Keep explicit merienda token
        merienda: ['Merienda', 'var(--font-sans)'],
      },
    },
    // Set the project's default sans to Merienda so `font-sans` maps to Merienda
    fontFamily: {
      sans: ['Merienda', 'var(--font-sans)'],
    },
  },
  plugins: [],
}
