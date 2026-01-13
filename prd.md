# Product Requirements Document: TPMS (Trademark Practice Management System)

## 1. Project Overview
**TPMS** is a high-end, specialized SaaS platform designed for trademark attorneys and IP firms. The system transitions from a simple "tracking list" to an active "practice manager" by automating workflows and linking legal actions directly to financial billing.

## 2. Target Audience
- **Lead Attorneys:** To monitor firm-wide revenue and high-level case statuses.
- **Paralegals:** To manage daily filings, deadlines, and document drafting.
- **Finance Officers:** To track government fee disbursements and professional service invoicing.

## 3. Feature Specifications

### A. Core Portfolio Management
- **Centralized Registry:** A searchable, filterable database of all marks.
- **Jurisdictional Intelligence:** Deep support for **Ethiopia (ET)** including EIPA-specific status tracking and ETB currency handling alongside international marks (US, EU, UK).
- **Class Management:** Support for the Nice Classification system (Classes 1-45).

### B. Advanced Case Flow Engine (The "Workflow" Layer)
- **Life-Cycle Pipeline:** A visual board (Kanban) representing the trademark stages:
  1. Intake/Searching
  2. Formal Filing
  3. Office Action/Examination (Critical State)
  4. Publication/Opposition Period
  5. Registration & Maintenance
- **Automated Trigger Logic:** - *Logic:* If Status == "Office Action", Create Task "Draft Response to Examiner" with a 30-day deadline.
    - *Logic:* If Status == "Registration", Create Task "Send Certificate to Client" and trigger "Final Invoice" prompt.

### C. Financial & Invoicing Layer
- **Fee Schedules:**
    - **Official Fees:** Pre-defined costs for filing in specific jurisdictions (e.g., EIPA filing fees in ETB).
    - **Professional Fees:** Hourly or flat rates for attorney services.
- **One-Click Invoicing:** Generate professional UI-based invoices (and future PDF export) that auto-populate:
    - Mark Name & Logo (if available).
    - Application Number.
    - Detailed line items for gov fees vs. service fees.
- **Revenue Dashboard:** Visual charts (using shadcn/Chart) showing:
    - Total Billed vs. Collected.
    - Pending Invoices by age (30/60/90 days).

## 4. User Journeys
1. **Intake:** User adds a new mark -> System asks for jurisdiction -> System sets default fee schedule -> First task "Initial Search" is auto-created.
2. **Response:** User receives an Office Action -> Status is updated -> System moves card to "Action Required" column -> Attorney is notified via the dashboard.
3. **Billing:** User finishes a filing -> Clicks "Generate Invoice" -> System pulls all metadata into a modal -> User confirms -> Invoice status becomes "Invoiced".

## 5. Non-Functional Requirements
- **Performance:** Dashboard must load in < 1.5s using Next.js 14 Streaming.
- **Security:** Row Level Security (RLS) in Supabase ensures attorneys only see their assigned clients.
- **Aesthetic:** Must feel like a "Premium" tool—using Cult UI motion effects to differentiate from generic "spreadsheet-style" legal software.

---

## 6. Jurisdiction Logic: Ethiopia (ET) Focus
- **Currency:** Handle conversion/display for ETB.
- **Dates:** Ensure filing deadlines account for Ethiopian holidays if possible (Future Phase).
- **Agency:** Default agency name to "Ethiopian Intellectual Property Authority (EIPA)".