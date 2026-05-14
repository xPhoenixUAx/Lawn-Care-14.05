(function () {
  const config = window.SITE_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function hydrateConfig() {
    const values = {
      "company-name": config.companyName,
      "phone-text": config.phoneDisplay,
      "email-text": config.email,
      "company-id": config.companyId,
      "company-address": [config.addressLine1, config.addressLine2].filter(Boolean).join(" | "),
      "footer-text-primary": config.footerTextPrimary,
      "footer-text-secondary": config.footerTextSecondary,
      "disclaimer-short": config.disclaimerShort,
      "disclaimer-full": config.disclaimerFull,
      "business-hours": config.businessHours,
      "service-area": config.serviceArea,
      "cta-primary": config.ctaPrimary,
      "cta-secondary": config.ctaSecondary
    };

    Object.entries(values).forEach(([key, value]) => {
      $$(`[data-${key}]`).forEach((node) => {
        node.textContent = value || "";
      });
    });

    $$("[data-phone-link]").forEach((node) => node.setAttribute("href", `tel:${config.phone || ""}`));
    $$("[data-email-link]").forEach((node) => node.setAttribute("href", `mailto:${config.email || ""}`));
    $$("[data-current-year]").forEach((node) => {
      node.textContent = String(new Date().getFullYear());
    });
  }

  function buildFooter() {
    const footer = $("[data-site-footer]");
    if (!footer) return;

    footer.innerHTML = `
      <div class="footer__inner">
        <div class="footer__brand">
          <a class="brand brand--footer" href="index.html" aria-label="${config.companyName || "Home"}">
            <span class="brand__mark">VY</span>
            <span data-company-name></span>
          </a>
          <p data-footer-text-primary></p>
          <p class="footer__muted" data-footer-text-secondary></p>
        </div>
        <nav class="footer__nav" aria-label="Footer navigation">
          <a href="services.html">Services</a>
          <a href="mowing-edging.html">Mowing & Edging</a>
          <a href="service-detail.html">Turf Programs</a>
          <a href="seasonal-cleanup.html">Seasonal Cleanup</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
        </nav>
        <div class="footer__contact">
          <a data-phone-link data-phone-text></a>
          <a data-email-link data-email-text></a>
          <span data-business-hours></span>
          <span data-company-address></span>
        </div>
        <div class="footer__legal">
          <p data-disclaimer-short></p>
          <div class="footer__legal-links">
            <a href="privacy.html">Privacy</a>
            <a href="terms.html">Terms</a>
            <a href="cookie.html">Cookies</a>
          </div>
          <p>Company ID: <span data-company-id></span>. &copy; <span data-current-year></span> <span data-company-name></span>. <span data-footer-copyright>${config.copyrightLine || ""}</span></p>
        </div>
      </div>
    `;
    hydrateConfig();
  }

  function initHeader() {
    const header = $(".site-header");
    const menuButton = $(".menu-toggle");
    const mobileMenu = $("#mobile-menu");
    const closeButton = $(".mobile-menu__close");
    if (!header || !menuButton || !mobileMenu) return;

    const setScrolled = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });

    const openMenu = () => {
      document.body.classList.add("menu-open");
      mobileMenu.classList.add("is-open");
      mobileMenu.setAttribute("aria-hidden", "false");
      menuButton.setAttribute("aria-expanded", "true");
      const firstLink = mobileMenu.querySelector("a, button");
      if (firstLink) firstLink.focus();
    };

    const closeMenu = () => {
      document.body.classList.remove("menu-open");
      mobileMenu.classList.remove("is-open");
      mobileMenu.setAttribute("aria-hidden", "true");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.focus();
    };

    menuButton.addEventListener("click", openMenu);
    if (closeButton) closeButton.addEventListener("click", closeMenu);
    $$("a", mobileMenu).forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) closeMenu();
    });
  }

  function initAccordions() {
    $$(".faq-item").forEach((item) => {
      const button = $(".faq-item__question", item);
      const answer = $(".faq-item__answer", item);
      if (!button || !answer) return;
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        answer.hidden = expanded;
      });
    });
  }

  function initReveal() {
    const items = $$("[data-reveal]");
    if (!("IntersectionObserver" in window) || !items.length) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    items.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    items.forEach((item) => observer.observe(item));
  }

  function initContactForm() {
    const form = $(".contact-form");
    const modal = $(".form-modal");
    if (!form || !modal) return;
    const close = $(".form-modal__close", modal);
    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    };
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      form.reset();
      if (close) close.focus();
    });
    if (close) {
      close.addEventListener("click", closeModal);
    }
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  function initMobileActions() {
    const actions = $(".mobile-actions");
    if (!actions) return;
    const toggle = () => actions.classList.toggle("is-visible", window.scrollY > 360 && !document.body.classList.contains("menu-open"));
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
  }

  function initTestimonialSwiper() {
    const swiper = $("[data-testimonial-swiper]");
    if (!swiper) return;
    const track = $(".testimonial-swiper__track", swiper);
    const cards = $$(".testimonial-card", swiper);
    const prev = $("[data-testimonial-prev]", swiper);
    const next = $("[data-testimonial-next]", swiper);
    if (!track || !cards.length || !prev || !next) return;

    let index = 0;
    const visibleCount = () => window.matchMedia("(max-width: 860px)").matches ? 1 : 3;
    const maxIndex = () => Math.max(0, cards.length - visibleCount());
    const update = () => {
      index = Math.min(Math.max(index, 0), maxIndex());
      const step = cards[0].getBoundingClientRect().width + 16;
      track.style.transform = `translateX(${-index * step}px)`;
      prev.disabled = false;
      next.disabled = false;
    };

    prev.addEventListener("click", () => {
      index -= visibleCount();
      if (index < 0) index = maxIndex();
      update();
    });
    next.addEventListener("click", () => {
      index += visibleCount();
      if (index > maxIndex()) index = 0;
      update();
    });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildFooter();
    hydrateConfig();
    if (window.lucide) window.lucide.createIcons();
    initHeader();
    initAccordions();
    initReveal();
    initContactForm();
    initMobileActions();
    initTestimonialSwiper();
  });
})();
