// Tailwind Play CDN config — shared by every page. Colors point at CSS
// variables (see css/custom.css) so js/theme.js can re-theme the whole
// site at runtime just by changing those variables.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        "primary-tint": "var(--primary-tint)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        canvas: "var(--bg)",
        mint: "var(--mint)",
        "mint-tint": "var(--mint-tint)",
        coral: "var(--coral)",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(23,32,51,.10)",
        softsm: "0 8px 24px rgba(23,32,51,.07)",
      },
      borderRadius: {
        xl2: "28px",
      },
    },
  },
};
