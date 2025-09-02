# McTigueINK Store

This repository contains the source for the McTigueINK sales site. The site highlights original artwork, creative courses, and branded merchandise.

> **Status:** 🚧 Work in progress. The storefront is being rebuilt and is not ready for production use.

## Development

The project currently uses plain HTML and CSS. Open `index.html` in your browser to view the site locally.

## Images

Place product photos and artwork inside the `images` directory. See `images/README.md` for tips on organizing media.

## Testing

At this stage there are no automated tests. `npm test` simply confirms the command runs.

## Environment Variables

Do **not** commit API keys to version control. Set the following values as secrets in your hosting environment (e.g., GitHub Secrets) and expose them on the page as globals before loading the related scripts:

```
SNIPCART_PUBLIC_API_KEY=<your-public-key>
APLIIQ_FULFILLMENT_URL=<your-fulfillment-endpoint>
APLIIQ_WAREHOUSE_URL=<your-warehouse-endpoint>
CREATIVE_HUB_API_KEY=<your-creative-hub-key>
```

## Checkout and Cart

The site uses [Snipcart](https://snipcart.com) for cart and checkout on a static site. JavaScript in `js/cart.js` loads Snipcart using an API key supplied at runtime.

### Usage

Product pages include `Add to cart` buttons and a cart widget that opens the checkout flow.

## Apliiq Integration

The site can connect with [Apliiq](https://apliiq.com) for merchandise production and fulfillment. See the environment variables section above for the required endpoints. Placeholder pages are provided at `/fulfillment.html` and `/warehouse-shipment.html` so Apliiq has valid endpoints during initial store setup.
