// ── Generic Carousel Builder ──────────────────────────────────────────────────
// Builds a carousel into the given element IDs from an images array.
// An item with `video` set (plus optional `poster`) is rendered as a video.
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

  // Build images / videos
  images.forEach((imgData, i) => {
    let el;
    if (imgData.video) {
      el = document.createElement("div");
      el.className = "bg-black";

      // preload="none": nothing is downloaded until the visitor presses play
      const video = document.createElement("video");
      video.src = imgData.video;
      if (imgData.poster) video.poster = imgData.poster;
      video.preload = "none";
      video.controls = true;
      video.playsInline = true;
      video.setAttribute("aria-label", imgData.alt);
      video.className = "w-full h-full object-contain";

      // Big centred play button – the native one is tiny on mobile
      const playBtn = document.createElement("button");
      playBtn.type = "button";
      playBtn.setAttribute("aria-label", "Pornește video");
      playBtn.className = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition transform hover:scale-110";
      playBtn.innerHTML = '<svg class="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
      playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        video.play();
      });
      // Touch taps don't always produce a click here, so start on pointerup too
      // (play() on an already playing video is a no-op)
      playBtn.addEventListener("pointerup", (e) => {
        if (e.pointerType === "touch") video.play();
      });
      video.addEventListener("play", () => playBtn.classList.add("hidden"));
      video.addEventListener("pause", () => playBtn.classList.remove("hidden"));
      video.addEventListener("ended", () => playBtn.classList.remove("hidden"));

      // Tapping the video toggles play/pause. A mouse click already does this
      // natively, but on touch screens the browser swallows the tap (no click
      // event) to show its controls – so handle touch taps on pointerup.
      // Swipes and taps on the bottom control bar are left alone.
      let tapStart = null;
      video.addEventListener("pointerdown", (e) => {
        tapStart = e.pointerType === "touch" ? { x: e.clientX, y: e.clientY } : null;
      });
      video.addEventListener("pointerup", (e) => {
        if (!tapStart) return;
        const moved = Math.hypot(e.clientX - tapStart.x, e.clientY - tapStart.y);
        tapStart = null;
        const rect = video.getBoundingClientRect();
        if (moved > 10 || e.clientY > rect.bottom - 56) return;
        video.paused ? video.play() : video.pause();
      });
      // Keep clicks on the video from opening the photo lightbox
      video.addEventListener("click", (e) => e.stopPropagation());

      el.append(video, playBtn);
    } else {
      el = document.createElement("img");
      el.src = imgData.src;
      el.alt = imgData.alt;
      el.className = "object-contain";
    }
    el.id = `${wrapperId}-img-${i}`;
    el.classList.add("absolute", "inset-0", "w-full", "h-full", "transition-opacity", "duration-300");
    el.classList.add(...(i === 0 ? ["opacity-100"] : ["opacity-0", "pointer-events-none"]));
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
      // Hidden slides must not catch clicks meant for the visible video's controls
      img.classList.toggle("pointer-events-none", i !== index);
      const video = img.querySelector("video");
      if (video && i !== index) video.pause();
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
