// ── Gallery Carousel ──────────────────────────────────────────────────────────
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
    src: "images/equipment/WhatsApp Image 2026-04-15 at 13.24.56.jpeg",
    alt: "Echipamente sala",
  },
];

const galleryCarousel = buildCarousel({
  images: EQUIPMENT_IMAGES,
  wrapperId: "carousel-wrapper",
  prevBtnId: "carousel-prev",
  nextBtnId: "carousel-next",
  indicatorsId: "carousel-indicators",
});

// ── Lightbox ──────────────────────────────────────────────────────────────────
const lightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

// openLightbox is global so about_us.js can call it too
function openLightbox(src) {
  lightboxImage.src = src;
  lightbox.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.add("hidden");
  document.body.style.overflow = "auto";
}

document.getElementById("carousel-wrapper").addEventListener("click", () => {
  openLightbox(EQUIPMENT_IMAGES[galleryCarousel.getCurrentIndex()].src);
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.classList.contains("hidden"))
    closeLightbox();
});
