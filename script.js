console.log("✅ script.js is loaded");
// ----- Basic Page Switching -----

const pages = document.querySelectorAll("[data-page]");
const navLinks = document.querySelectorAll(".nav-link");

// show one “page” and hide the rest
function showPage(name) {
  pages.forEach((section) => {
    section.classList.toggle("active", section.dataset.page === name);
  });

  navLinks.forEach((link) => {
    const target = link.dataset.pageTarget;
    link.classList.toggle("active", target === name);
  });

  window.scrollTo({ top: 0, behavior: "auto" });
}

// hook up anything with data-page-target (nav items, buttons, footer links, logo)
document.querySelectorAll("[data-page-target]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const target = el.dataset.pageTarget;
    if (!target) return;
    showPage(target);

    // close mobile menu if open
    if (nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
    }
  });
});

// ----- Mobile nav toggle -----

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// ----- Pricing toggle -----

const toggleButtons = document.querySelectorAll(".billing-toggle .toggle-btn");
const priceAmounts = document.querySelectorAll(".price-amount");
const planAltPrices = document.querySelectorAll(".plan-alt-price span[data-period]");

const pricingTable = {
  monthly: { free: "£0", individual: "£4.99", family: "£9.99", premium: "£14.99" },
  yearly: { free: "£0", individual: "£49.99", family: "£99.99", premium: "£149.99" }
};

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const period = btn.dataset.billing;

    toggleButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    priceAmounts.forEach((el) => {
      const plan = el.dataset.plan;
      el.textContent = pricingTable[period][plan];
    });

    planAltPrices.forEach((el) => {
      const parentPlan = el.closest(".plan-alt-price").dataset.plan;
      if (period === "monthly") {
        el.textContent = `${pricingTable.yearly[parentPlan]} GBP / year`;
      } else {
        el.textContent = `${pricingTable.monthly[parentPlan]} GBP / month`;
      }
    });
  });
});

// ----- Plan buttons -> Contact page & pre-fill hidden input -----

const planButtons = document.querySelectorAll(".plan-cta");
const selectedPlanInput = document.getElementById("selected-plan");

planButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const planName = btn.dataset.planName || "";
    if (selectedPlanInput) selectedPlanInput.value = planName;
    showPage("contact");
  });
});

// ----- Terms acceptance -----

const acceptTermsBtn = document.getElementById("accept-terms-btn");
const termsStatus = document.getElementById("terms-status");

if (acceptTermsBtn && termsStatus) {
  acceptTermsBtn.addEventListener("click", () => {
    termsStatus.textContent = "Thanks! Your acceptance has been recorded for this session.";
  });
}

// ----- Contact form (fake submit) -----

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name") || "there";
    const plan = formData.get("selectedPlan");

    let message = `Thanks, ${name}! We’ve received your message and will get back to you soon.`;
    if (plan) message += ` We’ll also include details on the ${plan}.`;

    formStatus.textContent = message;
    contactForm.reset();
    if (selectedPlanInput) selectedPlanInput.value = "";
  });
}

// ----- Video modal -----

const videoTrigger = document.getElementById("demo-video-trigger");
const videoModal = document.getElementById("video-modal");
const videoClose = document.getElementById("video-modal-close");
const videoIframe = document.getElementById("demo-video");

const openModal = () => {
  if (!videoModal) return;
  videoModal.classList.add("open");
  videoModal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  if (!videoModal) return;
  videoModal.classList.remove("open");
  videoModal.setAttribute("aria-hidden", "true");
  if (videoIframe) {
    const src = videoIframe.getAttribute("src");
    videoIframe.setAttribute("src", src); // reset to stop video
  }
};

if (videoTrigger && videoModal) {
  videoTrigger.addEventListener("click", openModal);
  videoTrigger.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal();
    }
  });
}

if (videoClose) {
  videoClose.addEventListener("click", closeModal);
}

if (videoModal) {
  videoModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      closeModal();
    }
  });
}

// ----- Default page on load -----

showPage("home");
