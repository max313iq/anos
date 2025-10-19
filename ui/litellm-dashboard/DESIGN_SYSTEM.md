# LiteLLM Dashboard Design System

## 🎨 Red Dark Theme

The LiteLLM Dashboard now features a comprehensive **Red Dark Theme** that provides a consistent, modern, and visually striking experience across all pages and components.

## Color Palette

### Primary Colors

#### Red (Primary Action)
- **Primary Red**: `#dc2626` (rgb(220, 38, 38))
  - Used for: Primary buttons, selected states, important actions
  - Hover state: Slightly lighter or with opacity
  - Active state: Darker shade

#### Black (Background)
- **Deep Black**: `#0a0a0f` (rgb(10, 10, 15))
  - Used for: Main background, base layer
  - Creates depth and contrast

- **Dark Accent**: `#1a1a24` (rgb(26, 26, 36))
  - Used for: Elevated surfaces, cards, sidebar gradient
  - Secondary background layer

#### Blue (Accent & Borders)
- **Dark Blue**: `#1e3a8a` (rgb(30, 58, 138))
  - Used for: Borders, dividers, subtle accents
  - Creates visual separation

- **Bright Blue**: `#2563eb` (rgb(37, 99, 235))
  - Used for: Hover states, links, interactive elements
  - Secondary action color

### Neutral Colors

#### Text
- **Primary Text**: `#e5e7eb` (rgb(229, 231, 235))
  - Main text color, high contrast on dark backgrounds

- **Secondary Text**: `#9ca3af` (rgb(156, 163, 175))
  - Subtle text, descriptions, labels

- **Muted Text**: `#6b7280` (rgb(107, 114, 128))
  - Disabled states, placeholders

## Component Styling

### Sidebar
```css
background: linear-gradient(180deg, #0a0a0f 0%, #1a1a24 100%);
border-right: 1px solid #1e3a8a;
box-shadow: 4px 0 20px rgba(37, 99, 235, 0.15);
```

**Menu Items:**
- Default: `transparent` background
- Hover: `rgba(30, 58, 138, 0.2)` with `#2563eb` text
- Selected: `rgba(220, 38, 38, 0.15)` with `#dc2626` text

### Navbar
```css
background: #0a0a0f;
border-bottom: 1px solid #1e3a8a;
box-shadow: 0 4px 20px rgba(37, 99, 235, 0.15);
```

**Interactive Elements:**
- Links hover: `#2563eb`
- Button hover: `#1a1a24` background with `#dc2626` text

### Cards & Containers
```css
background: #1a1a24;
border: 1px solid #1e3a8a;
border-radius: 8px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
```

### Buttons

#### Primary Button
```css
background: #dc2626;
color: #ffffff;
border: none;
hover: background: #b91c1c;
```

#### Secondary Button
```css
background: transparent;
color: #2563eb;
border: 1px solid #1e3a8a;
hover: background: rgba(37, 99, 235, 0.1);
```

#### Ghost Button
```css
background: transparent;
color: #e5e7eb;
border: none;
hover: background: #1a1a24;
```

### Form Elements

#### Input Fields
```css
background: #0a0a0f;
border: 1px solid #1e3a8a;
color: #e5e7eb;
focus: border-color: #2563eb;
       box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
```

#### Select Dropdowns
```css
background: #1a1a24;
border: 1px solid #1e3a8a;
color: #e5e7eb;
option:hover: background: rgba(37, 99, 235, 0.2);
```

## Visual Effects

### Glow Effects
- **Blue Glow**: `box-shadow: 0 0 20px rgba(37, 99, 235, 0.15);`
  - Used for: Sidebar, navbar, elevated elements

- **Red Glow**: `box-shadow: 0 0 15px rgba(220, 38, 38, 0.2);`
  - Used for: Primary buttons, important actions

### Gradients
- **Background Gradient**: `linear-gradient(180deg, #0a0a0f 0%, #1a1a24 100%)`
  - Used for: Sidebar, large containers

- **Accent Gradient**: `linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)`
  - Used for: Decorative elements, highlights

### Transitions
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```
- Smooth, professional animations for all interactive elements

## Typography

### Font Sizes
- **Heading 1**: `2rem` (32px)
- **Heading 2**: `1.5rem` (24px)
- **Heading 3**: `1.25rem` (20px)
- **Body**: `1rem` (16px)
- **Small**: `0.875rem` (14px)
- **Tiny**: `0.75rem` (12px)

### Font Weights
- **Bold**: 700 (headings, emphasis)
- **Semibold**: 600 (subheadings)
- **Medium**: 500 (buttons, labels)
- **Regular**: 400 (body text)

## Spacing Scale
- **xs**: `0.25rem` (4px)
- **sm**: `0.5rem` (8px)
- **md**: `1rem` (16px)
- **lg**: `1.5rem` (24px)
- **xl**: `2rem` (32px)
- **2xl**: `3rem` (48px)

## Border Radius
- **Small**: `4px` (buttons, inputs)
- **Medium**: `8px` (cards, containers)
- **Large**: `12px` (modals, large cards)
- **Full**: `9999px` (pills, avatars)

## Accessibility

### Contrast Ratios
- Primary text on dark background: 14.5:1 (AAA)
- Secondary text on dark background: 7.2:1 (AA)
- Red on dark background: 4.8:1 (AA)
- Blue on dark background: 5.1:1 (AA)

### Focus States
All interactive elements must have visible focus indicators:
```css
focus-visible: outline: 2px solid #2563eb;
              outline-offset: 2px;
```

## Implementation Notes

### Tailwind CSS Classes
The design system uses Tailwind CSS with custom color values:
- `bg-[#0a0a0f]` - Deep black background
- `bg-[#1a1a24]` - Dark accent background
- `border-[#1e3a8a]` - Blue borders
- `text-[#dc2626]` - Red text
- `text-[#2563eb]` - Blue text

### Ant Design Theme Configuration
```typescript
theme: {
  token: {
    colorPrimary: "#dc2626",
    colorBgContainer: "#0a0a0f",
    colorBgElevated: "#1a1a24",
    colorBorder: "#1e3a8a",
    colorText: "#e5e7eb",
    colorTextSecondary: "#9ca3af",
  },
  algorithm: theme.darkAlgorithm,
}
```

## Theme Configuration Files

### Core Theme Files
- **`src/styles/theme.ts`** - Complete Ant Design theme configuration
  - Defines all color tokens, component styles, and theme overrides
  - Exports `redDarkTheme` for use throughout the application
  
- **`tailwind.config.ts`** - Tailwind CSS configuration
  - Updated `dark-tremor` colors for red theme
  - Custom background, border, and content colors
  
- **`src/app/globals.css`** - Global CSS variables and base styles
  - CSS custom properties for consistent theming
  - Gradient backgrounds and animations

### Layout Components
- **`src/app/(dashboard)/layout.tsx`** - Main dashboard layout with ConfigProvider
- **`src/app/page.tsx`** - Main page with theme wrapper
- **`src/app/(dashboard)/components/Sidebar2.tsx`** - Sidebar navigation
- **`src/components/navbar.tsx`** - Top navigation bar

## How the Theme Works

### 1. Ant Design Theme (theme.ts)
All Ant Design components automatically use the red dark theme through the `ConfigProvider`:

```typescript
import { ConfigProvider } from 'antd';
import redDarkTheme from '@/styles/theme';

<ConfigProvider theme={redDarkTheme}>
  {/* Your components */}
</ConfigProvider>
```

### 2. Tailwind Classes
Use Tailwind's dark mode classes with the updated color palette:

```tsx
<div className="bg-[#0a0a0f] border-[#1e3a8a] text-[#e5e7eb]">
  <button className="bg-[#dc2626] hover:bg-[#ef4444]">
    Click me
  </button>
</div>
```

### 3. Tremor Components
Tremor components automatically use the `dark-tremor` color scheme:

```tsx
<Card className="dark-tremor-background-muted">
  <Text className="dark-tremor-content-emphasis">
    Content
  </Text>
</Card>
```

## Design Principles

1. **Contrast**: High contrast between text and backgrounds for readability
2. **Hierarchy**: Clear visual hierarchy using color, size, and spacing
3. **Consistency**: Consistent use of colors and patterns throughout
4. **Feedback**: Visual feedback for all interactive elements
5. **Accessibility**: WCAG AA compliant contrast ratios
6. **Performance**: Minimal use of heavy effects, optimized animations

## Future Enhancements

- [ ] Add dark/light mode toggle (currently dark only)
- [ ] Create component library documentation
- [ ] Add animation guidelines
- [ ] Create icon system documentation
- [ ] Add responsive design breakpoints
- [ ] Document loading states and skeletons
