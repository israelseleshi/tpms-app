# Trademark Practice Management System (TPMS)

A high-end, specialized SaaS platform designed for trademark attorneys and IP firms. TPMS transitions from simple "tracking" to active "practice management" by automating workflows and linking legal actions directly to financial billing.

## 🎯 Core Features

### Portfolio Management
- **Centralized Registry**: Searchable database of all trademark marks
- **Jurisdictional Intelligence**: Deep support for Ethiopia (ET) with EIPA-specific tracking
- **Class Management**: Full Nice Classification support (Classes 1-45)

### Workflow Automation
- **Life-Cycle Pipeline**: Visual Kanban board for trademark stages
- **Smart Triggers**: Status changes automatically create tasks (e.g., Office Action → Draft Response)
- **Deadline Management**: Automated deadline tracking with jurisdiction-specific rules

### Financial Integration
- **Fee Schedules**: Pre-defined official fees vs. professional service fees
- **One-Click Invoicing**: Generate professional invoices with auto-populated metadata
- **Revenue Dashboard**: Visual analytics for billing and collections

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Database/Auth**: Supabase with Row Level Security (RLS)
- **UI Foundation**: shadcn/ui (Radix) + Tailwind CSS
- **Motion**: Cult UI (Framer Motion) for premium interactions
- **Validation**: Zod schemas for all data mutations

### Project Structure
```
src/
├── app/                 # Next.js App Router routes
│   ├── (auth)/         # Authentication pages
│   └── (dashboard)/    # Protected dashboard pages
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   ├── cult-ui/       # Cult UI motion components
│   ├── forms/         # Form components with Zod validation
│   ├── layout/        # Layout components (sidebar, header)
│   └── shared/        # Business logic components
├── lib/               # Utilities and Supabase helpers
├── hooks/             # Custom React hooks
├── services/          # Business logic services
└── types/             # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Supabase account (for production deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tpms-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🎨 Design System

TPMS follows "Institutional Minimalism" with strict 3-tone color palette:

- **Midnight Indigo** (`#1E293B`): Primary text, sidebar, headings
- **Legal Blue** (`#2563EB`): Primary buttons, active states, key links  
- **Stark White** (`#FFFFFF`): Page backgrounds, cards, input fields

**Typography**: Public Sans for all UI elements with defined scale for hierarchy.

**Motion**: Subtle Cult UI animations (Text Reveal, Border Beam) for premium feel without gradients.

## 🌍 Jurisdiction Support

### Ethiopia (ET) - Primary Focus
- **Currency**: ETB (Ethiopian Birr) with conversion support
- **Date Format**: DD/MM/YYYY
- **Agency**: Ethiopian Intellectual Property Authority (EIPA)
- **Holidays**: Ethiopian calendar awareness (future phase)

### International Support
- United States (USPTO)
- European Union (EUIPO)  
- United Kingdom (UKIPO)

## 🔧 Development

### Code Quality
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js configuration with custom rules
- **Linting**: Run `npm run lint` before commits
- **Formatting**: Prettier configured for consistent style

### Component Guidelines
- **shadcn/ui**: Install via CLI - `npx shadcn@latest add [component]`
- **Cult UI**: Copy exact implementation from documentation
- **Forms**: Always use Zod validation schemas
- **Server Actions**: All Supabase mutations via Server Actions

### Database Schema
Core tables:
- `profiles`: User data and permissions
- `trademarks`: Mark portfolio data
- `tasks`: Workflow engine tasks
- `invoices`: Financial data and billing

## 🚀 Deployment

### Vercel (Recommended)
1. Connect repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Manual Deployment
```bash
npm run build
npm start
```

## 📋 Current Status

See [progress.md](./progress.md) for detailed development tracking. For a high-level project overview, see [planning.md](./planning.md).

### Completed
- ✅ Next.js 14 setup with TypeScript
- ✅ Design system and Tailwind configuration
- ✅ Basic UI components (shadcn/ui)
- ✅ Authentication flow structure
- ✅ Dashboard layout with mock data

### In Progress
- 🔄 Supabase integration and authentication
- 🔄 Workflow engine implementation
- 🔄 Financial invoicing system

## 🤝 Contributing

1. Follow the established code style and patterns
2. Ensure all components are properly typed with TypeScript
3. Add tests for new features
4. Update documentation as needed
5. Follow the commit message conventions

## 📄 License

[License information to be added]

---

**TPMS**: Professional practice management for modern trademark firms.
