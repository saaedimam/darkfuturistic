# Vercel Deployment Guide

## Quick Deploy to Vercel

This project is **ready for one-click deployment** to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/saaedimam/darkfuturistic)

## Manual Deployment Steps

### 1. Fork/Clone Repository

```bash
git clone https://github.com/saaedimam/darkfuturistic.git
cd darkfuturistic
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Next.js settings

### 3. Configuration (Auto-detected)

- **Framework**: Next.js
- **Build Command**: `pnpm run build`
- **Install Command**: `pnpm install`
- **Output Directory**: `.next` (auto-detected)
- **Root Directory**: `./` (root folder)

### 4. Environment Variables (Optional)

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### 5. Deploy

- Click "Deploy"
- Automatic deployments on every push to main branch

## Project Structure for Vercel

```
darkfuturistic/                 # Root directory (Vercel detects from here)
├── app/                        # Next.js App Router
├── components/                 # React components
├── public/                     # Static assets
├── package.json               # Dependencies & scripts
├── next.config.mjs            # Next.js configuration
├── vercel.json                # Vercel deployment settings
└── README.md                  # Documentation
```

## Vercel Features Enabled

### ✅ **Automatic Optimizations**

- Edge Functions for API routes
- Image optimization with Next.js Image
- Automatic code splitting
- CDN distribution
- Gzip compression

### ✅ **Security Headers**

- Content Security Policy
- XSS Protection
- Frame Options
- Referrer Policy

### ✅ **Performance**

- Static asset caching (1 year)
- API route caching disabled
- Optimized bundle serving

## Custom Domain Setup

1. **Add Domain** in Vercel dashboard
2. **Configure DNS** with your domain provider:
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```
3. **SSL Certificate** - Automatically provisioned

## Environment Variables

Add these in Vercel dashboard under Settings > Environment Variables:

```env
# Production URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Build Logs & Debugging

- **Build Logs**: Available in Vercel dashboard
- **Function Logs**: Real-time in dashboard
- **Performance**: Core Web Vitals tracking
- **Analytics**: Built-in Vercel Analytics

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### 404 Errors

- Check `next.config.mjs` for routing issues
- Verify file structure matches App Router conventions

### Performance Issues

- Use Vercel Analytics to identify bottlenecks
- Check bundle size with `pnpm run build`
- Optimize images and assets

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Project Issues**: [GitHub Issues](https://github.com/saaedimam/darkfuturistic/issues)
