import type { Config } from "tailwindcss";
import forms from '@tailwindcss/forms';
import { content, plugin } from 'flowbite-react/tailwind'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    forms,
    plugin(),
  ],
};
export default config;
