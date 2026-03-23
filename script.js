// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery Carousel
const TOTAL_IMAGES = 3;
let currentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

const carouselWrapper = document.getElementById('carousel-wrapper');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const indicators = document.querySelectorAll('.carousel-indicator');

function showImage(index) {
    // Wrap around
    if (index < 0) index = TOTAL_IMAGES - 1;
    if (index >= TOTAL_IMAGES) index = 0;

    currentImageIndex = index;

    // Update image visibility
    for (let i = 0; i < TOTAL_IMAGES; i++) {
        const img = document.getElementById(`carousel-img-${i}`);
        if (i === index) {
            img.classList.remove('opacity-0');
            img.classList.add('opacity-100');
        } else {
            img.classList.add('opacity-0');
            img.classList.remove('opacity-100');
        }
    }

    // Update indicators
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.remove('bg-gray-300', 'hover:bg-gray-400');
            indicator.classList.add('bg-red-500');
        } else {
            indicator.classList.add('bg-gray-300', 'hover:bg-gray-400');
            indicator.classList.remove('bg-red-500');
        }
    });
}

function nextImage() {
    showImage(currentImageIndex + 1);
}

function prevImage() {
    showImage(currentImageIndex - 1);
}

// Button event listeners
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Indicator click handlers
indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
        const index = parseInt(indicator.getAttribute('data-index'));
        showImage(index);
    });
});

// Touch/Swipe event listeners
carouselWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

carouselWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const threshold = 50; // Minimum distance for swipe
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            // Swiped left - go to next image
            nextImage();
        } else {
            // Swiped right - go to previous image
            prevImage();
        }
    }
}

// Image Lightbox / Full-size Image Viewer
const lightbox = document.getElementById('image-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const carouselImages = document.querySelectorAll('#carousel-wrapper img');

const imageMap = {
    0: 'images/equipment/eqp.jpg',
    1: 'images/equipment/cardio-eqp.avif',
    2: 'images/equipment/free-weights.avif'
};

// Open lightbox on image click
document.getElementById('carousel-wrapper').addEventListener('click', () => {
    lightboxImage.src = imageMap[currentImageIndex];
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

lightboxClose.addEventListener('click', closeLightbox);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox on ESC key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        closeLightbox();
    }
});

// Testimonials navigation
const testimonialsScroll = document.getElementById('testimonials-scroll');
const testimonialsPrev = document.getElementById('testimonials-prev');
const testimonialsNext = document.getElementById('testimonials-next');

if (testimonialsScroll && testimonialsPrev && testimonialsNext) {
    const scrollAmount = testimonialsScroll.querySelector('.flex > div')?.offsetWidth + 32 || 320 + 32;
    testimonialsPrev.addEventListener('click', () => {
        testimonialsScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    testimonialsNext.addEventListener('click', () => {
        testimonialsScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// Scroll-reveal animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));