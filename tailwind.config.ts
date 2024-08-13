import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        x: { DEFAULT: colors.black, 400: colors.stone[900] },
        facebook: { DEFAULT: '#4267B2', 600: '#35528E' },
        linkedin: { DEFAULT: '#0077B5', 600: '#005C8E' },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  // in principle should disable tailwind base styles so they don't override mantine, but current setup looks okay, so leaving it
  // corePlugins: {
  //   preflight: false,
  // }
};
export default config;
