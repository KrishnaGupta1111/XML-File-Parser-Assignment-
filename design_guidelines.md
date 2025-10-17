# CreditSea Design Guidelines

## Design Approach

**Selected Approach:** Design System-Based (Professional Financial Dashboard)
**Primary Reference:** Modern fintech applications (Stripe, Plaid) with clean data visualization principles
**Justification:** This is an information-dense, utility-focused financial application where trust, clarity, and data readability are paramount. Users need to quickly scan and understand credit information without visual distractions.

## Core Design Principles

1. **Trust & Credibility:** Professional aesthetic that instills confidence in financial data
2. **Data Clarity:** Information hierarchy that makes complex credit data easily scannable
3. **Efficiency First:** Streamlined interactions with minimal cognitive load
4. **Responsive Precision:** Consistent experience across all device sizes

## Color Palette

### Light Mode
- **Background:** 0 0% 100% (pure white)
- **Surface:** 220 15% 97% (light blue-gray for cards)
- **Border:** 220 13% 91% (subtle borders)
- **Text Primary:** 222 47% 11% (near black)
- **Text Secondary:** 215 16% 47% (muted slate)
- **Primary Brand:** 221 83% 53% (professional blue - trustworthy, financial)
- **Success:** 142 71% 45% (green for positive indicators)
- **Warning:** 38 92% 50% (amber for alerts)
- **Danger:** 0 84% 60% (red for overdues/issues)

### Dark Mode
- **Background:** 222 47% 11% (deep navy-black)
- **Surface:** 217 33% 17% (elevated slate)
- **Border:** 215 20% 25% (subtle borders)
- **Text Primary:** 0 0% 98% (near white)
- **Text Secondary:** 215 16% 65% (muted blue-gray)
- **Primary Brand:** 217 91% 60% (brighter blue for dark mode)
- **Success:** 142 76% 36% (darker green)
- **Warning:** 38 92% 50% (amber - same)
- **Danger:** 0 72% 51% (slightly muted red)

## Typography

**Font Families:**
- **Primary (UI/Body):** 'Inter' - Clean, highly legible for financial data
- **Display (Headers):** 'Inter' - Maintain consistency, use weight variation
- **Monospace (Account Numbers):** 'JetBrains Mono' - For account numbers, IDs, PAN

**Scale:**
- **Headings:** text-3xl font-bold (page titles), text-2xl font-semibold (section headers), text-xl font-semibold (subsections)
- **Body:** text-base (default content), text-sm (secondary info, labels)
- **Data Display:** text-lg font-medium (key metrics), text-2xl font-bold (credit scores)
- **Small Print:** text-xs (timestamps, metadata)

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-6 (cards), p-4 (nested sections)
- Section gaps: space-y-8 (major sections), space-y-4 (related items)
- Grid gaps: gap-6 (card grids), gap-4 (form fields)

**Container Strategy:**
- Max width: max-w-7xl for main content area
- Responsive padding: px-4 sm:px-6 lg:px-8
- Centered layout: mx-auto for content containers

## Component Library

### Navigation
- **Top Navigation Bar:** Sticky header with logo, navigation links, user profile/actions
- **Background:** Surface color with subtle bottom border
- **Height:** h-16, flex items-center
- **Logo Position:** Left-aligned with project name "CreditSea"

### Upload Section
- **Drop Zone Card:** Large dashed border card (border-2 border-dashed) with centered icon and text
- **Background:** Light surface with hover state showing primary color border
- **Icon:** Document/upload icon (Heroicons) at 48px size
- **CTA Button:** Solid primary color with white text, rounded-lg

### Report Cards
- **Grid Layout:** grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- **Card Style:** White/surface background, rounded-lg shadow-sm border
- **Hover Effect:** Subtle shadow-md transition with border-primary
- **Content:** Icon + Report ID + Date + View Details link

### Data Display Components

**Stat Cards (Report Summary):**
- Grid: grid grid-cols-2 md:grid-cols-4 gap-4
- Card: bg-surface rounded-lg p-6
- Structure: Label (text-sm text-secondary) + Value (text-2xl font-bold)
- Color coding: Green for positive metrics, red for issues

**Credit Score Display:**
- Large circular badge or prominent card: text-5xl font-bold
- Color-coded: 300-579 (danger), 580-669 (warning), 670-850 (success)
- Centered with label "Credit Score" below

**Account Tables:**
- Responsive table with striped rows (even:bg-surface/50)
- Headers: bg-surface font-semibold text-sm uppercase tracking-wide
- Cells: Comfortable padding (px-6 py-4)
- Account numbers: Monospace font
- Overdue amounts: Red text with font-semibold

**Info Sections:**
- Section headers with border-b pb-2 mb-4
- Key-value pairs in grid grid-cols-1 md:grid-cols-2 gap-4
- Labels: font-medium text-sm text-secondary
- Values: text-base text-primary

### Forms & Inputs
- **File Input:** Custom styled with hidden default input
- **Buttons:** 
  - Primary: bg-primary text-white hover:brightness-110 px-6 py-2.5 rounded-lg
  - Secondary: border border-current hover:bg-surface/50 px-6 py-2.5 rounded-lg
- **Input Fields:** (if needed) border border-input bg-background rounded-md px-3 py-2

### Overlays
- **Success Toast:** Fixed top-right, bg-success text-white, rounded-lg shadow-lg with checkmark icon
- **Error Alert:** bg-danger/10 border-l-4 border-danger text-danger rounded p-4
- **Loading State:** Centered spinner with "Processing..." text

## Animations

**Use Sparingly:**
- Card hover: Smooth scale or shadow transition (transition-all duration-200)
- Upload progress: Linear progress bar animation
- Data loading: Simple fade-in for content (opacity transition)
- Page transitions: None - instant navigation for data clarity

## Images

**No Hero Image Required** - This is a utility dashboard focused on data, not marketing.

**Icon Usage:**
- Use Heroicons via CDN (outline style for navigation, solid for emphasis)
- Document icon for upload area
- Chart/graph icons for report sections
- Shield/checkmark for credit status indicators
- Bank/credit card icons for account types

## Accessibility & Quality Standards

- Maintain WCAG AA contrast ratios minimum (4.5:1 for body text)
- All interactive elements have focus states with ring-2 ring-primary ring-offset-2
- Dark mode maintains consistent contrast and readability
- Form inputs include proper labels and error states
- Loading states provide clear feedback during XML processing
- Table data remains readable at all viewport sizes with horizontal scroll on mobile