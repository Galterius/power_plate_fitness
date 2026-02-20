# Power Plate Fitness - Placeholder Images Guide

The website uses placeholder images. Replace the image paths in `index.html` with your own gym photos or use the placeholder URLs below.

## Quick Setup with External Placeholder URLs

You can reference placeholder images directly from free services without downloading. Here are recommended categories:

### Hero Banner

- Size: 1920x1080 (or similar)
- Suggestions: Pexels or Unsplash gym/fitness hero images
- Example: `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop`

### About Section Image

- Size: 500x400
- Suggestions: Gym interior or fitness community photo
- Example: `https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=400&fit=crop`

### Gallery Images (6 total)

- Size: 400x300 each
- Mix of gym equipment, workout areas, people training
- Examples:
  - `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop`
  - `https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop`
  - `https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop`
  - `https://images.unsplash.com/photo-1577221084712-56ceb36d7fa4?w=400&h=300&fit=crop`
  - `https://images.unsplash.com/photo-1520994355689-2348dd1f58d7?w=400&h=300&fit=crop`
  - `https://images.unsplash.com/photo-1462356422656-fea92589ee27?w=400&h=300&fit=crop`

### Equipment Section Images (4 total)

- Size: 300x200 each
- **Dumbbells**: `https://images.unsplash.com/photo-1532473361331-11fe3daa763d?w=300&h=200&fit=crop`
- **Cardio Equipment**: `https://images.unsplash.com/photo-1598289174055-2c2aee93c299?w=300&h=200&fit=crop`
- **Weight Machines**: `https://images.unsplash.com/photo-1574480535677-d4d440642117?w=300&h=200&fit=crop`
- **Accessories**: `https://images.unsplash.com/photo-1588286840104-8957b019727f?w=300&h=200&fit=crop`

## How to Update Images

### Option 1: Use External URLs (Easiest)

Simply update the `src` attributes in `index.html` with the placeholder URLs above.

### Option 2: Download and Host Locally

1. Download images and save them to the corresponding folders:
   - `images/hero/banner.jpg`
   - `images/hero/about.jpg`
   - `images/gallery/gym-1.jpg` through `gym-6.jpg`
   - `images/equipment/dumbbells.jpg`, `cardio.jpg`, `machines.jpg`, `accessories.jpg`
2. Update image paths in `index.html` accordingly.

## Recommended Free Image Sources

- **Unsplash**: https://unsplash.com (search: gym, fitness, workout)
- **Pexels**: https://pexels.com (search: gym, fitness)
- **Pixabay**: https://pixabay.com (search: gym, fitness)

## Note on Google Maps

Update the Google Maps iframe src in the contact section with your actual coordinates:

- Find your gym on Google Maps
- Share it and copy the embed code
- Replace the existing iframe in the contact section
