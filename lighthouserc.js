module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/blog',
        'http://localhost:3000/blog/example-post',
      ],
      startServerCommand: 'pnpm start',
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --headless',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        
        // Core Web Vitals
        'largest-contentful-paint': ['warn', { maxNumericValue: 1800 }], // 1.8s
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }], // < 0.05
        'first-contentful-paint': ['warn', { maxNumericValue: 1200 }], // 1.2s
        'total-blocking-time': ['warn', { maxNumericValue: 200 }], // < 200ms
        
        // Performance budgets
        'resource-summary:script:size': ['warn', { maxNumericValue: 170000 }], // 170KB
        'resource-summary:total:size': ['warn', { maxNumericValue: 1000000 }], // 1MB
        
        // Accessibility
        'color-contrast': 'error',
        'heading-order': 'error',
        'aria-allowed-attr': 'error',
        'aria-required-attr': 'error',
        'button-name': 'error',
        'link-name': 'error',
        'image-alt': 'error',
        
        // Best practices
        'uses-https': 'error',
        'uses-http2': 'warn',
        'no-vulnerable-libraries': 'error',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}