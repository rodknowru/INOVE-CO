# INOVE-CO Premium Hair Care Landing Page - Design Specification

**Date:** 2026-03-16  
**Project:** Single-page luxury landing website for INOVE-CO premium hair care brand  
**Status:** Approved

---

## 1. Overview

Create a single-page luxury landing website for "INOVE-CO" — a premium hair care brand offering balms, gels, sprays, and a signature 15-in-1 spray. The aesthetic is clean, minimal, editorial luxury inspired by high-end skincare brands like AURA, with a European boutique feel.

**Target audience:** Premium consumers seeking natural, small-batch hair care products  
**Brand positioning:** Luxury but approachable, natural ingredients, professional quality

---

## 2. Technology Stack

### Core Technologies
- **Next.js 14.2+** with App Router
- **React 18+**
- **TypeScript** for type safety
- **Tailwind CSS 3+** with custom configuration
- **Framer Motion 11+** for premium animations

### Rationale
- Next.js App Router provides modern routing and easy scalability for future features (blog/Journal section)
- Framer Motion enables sophisticated animations required for premium brand experience
- Tailwind CSS accelerates development while maintaining design system consistency
- TypeScript ensures code quality and easier maintenance

---

## 3. Project Structure

```
inove-co/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main page (composition of all sections)
│   └── globals.css         # Tailwind imports + custom styles
├── components/
│   ├── TopBar.tsx          # Top announcement bar
│   ├── Navigation.tsx      # Header navigation with logo
│   ├── Hero.tsx            # Hero section with lifestyle image
│   ├── ProductGrid.tsx     # Grid of 3 product cards
│   ├── ProductCard.tsx     # Individual product card
│   ├── ProductModal.tsx    # Product detail modal (e-commerce prep)
│   ├── About.tsx           # About section with brand story
│   └── Footer.tsx          # Footer with links and social
├── public/
│   └── images/
│       ├── hero/           # Hero section images
│       ├── products/       # Product photos
│       └── about/          # Texture and ingredient photos
├── lib/
│   └── animations.ts       # Reusable animation configurations
├── tailwind.config.ts      # Custom colors, fonts, spacing
├── package.json
└── tsconfig.json
```

---

## 4. Design System

### Color Palette
- **Primary Background:** `#F5F0EB` (warm-cream) — warm beige/cream
- **Primary Text:** `#2C2420` (dark-brown) — rich dark brown for headings
- **Secondary Text:** `#3D3935` (charcoal) — softer charcoal for body text
- **Accent White:** `#FDFCFB` (soft-white) — off-white for contrast elements
- **Hover Accent:** `#D4A574` (amber-accent) — warm amber for interactive states

Tailwind configuration will include these as custom colors: `warm-cream`, `dark-brown`, `charcoal`, `soft-white`, `amber-accent`.

### Typography
- **Display/Headings:** Cormorant Garamond (elegant serif) — loaded via next/font/google
  - Hero titles: 56px
  - Section headings: 42px
  - Subheadings: 38px
  - Product prices: 24px
  
- **Body Text:** Jost (clean geometric sans-serif) — loaded via next/font/google
  - Body copy: 16px, light weight, line-height 1.8
  - Navigation: 14px, medium weight
  - Labels: 12-14px, uppercase with increased letter-spacing

### Spacing & Layout
- Container max-width: 1440px
- Section padding: 120px vertical (desktop), 80px (tablet), 60px (mobile)
- Component spacing: 8px base unit, using Tailwind spacing scale
- Grid gaps: 32px between product cards

---

## 5. Component Specifications

### 5.1 TopBar
**Purpose:** Announcement bar for brand messaging

**Visual Design:**
- Height: 32px
- Background: `#2C2420` (dark-brown)
- Text: "INOVE-CO | PROFESSIONAL HAIR CARE" centered
- Typography: Jost, 11px, uppercase, letter-spacing: 2px, soft-white color

**Animation:**
- Slide down from top on page load (0.6s delay)
- Duration: 0.8s with ease-out

**Responsive:**
- Mobile: reduce font to 10px, adjust letter-spacing

---

### 5.2 Navigation
**Purpose:** Main site navigation with sticky behavior

**Visual Design:**
- Height: 80px
- Background: warm-cream with 80% opacity, backdrop blur when scrolled
- Logo: "INOVE-CO" centered, Cormorant Garamond, 32px
- Menu items: Home, Products, About, Journal
  - Position: right side of logo
  - Typography: Jost, 14px, medium weight, uppercase
  - Spacing: 48px between items
  
**Interactive States:**
- Hover: underline animates from left (width: 0 → 100%, 0.3s)
- Active section: permanent underline
- Smooth scroll to section anchors

**Sticky Behavior:**
- Position: sticky top: 0
- Backdrop blur effect: blur(12px) when scrolled past 100px
- Shadow appears on scroll: subtle bottom shadow

**Mobile (<768px):**
- Hamburger menu icon (right side)
- Full-screen overlay menu on open
- Menu items stack vertically, staggered fade-in animation
- Close button (X) top-right

**Animation:**
- Initial: fade in from top (0.4s delay)
- Scroll transition: backdrop blur fades in smoothly

---

### 5.3 Hero Section
**Purpose:** Primary visual impact and brand introduction

**Layout:**
- Height: 100vh
- Grid layout: 60% image / 40% text (desktop)
- Mobile: stack vertically, image on top

**Left Side - Image:**
- Large lifestyle product photo:
  - Amber/white bottle on marble surface
  - Eucalyptus leaves as botanical elements
  - Soft natural lighting, shallow depth of field
- Image treatment: subtle zoom on load (scale 1.05 → 1.0, 2s)
- Parallax effect: image moves at 0.5x scroll speed

**Right Side - Text Block:**
- Vertical centering
- Headline: "REDEFINING HAIR LUXURY"
  - Cormorant Garamond, 56px, uppercase, dark-brown
  - Letter-spacing: 4px
- Subheadline: "Natural formulas. Extraordinary results."
  - Jost light, 18px, charcoal color
  - Margin-top: 24px
- CTA Button: "DISCOVER THE COLLECTION"
  - Border: 2px solid dark-brown
  - Padding: 16px 48px
  - Hover: 3D tilt effect (rotateX: 5deg, translateY: -4px)
  - Arrow icon animates right on hover
  - Background fills from left on hover (dark-brown)

**Bottom Element:**
- Scroll indicator: animated arrow down
- Position: absolute bottom, centered
- Animation: bounce infinitely (translateY: 0 ↔ 12px)

**Animations:**
- Text: fade in + slide up (from 40px below) on load
- Stagger children: headline → subheadline → button (0.2s delays)
- Duration: 0.8s with ease-out

**Responsive:**
- Tablet: reduce font sizes (headline 44px, sub 16px)
- Mobile: stack layout, image height 60vh, adjust padding

---

### 5.4 ProductGrid Section
**Purpose:** Showcase signature product collection

**Section Header:**
- Title: "SIGNATURE COLLECTION"
  - Cormorant Garamond, 42px, centered, dark-brown
  - Decorative lines on both sides (1px, 80px length, amber-accent)
  - Margin-bottom: 80px

**Grid Layout:**
- 3 columns (desktop)
- 2 columns (tablet 768-1023px)
- 1 column (mobile <768px)
- Gap: 32px between cards

**Scroll Animation:**
- Cards fade in + slide up sequentially
- Stagger: 0.2s delay between each card
- Trigger: when section enters viewport (50% visible)

**CTA Button (below grid):**
- Text: "SHOP COLLECTION"
- Style: outline button (matches hero CTA)
- Position: centered, margin-top 64px
- Click: scrolls to contact/coming soon message

---

### 5.5 ProductCard Component
**Purpose:** Individual product display with hover interaction

**Structure:**
- Container: aspect-ratio 1:1 for image area + info below
- White background, subtle shadow

**Image Area:**
- Product photo: fills container (object-fit: cover)
- Aspect ratio: 1:1 (square)
- Placeholder images from Unsplash (cosmetic bottles, amber glass)

**Info Section:**
- Padding: 24px
- Product name: Jost medium, 14px, uppercase, dark-brown
- Description: "Natural formula • 100ml"
  - Jost light, 12px, charcoal
  - Margin-top: 8px
- Price: "€45"
  - Cormorant Garamond, 24px, dark-brown
  - Margin-top: 16px

**Hover Effects:**
- Card: scale(1.05), shadow increases (0 → 24px)
- 3D rotation: rotateX(5deg) rotateY(5deg)
- Cursor: custom cursor shows "VIEW" text
- Transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1)

**Click Behavior:**
- Opens ProductModal with product details

**Animation on Scroll:**
- Fade in + translate up (40px)
- Duration: 0.6s

---

### 5.6 ProductModal Component
**Purpose:** Product detail view (preparation for e-commerce)

**Layout:**
- Fullscreen fixed overlay
- Backdrop: dark-brown with 40% opacity + blur(8px)
- Content container: max-width 1200px, centered
- Split layout: 50% image / 50% details

**Left Side - Image:**
- Large product photo
- Aspect ratio: 4:5
- Allow zoom on hover (scale 1.1)

**Right Side - Details:**
- Vertical padding: 80px, horizontal: 60px
- Product name: Cormorant, 38px, dark-brown
- Category: "Hair Care • Professional" (Jost, 12px, uppercase)
- Description: Full paragraph about product benefits
  - Jost light, 16px, line-height 1.8
  - Margin-top: 32px
- Specifications:
  - Volume: 100ml
  - Key ingredients list
- Price: Cormorant, 32px, margin-top: 40px
- Action buttons (vertical stack):
  - "ADD TO WISHLIST" (outline button)
  - "NOTIFY WHEN AVAILABLE" (filled button)
  - Spacing: 16px between

**Close Functionality:**
- X button: top-right corner, dark-brown
- Click outside modal: closes
- ESC key: closes
- Close animation: reverse of open

**Animations:**
- Open: scale(0.95 → 1) + fade in, 0.4s
- Close: scale(1 → 0.95) + fade out, 0.3s
- Backdrop: fade in/out separately

**Responsive:**
- Mobile: stack layout (image top, details below), full-screen scroll

---

### 5.7 About Section
**Purpose:** Brand story and values communication

**Layout:**
- Split 50/50: text left, image right (desktop)
- Padding: 120px vertical
- Background: subtle gradient (warm-cream → slightly darker #EBE6E1)

**Left Side - Content:**
- Eyebrow: "OUR STORY" (Jost, 12px, uppercase, amber-accent, letter-spacing)
- Heading: "CRAFTED WITH INTENTION"
  - Cormorant, 38px, dark-brown
  - Margin-top: 16px
- Body paragraphs:
  - 2-3 paragraphs about natural ingredients, small-batch production, brand philosophy
  - Jost light, 16px, line-height 1.8, charcoal color
  - Max-width: 540px for readability
  
- Key Values List:
  - Icons + text (3-4 items):
    - "15+ Active Natural Ingredients"
    - "Paraben & Sulfate Free"
    - "Cruelty Free & Vegan"
    - "Small Batch Production"
  - Layout: 2x2 grid with icons
  - Typography: Jost medium, 14px
  - Icons: simple line icons, amber-accent color

**Right Side - Image:**
- Atmospheric close-up photo:
  - Marble texture, botanical elements (eucalyptus, dried flowers)
  - Soft natural lighting
- Image fills container with object-fit: cover
- Aspect ratio: 3:4

**Scroll Animations:**
- Text: fade in + slide up from bottom (60px)
- Image: fade in + scale (0.95 → 1)
- Values grid: staggered appearance (0.15s delays)
- Trigger: 40% of section in viewport

**Responsive:**
- Tablet: maintain split but reduce padding
- Mobile: stack (text top, image bottom), full-width image

---

### 5.8 Footer
**Purpose:** Site links, social media, newsletter subscription

**Visual Design:**
- Background: dark-brown (#2C2420)
- Text color: soft-white (#FDFCFB)
- Padding: 80px vertical (top), 40px (bottom section)

**Main Footer Content:**
- 3-column grid (desktop) / stack (mobile):

**Column 1 - Brand:**
- Logo: "INOVE-CO" (Cormorant, 28px)
- Tagline: "Professional hair care, naturally refined"
  - Jost light, 14px, 70% opacity

**Column 2 - Quick Links:**
- Heading: "EXPLORE" (Jost, 12px, uppercase, letter-spacing)
- Links: Products, About, Journal, Contact
  - Jost, 14px, vertical stack with 16px spacing
  - Hover: shift right 4px + amber-accent color

**Column 3 - Connect:**
- Heading: "CONNECT" (same style as Column 2)
- Social icons: Instagram, Pinterest
  - Size: 24px, soft-white
  - Hover: rotate 12deg + amber-accent color
  - Spacing: 20px between icons
- Newsletter form:
  - Input: email, minimal style (bottom border only)
  - Button: "SUBSCRIBE" (small outline button)
  - Note: form is non-functional placeholder

**Bottom Bar:**
- Border-top: 1px solid soft-white (20% opacity)
- Padding-top: 32px
- Content: "© 2026 INOVE-CO • Privacy Policy • Terms"
  - Jost, 12px, centered
  - Links separated by bullets

**Scroll Animation:**
- Fade in when footer enters viewport
- Columns appear with stagger (0.15s)

**Responsive:**
- Tablet: 2 columns (Brand spans 2, Links + Connect stack)
- Mobile: single column, centered content

---

## 6. Premium Interactive Features

### 6.1 Custom Cursor
**Implementation:**
- Custom circular cursor follows mouse with delay (0.1s)
- Base state: 40px diameter, border 2px amber-accent, transparent fill
- On hover (clickable elements): scale(1.5), amber-accent fill
- On hover (product cards): shows "VIEW" text inside cursor
- Smooth easing: cubic-bezier(0.25, 0.1, 0.25, 1)
- Desktop only (hidden on touch devices)

### 6.2 Parallax Effects
- Hero image: moves at 0.5x scroll speed
- About section image: moves at 0.7x scroll speed
- Implemented via Framer Motion's useScroll + useTransform hooks

### 6.3 Scroll-Triggered Animations
**System:**
- Use Intersection Observer API + Framer Motion
- Threshold: 50% for sections, 30% for small elements
- Direction: elements animate from bottom-up (translateY: 40px → 0)
- Fade in: opacity 0 → 1
- Duration: 0.6-0.8s with ease-out
- Stagger children: 0.15-0.2s delays for lists/grids

**Elements:**
- Section headings: fade + slide up
- Product cards: staggered appearance
- About values: grid items appear sequentially
- Footer columns: staggered fade in

### 6.4 Smooth Scrolling
- Navigation links: smooth scroll to section anchors
- Offset: account for sticky header height
- Duration: 800ms with ease-in-out
- Implementation: native CSS scroll-behavior + Framer Motion for fallback

---

## 7. Responsive Breakpoints

### Desktop (1440px+)
- Full layout as specified
- 3-column product grid
- Split layouts at 50/50
- Custom cursor active

### Tablet (768px - 1439px)
- 2-column product grid
- Maintain split layouts with adjusted proportions
- Reduce font sizes by ~10%
- Reduce section padding to 80px vertical

### Mobile (<768px)
- Single column layout
- Stack all split layouts (image/text)
- Hamburger menu
- Hero: image top 60vh, text below
- Product grid: 1 column, full width cards
- Increase touch targets to minimum 44px
- Section padding: 60px vertical
- Hide custom cursor

---

## 8. Animation Library Configuration

**File:** `lib/animations.ts`

**Reusable configurations:**
- `fadeInUp`: fade + translateY animation preset
- `staggerContainer`: parent container for staggered children
- `staggerItem`: child item animation
- `hoverScale`: scale + shadow increase
- `tilt3D`: 3D tilt effect on hover
- `slideDown`: top bar slide down animation
- `parallaxScroll`: parallax configuration

**Parameters:**
- Duration, delay, easing functions
- Can be imported and applied to Framer Motion components

---

## 9. Placeholder Images Strategy

**Approach:**
- Structure folders for client images
- Use Unsplash URLs as temporary placeholders
- Image categories needed:
  - Hero: luxury cosmetics on marble (1920x1080)
  - Products: 3 amber glass bottles (800x800 square)
  - About: marble texture with botanicals (800x1000)

**Folders:**
- `/public/images/hero/` - hero images
- `/public/images/products/` - product photos (named: product-1.jpg, product-2.jpg, product-3.jpg)
- `/public/images/about/` - about section imagery

**Note:** All folders created with `.gitkeep` files. README.md in each folder with guidance on image specs.

---

## 10. E-Commerce Preparation

**ProductModal:**
- Structure in place for future integration
- Buttons: "ADD TO WISHLIST", "NOTIFY WHEN AVAILABLE"
- Data structure: product object with id, name, price, description, images
- Currently: buttons show console.log or alert (placeholder)

**Future Integration Points:**
- State management: add Zustand or Context API for cart
- API routes: create Next.js API routes for Shopify/WooCommerce
- Payment: Stripe integration placeholder comments
- Inventory: quantity selector component ready to add

**ProductGrid CTA:**
- "SHOP COLLECTION" button currently scrolls to footer
- Comment noted: "Future: link to /shop page or external store"

---

## 11. Performance Considerations

**Image Optimization:**
- Use Next.js Image component for all images
- Sizes attribute for responsive images
- Priority loading for hero image
- Lazy loading for below-fold images

**Animation Performance:**
- Framer Motion's `layoutId` for shared element transitions
- `will-change` CSS for animated elements
- Reduce motion: respect prefers-reduced-motion media query
- GPU-accelerated transforms (translateZ hack where needed)

**Code Splitting:**
- ProductModal: dynamic import with React.lazy
- Framer Motion: import specific components only
- Font loading: font-display: swap

**Bundle Size:**
- Target: < 300KB initial JS bundle
- Tailwind: purge unused classes in production
- Framer Motion: tree-shake unused features

---

## 12. Accessibility

**Semantic HTML:**
- Proper heading hierarchy (h1 → h2 → h3)
- Nav wrapped in `<nav>` element
- Sections use `<section>` with aria-labels
- Footer in `<footer>` element

**Keyboard Navigation:**
- All interactive elements focusable
- Focus visible styles (outline with amber-accent)
- Modal: trap focus inside when open, return focus on close
- Skip to content link (hidden, visible on focus)

**Screen Readers:**
- Alt text for all images
- Aria-labels for icon-only buttons
- Aria-hidden for decorative elements
- Live regions for modal announcements

**Color Contrast:**
- All text meets WCAG AA standards
- dark-brown (#2C2420) on warm-cream (#F5F0EB): ratio 11.2:1
- charcoal (#3D3935) on warm-cream: ratio 8.7:1

**Motion:**
- Respect prefers-reduced-motion
- Disable parallax and complex animations if user preference set
- Maintain functionality without animations

---

## 13. Testing Checklist

**Visual Testing:**
- [ ] All breakpoints render correctly (1440px, 1024px, 768px, 375px)
- [ ] Typography scales appropriately
- [ ] Colors match design system
- [ ] Images load and display correctly
- [ ] Hover states work as expected

**Functional Testing:**
- [ ] Navigation links scroll to correct sections
- [ ] Mobile menu opens/closes smoothly
- [ ] Product cards open modal
- [ ] Modal closes via X, click-outside, ESC
- [ ] Form fields are accessible (even if non-functional)

**Animation Testing:**
- [ ] All animations trigger at correct scroll positions
- [ ] Animations perform smoothly (60fps)
- [ ] Reduced motion works correctly
- [ ] Parallax doesn't cause jank

**Accessibility Testing:**
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces content correctly
- [ ] Color contrast passes WCAG AA
- [ ] Focus indicators visible

**Performance Testing:**
- [ ] Lighthouse score: 90+ performance
- [ ] Images optimized and lazy-loaded
- [ ] JS bundle under 300KB
- [ ] First Contentful Paint < 1.5s

---

## 14. Future Enhancements

**Phase 2 (Post-Launch):**
- Journal/Blog section with CMS integration (Sanity/Contentless)
- Full e-commerce integration (Shopify or custom)
- Product filtering and search
- Customer reviews section
- Multi-language support

**Phase 3:**
- User accounts and wishlists
- Subscription service for products
- Interactive ingredient explorer
- AR product visualization (try products virtually)

---

## 15. Success Criteria

**Metrics:**
- Visual design matches luxury brand aesthetic
- Page loads in < 2 seconds on 4G
- Mobile-responsive across all devices
- Animations are smooth (60fps)
- Code is maintainable and well-documented

**User Experience:**
- Visitors understand brand positioning immediately
- Product information is clear and accessible
- Navigation is intuitive
- Site feels premium and trustworthy

---

## 16. Implementation Notes

**Development Approach:**
- Build components in isolation first
- Test each component's animations separately
- Assemble page from bottom-up (smallest components → sections → page)
- Use Tailwind @apply for repeated patterns
- Comment complex animation logic

**Git Strategy:**
- Initial setup: Next.js scaffold + dependencies
- Feature branches for each major component
- Commit after each working component
- Final: merge all to main

**Documentation:**
- README.md with setup instructions
- Component props documented with TypeScript
- Animation configs commented
- Image specs in each image folder

---

## Conclusion

This design specification provides a complete blueprint for building a premium, single-page luxury landing website for INOVE-CO. The combination of Next.js, Framer Motion, and Tailwind CSS will deliver a sophisticated, performant experience that reflects the brand's premium positioning while maintaining the flexibility to scale into a full e-commerce platform.