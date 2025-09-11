# 📊 Data-Driven Component Guide

This guide explains how to transform hardcoded components into flexible, data-driven components that can work with any CMS or data source.

## 🎯 **Implementation Complete**

The hero component has been successfully refactored to be **100% data-driven** with support for multiple data sources:

✅ **CMS Integration** - Contentful, Sanity, Strapi adapters  
✅ **Local JSON** - Static file-based content  
✅ **API Endpoints** - REST/GraphQL support  
✅ **Legacy Migration** - Backward compatibility  
✅ **Type Safety** - Full TypeScript contracts  
✅ **Null Safety** - Graceful fallbacks for missing data  
✅ **Testing** - Comprehensive test coverage  

---

## 📋 **What Was Implemented**

### 1. **Component Contract** (`components/hero-futuristic.tsx`)

```typescript
export type HeroFuturisticProps = {
  kicker?: string                    // Optional eyebrow text
  title: string                      // Required main heading
  subtitle?: string                  // Optional description
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  media?: {                         // Image or video support
    type: 'image' | 'video'
    src: string
    alt?: string
    width?: number
    height?: number
  }
  highlights?: Array<{              // Social proof/features
    icon?: React.ReactNode
    text: string
    count?: string
  }>
  backgroundGradient?: boolean
  className?: string
}
```

### 2. **Adapter Layer** (`lib/adapters/hero.ts`)

Three adapter functions to handle different data sources:

- **`heroFromCms(data: CmsHero)`** - For CMS/API data
- **`heroFromLocal(data: LocalHeroData)`** - For local JSON files
- **`heroFromLegacy(data: LegacyHeroProps)`** - For migrating existing components

### 3. **Data Sources**

#### **Option A: CMS/API Endpoint** (`app/api/hero/route.ts`)
```typescript
// Fetch from your CMS
const cmsData = await fetch('/api/hero')
const hero = heroFromCms(cmsData)
return <HeroFuturistic {...hero} />
```

#### **Option B: Local JSON** (`data/hero.json`)
```typescript
import heroData from '@/data/hero.json'
const hero = heroFromLocal(heroData)
return <HeroFuturistic {...hero} />
```

#### **Option C: Legacy Migration**
```typescript
// Convert existing props
const legacyProps = { /* old format */ }
const hero = heroFromLegacy(legacyProps)
return <HeroFuturistic {...hero} />
```

### 4. **Testing Coverage** (`tests/unit/hero-adapters.test.ts`)

✅ **10 passing tests** covering:
- Full data transformation
- Missing field handling
- Null safety
- Different media types
- Legacy compatibility

---

## 🚀 **How to Use**

### **Quick Start with Local JSON**

1. **Update your data** in `/data/hero.json`:
```json
{
  "kicker": "Your eyebrow text",
  "title": "Your main headline",
  "subtitle": "Your description",
  "primaryButton": {
    "text": "Get Started",
    "url": "/signup"
  },
  "image": {
    "src": "/your-hero-image.jpg",
    "alt": "Your image description"
  },
  "highlights": [
    { "count": "10k+", "text": "users" },
    { "text": "99.9% uptime" }
  ]
}
```

2. **Component automatically updates** - No code changes needed!

### **Integrate with Your CMS**

#### **Contentful Example**
```typescript
// lib/contentful.ts
import { heroFromContentful } from '@/lib/adapters/cms-examples'

export async function getHeroFromContentful() {
  const entry = await contentfulClient.getEntry('your-hero-entry-id')
  return heroFromContentful(entry)
}

// app/page.tsx
const hero = await getHeroFromContentful()
return <HeroFuturistic {...hero} />
```

#### **Sanity Example**
```typescript
// lib/sanity.ts
import { heroFromSanity } from '@/lib/adapters/cms-examples'

export async function getHeroFromSanity() {
  const data = await sanityClient.fetch('*[_type == "hero"][0]')
  return heroFromSanity(data)
}
```

#### **Strapi Example**
```typescript
// lib/strapi.ts
import { heroFromStrapi } from '@/lib/adapters/cms-examples'

export async function getHeroFromStrapi() {
  const response = await fetch(`${process.env.STRAPI_URL}/api/hero?populate=*`)
  const data = await response.json()
  return heroFromStrapi(data.data)
}
```

---

## 🔧 **Customization Guide**

### **Adding New Fields**

1. **Update the type contract**:
```typescript
export type HeroFuturisticProps = {
  // ... existing fields
  badge?: string                    // New field
  testimonial?: {                   // New complex field
    quote: string
    author: string
  }
}
```

2. **Update the component**:
```typescript
export default function HeroFuturistic({ badge, testimonial, ...props }) {
  return (
    <section>
      {badge && <div className="badge">{badge}</div>}
      {testimonial && (
        <blockquote>
          "{testimonial.quote}" - {testimonial.author}
        </blockquote>
      )}
      {/* ... rest of component */}
    </section>
  )
}
```

3. **Update adapters**:
```typescript
export function heroFromCms(data: CmsHero): HeroFuturisticProps {
  return {
    // ... existing mappings
    badge: data.badgeText,
    testimonial: data.testimonial ? {
      quote: data.testimonial.text,
      author: data.testimonial.authorName
    } : undefined,
  }
}
```

### **Supporting New Media Types**

```typescript
// Add video support
media?: {
  type: 'image' | 'video' | 'iframe'  // Add new type
  src: string
  alt?: string
  embedCode?: string                   // For iframes
}

// Handle in component
{media?.type === 'iframe' && (
  <div dangerouslySetInnerHTML={{ __html: media.embedCode }} />
)}
```

---

## 📊 **Performance Benefits**

### **Before (Hardcoded)**
- ❌ Content changes require code deployment
- ❌ No content management workflow
- ❌ Limited flexibility for A/B testing
- ❌ Developers needed for content updates

### **After (Data-Driven)**
- ✅ **Content updates without deployment**
- ✅ **CMS workflow** for content editors
- ✅ **A/B testing** ready with different data
- ✅ **Non-technical content updates**
- ✅ **Multiple environments** (staging/prod content)
- ✅ **Internationalization** ready

---

## 🧪 **Testing Strategy**

### **Unit Tests**
```bash
pnpm test tests/unit/hero-adapters.test.ts
```

Tests cover:
- ✅ Full data transformation
- ✅ Missing field handling  
- ✅ Null safety
- ✅ Different media types
- ✅ Legacy compatibility

### **Integration Tests**
Visit `/hero-examples` to see live examples of:
- CMS API integration
- Local JSON loading
- Legacy format migration

---

## 🔄 **Migration Path**

### **From Hardcoded to Data-Driven**

1. **Identify hardcoded values** in your component
2. **Extract to props interface** with proper TypeScript types
3. **Create adapter functions** for your data sources
4. **Add fallbacks** for missing data
5. **Write tests** for adapters
6. **Gradually migrate** pages to use new format

### **Example Migration**

```typescript
// Before: Hardcoded
function OldHero() {
  return (
    <section>
      <h1>Hardcoded Title</h1>
      <p>Hardcoded description</p>
    </section>
  )
}

// After: Data-driven
function NewHero({ title, description }: HeroProps) {
  return (
    <section>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </section>
  )
}

// Usage
const data = await fetchFromCMS()
const props = heroFromCms(data)
return <NewHero {...props} />
```

---

## 🎯 **Best Practices**

### **1. Type Safety**
- Always define TypeScript interfaces
- Use strict null checks
- Provide sensible defaults

### **2. Adapter Pattern**
- Keep adapters pure functions
- Handle missing data gracefully
- Add comprehensive tests

### **3. Performance**
- Use appropriate caching strategies
- Implement fallbacks for failed requests
- Optimize images with proper sizing

### **4. Accessibility**
- Always provide alt text for images
- Use semantic HTML structure
- Include proper ARIA labels

### **5. Error Handling**
- Graceful degradation for missing data
- Fallback content for failed requests
- User-friendly error messages

---

## 📚 **Example Data Sources**

### **Live Examples**

Visit these pages to see the data-driven approach in action:

- **Homepage** - Uses CMS API with fallback to local JSON
- **Hero Examples** - Interactive examples of different data sources
- **API Endpoint** - `/api/hero` - Mock CMS endpoint

### **Supported CMS Platforms**

Ready-to-use adapters for:
- ✅ **Contentful** - `heroFromContentful()`
- ✅ **Sanity** - `heroFromSanity()`  
- ✅ **Strapi** - `heroFromStrapi()`
- ✅ **REST APIs** - `heroFromRestApi()`
- ✅ **Local JSON** - `heroFromLocal()`
- ✅ **Legacy Format** - `heroFromLegacy()`

---

## 🎉 **Result**

The hero component is now **completely data-driven** and can be used with any content source. Content editors can update hero content through their CMS without requiring developer intervention, while maintaining full type safety and performance optimization.

**Key Achievement**: Same component UI, unlimited data source flexibility! 🚀