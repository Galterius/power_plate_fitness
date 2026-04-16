// ── About Us Carousel ─────────────────────────────────────────────────────────
// To add or remove images, edit this array:
const ABOUT_US_IMAGES = [
  {
    src: "images/about_us/people.jpg",
    alt: "Echipamente sala",
  },
  {
    src: "images/about_us/WhatsApp Image 2026-04-15 at 13.24.55 (1).jpeg",
    alt: "Echipamente sala",
  },
  {
    src: "images/about_us/WhatsApp Image 2026-04-15 at 13.24.55.jpeg",
    alt: "Echipamente sala",
  },
];

const aboutCarousel = buildCarousel({
  images: ABOUT_US_IMAGES,
  wrapperId: "about-carousel-wrapper",
  prevBtnId: "about-carousel-prev",
  nextBtnId: "about-carousel-next",
  indicatorsId: "about-carousel-indicators",
});

document.getElementById("about-carousel-wrapper").addEventListener("click", () => {
  openLightbox(ABOUT_US_IMAGES, aboutCarousel.getCurrentIndex());
});
