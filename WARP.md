# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**FabriiQ - The First School Operating System**: This is a Next.js-based educational technology platform, originally created through v0.app and deployed on Vercel. The project is automatically synced from v0.app, meaning changes deployed via v0 will automatically push to this repository.

## Development Commands

### Package Management
- This project uses `pnpm` - check for `pnpm-lock.yaml` presence
- To install dependencies: `pnpm install`

### Core Development Commands
```bash
# Development server
npm run dev
# or
pnpm dev

# Build for production  
npm run build
# or
pnpm build

# Start production server
npm run start
# or  
pnpm start

# Lint code
npm run lint
# or
pnpm lint
```

### Testing
- No test framework currently configured in package.json
- To add tests, consider Jest, Vitest, or Playwright based on testing needs

## Architecture Overview

### Framework & Core Stack
- **Next.js 14.2.16** with App Router (`app/` directory structure)
- **TypeScript** with strict mode enabled
- **Tailwind CSS** with custom FabriiQ brand color scheme
- **Framer Motion** for animations
- **Radix UI** components as UI foundation

### Key Architectural Patterns

#### Multi-language Support System
- **Language Context**: Global state management via `contexts/language-context.tsx`
- **Translation System**: Dynamic JSON loading from `/locales/{languageCode}.json`
- **Supported Languages**: English, Spanish, Arabic (RTL), Indonesian
- **Browser Detection**: Automatic language detection with localStorage persistence

#### Custom Design System
- **Brand Colors**: Custom `fabriiq` color palette in Tailwind config
- **Component Library**: Extensive shadcn/ui components in `components/ui/`
- **Utility Function**: `cn()` helper in `lib/utils.ts` for conditional classes

#### Page Structure (App Router)
```
app/
├── layout.tsx          # Root layout with theme/language providers
├── page.tsx           # Homepage with complex hero sections
├── about/page.tsx     # About page
├── dashboard/         # Dashboard functionality  
├── projects/          # Project showcase
├── services/          # Service offerings
└── [other-routes]/    # Various business pages
```

#### Component Architecture
- **Business Components**: Custom components for FabriiQ-specific functionality
- **UI Components**: Reusable shadcn/ui based components
- **Animation Components**: Framer Motion integrated throughout
- **Video Integration**: Custom video player component

#### Key Features
- **Theme Support**: Dark mode with next-themes
- **Internationalization**: Custom i18n system with RTL support  
- **Interactive Animations**: Extensive Framer Motion usage
- **Video Content**: Educational video demonstrations
- **Responsive Design**: Mobile-first responsive layouts

### Configuration Notes
- **ESLint/TypeScript**: Build errors ignored in `next.config.mjs`
- **Image Optimization**: Disabled (`unoptimized: true`)
- **Path Aliases**: `@/*` maps to root directory
- **Custom Fonts**: Inter font from Google Fonts

### v0.app Integration
- Project originates from v0.app (ID: OB2AUOPKAii)
- Automatic sync from v0 deployments to this repository
- Vercel deployment integration
- Continue development via v0.app interface for AI-assisted changes

## Working with This Codebase

### For UI/Component Changes
- Modify components in `components/` directory
- Use existing Radix UI patterns from `components/ui/`
- Follow brand color scheme defined in `tailwind.config.ts`
- Leverage Framer Motion for animations

### For Content/Translation Updates  
- Add translations to appropriate `/locales/{lang}.json` files
- Use translation keys with dot notation (e.g., `homepage.sections.title`)
- Test RTL languages (Arabic) for layout issues

### For Routing/Pages
- Add new pages in `app/` directory following App Router conventions
- Include loading.tsx files for better UX
- Maintain consistent page structure and SEO metadata