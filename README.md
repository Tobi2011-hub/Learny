# Learny — Onboarding, Landing & Upgrade Flow (Tailwind)

A clean HTML + Tailwind CSS + JavaScript (ES6) implementation of:

- **Landing page** (`index.html`) — hero, social proof bar, features, how it works, testimonials, pricing, final CTA, footer
- Onboarding Step 1 / 2 / 3, Onboarding Complete
- Upgrade / subscription page (Nigeria → Paystack, International → Stripe)
- Quiz and study-material upload placeholders

Styling is done with the **Tailwind CSS Play CDN** (no build step — just open a page in a browser) plus a small `css/custom.css` for the handful of things Tailwind can't express as utility classes: CSS variables for the theme color, keyframe animations, and the scroll-reveal base state.

## Run
Open `index.html` in a browser. Onboarding data is stored in `localStorage` under `learnyUserProfile`. (An internet connection is needed the first time, since Tailwind and the Google Font load from a CDN.)

## Structure
```
css/custom.css         CSS variables, keyframes, scroll-reveal base state
js/tailwind.config.js  shared Tailwind config (colors point at CSS variables)
js/app.js               shared profile helpers + reusable button class strings
js/theme.js              primary-color theme picker, persisted in localStorage
js/reveal.js              one shared scroll-reveal system (IntersectionObserver)
js/navbar.js               renders the navbar into #siteNav — switches to a
                           logged-in state (avatar + name + log out) once
                           onboarding is complete
js/onboarding.js         onboarding form logic
js/complete.js            confetti + personalised completion screen
js/upgrade.js              region tabs, checkout button hooks, FAQ accordion
```

## Navbar & login state
Any page with `<div id="siteNav"></div>` gets the shared navbar automatically. It shows **Log in / Get Started** for new visitors, and switches to an avatar + name + **Log out** once `learnyUserProfile.onboardingComplete` is true (i.e. right after onboarding finishes).

## Theme
A small color-swatch picker (wired up automatically wherever `.theme-picker` appears — it's in the navbar) lets a visitor switch the site's primary accent between blue, coral, mint and purple. The choice is saved to `localStorage` under `learnyTheme` and applied on every page load via CSS custom properties (`--primary`, `--primary-dark`, `--primary-tint`). Tailwind's `primary` / `primary-dark` / `primary-tint` color utilities (`bg-primary`, `text-primary`, etc. — configured in `js/tailwind.config.js`) point at those same variables, so the whole site re-themes live. Add a theme by adding an entry to the `THEMES` map in `js/theme.js`.

## Animation
Motion is intentionally restrained: a single shared scroll-reveal system (`.reveal` / `.reveal-group` + `.reveal-item`) fades content in once as it enters the viewport, hover states are quick Tailwind transform/shadow transitions, and `prefers-reduced-motion` is respected globally.

## Payment
The Upgrade page is wired for provider selection:
- Nigeria → Paystack
- Other countries → Stripe

The buttons are frontend demo hooks. Replace the marked functions in `js/upgrade.js` with your real Paystack/Stripe checkout flow and never expose secret API keys in browser JavaScript.
