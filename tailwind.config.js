/** @type {import('tailwindcss').Config} */
// import defaultTheme from "tailwindcss/defaultTheme"

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // fontFamily: {
    //   sans: ["Poppins", ...defaultTheme.fontFamily.sans],
    // },
    extend: {
      colors: {
        blue: {
          500: '#478CCA',
          600: '#295F9A',
        },
        // background: 'hsl(var(--background))',
        // foreground: 'hsl(var(--foreground))',
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))',
        },
      },
      screens: {
        xs: '400px',
        '3xl': '1680px',
        '4xl': '2200px',
      },
      maxWidth: {
        '10xl': '1512px',
      },
    },
  },
  plugins: [require("daisyui")],
}
