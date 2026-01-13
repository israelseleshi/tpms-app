# Design System: TPMS Institutional Minimalism

## 1. Typography (Public Sans)
- **Primary Font:** Public Sans (Google Fonts / USWDS).
- **Rationale:** A neutral, strong, and highly legible typeface designed for interfaces. 
- **Scale:**
    - **Display:** 32px / SemiBold / Tracking -0.02em (Dashboard Headers)
    - **Heading:** 24px / SemiBold (Section Titles)
    - **Subheading:** 18px / Medium (Card Titles)
    - **Body:** 16px / Regular (Standard Text)
    - **Data:** 14px / Medium (Table Content, Dates, Currency)

## 2. Color Palette (Strict 3-Tone System)
To maintain a high-end, professional look, we avoid all gradients and limit core colors.

| Role | Color Name | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | Midnight Indigo | `#1E293B` | Sidebar, Headings, Primary Text |
| **Accent** | Legal Blue | `#2563EB` | Primary Buttons, Active Tabs, Key Links |
| **Surface** | Stark White | `#FFFFFF` | Page Background, Cards, Input Fields |
| **Neutral** | Soft Slate | `#F1F5F9` | Borders, Secondary Backgrounds, Hover States |

## 3. Component Architecture (No-Gradient Rule)
- **Buttons:** - *Primary:* Solid `#2563EB` with White text. No shadows.
    - *Secondary:* Solid `#F1F5F9` with `#1E293B` text.
- **Cards:** - Flat white background. 
    - 1px border using `#E2E8F0`. 
    - No drop shadows (unless used to indicate depth in Modals).
- **Status Indicators:** Use flat color pills (No Glows):
    - *Filing:* Blue `#DBEAFE` text `#1E40AF`
    - *Office Action:* Amber `#FEF3C7` text `#92400E`
    - *Registered:* Green `#DCFCE7` text `#166534`

## 4. Jurisdiction Logic (ET Focus)
- **Ethiopia (ET) Style:** - Use the standard Midnight Indigo for ET-related badges.
    - Financial values in ETB should be bolded for clarity.
    - Date displays: `13 Jan 2026` (Abbreviated month for professional scanning).

## 5. Cult UI Integration (Static Refinement)
Even without gradients, we use Cult UI for **structural motion**:
- **Text Reveal:** Simple opacity fade-in for headers.
- **Bento Grid:** Strict geometric layouts for the Dashboard.
- **Micro-interactions:** 200ms ease-in-out transitions for all hover states.