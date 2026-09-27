// Renders the site navbar into any element with id="siteNav". Shows a
// marketing nav to signed-out visitors and a logged-in nav (avatar +
// name) once onboarding is complete.
const renderNavbar = () => {
  const mount = document.querySelector("#siteNav");
  if (!mount) return;

  const profile = getProfile();
  const loggedIn = isLoggedIn();

  const links = `
    <ul class="hidden md:flex items-center gap-7 list-none m-0 p-0">
      <li><a class="text-muted font-semibold text-sm hover:text-ink transition" href="index.html#features">Features</a></li>
      <li><a class="text-muted font-semibold text-sm hover:text-ink transition" href="index.html#how-it-works">How it works</a></li>
      <li><a class="text-muted font-semibold text-sm hover:text-ink transition" href="index.html#pricing">Pricing</a></li>
      <li><a class="text-muted font-semibold text-sm hover:text-ink transition" href="index.html#testimonials">Reviews</a></li>
    </ul>`;

  const actions = loggedIn
    ? `<div class="flex items-center gap-2.5 py-1.5 pl-1.5 pr-3.5 rounded-full bg-canvas border border-line">
         <span class="w-8 h-8 rounded-full bg-primary text-white grid place-items-center font-extrabold text-sm">${initials(profile.firstName)}</span>
         <span class="font-bold text-sm">${profile.firstName || "Learner"}</span>
       </div>
       <button class="${BTN.ghost} ${BTN.sm}" id="logoutBtn" type="button">Log out</button>`
    : `<a class="${BTN.ghost} ${BTN.sm}" href="onboarding-step-1.html">Log in</a>
       <a class="${BTN.primary} ${BTN.sm}" href="onboarding-step-1.html">Get Started</a>`;

  mount.innerHTML = `
    <nav class="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-line">
      <div class="w-[92%] max-w-[1160px] mx-auto min-h-[72px] flex items-center justify-between gap-5">
        <a class="flex items-center gap-2.5 font-extrabold text-lg tracking-tight text-ink" href="index.html">
          <span class="w-9 h-9 rounded-xl grid place-items-center bg-primary-tint text-base">🎓</span>
          <span>Learny</span>
        </a>
        ${links}
        <div class="flex items-center gap-3">
          <div class="theme-picker flex items-center gap-1.5"></div>
          ${actions}
        </div>
        <button class="md:hidden text-2xl bg-transparent border-0 cursor-pointer" aria-label="Menu">☰</button>
      </div>
    </nav>`;

  document.querySelector("#logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem(PROFILE_KEY);
    goTo("index.html");
  });

  wireThemePicker();
};

document.addEventListener("DOMContentLoaded", renderNavbar);
