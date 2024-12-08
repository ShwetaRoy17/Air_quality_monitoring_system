/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        backgroundImage: {
          morning: "url('src/assets/morning.jpg')",
          afternoon: "url('src/assets/afternoon.jpg')",
          evening: "url('src/assets/eve.jpg')",
          night: "url('src/assets/night.jpg')",
        },
        colors: {
          safe: '#A8DADC',
          moderate: '#F4A261',
          unhealthy: '#E63946',
          hazardous: '#6A0572',
        }
      
    },
  },
  plugins: [],
}

