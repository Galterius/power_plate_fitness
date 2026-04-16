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
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

let lightboxImages = [];
let lightboxIndex = 0;

function lightboxShow(index) {
  if (index < 0) index = lightboxImages.length - 1;
  if (index >= lightboxImages.length) index = 0;
  lightboxIndex = index;
  lightboxImage.src = lightboxImages[index].src;
}

// openLightbox is global so about_us.js can call it too
function openLightbox(images, index) {
  lightboxImages = images;
  lightboxIndex = index;
  lightboxImage.src = images[index].src;
  // Hide nav buttons if only one image
  const showNav = images.length > 1;
  lightboxPrev.classList.toggle("hidden", !showNav);
  lightboxNext.classList.toggle("hidden", !showNav);
  lightbox.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.add("hidden");
  document.body.style.overflow = "auto";
}

document.getElementById("carousel-wrapper").addEventListener("click", () => {
  openLightbox(EQUIPMENT_IMAGES, galleryCarousel.getCurrentIndex());
});

lightboxPrev.addEventListener("click", (e) => { e.stopPropagation(); lightboxShow(lightboxIndex - 1); });
lightboxNext.addEventListener("click", (e) => { e.stopPropagation(); lightboxShow(lightboxIndex + 1); });
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("hidden")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") lightboxShow(lightboxIndex - 1);
  if (e.key === "ArrowRight") lightboxShow(lightboxIndex + 1);
});
