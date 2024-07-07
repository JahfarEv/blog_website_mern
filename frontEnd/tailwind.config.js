/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineClamp: {
        10:"10",
        12:"12",
      },
    },
  },
  variants:{
    extend: {
      lineClamp: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/line-clamp'),],
}

