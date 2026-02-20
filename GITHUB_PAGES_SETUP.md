# Power Plate Fitness - GitHub Pages Deployment Guide

## Quick Start

### 1. Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name your repository: `power-plate-fitness` (or any name)
3. Initialize with no template
4. Click "Create repository"

### 2. Push Your Files

Navigate to your project directory and run:

```bash
git init
git add .
git commit -m "Initial commit: Power Plate Fitness website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/power-plate-fitness.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch and **/ (root)** folder
4. Click **Save**
5. GitHub will display your site URL (usually `https://yourusername.github.io/power-plate-fitness/`)

Your site will be live in a few minutes!

## Connecting a Custom Domain

### After Purchasing a Domain:

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Update DNS records:
   - For apex domain (example.com):
     ```
     Type: A
     Host: @
     Points to: 185.199.108.153
                 185.199.109.153
                 185.199.110.153
                 185.199.111.153
     ```
   - For www subdomain:
     ```
     Type: CNAME
     Host: www
     Points to: yourusername.github.io
     ```

3. In your repository Settings → Pages → Custom domain, enter your domain name
4. Commit the generated `CNAME` file:

   ```bash
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

5. Enable HTTPS (usually automatic after 24 hours)

## Making Updates

After any changes to your files:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

Changes will be live in a few seconds!

## Updating Content Later

When you're ready to:

- **Replace placeholder images**: Update the `src` attributes in `index.html`
- **Change contact info**: Update email and phone in the contact section
- **Update Google Maps**: Replace the iframe src with your gym's coordinates
- **Adjust colors/branding**: Modify Tailwind classes in `index.html`

See `IMAGES_SETUP.md` for detailed image replacement instructions.

## Troubleshooting

- **Site not showing?** GitHub Pages can take up to 10 minutes to deploy. Check your email for any errors.
- **404 error?** Make sure your repository is public, not private.
- **Custom domain not working?** DNS changes can take 24-48 hours to propagate.
