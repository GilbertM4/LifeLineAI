// Mobile nav toggle
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
    }
  });
}

// Pricing toggle
const toggleButtons = document.querySelectorAll(".billing-toggle .toggle-btn");
const priceAmounts = document.querySelectorAll(".price-amount");
const planAltPrices = document.querySelectorAll(".plan-alt-price span[data-period]");

const pricingTable = {
  monthly: {
    free: "£0",
    individual: "£4.99",
    family: "£9.99",
    premium: "£14.99"
  },
  yearly: {
    free: "£0",
    individual: "£49.99",
    family: "£99.99",
    premium: "£149.99"
  }
};

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const period = btn.dataset.billing;

    toggleButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Update main price
    priceAmounts.forEach((el) => {
      const plan = el.dataset.plan;
      el.textContent = pricingTable[period][plan];
    });

    // Update small alt price text
    planAltPrices.forEach((el) => {
      const parentPlan = el.closest(".plan-alt-price").dataset.plan;
      if (period === "monthly") {
        // show yearly price text in alt label
        el.textContent = `${pricingTable.yearly[parentPlan]} GBP / year`;
      } else {
        el.textContent = `${pricingTable.monthly[parentPlan]} GBP / month`;
      }
    });
  });
});

// Plan buttons scroll & record choice
const planButtons = document.querySelectorAll(".plan-cta");
const selectedPlanInput = document.getElementById("selected-plan");

planButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const planName = btn.dataset.planName || "";
    if (selectedPlanInput) selectedPlanInput.value = planName;

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Terms acceptance
const acceptTermsBtn = document.getElementById("accept-terms-btn");
const termsStatus = document.getElementById("terms-status");

if (acceptTermsBtn && termsStatus) {
  acceptTermsBtn.addEventListener("click", () => {
    termsStatus.textContent = "Thanks! Your acceptance has been recorded for this session.";
  });
}

// Contact form fake submit
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name") || "there";
    const plan = formData.get("selectedPlan");

    let message = `Thanks, ${name}! We’ve received your message and will get back to you soon.`;
    if (plan) {
      message += ` We’ll also include details on the ${plan}.`;
    }

    formStatus.textContent = message;
    contactForm.reset();
    selectedPlanInput.value = "";
  });
}

// Video modal
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
  // Stop video playback by resetting src
  if (videoIframe) {
    const src = videoIframe.getAttribute("src");
    videoIframe.setAttribute("src", src);
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

// Make hero download button scroll to download section (in case user changes ID)
const heroDownloadBtn = document.getElementById("hero-download-btn");
if (heroDownloadBtn) {
  heroDownloadBtn.addEventListener("click", (e) => {
    // let normal anchor behaviour handle if href is #download
    const href = heroDownloadBtn.getAttribute("href");
    if (href && href.startsWith("#")) {
      // nothing extra
    }
  });
}
