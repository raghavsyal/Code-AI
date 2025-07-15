/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'editor-text': '#d1d5db',
        'accent': '#61afef', // A nice, clear blue for highlights
        'accent-hover': '#3b82f6' // A slightly deeper blue for hover
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
      // This is our new, more professional background gradient
      backgroundImage: {
        'subtle-gradient': 'linear-gradient(145deg, #1e293b 0%, #111827 50%, #1e1b4b 100%)',
      },
      // The custom shadow for a soft "glass edge" effect
      boxShadow: {
        'glass-edge': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
}