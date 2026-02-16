# NeutralAI Gateway - Website Design System

## Brand Identity

### Story
NeutralAI was born from a critical realization: as organizations rush to adopt AI, they're unknowingly exposing their most sensitive data. Our founders experienced this firsthand - watching companies inadvertently leak customer PII to AI systems. We built NeutralAI to create a shield between your data and AI, enabling innovation without compromise.

### Tagline
**"Protect Your Data. Empower Your AI."**

### Mission
Making AI safe for regulated industries by preventing sensitive data from reaching AI systems.

---

## Visual Identity

### Color Palette (Dark Futuristic + Trust)
| Role | Hex | Usage |
|------|-----|-------|
| Background Primary | `#030712` | Main background (gray-950) |
| Background Secondary | `#0F172A` | Cards, sections (slate-900) |
| Background Tertiary | `#1E293B` | Elevated elements (slate-800) |
| Primary | `#06B6D4` | Main accent - Cyan (trust + tech) |
| Primary Glow | `#22D3EE` | Hover states, highlights |
| Secondary | `#8B5CF6` | AI/Intelligence accent (purple) |
| CTA | `#F97316` | Orange - conversion buttons |
| CTA Hover | `#FB923C` | Orange light |
| Success | `#10B981` | Security indicators |
| Text Primary | `#F8FAFC` | Main text (slate-50) |
| Text Secondary | `#94A3B8` | Muted text (slate-400) |
| Text Tertiary | `#64748B` | Subtle text (slate-500) |
| Border | `#334155` | Dividers (slate-700) |
| Border Glow | `rgba(6, 182, 212, 0.3)` | Glowing borders |

### Typography
- **Headings:** `Space Grotesk` - tech, futuristic, bold
- **Body:** `DM Sans` - clean, readable, modern
- **Code/Tech:** `JetBrains Mono` - for technical elements

### Font Sizes
- Hero Title: 72px / 4.5rem
- Section Title: 48px / 3rem
- Subsection: 30px / 1.875rem
- Body Large: 20px / 1.25rem
- Body: 16px / 1rem
- Small: 14px / 0.875rem

---

## Page Sections

### 1. Navigation
- Fixed top, glassmorphism background
- Logo (left), Links (center), CTA button (right)
- Mobile: hamburger menu

### 2. Hero Section
- Headline: Bold statement about AI security
- Subheadline: Value proposition
- Dual CTAs: "Start Free Trial" + "Watch Demo"
- Animated background with subtle grid/particles
- Floating 3D-style cards showing "protected" data types

### 3. Problem Section (The Why)
- Real-world stats about AI data breaches
- Visual: Data leak visualization
- Emotional hook: "Your data is at risk"

### 4. Story Section (Our Journey)
- Timeline of why we built NeutralAI
- Founder insight
- "We've been there" credibility

### 5. Solution / How It Works
- Step-by-step visual flow
- Icons for each step
- Before/After comparison

### 6. Features Grid
- Card-based layout
- Key capabilities with icons
- Hover effects

### 7. Social Proof
- Client logos (trusted by)
- Testimonials
- Security certifications

### 8. Pricing
- Simple 3-tier pricing
- Highlighted "Most Popular"

### 9. CTA Section
- Final conversion push
- Trust badges

### 10. Footer
- Links, social, legal

---

## Animations & Effects

### Page Load
- Staggered fade-in from bottom
- Title animates in first, then subtitle, then CTAs

### Scroll Animations
- Elements fade/slide in as they enter viewport
- Parallax on hero background

### Micro-interactions
- Button hover: scale + glow
- Card hover: lift + border glow
- Link hover: underline animation

### Background Effects
- Subtle animated grid
- Floating particles (optional, performance-aware)
- Gradient orbs in background

---

## Component States

### Buttons
- Primary: Cyan bg, dark text
- Secondary: Transparent, cyan border
- CTA (Orange): Solid orange bg

### Cards
- Dark bg with subtle border
- Hover: cyan glow border + slight lift

### Inputs
- Dark bg, subtle border
- Focus: cyan glow border

---

## Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## Technical Implementation
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + custom animations
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Space Grotesk, DM Sans)
- **Animations:** Framer Motion
