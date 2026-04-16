// ── Testimonials ──────────────────────────────────────────────────────────────
const testimonialsScroll = document.getElementById("testimonials-scroll");
const testimonialsPrev = document.getElementById("testimonials-prev");
const testimonialsNext = document.getElementById("testimonials-next");

if (testimonialsScroll && testimonialsPrev && testimonialsNext) {
  function getCardsToSkip() {
    return window.innerWidth < 768 ? 1 : 3;
  }

  function getScrollAmount() {
    const cardsToSkip = getCardsToSkip();
    return (
      (testimonialsScroll.querySelector(".flex > div")?.offsetWidth + 32 ||
        320 + 32) * cardsToSkip
    );
  }

  testimonialsPrev.addEventListener("click", () => {
    testimonialsScroll.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });
  testimonialsNext.addEventListener("click", () => {
    testimonialsScroll.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });
}

if (testimonialsScroll) {
  const testimonialCards = testimonialsScroll.querySelectorAll(".snap-start");
  const indicatorsContainer = document.getElementById("testimonial-indicators-container");

  function isMobile() {
    return window.innerWidth < 768;
  }

  function createIndicators() {
    indicatorsContainer.innerHTML = "";

    const isMobileView = isMobile();
    const cardsPerPage = 3;
    const numIndicators = isMobileView
      ? testimonialCards.length
      : Math.ceil(testimonialCards.length / cardsPerPage);

    for (let i = 0; i < numIndicators; i++) {
      const button = document.createElement("button");
      button.className = "testimonial-indicator w-3 h-3 rounded-full transition";
      button.setAttribute(isMobileView ? "data-card" : "data-page", i);
      button.classList.add(i === 0 ? "bg-red-500" : "bg-gray-300");
      if (i !== 0) button.classList.add("hover:bg-gray-400");
      indicatorsContainer.appendChild(button);
    }
  }

  function updateTestimonialIndicators() {
    if (!testimonialCards[0]) return;

    const isMobileView = isMobile();
    const cardsPerPage = 3;
    const scrollLeft = testimonialsScroll.scrollLeft;
    const cardWidth = testimonialCards[0].offsetWidth;
    const gap = 32;

    let currentIndicator;
    if (isMobileView) {
      currentIndicator = Math.round(scrollLeft / (cardWidth + gap));
      currentIndicator = Math.max(0, Math.min(currentIndicator, testimonialCards.length - 1));
    } else {
      const pageScrollAmount = (cardWidth + gap) * cardsPerPage;
      currentIndicator = Math.round(scrollLeft / pageScrollAmount);
      const numPages = Math.ceil(testimonialCards.length / cardsPerPage);
      currentIndicator = Math.max(0, Math.min(currentIndicator, numPages - 1));
    }

    document.querySelectorAll(".testimonial-indicator").forEach((indicator, i) => {
      indicator.classList.toggle("bg-red-500", i === currentIndicator);
      indicator.classList.toggle("bg-gray-300", i !== currentIndicator);
      indicator.classList.toggle("hover:bg-gray-400", i !== currentIndicator);
    });
  }

  function attachIndicatorListeners() {
    document.querySelectorAll(".testimonial-indicator").forEach((indicator) => {
      indicator.addEventListener("click", () => {
        const cardWidth = testimonialCards[0]?.offsetWidth || 320;
        const gap = 32;
        let scrollPosition;

        if (isMobile()) {
          const card = parseInt(indicator.getAttribute("data-card"));
          scrollPosition = card * (cardWidth + gap);
        } else {
          const page = parseInt(indicator.getAttribute("data-page"));
          scrollPosition = page * (cardWidth + gap) * 3;
        }

        testimonialsScroll.scrollTo({ left: scrollPosition, behavior: "smooth" });
      });
    });
  }

  createIndicators();
  attachIndicatorListeners();
  testimonialsScroll.addEventListener("scroll", updateTestimonialIndicators);
  window.addEventListener("resize", () => {
    createIndicators();
    attachIndicatorListeners();
    updateTestimonialIndicators();
  });
  updateTestimonialIndicators();
}
