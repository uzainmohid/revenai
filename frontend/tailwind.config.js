/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rv: {
          base:   "#07090F",
          s1:     "#0B0F1A",
          s2:     "#0F1526",
          s3:     "#141C30",
          s4:     "#1A2440",
          border: "#1E2D48",
          b2:     "#263550",
          muted:  "#2E4060",
          dim:    "#486080",
          sub:    "#6A85A8",
          text:   "#C2D4EE",
          bright: "#E4EEFF",
          blue:   "#3B82F6",
          blu2:   "#2563EB",
          indigo: "#6366F1",
          red:    "#F87171",
          amber:  "#FBBF24",
          green:  "#34D399",
          teal:   "#2DD4BF",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      keyframes: {
        fadeUp:  { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn:  { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        shimmer: { "0%": { backgroundPosition: "-600px 0" }, "100%": { backgroundPosition: "600px 0" } },
        spinIt:  { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        pulseO:  { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.25" } },
        pingO:   { "75%,100%": { transform: "scale(2)", opacity: "0" } },
      },
      animation: {
        "fade-up": "fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fadeIn 0.3s ease both",
        shimmer:   "shimmer 1.8s linear infinite",
        spin:      "spinIt 0.75s linear infinite",
        pulse:     "pulseO 2.5s ease infinite",
        ping:      "pingO 1.4s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};
