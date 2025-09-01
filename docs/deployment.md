# Deployment and Testing

## Testing

Run the link checker to verify internal links:

```bash
npm test
```

## Deployment

Pushing to the `main` branch triggers a GitHub Actions workflow that runs tests and publishes the site to GitHub Pages.

The workflow uploads the repository contents, including the `CNAME` file for the custom domain.
