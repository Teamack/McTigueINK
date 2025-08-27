# McTigueINK Website Restructure Plan

This document outlines how to rebuild the repository into a sales-focused site for McTigueINK art, courses, and merchandise.

> **Note:** This plan and the codebase are still under active development.

## Goals
- Replace existing prototype content with a streamlined sales website.
- Highlight artwork, digital courses, and physical products.
- Preserve the existing domain configuration (`CNAME`) and use environment variables for any API keys.

## Proposed Directory Structure
```
/
├── index.html             # landing page with product highlights
├── artwork.html           # dedicated gallery page (example added)
├── products/              # individual product pages
├── courses/               # course descriptions and enrollment links
├── images/                # artwork and site graphics
├── css/                   # stylesheets
├── js/                    # scripts for interactivity/cart
├── server.js (optional)   # server or API hooks if needed
└── docs/                  # documentation and planning
```

## Implementation Steps
1. **Remove deprecated files**
   - Archive or delete current prototype code that will not be reused.
2. **Create core pages**
   - `index.html` for the main sales landing page.
   - Individual pages for artwork, courses, and products.
3. **Design and branding**
   - Apply McTigueINK colors, fonts, and logo consistently.
   - Use high-quality images for artwork and promotional banners.
4. **E-commerce integration**
   - Integrate a service such as Stripe, Snipcart, or Shopify Buy Buttons for checkout.
   - Store API keys in environment variables or deployment platform secrets (never commit keys).
5. **Deployment**
   - Continue using the existing domain (`mctigueink.com`) via the `CNAME` file.
   - Deploy to GitHub Pages, Netlify, or a similar host with CI/CD.
6. **Testing and maintenance**
   - Add tests for any dynamic functionality.
   - Document future updates and keep dependencies current.

## Next Steps
- Replace placeholder images with original artwork.
- Flesh out product data and course listings.
- Configure payment provider and shipping/tax settings as needed.
