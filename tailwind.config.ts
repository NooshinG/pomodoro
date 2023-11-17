import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e2140",
        dark: "#151932",
        shadow: "#272b58",
        light: "#d7e0ff",
        "light-gray": "#7d82a0",
        "dark-gray": "#919098",
        highlight: "#f87070",
      },
      width: {
        clamp: "clamp(80%,10vw,40vw)",
      },
    },
  },
  plugins: [],
};
export default config;
