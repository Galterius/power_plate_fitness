// ── Gallery Carousel ──────────────────────────────────────────────────────────
// To add or remove images/videos, edit this array (order = slide order):
const EQUIPMENT_IMAGES = [
  {
    video: "videos/video-1.mp4",
    poster: "videos/video-1-poster.jpg",
    alt: "Video antrenament Power Plate la Power Fitness Târgu Mureș",
  },
  {
    src: "images/equipment/WhatsApp Image 2026-04-15 at 13.21.28.jpeg",
    alt: "Aparat Power Plate la Power Fitness Târgu Mureș",
  },
  {
    src: "images/equipment/WhatsApp Image 2026-04-15 at 13.22.18.jpeg",
    alt: "Antrenamente de grup pe aparate Power Plate",
  },
  {
    video: "videos/video-2.mp4",
    poster: "videos/video-2-poster.jpg",
    alt: "Exerciții pe platforma vibrantă Power Plate",
  },
  { src: "images/equipment/eqp.jpg", alt: "Aparat Power Plate de calitate medicală" },
  {
    src: "images/equipment/WhatsApp Image 2026-04-15 at 13.24.56.jpeg",
    alt: "Sala de fitness Power Fitness Târgu Mureș",
  },
  {
    video: "videos/video-3.mp4",
    poster: "videos/video-3-poster.jpg",
    alt: "Antrenament pe aparatul Power Plate",
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
  lightboxImage.alt = lightboxImages[index].alt;
}

// openLightbox is global so about_us.js can call it too
function openLightbox(images, index) {
  lightboxImages = images;
  lightboxIndex = index;
  lightboxImage.src = images[index].src;
  lightboxImage.alt = images[index].alt;
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

// Videos play inline, so the lightbox only cycles through the photos
const GALLERY_PHOTOS = EQUIPMENT_IMAGES.filter((item) => !item.video);

document.getElementById("carousel-wrapper").addEventListener("click", () => {
  const current = EQUIPMENT_IMAGES[galleryCarousel.getCurrentIndex()];
  if (current.video) return;
  openLightbox(GALLERY_PHOTOS, GALLERY_PHOTOS.indexOf(current));
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
