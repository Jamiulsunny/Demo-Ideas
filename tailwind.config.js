/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mission: {
          950: "#06080d",
          900: "#0b0f16",
          800: "#111823",
          700: "#1a2431",
          600: "#263548",
          cyan: "#65e8ff",
          amber: "#ffc857",
          green: "#62f2a2",
          red: "#ff6b6b"
        }
      },
      boxShadow: {
        glow: "0 0 24px rgba(101,232,255,.18)",
        amber: "0 0 24px rgba(255,200,87,.16)"
      }
    }
  },
  plugins: []
};