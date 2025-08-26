/** @type {import('tailwindcss').Config} */
module.exports = {
  // ⬇️ WAJIB agar toggle kelas .dark/.light di React bekerja
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html" // opsional, aman ditambahkan
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
