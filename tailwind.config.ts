import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        caixa: {
          blue: "#0072CE",
          navy: "#002B5C",
          sky: "#E8F4FF",
          yellow: "#FFCC00",
          ink: "#102033"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 43, 92, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
