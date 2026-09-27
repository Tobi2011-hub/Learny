// Subscription page logic — vanilla JS, no framework dependency.
const upgradeProfile = getProfile();
const region = upgradeProfile.country === "Nigeria" || !upgradeProfile.country ? "Nigeria" : "International";

const tabs = { Nigeria: document.querySelector("#nigeria-tab"), International: document.querySelector("#international-tab") };
const panels = { Nigeria: document.querySelector("#nigeria"), International: document.querySelector("#international") };

const showRegion = (name) => {
  Object.keys(tabs).forEach((key) => {
    tabs[key]?.classList.toggle("active", key === name);
    if (panels[key]) panels[key].classList.toggle("hidden", key !== name);
  });
  localStorage.setItem("learnyPricingRegion", name);
};

showRegion(region);
Object.entries(tabs).forEach(([name, tab]) => tab?.addEventListener("click", () => showRegion(name)));

// Frontend checkout hooks — replace with a real server-side checkout call.
document.querySelectorAll("[data-payment]").forEach((button) => {
  button.addEventListener("click", () => {
    const { payment: provider, plan } = button.dataset;
    const label = provider === "paystack" ? "Paystack" : "Stripe";
    alert(`${label} checkout selected for ${plan}. Connect your ${label} integration here.`);
    console.log({ provider, plan, region: button.dataset.region, profile: getProfile() });
  });
});

// Simple accordion for the FAQ.
document.querySelectorAll("#faqAccordion .accordion-header button").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".accordion-item").classList.toggle("open");
  });
});
