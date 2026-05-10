---
name: Modern Tenant Management
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#464555'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#6b38d4'
  on-secondary: '#ffffff'
  secondary-container: '#8455ef'
  on-secondary-container: '#fffbff'
  tertiary: '#00505f'
  on-tertiary: '#ffffff'
  tertiary-container: '#006a7c'
  on-tertiary-container: '#93e8ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  h1:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
The design system is anchored in a philosophy of "Functional Elegance." It combines the technical precision of a high-performance productivity tool with the warmth of a hospitality service. The style is a synthesis of **Minimalism** and **Glassmorphism**, prioritizing clarity through generous whitespace while using translucent layers to create a sense of physical depth.

The target audience consists of property managers and tenants who value efficiency and transparency. This design system evokes a sense of reliability and speed, ensuring that complex financial and logistical data feels approachable and manageable.

## Colors
The palette is dominated by a deep, authoritative Indigo primary, which provides a professional foundation. To add the "expressive" quality, an accent gradient transitioning from **Indigo (#4F46E5) to Purple (#8B5CF6)** is utilized for primary actions, progress indicators, and featured states.

The background is a soft, off-white Gray (#F9FAFB), which reduces eye strain and allows white cards to pop with subtle elevation. Semantic colors for success, warning, and danger are highly saturated to ensure immediate recognition within high-density data tables.

## Typography
This design system utilizes **Inter** for its exceptional readability and neutral, modern character. Headlines (H1, H2) are set with a heavy weight and tight letter-spacing to create a "Linear-inspired" editorial feel. 

The body text defaults to a Medium weight (500) to ensure high legibility against white and translucent backgrounds. Small labels and status indicators use uppercase tracking to differentiate them from interactive text components.

## Layout & Spacing
The layout follows a **Fixed-Fluid hybrid grid**. Main content areas are contained within a 1280px maximum width for readability, while the sidebar remains fixed at a narrow width to maximize dashboard real estate. 

The spacing rhythm is based on a **4px baseline grid**. Generous padding (24px to 40px) is applied to containers to reinforce the premium, "un-cluttered" aesthetic. Elements within cards utilize a 16px (md) internal gutter to maintain a clean internal structure.

## Elevation & Depth
Depth is achieved through **Tonal Layering** and **Ambient Shadows**. This design system avoids harsh borders in favor of soft, multi-layered shadows that use a tiny hint of the primary Indigo color in the shadow mix to maintain warmth.

**Glassmorphism** is applied sparingly to high-level navigation elements (like the top Navbar) and side-drawers using a `backdrop-filter: blur(12px)` and a thin 1px white border at 20% opacity. This creates a "frosted glass" effect that feels light and premium.

## Shapes
The shape language is consistently "Soft-Large." Standard components like input fields and buttons use a **12px (0.75rem)** radius. Larger structural elements like cards and table containers use a **16px (1rem)** radius. Status badges and pills use a fully rounded (999px) "pill" shape to contrast against the more geometric cards.

## Components

### Buttons & Inputs
- **Primary Button:** Uses the Indigo-to-Purple gradient with a subtle inner-glow border and white text.
- **Input Fields:** Feature a #F3F4F6 background that shifts to white on focus, highlighted by a 2px Indigo ring.

### Stat Cards
- Large H2 metrics paired with a small trend indicator (e.g., "+12%").
- Backgrounds are pure white with a "Soft" shadow (15% opacity) and a 12px corner radius.

### Pill-Style Status Badges
- Used for payment status (e.g., "Paid", "Pending"). 
- High-contrast text on a low-opacity version of the status color (e.g., Success text on 10% Success green background).

### Rounded Tables
- Tables do not have vertical grid lines. 
- The entire table is wrapped in a container with a 16px radius and a subtle 1px gray border. Row hover states use a soft Indigo tint (#F5F3FF).

### Sidebar & Navigation
- The sidebar uses a slightly darker tint of the background (#F3F4F6) to create clear vertical segmentation.
- Navigation items use "ghost" styling—transparent by default, with a white "raised" card effect for the active state.