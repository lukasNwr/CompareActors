/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      gochi: "var(--font-gochi)",
      inter: "var(--font-inter)",
      archivo: "var(--font-archivo)",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        hithere: {
          "30%": { transform: "scale(1.1)" },
          "40%, 60%": { transform: "rotate(-5deg) scale(1.1)" },
          "50%": { transform: "rotate(5deg) scale(1.1)" },
          "70%": { transform: "rotate(0deg) scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        hithere: "hithere 0.8s ease-in-out",
      },
      boxShadow: {
        solidPrimary: "2px 4px rgb(0,0,0)",
        solidPrimaryHover: "1px 2px rgb(0,0,0)",
      },
    },
  },
  plugins: [],
};
