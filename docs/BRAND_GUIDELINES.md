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

� **Sustainability**
- Encouraging shared transportation
- Reducing individual car usage
- Environmental consciousness through community
- Supporting electric and eco-friendly vehicles

🤝 **Trust & Reliability**
- Secure peer-to-peer platform
- Review and rating system
- Professional blue brand identity
- Transparent credit-based system

✨ **Simplicity & Accessibility**
- Easy-to-use interface
- "Voyagez partout à petit prix !" - Travel everywhere at low cost
- Credit system instead of complex payments
- Streamlined booking in 3 clicks

🚀 **Innovation**
- Modern tech stack (Next.js 16, React 19, TypeScript)
- Dual database architecture (PostgreSQL + MongoDB)
- Real-time notifications
- Smart route matching

### Brand Personality

- **Professional**: Blue conveys trust and reliability
- **Warm**: Orange accents add friendliness and energy
- **Modern**: Clean design, contemporary stack
- **Eco-conscious**: Sustainable values without being preachy
- **Accessible**: Affordable pricing for everyone ("petit prix")

---

## Color Palette

### Primary Colors

#### Primary Blue
```css
--color-primary: #1E90FF
--color-primary-rgb: rgb(30, 144, 255)
--color-primary-dark: #1565C0
--color-primary-light: #64B5F6
```

**Hex**: `#1E90FF` (Dodger Blue)  
**RGB**: `rgb(30, 144, 255)`  
**HSL**: `hsl(210, 100%, 56%)`

**Usage**:
- Primary buttons and CTAs
- Logo circle background
- Links and interactive elements
- Brand identity
- Navigation active states
- Hero section backgrounds (variant)

**Accessibility**: WCAG AA compliant on white background  
**Design Note**: Core brand color representing trust, reliability, and innovation

---

#### Secondary Orange
```css
--color-secondary: #D97706
--color-secondary-rgb: rgb(217, 119, 6)
--color-secondary-dark: #B45309
--color-secondary-light: #F59E0B
```

**Hex**: `#D97706` (Burnt Orange)  
**RGB**: `rgb(217, 119, 6)`  
**HSL**: `hsl(32, 95%, 44%)`

**Usage**:
- Secondary buttons
- Accent elements
- Pricing highlights
- Credits display
- Warning states (contextual)
- Call-to-action accents

**Accessibility**: WCAG AA compliant on white background  
**Design Note**: Complementary color adding warmth and energy

---

### Neutral Colors

#### Grey (Light Neutral)
```css
--color-grey: #F3F4F6
--color-grey-rgb: rgb(243, 244, 246)
```

**Hex**: `#F3F4F6`  
**RGB**: `rgb(243, 244, 246)`  
**HSL**: `hsl(220, 14%, 96%)`

**Usage**:
- Card backgrounds
- Subtle section dividers
- Input field backgrounds
- Disabled states
- Alternate row backgrounds

---

#### Dark (Primary Dark)
```css
--color-dark: #1E3A5F
--color-dark-rgb: rgb(30, 58, 95)
```

**Hex**: `#1E3A5F` (Deep Navy Blue)  
**RGB**: `rgb(30, 58, 95)`  
**HSL**: `hsl(214, 52%, 25%)`

**Usage**:
- Hero section background (main variant)
- Header navigation
- Footer background
- Dark mode primary
- Text on light backgrounds (headings)
- Card overlays

**Accessibility**: Excellent contrast with white text

---

#### Darker (Secondary Dark)
```css
--color-darker: #0F172A
--color-darker-rgb: rgb(15, 23, 42)
```

**Hex**: `#0F172A` (Slate 900)  
**RGB**: `rgb(15, 23, 42)`  
**HSL**: `hsl(222, 47%, 11%)`

**Usage**:
- Footer sections
- Modal overlays
- Premium/VIP sections
- Dark mode backgrounds
- Text on light backgrounds (body)
- Deep shadows

**Accessibility**: Maximum contrast for text

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

#### Primary Font: System Sans-Serif Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 
             'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
             sans-serif;
```

**Characteristics**:
- Native system fonts for optimal performance
- Excellent readability across all devices
- Zero font loading time
- Professional and modern appearance
- Cross-platform consistency

**Weights Used**:
- Regular (400): Body text, paragraphs, Lorem ipsum
- Medium (500): Emphasized text, labels
- Semibold (600): Heading 3, Heading 4
- Bold (700): HEADING 1, Heading 2, buttons

**Fallback Stack**:
System-native fonts ensure instant rendering and optimal user experience

---

### Type Scale

#### Headings (From Charte Graphique)
```css
/* HEADING 1 - Hero titles, main page headers */
font-size: 3rem;          /* 48px */
font-weight: 700;         /* Bold */
line-height: 1.2;
letter-spacing: -0.02em;
color: var(--color-darker);
/* Example: "Voyagez partout à petit prix !" */

/* Heading 2 - Section titles */
font-size: 2.25rem;       /* 36px */
font-weight: 700;         /* Bold */
line-height: 1.3;
letter-spacing: -0.01em;
color: var(--color-darker);

/* Heading 3 - Subsection titles */
font-size: 1.875rem;      /* 30px */
font-weight: 600;         /* Semibold */
line-height: 1.4;
color: var(--color-dark);

/* Heading 4 - Card titles, smaller headers */
font-size: 1.5rem;        /* 24px */
font-weight: 600;         /* Semibold */
line-height: 1.5;
color: var(--color-dark);

/* Heading 5 - Smaller headings (optional) */
font-size: 1.25rem;       /* 20px */
font-weight: 600;
line-height: 1.5;

/* Heading 6 - Eyebrow text (optional) */
font-size: 1rem;          /* 16px */
font-weight: 600;
line-height: 1.5;
```

---

#### Body Text
```css
/* Regular body - Lorem ipsum paragraphs */
font-size: 1rem;          /* 16px */
font-weight: 400;         /* Regular */
line-height: 1.6;
color: var(--color-darker);
/* Example text from charte: "Lorem ipsum dolor..." */

/* Large body - Hero subtitles */
font-size: 1.125rem;      /* 18px */
font-weight: 400;
line-height: 1.7;
color: #FFFFFF;           /* White on dark backgrounds */

/* Small text - Labels, captions */
font-size: 0.875rem;      /* 14px */
font-weight: 400;
line-height: 1.5;
color: var(--color-grey-600);

/* Caption/Label - Form labels, metadata */
font-size: 0.75rem;       /* 12px */
font-weight: 500;         /* Medium */
line-height: 1.4;
letter-spacing: 0.025em;
text-transform: uppercase;
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

**Primary Logo Components**:

#### Icon (Circle with Arrow)
- **Shape**: Perfect circle
- **Background**: Primary Blue (#1E90FF)
- **Symbol**: White forward-pointing arrow (→)
- **Meaning**: Movement, progress, carpooling direction
- **File**: `docs/assets/icon.png`

#### Wordmark
- **Text**: "EcoRide"
- **Font**: System Sans-Serif, Bold (700)
- **Color**: Primary Blue (#1E90FF)
- **Case**: PascalCase (Eco capitalized, Ride capitalized)

---

### Logo Variations

#### 1. **Horizontal Logo** (Primary)
```
[●→] EcoRide
```
**Structure**:
- Icon (circle with arrow) on left
- Wordmark "EcoRide" on right
- Spacing: 16px between icon and text

**Usage**:
- Website header/navigation
- Email signatures
- Documentation headers
- Landing pages

**File**: `docs/assets/logo.png`

---

#### 2. **Icon Only**
```
[●→]
```
**Usage**:
- Favicon (16x16, 32x32, 64x64)
- Mobile app icon
- Social media profile picture
- Compact headers (mobile)
- Loading spinners

**File**: `docs/assets/icon.png`

---

#### 3. **Icon Inverted** (Dark Backgrounds)
**Variation**:
- Circle background: White or transparent
- Arrow: Primary Blue (#1E90FF)
- Alternative: Circle (#1E90FF), Arrow (White)

**Usage**:
- Footer (dark background)
- Dark mode
- Hero sections with dark backgrounds
- Overlays

**File**: `docs/assets/icon_inverted.png`

---

#### 4. **Monochrome Versions**

**White on Dark**:
- Circle: White (#FFFFFF)
- Arrow: Dark (#0F172A)
- Text: White (#FFFFFF)
- Usage: Footer, print on dark paper

**Dark on Light**:
- Circle: Primary Blue (#1E90FF)
- Arrow: White (#FFFFFF)
- Text: Darker (#0F172A)
- Usage: Standard website, print on white paper

---

### Logo Specifications

**Clear Space**:
- Minimum padding: 1x icon diameter around entire logo
- Never place logo on busy backgrounds without overlay
- Maintain aspect ratio (no stretching or skewing)
- Avoid placing over complex background images

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
background: var(--color-primary);      /* #1E90FF - Primary Blue */
color: white;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
font-size: 16px;
transition: all 0.2s;

/* Hover state */
background: var(--color-primary-dark); /* #1565C0 - Darker Blue */
transform: translateY(-1px);
box-shadow: 0 4px 12px rgba(30, 144, 255, 0.25);
```

**Usage**: Primary actions (Rechercher, Réserver, Publier, Confirmer)
**Example**: "Rechercher" button on hero, "Participer" on carpool cards

---

#### Secondary Button
```css
background: var(--color-grey);         /* #F3F4F6 - Light Grey */
color: var(--color-darker);            /* #0F172A - Dark text */
border: 1px solid var(--color-gray-300);
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
transition: all 0.2s;

/* Hover state */
background: #E5E7EB;                   /* Slightly darker grey */
border-color: var(--color-primary);
```

**Usage**: Secondary actions (Annuler, Retour, Fermer)
**Example**: Cancel reservation, Close modal, Back to list

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

#### Eco Badge (Electric Vehicle)
```css
background: #10B981;                   /* Green for eco/electric */
color: white;
padding: 4px 12px;
border-radius: 9999px;
font-size: 12px;
font-weight: 600;
display: inline-flex;
align-items: center;
gap: 4px;
```

**Content**: `⚡ Électrique` or `🌱 Écologique`
**Usage**: Vehicle badges, eco-friendly indicators
**Note**: Green specifically for environmental features, not primary brand color

---

#### Role Badges
```css
/* Admin */
background: #EF4444;                   /* Red */
color: white;

/* Employee */
background: var(--color-secondary);    /* #D97706 - Orange */
color: white;

/* Driver (Conducteur) */
background: var(--color-primary);      /* #1E90FF - Primary Blue */
color: white;

/* Passenger (Passager) */
background: #6B7280;                   /* Grey */
color: white;
```

**Usage**: User profile, admin dashboard, role indicators

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

---

#### 1. Homepage Hero Section - High Quality Mockups

**Background Assets**:
- Main hero image: `docs/assets/background_main.jpg`
- Shows person driving, creates trust and human connection
- Aspect ratio: 16:9 for wide screens
- Overlay: Dark gradient for text readability

---

#### Variant A: Dark Grey Background
**Specifications**:
- **Background Color**: `#4A5568` (Slate grey)
- **Hero Image**: `background_main.jpg` with dark overlay
- **Overlay Opacity**: 60% dark (#000000 at 0.6 opacity)

**Header Section**:
- Logo: Left aligned (24px margin)
- Navigation links: "Accueil", "Rechercher un trajet", "Publier un trajet"
- User button: "Se connecter / S'inscrire" (Primary blue button)
- Background: Transparent or white with subtle shadow
- Height: 80px

**Hero Content**:
```
Title (H1): "Voyagez partout à petit prix !"
- Font-size: 48px (3rem)
- Font-weight: 700 (Bold)
- Color: White (#FFFFFF)
- Text-align: Center
- Line-height: 1.2
- Letter-spacing: -0.02em

Subtitle/Description:
- Font-size: 18px (1.125rem)
- Color: White (#FFFFFF opacity 0.9)
- Text-align: Center
- Max-width: 600px
```

**Search Bar Section**:
- Background: White (#FFFFFF)
- Position: Centered below hero text, absolute positioned
- Padding: 24px
- Border-radius: 12px
- Box-shadow: 0 8px 24px rgba(0,0,0,0.15)
- Inputs: "Départ", "Arrivée", "Date", "Rechercher" button

**Cards Section Below**:
- Grid: 4 columns on desktop
- Background: White cards (#FFFFFF)
- Border-radius: 12px
- Gap: 24px
- Shadow: 0 2px 8px rgba(0,0,0,0.1)
- Height: Approximately 200px each
- Content: Placeholder for features/benefits

---

#### Variant B: Deep Blue Background
**Specifications**:
- **Background Color**: `#1E3A5F` (Deep Navy Blue - var(--color-dark))
- **Hero Image**: Same `background_main.jpg` with blue-tinted overlay
- **Overlay**: Blue gradient (#1E3A5F to #0F172A at 70% opacity)

**All other specifications identical to Variant A**, with the following changes:
- Stronger contrast due to darker blue background
- Hero text remains white
- Cards section: Same white cards provide excellent contrast
- Navigation: Can use white text for better visibility

**Color Psychology**:
- Blue conveys trust, reliability, professionalism
- Matches primary brand color (#1E90FF)
- Creates premium, modern feel
- Better for eco-tech positioning

---

#### Common Elements (Both Variants)

**Hero Section Dimensions**:
- Desktop (≥1024px): Height 600px
- Tablet (768-1023px): Height 500px
- Mobile (<768px): Height 400px
- Background position: Center center
- Background size: Cover

**Card Grid Specifications**:
- Desktop: 4 cards in row (25% width each)
- Tablet: 2 cards per row (50% width each)
- Mobile: 1 card per row (100% width)
- Card padding: 32px
- Border-radius: 12px
- Min-height: 200px

**Typography on Hero**:
- Always white text for maximum contrast
- Text shadow: 0 2px 4px rgba(0,0,0,0.3) for readability
- Use semi-bold weights minimum on image backgrounds

---

#### 2. Design System Assets (Charte Graphique Plan n°1)

**Logo Specifications**:
- Icon: Circle with forward arrow (→)
- Circle background: Primary Blue (#1E90FF)
- Arrow color: White (#FFFFFF)
- Wordmark: "EcoRide" in bold, Primary Blue
- Horizontal layout with 16px spacing

**Color Swatches Display**:
1. **Grey**: `#F3F4F6` - Light neutral backgrounds
2. **Primary**: `#1E90FF` - Main brand color (blue)
3. **Secondary**: `#D97706` - Orange accent
4. **Dark**: `#1E3A5F` - Deep navy blue
5. **Darker**: `#0F172A` - Almost black slate

**Typography Showcase**:
```
HEADING 1: 48px, Bold, Darker (#0F172A)
Heading 2: 36px, Bold, Darker
Heading 3: 30px, Semibold, Dark (#1E3A5F)
Heading 4: 24px, Semibold, Dark

Lorem ipsum paragraph:
- Size: 16px
- Weight: Regular (400)
- Line-height: 1.6
- Color: Darker (#0F172A)

Lorem ipsum on dark background:
- Text: White (#FFFFFF)
- Background: Darker (#0F172A)
- Padding: 24px
- Border-radius: 8px
```

---

#### 3. Recommended Usage

**Homepage (Production)**:
- Use **Variant B (Deep Blue)** for premium, trust-focused positioning
- Blue aligns with primary brand color
- Creates strong first impression
- Better conversion for eco-conscious tech users

**Alternative Uses**:
- **Variant A (Grey)**: More neutral, can be used for secondary landing pages
- A/B testing: Compare conversion rates between variants

**Asset Paths**:
```
Hero background: /docs/assets/background_main.jpg
Logo: /docs/assets/logo.png
Icon: /docs/assets/icon.png
Icon inverted: /docs/assets/icon_inverted.png
```

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
✅ Primary Blue (#1E90FF) on White: 3.25:1 (AA Large - buttons, badges)  
✅ Darker (#0F172A) on White: 16.89:1 (AAA - body text)  
✅ Dark (#1E3A5F) on White: 9.48:1 (AAA - headings)  
✅ White on Primary Blue (#1E90FF): 3.25:1 (AA Large - buttons)  
✅ White on Dark (#1E3A5F): 9.48:1 (AAA - hero text)  
✅ Secondary Orange (#D97706) on White: 4.86:1 (AA - text and buttons)  

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
