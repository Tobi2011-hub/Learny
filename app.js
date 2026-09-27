// Shared Learny helpers — profile storage, tiny utilities, and the
// Tailwind class strings reused by navbar.js so buttons stay consistent.
const PROFILE_KEY = "learnyUserProfile";

const getProfile = () => JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");

const saveProfile = (updates) => {
  const profile = { ...getProfile(), ...updates };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  return profile;
};

const isLoggedIn = () => Boolean(getProfile().onboardingComplete);

const goTo = (page) => {
  window.location.href = page;
};

const initials = (name = "") => name.trim().charAt(0).toUpperCase() || "L";

const BTN = {
  primary: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-bold px-6 py-3.5 min-h-[52px] transition duration-200 hover:bg-primary-dark hover:-translate-y-0.5",
  outline: "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary text-primary font-bold px-6 py-3.5 min-h-[52px] transition duration-200 hover:bg-primary hover:text-white",
  ghost: "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-line text-ink font-bold px-6 py-3.5 min-h-[52px] transition duration-200 hover:border-primary hover:text-primary",
  sm: "min-h-[42px] px-4 py-2 text-sm",
  block: "w-full",
};
