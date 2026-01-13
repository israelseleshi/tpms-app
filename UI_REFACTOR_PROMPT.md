# Apple iOS Settings UI Refactor - Senior UI/UX Developer Prompt

## Context
Refactor entire Dashboard UI (including Case Flow, Invoices, and Reports) to match Apple iOS/macOS System Settings aesthetic.

## Core Objective
Implement tighter spacing, nested grouping, and San Francisco-inspired typography hierarchy to maximize information density while maintaining premium clarity.

## Technical Specifications

### Layout Hierarchy
- **Replace expansive horizontal cards with inset grouped lists**
- Use background color of `bg-slate-50` (Light Mode) or `bg-black` (Dark Mode)
- Main content areas should be wrapped in containers with `max-w-7xl mx-auto px-4` or `px-6` to feel centered and contained, like iOS Settings pane.

### Card & Component Styling
- **Apply a uniform border-radius: 12px or 16px to all primary containers**
- **Remove heavy shadows**: Replace them with a subtle `1px border (border-gray-200/50)` or very soft, layered ambient occlusion shadows
- **Implement Secondary Backgrounds**: Grouped items should sit inside a card with a white background, while the page body remains off-white.

### Typography & Spacing (The "Apple" Density)
- **Headers**: Reduce margin-bottom on page titles. Use `text-2xl` with `font-semibold` and `tracking-tight`
- **Item Spacing**: Reduce vertical padding in table rows and list items from current state to `py-2` or `py-3`
- **Iconography**: Ensure all sidebar and action icons use SF Symbols style (uniform line weight, centered in small rounded-square backgrounds where applicable)

## Apple Dark Mode Implementation

### Theme Infrastructure
- **Ensure next-themes is the single source of truth for theme state**
- **Clean up any hardcoded color values in components that interfere with the dark: utility class**
- **Use Next.js built-in dark: class for system-wide theme management**

### Apple Dark Palette Implementation
- **Primary Background**: Set to pure black `#000000` or a very deep gray `#1C1C1E` for main page body
- **Secondary Background (Cards/Grouped Sections)**: Use `#2C2C2E` for slightly "raised" effect against primary background
- **Tertiary Background (Inputs/Nested items)**: Use `#3A3A3C` for input fields or hover states
- **Vibrancy & Translucency**: Implement Apple's "Vibrancy" effect on sidebar and navigation using `bg-black/60` combined with `backdrop-blur-xl` and subtle top-border of `white/10` to simulate glassmorphism
- **Thin Border Color**: Use `white/15` for all cards and dividers to give them crisp definition in dark mode
- **Typography Hierarchy**: Primary text should be `white` or `gray-50`; secondary text should be `gray-400` or `white/60`
- **Accent Colors**: Use Apple's system tints (San Francisco Blue, Orange, and Green) but slightly desaturated for dark mode to maintain accessibility
- **Interactive States**: Buttons should use a subtle gradient or high-contrast tint with "pressed" state that slightly dims background

### Specific Page Refactors

## Implementation Priority
1. **Theme System Cleanup** - Remove all custom dark mode logic
2. **Next.js Themes Integration** - Implement proper dark mode with Apple colors
3. **Dashboard Page** - Apply new theme system
4. **Invoicing Page** - Apply new theme system  
5. **Case Flow Page** - Apply new theme system
6. **Reports Page** - Apply new theme system

## Expected Outcome
The final result should not just be "black text turned white," but a layered, high-fidelity dark interface where depth is communicated through shade elevation and translucency—exactly like iOS 18 / macOS Sequoia Dark Mode.

## Testing Checklist
- [ ] Theme system uses Next.js built-in dark: class
- [ ] Apple dark colors implemented correctly
- [ ] Glassmorphism effects work in dark mode
- [ ] All pages use consistent theme system
- [ ] Light mode still works perfectly
- [ ] Dark mode transitions are smooth
- [ ] No hardcoded colors interfering with theme system

This refactor will transform your TPMS dark mode from a flat black interface to a premium Apple-style layered dark interface with proper depth and translucency.

## Specific Page Refactors

### 1. Dashboard Page
```tsx
// Current: Wide cards with lots of whitespace
// Target: Inset grouped sections like iOS Settings

<div className="max-w-7xl mx-auto px-6 space-y-6">
  {/* Summary Section - Inset Card */}
  <div className="bg-white rounded-xl border border-slate-200/50 p-6">
    <h2 className="text-2xl font-semibold mb-4">Portfolio Overview</h2>
    {/* Compact metric grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Smaller metric cards */}
    </div>
  </div>
  
  {/* Recent Activity - Inset List */}
  <div className="bg-white rounded-xl border border-slate-200/50 p-6">
    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
    {/* Tight list items */}
  </div>
</div>
```

### 2. Case Flow Page
```tsx
// Convert horizontal "Workflow Stages" into compact segmented control
<div className="bg-white rounded-xl border border-slate-200/50 p-6">
  <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
    {/* Compact stage indicators */}
  </div>
</div>

// Stack metric cards into single summary section
<div className="bg-white rounded-xl border border-slate-200/50 p-6">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {/* Smaller, tighter metric displays */}
  </div>
</div>
```

### 3. Invoicing Page
```tsx
// Stack metric cards into single "Summary Section" with smaller text
<div className="bg-white rounded-xl border border-slate-200/50 p-6">
  <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {/* Compact metrics with smaller text */}
  </div>
</div>

// Table with tighter spacing
<div className="bg-white rounded-xl border border-slate-200/50 p-6">
  <table className="w-full">
    <tbody>
      {data.map(item => (
        <tr className="border-b border-slate-100 hover:bg-slate-50 py-2">
          {/* Tighter row spacing */}
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### 4. Reports Page
```tsx
// Similar inset card structure
<div className="max-w-7xl mx-auto px-6 space-y-6">
  <div className="bg-white rounded-xl border border-slate-200/50 p-6">
    {/* Export controls - tighter layout */}
  </div>
  
  <div className="bg-white rounded-xl border border-slate-200/50 p-6">
    {/* Summary cards - compact grid */}
  </div>
</div>
```

## Key Design Principles

### 1. The "Inset" Look
- Cards should not touch screen edges
- Consistent `mx-auto max-w-7xl px-6` wrapper
- `bg-white` cards on `bg-slate-50` background

### 2. Typography Hierarchy
- Page titles: `text-2xl font-semibold tracking-tight`
- Section headers: `text-xl font-semibold`
- Body text: `text-sm font-medium`
- Reduce all margins by 25-50%

### 3. Compact Spacing
- Main sections: `space-y-6` (reduced from `space-y-8`)
- Subsections: `space-y-4` (reduced from `space-y-6`)
- List items: `py-2` (reduced from `py-3`)
- Grid gaps: `gap-3` or `gap-4` (reduced from `gap-6`)

### 4. Visual Hierarchy
- Primary actions: `apple-tint-bg` (blue buttons)
- Secondary actions: `border border-slate-300 bg-white`
- Status indicators: Compact badges with `px-2 py-1`

### 5. Apple-Style Interactions
- Hover states: `hover:bg-slate-50` (subtle)
- Active states: `bg-slate-900 text-white` (strong contrast)
- Transitions: `transition-colors duration-150`

## Implementation Priority

1. **Dashboard Page** - Foundation for all other pages
2. **Invoicing Page** - Most complex, needs most work
3. **Case Flow Page** - Workflow visualization
4. **Reports Page** - Similar to invoicing structure

## CSS Classes to Apply

### New Utility Classes (add to globals.css if needed)
```css
.apple-inset-card {
  @apply bg-white rounded-xl border border-slate-200/50 p-6;
}

.apple-compact-list {
  @apply space-y-2;
}

.apple-tight-grid {
  @apply gap-3;
}
```

### Replace Existing Patterns
- Remove `glass-card` with heavy shadows
- Replace with `bg-white rounded-xl border border-slate-200/50`
- Reduce all `space-y-8` to `space-y-6`
- Reduce all `gap-6` to `gap-4`
- Reduce all `py-4` to `py-2`

## Expected Outcome
The dashboard should feel like a native Apple app—dense, functional, and organized into clearly defined "sections" rather than a series of floating boxes. Information density should increase by ~30% while maintaining excellent readability and the premium Apple aesthetic.

## Testing Checklist
- [ ] All pages use consistent inset card structure
- [ ] Spacing is tight but readable
- [ ] Typography hierarchy is clear
- [ ] Hover/active states are subtle but clear
- [ ] Mobile responsive with same density
- [ ] Dark mode works with new structure
- [ ] No functionality lost in refactor

This refactor will transform the TPMS from a generic web app to a premium Apple-style interface that users expect from modern professional software.
