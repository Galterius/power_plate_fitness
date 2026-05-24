# Pricing Section — Design Spec

**Date:** 2026-05-24
**Site:** Power Fitness (single-page static site, GitHub Pages)
**Status:** Approved — ready for implementation plan

## Goal

Add a Pricing section to `index.html` presenting two monthly subscription tiers — **4 sessions / month** and **8 sessions / month** — and wire it into the existing navigation and hero CTA.

## Scope

In scope:
- New `<section id="pricing">` in `index.html`
- Nav and footer link to the new section
- Hero CTA retargeted to the new section
- Buttons inside the pricing cards link to the existing Contact section

Out of scope:
- No new JS file. No changes to existing JS files.
- No backend/form handling — CTA is anchor-link only.
- No redesign of other sections (colors, spacing, copy elsewhere untouched).
- Real prices and final feature copy — placeholders are used; the owner fills in actual numbers and bullet text later.

## Placement

Insert the new section between Gallery (`#socials`) and Contact (`#info`) in `index.html`. Resulting section order:

1. Hero (`#home`)
2. About (`#about`) — `bg-white`
3. Testimonials (`#testimonials`) — `bg-gray-50`
4. Gallery / Socials (`#socials`) — `bg-white`
5. **Pricing (`#pricing`) — `bg-white` ← new**
6. Contact / Info (`#info`) — `bg-gray-50`
7. Footer — `bg-gray-900`

Pricing uses `bg-white`. Gallery above is also white, but the Pricing heading and card grid provide enough visual separation. Contact below contrasts cleanly via its `bg-gray-50`.

## Section markup (target HTML)

```html
<section id="pricing" class="py-10 md:py-16 bg-white reveal">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
    <h2 class="text-3xl md:text-4xl font-bold mb-4 text-center">Prețuri</h2>
    <p class="text-gray-700 text-lg mb-12 max-w-3xl mx-auto text-center">
      Alege pachetul potrivit pentru tine. Plata se face lunar.
    </p>

    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

      <!-- Standard tier: 4 sessions -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition p-8 flex flex-col">
        <p class="text-sm uppercase tracking-wide text-gray-500 mb-2">Pachet 4</p>
        <p class="mb-6">
          <span class="text-4xl md:text-5xl font-bold text-gray-900">XXX</span>
          <span class="text-gray-500 ml-1">RON / lună</span>
        </p>
        <ul class="space-y-3 text-gray-700 mb-8 flex-grow">
          <li class="flex items-start"><span class="text-red-500 font-bold mr-3">✓</span>4 ședințe Power Plate pe lună</li>
          <li class="flex items-start"><span class="text-red-500 font-bold mr-3">✓</span>Antrenor specializat la fiecare ședință</li>
          <li class="flex items-start"><span class="text-red-500 font-bold mr-3">✓</span>Program flexibil</li>
          <li class="flex items-start"><span class="text-red-500 font-bold mr-3">✓</span>Comunitate suportivă</li>
        </ul>
        <a href="#info" class="block text-center border border-red-500 text-red-600 hover:bg-red-50 font-bold py-3 px-8 rounded-lg transition">Alege</a>
      </div>

      <!-- Featured tier: 8 sessions -->
      <div class="relative bg-white border-2 border-red-500 rounded-lg shadow-lg hover:shadow-xl transition p-8 flex flex-col">
        <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Popular</span>
        <p class="text-sm uppercase tracking-wide text-gray-500 mb-2">Pachet 8</p>
        <p class="mb-6">
          <span class="text-4xl md:text-5xl font-bold text-gray-900">XXX</span>
          <span class="text-gray-500 ml-1">RON / lună</span>
        </p>
        <ul class="space-y-3 text-gray-700 mb-8 flex-grow">
          <li class="flex items-start"><span class="text-red-500 font-bold mr-3">✓</span>8 ședințe Power Plate pe lună</li>
          <li class="flex items-start"><span class="text-red-500 font-bold mr-3">✓</span>Antrenor specializat la fiecare ședință</li>
          <li class="flex items-start"><span class="text-red-500 font-bold mr-3">✓</span>Program flexibil</li>
          <li class="flex items-start"><span class="text-red-500 font-bold mr-3">✓</span>Comunitate suportivă</li>
        </ul>
        <a href="#info" class="block text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition">Alege</a>
      </div>

    </div>
  </div>
</section>
```

Notes on the markup:
- `class="reveal"` matches the fade-in pattern used by `about`, `testimonials`, `socials`, and `info` — the existing `js/animations.js` IntersectionObserver will pick it up with no JS changes.
- `flex flex-col` + `flex-grow` on the feature list keeps both cards' CTA buttons aligned at the bottom even when feature lists differ in length.
- Card width is capped by `max-w-4xl mx-auto` on the grid so the two cards don't stretch as wide as the rest of the page.
- Feature bullets are placeholders. The owner will edit the four lines per card before launch.
- `Popular` badge is positioned with `-top-3` so it sits half-on, half-off the card edge (standard pricing-card pattern).

## Wiring changes (rest of `index.html`)

Three small edits outside the new section. All values are placeholders — exact line numbers may shift; locate by surrounding context.

### A) Desktop nav — insert `Prețuri` link

Inside `<div class="hidden md:flex space-x-8">`, between the existing `Galerie` and `Informații` links:

```html
<a href="#pricing" class="hover:text-red-500 transition">Prețuri</a>
```

### B) Mobile nav — insert `Prețuri` link

Inside `<div id="mobile-menu" ...>`, between the existing `Galerie` and `Informații` links:

```html
<a href="#pricing" class="block px-2 py-2 hover:bg-red-50 rounded transition">Prețuri</a>
```

### C) Footer nav list — insert `Prețuri` link

Inside the footer `<ul class="space-y-2 text-gray-400">`, between the existing `Galerie` and `Informații` `<li>` entries:

```html
<li><a href="#pricing" class="hover:text-white transition">Prețuri</a></li>
```

### D) Hero CTA — retarget to `#pricing`

Change:

```html
<a href="#info" class="bg-red-600 hover:bg-red-700 ...">Devino Membru</a>
```

to:

```html
<a href="#pricing" class="bg-red-600 hover:bg-red-700 ...">Devino Membru</a>
```

No other class or copy changes.

## Behavior (no new JS)

The existing `js/nav.js` already handles two things automatically for the new markup:

1. **Smooth scroll** — the global `document.querySelectorAll('a[href^="#"]')` handler attaches to every anchor link including the new `Prețuri` nav links, the retargeted hero CTA, and the `Alege` buttons. They will smooth-scroll to their targets just like every other in-page link on the site.
2. **Mobile menu auto-close** — the `mobileMenu.querySelectorAll("a")` handler iterates every link inside `#mobile-menu`. The new mobile `Prețuri` link will auto-close the menu on click without any extra wiring.

`js/animations.js` adds the `.visible` class to elements with `class="reveal"` on intersection. The new section uses `reveal`, so it gets the same fade-in as every other section.

No JS file is added or modified.

## Manual verification checklist

This is a static site with no test framework. After implementation, manually verify:

- Open the site in a browser. The Pricing section renders between Gallery and Contact.
- Resize the window across the `md` (768px) breakpoint: cards stack to a single column on mobile, side-by-side on desktop.
- Nav `Prețuri` link (desktop) → smooth-scrolls to the pricing section.
- Mobile menu `Prețuri` link → smooth-scrolls AND the menu closes.
- Hero `Devino Membru` button → smooth-scrolls to the pricing section (no longer to contact).
- Footer `Prețuri` link → smooth-scrolls to the pricing section.
- `Alege` on the standard (4) card → smooth-scrolls to `#info`.
- `Alege` on the featured (8) card → smooth-scrolls to `#info`.
- The featured card displays the `POPULAR` badge centered on its top edge.
- The featured card uses a red border + solid red button; the standard card uses a gray border + outlined red button.
- Scroll into the pricing section from above and verify the fade-in (`reveal` → `visible`) animation triggers.
- Feature lists in both cards align to the same vertical positions (flex layout) and the `Alege` buttons sit on the same baseline regardless of list length.

## What the owner needs to fill in post-implementation

These are intentionally left as placeholders in the spec and the rendered markup:

- The two `XXX` price values in `Pachet 4` and `Pachet 8`.
- Final wording of the four feature bullets per card.
- (Optional) The subheading sentence under the `Prețuri` title.

## Open questions

None at sign-off.
