# McTigueINK Store

This repository contains the source for the McTigueINK sales site. The site highlights original artwork, creative courses, and branded merchandise.

> **Status:** 🚧 Work in progress. The storefront is being rebuilt and is not ready for production use.

## Development

The project currently uses plain HTML and CSS. Open `index.html` in your browser to view the site locally.

## Images

Place product photos and artwork inside the `images` directory. See `images/README.md` for tips on organizing media.

## Testing

At this stage there are no automated tests. `npm test` simply confirms the command runs.

## Checkout and Cart

The site uses [Snipcart](https://snipcart.com) for cart and checkout on a static site. JavaScript in `js/cart.js` loads Snipcart using an API key supplied at runtime.

### API Keys

Do **not** commit API keys to version control. Expose the Snipcart public API key through your hosting provider or GitHub Secrets:

```
SNIPCART_PUBLIC_API_KEY=<your-public-key>
```

Make the value available on the page as `window.SNIPCART_PUBLIC_API_KEY` before loading `js/cart.js`.

### Usage

Product pages include `Add to cart` buttons and a cart widget that opens the checkout flow.
