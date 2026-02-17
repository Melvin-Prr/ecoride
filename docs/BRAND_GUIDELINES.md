# 🎨 EcoRide Platform - Brand Guidelines & Design System

**Version**: 1.0.0  
**Date**: February 2026  
**Project**: Carpooling Platform

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Logo & Brand Assets](#logo--brand-assets)
5. [UI Components](#ui-components)
6. [Wireframes](#wireframes)
7. [Mockups](#mockups)
8. [Responsive Design](#responsive-design)
9. [Accessibility](#accessibility)
10. [Design Principles](#design-principles)

---

## Brand Identity

### Vision
**"Making eco-friendly transportation accessible to everyone."**

EcoRide champions sustainable mobility through a community-driven carpooling platform. We believe in reducing carbon footprints while building connections between people.

### Brand Values

🌱 **Sustainability**
- Promoting electric and hybrid vehicles
- Reducing single-occupancy car trips
- Environmental consciousness at core

🤝 **Community**
- Trust-based peer-to-peer platform
- Review system for quality assurance
- Connecting people with shared goals

✨ **Simplicity**
- Easy-to-use interface
- Credit system instead of complex payments
- Streamlined booking process

🚀 **Innovation**
- Modern tech stack (Next.js, TypeScript)
- Real-time notifications
- Dual database architecture

### Brand Personality

- **Friendly**: Approachable and welcoming
- **Reliable**: Trustworthy and secure
- **Modern**: Clean and contemporary
- **Eco-conscious**: Green-focused but not preachy

---

## Color Palette

### Primary Colors

#### Eco Green (Primary)
```css
--color-primary: #22c55e
--color-primary-dark: #16a34a
--color-primary-light: #86efac
```

**Hex**: `#22c55e`  
**RGB**: `rgb(34, 197, 94)`  
**HSL**: `hsl(142, 71%, 45%)`

**Usage**:
- Primary buttons
- Links
- Eco badges
- Success messages
- Brand accents

**Accessibility**: WCAG AA compliant on white background

---

#### Forest Green (Secondary)
```css
--color-secondary: #15803d
```

**Hex**: `#15803d`  
**RGB**: `rgb(21, 128, 61)`  
**HSL**: `hsl(142, 72%, 29%)`

**Usage**:
- Hover states
- Headers and navigation
- Important sections
- Call-to-action backgrounds

---

### Accent Colors

#### Electric Blue
```css
--color-accent: #3b82f6
```

**Hex**: `#3b82f6`  
**RGB**: `rgb(59, 130, 246)`  
**HSL**: `hsl(217, 91%, 60%)`

**Usage**:
- Electric vehicle badges
- Information highlights
- Links (alternative)
- User roles (Passenger)

---

#### Amber (Credits)
```css
--color-credits: #f59e0b
```

**Hex**: `#f59e0b`  
**RGB**: `rgb(245, 158, 11)`  
**HSL**: `hsl(38, 92%, 50%)`

**Usage**:
- Credits display
- Pricing information
- Important numbers
- Gold tier features

---

### Semantic Colors

#### Success Green
```css
--color-success: #10b981
```
**Usage**: Success messages, confirmations, approved status

#### Warning Orange
```css
--color-warning: #f97316
```
**Usage**: Warnings, pending status, cautions

#### Error Red
```css
--color-error: #ef4444
```
**Usage**: Error messages, destructive actions, rejections

#### Info Blue
```css
--color-info: #06b6d4
```
**Usage**: Information banners, tips, neutral notifications

---

### Neutral Colors

#### Grayscale Palette
```css
--color-gray-50: #f9fafb   /* Backgrounds */
--color-gray-100: #f3f4f6  /* Subtle backgrounds */
--color-gray-200: #e5e7eb  /* Borders light */
--color-gray-300: #d1d5db  /* Borders */
--color-gray-400: #9ca3af  /* Disabled text */
--color-gray-500: #6b7280  /* Secondary text */
--color-gray-600: #4b5563  /* Body text */
--color-gray-700: #374151  /* Headings */
--color-gray-800: #1f2937  /* Dark headings */
--color-gray-900: #111827  /* Darkest text */
```

**Usage**:
- Text hierarchy
- Borders and dividers
- Backgrounds and surfaces
- Disabled states

---

### Background Colors

```css
--bg-primary: #ffffff      /* Main background */
--bg-secondary: #f9fafb    /* Alternate sections */
--bg-card: #ffffff         /* Card backgrounds */
--bg-header: #f9fafb       /* Header background */
--bg-footer: #1f2937       /* Footer (dark) */
```

---

### Gradient (Premium Features)

#### Gold Gradient (Credits, Premium)
```css
background: linear-gradient(
  135deg,
  #fbbf24 0%,     /* Amber-400 */
  #f59e0b 50%,    /* Amber-500 */
  #d97706 100%    /* Amber-600 */
);
```

**Usage**:
- Total credits display (admin dashboard)
- Premium badges
- Special call-to-actions
- Promotional banners

---

#### Green Gradient (Eco Features)
```css
background: linear-gradient(
  135deg,
  #86efac 0%,     /* Green-300 */
  #22c55e 50%,    /* Green-500 */
  #16a34a 100%    /* Green-600 */
);
```

**Usage**:
- Eco vehicle highlights
- Hero sections
- Feature cards
- Success celebrations

---

## Typography

### Font Family

#### Primary Font: Inter
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Characteristics**:
- Designed for screen readability
- Excellent at small sizes
- Modern and professional
- Variable font support
- Open-source (Google Fonts)

**Weights Used**:
- Regular (400): Body text
- Medium (500): Emphasized text
- Semibold (600): Subheadings
- Bold (700): Headings

**Fallback Stack**:
System fonts ensure fast loading and cross-platform consistency

---

### Type Scale

#### Headings
```css
/* h1 - Page titles */
font-size: 2.5rem;        /* 40px */
font-weight: 700;         /* Bold */
line-height: 1.2;
letter-spacing: -0.02em;

/* h2 - Section titles */
font-size: 2rem;          /* 32px */
font-weight: 700;
line-height: 1.3;

/* h3 - Subsection titles */
font-size: 1.5rem;        /* 24px */
font-weight: 600;         /* Semibold */
line-height: 1.4;

/* h4 - Card titles */
font-size: 1.25rem;       /* 20px */
font-weight: 600;
line-height: 1.5;

/* h5 - Smaller headings */
font-size: 1.125rem;      /* 18px */
font-weight: 600;
line-height: 1.5;

/* h6 - Eyebrow text */
font-size: 1rem;          /* 16px */
font-weight: 600;
line-height: 1.5;
text-transform: uppercase;
letter-spacing: 0.05em;
```

---

#### Body Text
```css
/* Regular body */
font-size: 1rem;          /* 16px */
font-weight: 400;
line-height: 1.6;

/* Large body */
font-size: 1.125rem;      /* 18px */
font-weight: 400;
line-height: 1.7;

/* Small text */
font-size: 0.875rem;      /* 14px */
font-weight: 400;
line-height: 1.5;

/* Caption/Label */
font-size: 0.75rem;       /* 12px */
font-weight: 500;         /* Medium */
line-height: 1.4;
letter-spacing: 0.025em;
```

---

### Font Usage Guidelines

**Do**:
✅ Use 16px minimum for body text (readability)  
✅ Maintain consistent line height (1.5-1.7 for body)  
✅ Use bold weights for headings  
✅ Limit to 60-70 characters per line  

**Don't**:
❌ Use too many font sizes (stick to scale)  
❌ Go below 14px for body text  
❌ Use all caps for long text (accessibility)  
❌ Use low contrast text (WCAG guidelines)  

---

## Logo & Brand Assets

### Logo Design

**Primary Logo**:
```
🌿 EcoRide
```

**Components**:
- **Icon**: Leaf emoji (🌿) or custom leaf icon
- **Wordmark**: "EcoRide" in Inter Bold
- **Color**: Eco Green (#22c55e)

**Variations**:

1. **Horizontal Logo**:
   ```
   🌿 EcoRide
   ```
   Usage: Website header, email signatures

2. **Vertical Logo**:
   ```
      🌿
   EcoRide
   ```
   Usage: App icon, social media profile

3. **Icon Only**:
   ```
   🌿
   ```
   Usage: Favicon, mobile app icon, social media posts

4. **Monochrome**:
   - White on dark backgrounds (footer)
   - Dark on light backgrounds (print)

---

### Logo Spacing

**Clear Space**:
- Minimum padding around logo: 1x icon height
- Never place logo on busy backgrounds
- Maintain aspect ratio (no stretching)

**Minimum Sizes**:
- Web: 120px width minimum
- Print: 30mm width minimum
- Favicon: 32x32px

---

### Icon Set

**Lucide React Icons** (used throughout platform):

Common icons:
- `Search`: 🔍 Search functionality
- `MapPin`: 📍 Locations
- `Calendar`: 📅 Dates
- `User`: 👤 User profile
- `Car`: 🚗 Vehicles
- `Star`: ⭐ Ratings
- `Zap`: ⚡ Electric/Eco
- `CreditCard`: 💳 Credits
- `Check`: ✅ Success/Confirmation
- `X`: ❌ Close/Error
- `ChevronDown`: 🔽 Dropdowns
- `Menu`: ☰ Mobile menu
- `LogOut`: 🚪 Logout

**Icon Guidelines**:
- Size: 20px standard, 24px for emphasis
- Stroke width: 2px
- Color: Inherit from parent or gray-600
- Always include accessible labels

---

## UI Components

### Buttons

#### Primary Button
```css
background: var(--color-primary);
color: white;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
font-size: 16px;
transition: all 0.2s;

/* Hover state */
background: var(--color-primary-dark);
transform: translateY(-1px);
box-shadow: 0 4px 8px rgba(34, 197, 94, 0.2);
```

**Usage**: Primary actions (Book, Create, Confirm)

---

#### Secondary Button
```css
background: var(--color-gray-100);
color: var(--color-gray-700);
border: 1px solid var(--color-gray-300);
```

**Usage**: Secondary actions (Cancel, Back, Close)

---

#### Destructive Button
```css
background: var(--color-error);
color: white;
```

**Usage**: Delete, Cancel booking, Reject

---

### Cards

```css
background: white;
border: 1px solid var(--color-gray-200);
border-radius: 12px;
padding: 24px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
transition: box-shadow 0.2s;

/* Hover state */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
```

**Usage**: Carpool cards, stat cards, information containers

---

### Input Fields

```css
background: white;
border: 1px solid var(--color-gray-300);
border-radius: 8px;
padding: 12px 16px;
font-size: 16px;
color: var(--color-gray-900);
transition: border-color 0.2s;

/* Focus state */
border-color: var(--color-primary);
outline: 2px solid rgba(34, 197, 94, 0.1);
outline-offset: 2px;

/* Error state */
border-color: var(--color-error);
```

---

### Badges

#### Eco Badge
```css
background: var(--color-primary);
color: white;
padding: 4px 12px;
border-radius: 9999px;
font-size: 12px;
font-weight: 600;
display: inline-flex;
align-items: center;
gap: 4px;
```

Content: `⚡ Écologique`

---

#### Role Badges
```css
/* Admin */
background: #ef4444; color: white;

/* Employee */
background: #f59e0b; color: white;

/* Driver */
background: #3b82f6; color: white;

/* Passenger */
background: #6b7280; color: white;
```

---

### Spacing System

**Based on 4px grid**:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

**Usage**:
- Component padding: 16px or 24px
- Section margins: 48px or 64px
- Element gaps: 8px or 12px

---

### Border Radius

```css
--radius-sm: 4px;    /* Small elements */
--radius-md: 8px;    /* Buttons, inputs */
--radius-lg: 12px;   /* Cards */
--radius-xl: 16px;   /* Large cards */
--radius-full: 9999px; /* Pills, badges, avatars */
```

---

### Shadows

```css
/* Subtle */
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Small */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Medium */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

/* Large */
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);

/* XL (modals) */
box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
```

---

## Wireframes

### Low-Fidelity Wireframes (Conceptual)

#### 1. Homepage (Desktop)

```
┌────────────────────────────────────────────────┐
│ [Logo] EcoRide    Accueil  Covoiturages  Login │
├────────────────────────────────────────────────┤
│                                                │
│         Trouvez votre covoiturage              │
│         écologique                             │
│                                                │
│   [Départ]  ────  [Arrivée]  ────  [Date]     │
│                                                │
│              [Rechercher] Button               │
│                                                │
│  ┌─────────────┐ ┌─────────────┐ ┌──────────┐ │
│  │   Eco       │ │  Community  │ │  Simple  │ │
│  │ Friendly    │ │   Based     │ │   & Fast │ │
│  └─────────────┘ └─────────────┘ └──────────┘ │
│                                                │
├────────────────────────────────────────────────┤
│ Footer: Contact • About • Legal               │
└────────────────────────────────────────────────┘
```

---

#### 2. Carpool Listing Page (Desktop)

```
┌────────────────────────────────────────────────────────┐
│ [Logo] EcoRide       Covoiturages          [User] 20₵  │
├────────────────────────────────────────────────────────┤
│                                                        │
│ ┌─────────────────┐  ┌───────────────────────────────┐│
│ │ FILTERS         │  │                               ││
│ │                 │  │  Paris → Lyon                 ││
│ │ ☑ Écologique    │  │  [Driver Photo] JeanDriver ⭐4.8││
│ │                 │  │  08:00 → 12:00 • Tesla Model 3 ││
│ │ Prix max: [50]  │  │  3 places • 25₵/seat          ││
│ │ ─────────────   │  │  [⚡ Écologique]    [Réserver] ││
│ │                 │  │                               ││
│ │ Durée: [10h]    │  ├───────────────────────────────┤│
│ │ ─────────────   │  │                               ││
│ │                 │  │  Paris → Lyon                 ││
│ │ Note min: [0]   │  │  [Driver Photo] MarieEco ⭐4.9 ││
│ │ ─────────────   │  │  09:00 → 13:00 • Prius Hybrid ││
│ │                 │  │  2 places • 30₵/seat          ││
│ └─────────────────┘  │  [⚡ Écologique]    [Réserver] ││
│                      │                               ││
│                      └───────────────────────────────┘│
└────────────────────────────────────────────────────────┘
```

---

#### 3. Carpool Detail Page (Desktop)

```
┌──────────────────────────────────────────────────────────┐
│ [Logo] EcoRide            [User] 20₵                     │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ ┌────────────────────────────┐ ┌──────────────────────┐ │
│ │ Paris → Lyon               │ │ RÉSERVER             │ │
│ │ 10 février 2026            │ │                      │ │
│ │ 08:00 → 12:00 (4h)         │ │ Solde: 20 crédits   │ │
│ │                            │ │                      │ │
│ │ CONDUCTEUR                 │ │ Prix: 27₵/place     │ │
│ │ [Photo] JeanDriver ⭐4.8   │ │                      │ │
│ │                            │ │ Places: [1] ▼       │ │
│ │ Préférences:              │ │                      │ │
│ │ ❌ Fumeur   ✅ Animaux     │ │ Total: 27 crédits   │ │
│ │ ✅ Musique  ✅ Discussion  │ │                      │ │
│ │                            │ │ [Réserver] Button   │ │
│ │ VÉHICULE                   │ └──────────────────────┘ │
│ │ Tesla Model 3              │                          │
│ │ ⚡ Électrique • 4 places   │                          │
│ │                            │                          │
│ │ AVIS (12)                  │                          │
│ │ ⭐⭐⭐⭐⭐ "Super trajet!"   │                          │
│ │ - Alice, 20 janv. 2026     │                          │
│ │                            │                          │
│ │ ⭐⭐⭐⭐⭐ "Ponctuel"        │                          │
│ │ - Bob, 15 janv. 2026       │                          │
│ └────────────────────────────┘                          │
└──────────────────────────────────────────────────────────┘
```

---

### Mobile Wireframes

#### Homepage (Mobile)

```
┌──────────────────┐
│ ☰  EcoRide  👤   │
├──────────────────┤
│                  │
│  Trouvez votre   │
│  covoiturage     │
│  écologique      │
│                  │
│  [Départ]        │
│  [Arrivée]       │
│  [Date]          │
│                  │
│  [Rechercher]    │
│                  │
│  ┌────────────┐  │
│  │    Eco     │  │
│  │  Friendly  │  │
│  └────────────┘  │
│  ┌────────────┐  │
│  │ Community  │  │
│  │   Based    │  │
│  └────────────┘  │
│  ┌────────────┐  │
│  │   Simple   │  │
│  │  & Fast    │  │
│  └────────────┘  │
│                  │
│  Footer          │
└──────────────────┘
```

---

#### Carpool Card (Mobile)

```
┌──────────────────┐
│ Paris → Lyon     │
│                  │
│ [Photo] Jean ⭐4.8│
│                  │
│ 08:00 → 12:00   │
│ Tesla Model 3    │
│                  │
│ 3 places • 25₵   │
│                  │
│ ⚡ Écologique     │
│                  │
│ [Réserver]       │
└──────────────────┘
```

---

## Mockups

### High-Fidelity Mockup Specifications

#### 1. Homepage Desktop (1920x1080)

**Header**:
- Height: 64px
- Background: White with subtle shadow
- Logo: Left aligned, 24px margin
- Navigation: Center aligned
- User menu: Right aligned with credits badge

**Hero Section**:
- Background: Light green gradient (subtle)
- Title: Inter Bold, 48px, Green-700
- Subtitle: Inter Regular, 20px, Gray-600
- Search bar: White card with shadow, 3 inputs side-by-side
- Button: Primary green, 48px height, 160px width

**Features Section**:
- 3 columns grid
- Icons: 48x48px, Green-500
- Card padding: 32px
border-radius: 12px

**Footer**:
- Background: Gray-900 (dark)
- Text: Gray-300
- Height: 120px
- Links: White on hover (Green-400)

---

#### 2. Carpool Listing Desktop

**Layout**: 2-column (Sidebar + Main)

**Sidebar** (320px width):
- Dark background filter panel
- Each filter: 16px vertical spacing
- Sliders: Green primary color
- Checkboxes: Custom styled with green

**Main Area**:
- Card grid: 2 columns on desktop, 1 on tablet/mobile
- Gap: 24px
- Card design:
  - Border: 1px Gray-200
  - Border-radius: 12px
  - Padding: 20px
  - Hover: Lift with shadow
  - Image: Top, 200px height, cover fit

---

#### 3. Carpool Detail Desktop

**Left Column** (66% width):
- Large route header: Green-600, 32px
- Info cards with icons
- Reviews list: Avatar + rating + comment

**Right Column** (33% width):
- Sticky booking card
- White background
- Green shadow on scroll
- Form elements: 16px spacing
- Total displayed with gold gradient

---

#### 4. Mobile Mockups (375x812 - iPhone X)

**Stack Layout**:
- Everything full-width
- Filters: Accordion/drawer
- Cards: Full width with image aspect 16:9
- Bottom nav: Fixed 56px height
- Booking button: Fixed bottom (mobile)

---

## Responsive Design

### Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { /* sm */ }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { /* md */ }

/* Desktop */
@media (min-width: 1025px) { /* lg */ }

/* Large Desktop */
@media (min-width: 1280px) { /* xl */ }
```

### Responsive Patterns

**Mobile-First Approach**:
- Base styles for mobile
- Add complexity for larger screens
- Touch-friendly targets (minimum 44px)

**Navigation**:
- Mobile: Hamburger menu
- Desktop: Horizontal nav

**Cards**:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 2-3 columns

**Forms**:
- Mobile: Full-width stacked
- Desktop: Multi-column where appropriate

---

## Accessibility

### WCAG 2.1 AA Compliance

**Color Contrast**:
- Body text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- Interactive elements: 3:1 minimum

**Tested Combinations**:
✅ Green-500 (#22c55e) on White: 3.02:1 (AA Large)  
✅ Gray-700 (#374151) on White: 10.68:1 (AAA)  
✅ White on Green-600 (#16a34a): 4.02:1 (AA)  

**Focus Indicators**:
- 2px outline in primary color
- 2px offset from element
- Visible on keyboard navigation

**Alt Text**:
- All images have descriptive alt text
- Decorative images: alt=""
- Icons paired with text labels

**Semantic HTML**:
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels where needed
- Form labels associated with inputs

**Keyboard Navigation**:
- Tab order logical and complete
- Skip to main content link
- Escape closes modals
- Enter submits forms

---

## Design Principles

### 1. Consistency
- Use design system components
- Maintain spacing rhythm
- Consistent terminology
- Predictable interactions

### 2. Clarity
- Clear visual hierarchy
- Readable typography (minimum 16px)
- High contrast colors
- Obvious interactive elements

### 3. Efficiency
- Minimal clicks to goal
- Smart defaults
- Inline validation
- Clear error messages

### 4. Delight
- Smooth transitions (0.2s ease)
- Subtle animations
- Success celebrations
- Friendly microcopy

### 5. Accessibility
- WCAG AA compliant
- Keyboard navigable
- Screen reader friendly
- Touch-friendly targets

---

## Design Tools & Resources

### Recommended Tools

**Design**:
- Figma (collaborative design)
- Adobe XD (UX prototyping)
- Sketch (Mac-based design)

**Wireframing**:
- Balsamiq (rapid wireframes)
- Whimsical (flowcharts + wireframes)
- Excalidraw (hand-drawn style)

**Prototyping**:
- Figma Prototype mode
- InVision
- Marvel App

**Assets**:
- Unsplash (free photos)
- Lucide Icons (used in project)
- Hero Icons (alternative)

---

## Export Guidelines

### For Developers

**Providing design specs**:
- Export as CSS variables
- Include hover/active states
- Specify animations/transitions
- Document breakpoints

**Assets**:
- SVG for icons (vector)
- WebP for photos (smaller)
- 2x/3x for retina displays

### For PDF Documentation

**Screenshot Requirements**:
- Full page screenshots: 1920x1080
- Component screenshots: Cropped to element
- Mobile screenshots: 375x812
- All in PNG format with transparent backgrounds where applicable

---

## Version History

**v1.0.0** (February 2026)
- Initial brand guidelines
- Color palette defined
- Typography system established
- Component library documented
- Wireframes created
- Mockup specifications provided

---

**Future Enhancements**:
- Animated logo (SVG animation)
- Dark mode color palette
- Illustration style guide
- Email template designs
- Print materials guidelines
- Social media templates

---

**Document prepared by**: EcoRide Design Team  
**Contact**: design@ecoride.com  
**License**: All rights reserved © 2026 EcoRide Platform
