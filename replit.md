# CreditSea - Experian Credit Report Dashboard

## Overview

CreditSea is a full-stack credit report analysis application that processes and displays Experian XML credit reports. The application allows users to upload XML files containing credit data, which are then parsed, stored in MongoDB, and presented in a professional financial dashboard. Built with a MERN stack architecture (MongoDB, Express.js, React, Node.js), it emphasizes trust, data clarity, and efficient information presentation for financial data visualization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and optimized production builds
- **Routing:** Wouter (lightweight client-side routing)
- **State Management:** TanStack Query (React Query) for server state management
- **UI Framework:** Shadcn/ui component library with Radix UI primitives
- **Styling:** Tailwind CSS with custom design system

**Design System:**
- **Approach:** Professional financial dashboard design inspired by modern fintech applications (Stripe, Plaid)
- **Color Palette:** Professional blue primary (#3B82F6), with semantic colors for success, warning, and danger states
- **Typography:** Inter font family for UI/body text, JetBrains Mono for monospaced data (account numbers, IDs)
- **Theme Support:** Light and dark mode with CSS custom properties
- **Responsive Design:** Mobile-first approach with breakpoint at 768px

**Key Pages:**
- Upload page for XML file submission with drag-and-drop support
- Reports listing page showing all processed credit reports
- Report details page with comprehensive credit information display
- 404 not found page

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js for REST API
- **Database:** MongoDB with Mongoose ODM
- **File Upload:** Multer middleware for handling XML file uploads (10MB limit)
- **XML Parsing:** xml2js library for parsing Experian XML reports
- **Build:** esbuild for production bundling

**API Endpoints:**
- `POST /api/upload` - Accepts XML file uploads, validates format, parses data, and saves to MongoDB
- `GET /api/reports` - Returns all processed credit reports
- `GET /api/reports/:id` - Returns individual report details (implied from frontend routing)

**Data Extraction Strategy:**
The XML parser extracts structured credit data including:
- Basic details (name, phone, PAN, credit score)
- Report summary (account counts, balances, secured/unsecured amounts, enquiries)
- Individual credit accounts with bank details, account numbers, balances, and status

### Data Storage

**Database:** MongoDB Atlas (cloud-hosted)
- **Connection:** Mongoose ODM with connection pooling and automatic reconnection
- **Environment Variable:** `MONGODB_URI` required for database connection

**Data Models:**
- **CreditReport Model:** Main document storing all extracted credit report data
  - basicDetails subdocument (name, mobile, PAN, credit score)
  - reportSummary subdocument (account statistics and balances)
  - creditAccounts array (individual account details)
  - Metadata fields (createdAt, reportDate, reportNumber)

**Schema Validation:**
- Zod schemas defined in `shared/schema.ts` for type-safe validation
- Shared between frontend and backend for consistency
- Mongoose schemas with type definitions and required field constraints

### External Dependencies

**Database Services:**
- **MongoDB Atlas:** Cloud-hosted NoSQL database for storing credit report data
- Requires `MONGODB_URI` environment variable

**UI Component Libraries:**
- **Radix UI:** Unstyled, accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- **Shadcn/ui:** Pre-built component library built on Radix UI with Tailwind styling
- **Lucide React:** Icon library for consistent iconography

**Development Tools:**
- **Replit-specific plugins:** Runtime error overlay, cartographer, dev banner for development environment
- **TypeScript:** Full type safety across the application
- **ESLint/Prettier:** Code quality and formatting (implied by tsconfig strictness)

**File Processing:**
- **Multer:** Multipart form data handling for file uploads
- **xml2js:** XML to JavaScript object conversion for parsing Experian reports

**Date Handling:**
- **date-fns:** Date formatting and manipulation utilities

**Form Management:**
- **React Hook Form:** Form state management with `@hookform/resolvers` for Zod schema validation