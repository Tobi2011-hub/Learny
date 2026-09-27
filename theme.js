// Lets a visitor change the site's primary accent colour. Persisted in
// localStorage so it follows them across every page. Tailwind's
// `primary` / `primary-dark` / `primary-tint` colors point at these CSS
// variables, so changing the variables re-themes every Tailwind class.
const THEME_KEY = "learnyTheme";

const THEMES = {
  blue:   { primary: "#2563eb", dark: "#1d4ed8", tint: "#eaf1ff" },
  coral:  { primary: "#ff6b5f", dark: "#ea4f42", tint: "#ffece9" },
  mint:   { primary: "#0f9d68", dark: "#0c7c53", tint: "#e3f8ee" },
  purple: { primary: "#7c3aed", dark: "#6425d0", tint: "#f1e9ff" },
};

const applyTheme = (name) => {
  const theme = THEMES[name] || THEMES.blue;
  const root = document.documentElement.style;
  root.setProperty("--primary", theme.primary);
  root.setProperty("--primary-dark", theme.dark);
  root.setProperty("--primary-tint", theme.tint);
  document.querySelectorAll(".theme-swatch").forEach((swatch) => {
    swatch.classList.toggle("active", swatch.dataset.theme === name);
  });
};

const setTheme = (name) => {
  localStorage.setItem(THEME_KEY, name);
  applyTheme(name);
};

const getTheme = () => localStorage.getItem(THEME_KEY) || "blue";

const wireThemePicker = () => {
  document.querySelectorAll(".theme-picker").forEach((picker) => {
    picker.innerHTML = Object.keys(THEMES)
      .map((name) => `<button type="button" class="theme-swatch" data-theme="${name}" style="background:${THEMES[name].primary}" aria-label="${name} theme"></button>`)
      .join("");
  });
  applyTheme(getTheme());
  document.querySelectorAll(".theme-swatch").forEach((swatch) => {
    swatch.addEventListener("click", () => setTheme(swatch.dataset.theme));
  });
};

applyTheme(getTheme());
document.addEventListener("DOMContentLoaded", wireThemePicker);
