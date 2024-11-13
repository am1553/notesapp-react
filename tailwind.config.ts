import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          "50": "rgb(245, 247, 250)",
          "100": "rgb(243, 245, 248)",
          "200": "rgb(224, 228, 234)",
          "300": "rgb(202, 207, 216)",
          "400": "rgb(153, 160, 174)",
          "500": "rgb(113, 119, 132)",
          "600": "rgb(82, 88, 102)",
          "700": "rgb(43, 48, 59)",
          "800": "rgb(35, 37, 48)",
          "900": "rgb(25, 27, 37)",
          "950": "rgb(14, 18, 27)",
        },
        blue: {
          "50": "rgb(235, 241, 255)",
          "500": "rgb(51, 92, 255)",
          "700": "rgb(37, 71, 208)",
        },
        green: {
          "100": "rgb(209, 251, 233)",
          "500": "rgb(33, 193, 107)",
        },
        red: {
          "100": "rgb(255, 213, 216)",
          "500": "rgb(251, 55, 72)",
        },
      },
      fontSize: {
        "preset-1": ["24px", { lineHeight: "120%", letterSpacing: "-0.5px" }],
        "preset-2": ["20px", { lineHeight: "120%", letterSpacing: "-0.5px" }],
        "preset-3": ["16px", { lineHeight: "120%", letterSpacing: "-0.3px" }],
        "preset-4": ["14px", { lineHeight: "120%", letterSpacing: "-0.2px" }],
        "preset-6": ["12px", { lineHeight: "120%", letterSpacing: "-0.2px" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
