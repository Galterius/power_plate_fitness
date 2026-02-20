# Power Plate Fitness Website

A clean, mobile-responsive static website for Power Plate Fitness gym built with HTML, CSS (Tailwind), and minimal vanilla JavaScript.

## Features

- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **Fast & Lightweight** - No frameworks, minimal JS
- 🗺️ **Google Maps Integration** - Embedded location map
- 🖼️ **Gallery & Showcase** - Display gym facilities and equipment
- 📞 **Contact Information** - Email and phone with direct links
- 🎨 **Tailwind CSS** - Easy to customize styling
- 🚀 **GitHub Pages Ready** - Deploy for free

## Project Structure

```
power_plate_fitness/
├── index.html                    # Main HTML file
├── script.js                     # Minimal JavaScript for interactivity
├── images/                       # Image folders (currently using external URLs)
│   ├── hero/
│   ├── gallery/
│   └── equipment/
├── IMAGES_SETUP.md              # Guide for image management
├── GITHUB_PAGES_SETUP.md        # Deployment instructions
└── README.md                     # This file
```

## Sections

1. **Navigation** - Sticky header with mobile hamburger menu
2. **Hero Banner** - Eye-catching welcome section
3. **About Us** - Gym description and key benefits
4. **Gallery** - 6-image grid showcase
5. **Equipment** - 4-card equipment categories
6. **Operating Hours** - Regular hours and 24/7 access info
7. **Contact & Map** - Email, phone, and embedded Google Map
8. **Footer** - Social links and copyright

## Quick Start

### Local Development

Simply open `index.html` in your browser - no build tools needed!

### Deploy to GitHub Pages

1. Create a GitHub repository
2. Push files to GitHub
3. Enable Pages in repository settings
4. Your site is live!

See `GITHUB_PAGES_SETUP.md` for detailed instructions.

## Customization

### Update Contact Info

Edit the email and phone in the **Contact** section of `index.html`.

### Change Google Map Location

Replace the iframe `src` in the contact section with your gym's coordinates (get from Google Maps embed).

### Replace Images

See `IMAGES_SETUP.md` for placeholder image setup and replacement options.

### Adjust Colors/Branding

Modify Tailwind classes in `index.html`. Key colors:

- Primary: `blue-600` (easily changeable to other Tailwind colors)
- Background: `gray-50` and `white`

### Add Google Reviews Widget

Once you have a Google Business Profile:

1. Go to Google Business Profile
2. Get the review widget embed code
3. Add it to the footer or dedicated section

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge).

## Performance

- **Lighthouse Score**: Excellent (minimal JS = faster load times)
- **Hosting Cost**: Free (GitHub Pages)
- **Maintenance**: Minimal - just update HTML as needed

## Notes

- All placeholder images are from Unsplash (free to use)
- Currently using external image URLs for quick setup
- Download and host images locally if you prefer to reduce external requests
- Google Maps embed requires your actual gym coordinates

## License

Free to use and modify for your gym's website.
