// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Gallery Carousel
// To add or remove images, edit this array:
const EQUIPMENT_IMAGES = [
  {
    src: "images/equipment/WhatsApp Image 2026-04-15 at 13.21.28.jpeg",
    alt: "Echipamente sala",
  },
  {
    src: "images/equipment/WhatsApp Image 2026-04-15 at 13.22.18.jpeg",
    alt: "Echipamente sala",
  },
  { src: "images/equipment/eqp.jpg", alt: "Echipamente Power Plate" },
  {
    src: "images/equipment/WhatsApp Image 2026-04-15 at 13.24.55.jpeg",
    alt: "Echipamente sala",
  },
  {
    src: "images/equipment/WhatsApp Image 2026-04-15 at 13.24.55 (1).jpeg",
    alt: "Echipamente sala",
  },
  {
    src: "images/equipment/WhatsApp Image 2026-04-15 at 13.24.56.jpeg",
    alt: "Echipamente sala",
  },
];

const TOTAL_IMAGES = EQUIPMENT_IMAGES.length;
let currentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let carouselIndicators = [];

const carouselWrapper = document.getElementById("carousel-wrapper");
const prevBtn = document.getElementById("carousel-prev");
const nextBtn = document.getElementById("carousel-next");

// Build carousel images
EQUIPMENT_IMAGES.forEach((imgData, i) => {
  const el = document.createElement("img");
  el.id = `carousel-img-${i}`;
  el.src = imgData.src;
  el.alt = imgData.alt;
  el.className = `absolute inset-0 w-full h-full object-contain transition-opacity duration-300 cursor-pointer ${i === 0 ? "opacity-100" : "opacity-0"}`;
  carouselWrapper.appendChild(el);
});

// Build indicators
const indicatorsContainer = document.getElementById("carousel-indicators");
EQUIPMENT_IMAGES.forEach((_, i) => {
  const btn = document.createElement("button");
  btn.id = `indicator-${i}`;
  btn.className = `carousel-indicator w-3 h-3 rounded-full transition ${i === 0 ? "bg-red-500" : "bg-gray-300 hover:bg-gray-400"}`;
  btn.setAttribute("data-index", i);
  btn.addEventListener("click", () => showImage(i));
  indicatorsContainer.appendChild(btn);
});

carouselIndicators = Array.from(
  document.querySelectorAll(".carousel-indicator"),
);

function showImage(index) {
  if (index < 0) index = TOTAL_IMAGES - 1;
  if (index >= TOTAL_IMAGES) index = 0;
  currentImageIndex = index;

  for (let i = 0; i < TOTAL_IMAGES; i++) {
    const img = document.getElementById(`carousel-img-${i}`);
    if (i === index) {
      img.classList.remove("opacity-0");
      img.classList.add("opacity-100");
    } else {
      img.classList.add("opacity-0");
      img.classList.remove("opacity-100");
    }
  }

  carouselIndicators.forEach((indicator, i) => {
    if (i === index) {
      indicator.classList.remove("bg-gray-300", "hover:bg-gray-400");
      indicator.classList.add("bg-red-500");
    } else {
      indicator.classList.add("bg-gray-300", "hover:bg-gray-400");
      indicator.classList.remove("bg-red-500");
    }
  });
}

function nextImage() {
  showImage(currentImageIndex + 1);
}
function prevImage() {
  showImage(currentImageIndex - 1);
}

nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Touch/Swipe
carouselWrapper.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  false,
);
carouselWrapper.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  false,
);

function handleSwipe() {
  const threshold = 50;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > threshold) {
    diff > 0 ? nextImage() : prevImage();
  }
}

// Image Lightbox / Full-size Image Viewer
const lightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

// Open lightbox on carousel click
carouselWrapper.addEventListener("click", () => {
  lightboxImage.src = EQUIPMENT_IMAGES[currentImageIndex].src;
  lightbox.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

function closeLightbox() {
  lightbox.classList.add("hidden");
  document.body.style.overflow = "auto";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.classList.contains("hidden"))
    closeLightbox();
});

// Testimonials navigation
const testimonialsScroll = document.getElementById("testimonials-scroll");
const testimonialsPrev = document.getElementById("testimonials-prev");
const testimonialsNext = document.getElementById("testimonials-next");

if (testimonialsScroll && testimonialsPrev && testimonialsNext) {
  function getCardsToSkip() {
    return window.innerWidth < 768 ? 1 : 3; // 768px is md breakpoint
  }

  function getScrollAmount() {
    const cardsToSkip = getCardsToSkip();
    return (
      (testimonialsScroll.querySelector(".flex > div")?.offsetWidth + 32 ||
        320 + 32) * cardsToSkip
    );
  }

  testimonialsPrev.addEventListener("click", () => {
    testimonialsScroll.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  });
  testimonialsNext.addEventListener("click", () => {
    testimonialsScroll.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  });
}

// Testimonials indicators - Responsive (dots per card on mobile, pages on desktop)
if (testimonialsScroll) {
  const testimonialCards = testimonialsScroll.querySelectorAll(".snap-start");
  const indicatorsContainer = document.getElementById(
    "testimonial-indicators-container",
  );

  function isMobile() {
    return window.innerWidth < 768; // 768px is md breakpoint
  }

  function createIndicators() {
    indicatorsContainer.innerHTML = ""; // Clear existing indicators

    const isMobileView = isMobile();
    const cardsPerPage = 3;
    let numIndicators;

    if (isMobileView) {
      numIndicators = testimonialCards.length; // One dot per card
    } else {
      numIndicators = Math.ceil(testimonialCards.length / cardsPerPage); // Pages
    }

    // Create indicators
    for (let i = 0; i < numIndicators; i++) {
      const button = document.createElement("button");
      button.className =
        "testimonial-indicator w-3 h-3 rounded-full transition";
      if (isMobileView) {
        button.setAttribute("data-card", i);
      } else {
        button.setAttribute("data-page", i);
      }
      button.classList.add(i === 0 ? "bg-red-500" : "bg-gray-300");
      if (i !== 0) button.classList.add("hover:bg-gray-400");
      indicatorsContainer.appendChild(button);
    }
  }

  createIndicators();

  function updateTestimonialIndicators() {
    if (!testimonialsScroll || !testimonialCards[0]) return;

    const isMobileView = isMobile();
    const cardsPerPage = 3;
    const scrollLeft = testimonialsScroll.scrollLeft;
    const cardWidth = testimonialCards[0].offsetWidth;
    const gap = 32;

    let currentIndicator;

    if (isMobileView) {
      // On mobile: one indicator per card
      currentIndicator = Math.round(scrollLeft / (cardWidth + gap));
      currentIndicator = Math.max(
        0,
        Math.min(currentIndicator, testimonialCards.length - 1),
      );
    } else {
      // On desktop: indicators for pages (3 cards per page)
      const pageScrollAmount = (cardWidth + gap) * cardsPerPage;
      currentIndicator = Math.round(scrollLeft / pageScrollAmount);
      const numPages = Math.ceil(testimonialCards.length / cardsPerPage);
      currentIndicator = Math.max(0, Math.min(currentIndicator, numPages - 1));
    }

    // Update indicators
    const testimonialIndicators = document.querySelectorAll(
      ".testimonial-indicator",
    );
    testimonialIndicators.forEach((indicator, i) => {
      if (i === currentIndicator) {
        indicator.classList.remove("bg-gray-300", "hover:bg-gray-400");
        indicator.classList.add("bg-red-500");
      } else {
        indicator.classList.add("bg-gray-300", "hover:bg-gray-400");
        indicator.classList.remove("bg-red-500");
      }
    });
  }

  // Event listeners for indicators
  function attachIndicatorListeners() {
    const testimonialIndicators = document.querySelectorAll(
      ".testimonial-indicator",
    );
    testimonialIndicators.forEach((indicator) => {
      indicator.addEventListener("click", () => {
        const cardWidth = testimonialCards[0]?.offsetWidth || 320;
        const gap = 32;
        let scrollPosition;

        if (isMobile()) {
          const card = parseInt(indicator.getAttribute("data-card"));
          scrollPosition = card * (cardWidth + gap);
        } else {
          const page = parseInt(indicator.getAttribute("data-page"));
          const cardsPerPage = 3;
          scrollPosition = page * (cardWidth + gap) * cardsPerPage;
        }

        testimonialsScroll.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      });
    });
  }

  attachIndicatorListeners();

  testimonialsScroll.addEventListener("scroll", updateTestimonialIndicators);

  // Handle window resize
  window.addEventListener("resize", () => {
    createIndicators();
    attachIndicatorListeners();
    updateTestimonialIndicators();
  });

  // Initial update
  updateTestimonialIndicators();
}

// Scroll-reveal animation
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

revealElements.forEach((el) => revealObserver.observe(el));
