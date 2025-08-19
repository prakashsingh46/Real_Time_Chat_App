/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 2.5s infinite',
      },
    },
  },
  plugins: [daisyui],
}

