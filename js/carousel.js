// ── Generic Carousel Builder ──────────────────────────────────────────────────
// Builds a carousel into the given element IDs from an images array.
// Returns { getCurrentIndex } so callers (e.g. lightbox) can read state.
function buildCarousel({ images, wrapperId, prevBtnId, nextBtnId, indicatorsId }) {
  const wrapper = document.getElementById(wrapperId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  const indicatorsContainer = document.getElementById(indicatorsId);
  const total = images.length;
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let indicators = [];

  // Build images
  images.forEach((imgData, i) => {
    const el = document.createElement("img");
    el.id = `${wrapperId}-img-${i}`;
    el.src = imgData.src;
    el.alt = imgData.alt;
    el.className = `absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${i === 0 ? "opacity-100" : "opacity-0"}`;
    wrapper.appendChild(el);
  });

  // Hide nav buttons if only one image, otherwise build indicators
  if (total <= 1) {
    prevBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
  } else {
    images.forEach((_, i) => {
      const btn = document.createElement("button");
      btn.className = `w-3 h-3 rounded-full transition ${i === 0 ? "bg-red-500" : "bg-gray-300 hover:bg-gray-400"}`;
      btn.addEventListener("click", () => show(i));
      indicatorsContainer.appendChild(btn);
    });
    indicators = Array.from(indicatorsContainer.querySelectorAll("button"));
  }

  function show(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    currentIndex = index;

    for (let i = 0; i < total; i++) {
      const img = document.getElementById(`${wrapperId}-img-${i}`);
      img.classList.toggle("opacity-0", i !== index);
      img.classList.toggle("opacity-100", i === index);
    }

    indicators.forEach((ind, i) => {
      ind.classList.toggle("bg-red-500", i === index);
      ind.classList.toggle("bg-gray-300", i !== index);
      ind.classList.toggle("hover:bg-gray-400", i !== index);
    });
  }

  prevBtn.addEventListener("click", () => show(currentIndex - 1));
  nextBtn.addEventListener("click", () => show(currentIndex + 1));

  wrapper.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  wrapper.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) diff > 0 ? show(currentIndex + 1) : show(currentIndex - 1);
  }, false);

  return { getCurrentIndex: () => currentIndex };
}
