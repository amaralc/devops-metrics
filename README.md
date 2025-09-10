# DevOps Metrics Dashboard

A comprehensive Next.js 15+ TypeScript application that creates a production-ready DevOps metrics dashboard with Jira integration, implementing clean architecture principles and offline-first functionality.

## 🎯 Project Overview

Build a production-ready Next.js 15+ TypeScript application that creates a comprehensive DevOps metrics dashboard with Jira integration, implementing clean architecture principles and offline-first functionality.

## 📊 Core Requirements

### 1. Metrics & Dashboard Pages (7 pages total)

Must Have:

- **Dashboard Overview**: Unified view with all metrics, trend indicators, and executive summary
- **Perceived Failures**: Bug tracking with weekly aggregation and failure rate trends
- **Mean Time to Restore (MTTR)**: Average restoration time in hours with SLA tracking
- **Bug Fix SLO**: Percentage of critical issues resolved within 8-hour SLA
- **Deployment Frequency**: Release cadence tracking with velocity trends
- **Lead Time**: End-to-end delivery time from idea to production
- **Cycle Time**: Active development time excluding wait states

**Each metric page must include:**

Must Have:
- Prominent KPI card with current value and trend indicator
- Interactive time-series charts (Chart.js/Recharts)
- Configurable time ranges (7/30/90 days, custom)

Could Have:
- Drill-down capability to underlying data
- Export functionality (CSV, PNG, PDF)

### 2. Technical Architecture

**Hybrid Next.js Application Architecture:**
```
├── apps/
│   ├── devops-dashboard/                         // Hybrid Next.js application (dashboard + API + worker)
│   │   ├── src/
│   │   │   ├── app/                             // Next.js 15 app router
│   │   │   │   ├── (dashboard)/                 // Dashboard route group
│   │   │   │   │   ├── page.tsx                 // Dashboard overview
│   │   │   │   │   ├── perceived-failures/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── mttr/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── bug-fix-slo/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── deployment-frequency/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── lead-time/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── cycle-time/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── api/                         // Next.js API routes
│   │   │   │   │   ├── metrics/
│   │   │   │   │   │   ├── route.ts             // GET /api/metrics
│   │   │   │   │   │   └── [metricType]/
│   │   │   │   │   │       └── route.ts         // GET /api/metrics/[metricType]
│   │   │   │   │   ├── sync/
│   │   │   │   │   │   ├── route.ts             // POST /api/sync (manual sync)
│   │   │   │   │   │   └── status/
│   │   │   │   │   │       └── route.ts         // GET /api/sync/status
│   │   │   │   │   ├── health/
│   │   │   │   │   │   └── route.ts             // GET /api/health
│   │   │   │   │   └── cron/
│   │   │   │   │       └── sync-jira/
│   │   │   │   │           └── route.ts         // Background sync worker endpoint
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── error.tsx
│   │   │   │   └── globals.css
│   │   │   ├── components/                      // React components
│   │   │   │   ├── ui/                         // Base UI components
│   │   │   │   ├── charts/                     // Chart components
│   │   │   │   ├── layout/                     // Layout components
│   │   │   │   └── metrics/                    // Metric-specific components
│   │   │   ├── hooks/                          // Custom React hooks
│   │   │   ├── providers/                      // Context providers
│   │   │   ├── lib/                            // Utility functions
│   │   │   └── workers/                        // Background sync workers
│   │   │       ├── jira-sync-worker.ts
│   │   │       └── metrics-calculator.ts
│   │   ├── package.json
│   │   ├── next.config.js
│   │   └── tailwind.config.js
│   │
│   ├── cli/                                     // CLI tools and maintenance scripts
│   │   └── src/
│   │       ├── commands/                        // CLI command implementations
│   │       ├── app.ts                           // CLI application setup
│   │       └── main.ts                          // CLI initialization
│   │
│   └── base/
│       └── src/
│           ├── utils/
│           │   ├── configuration/               // Environment configuration
│           │   │   ├── configuration-manager.ts
│           │   │   └── default-configuration.ts
│           │   ├── database/                    // Database drivers and config
│           │   │   ├── dexie-driver.ts
│           │   │   └── indexeddb-driver.ts
│           │   ├── events/                      // Event system drivers
│           │   │   └── driver.ts
│           │   └── rest-api/                    // REST API utilities
│           │       ├── app.ts
│           │       ├── server.ts
│           │       ├── middlewares/
│           │       │   ├── auth.ts
│           │       │   └── cors.ts
│           │       ├── routes/
│           │       │   └── v1/
│           │       │       ├── metrics/
│           │       │       │   ├── controller.spec.ts
│           │       │       │   ├── controller.ts
│           │       │       │   └── [metricType]/
│           │       │       │       ├── controller.spec.ts
│           │       │       │       └── controller.ts
│           │       │       └── sync/
│           │       │           ├── controller.spec.ts
│           │       │           └── controller.ts
│           │       └── routes.ts
│           └── domains/
│               ├── devops-metrics-v1/           // DevOps metrics domain
│               │   ├── core/
│               │   │   ├── entities/
│               │   │   │   ├── idea.spec.ts
│               │   │   │   ├── idea.ts
│               │   │   │   ├── epic.spec.ts
│               │   │   │   ├── epic.ts
│               │   │   │   ├── issue.spec.ts
│               │   │   │   └── issue.ts
│               │   │   ├── repositories/
│               │   │   │   ├── idea-repository.ts
│               │   │   │   ├── epic-repository.ts
│               │   │   │   └── issue-repository.ts
│               │   │   ├── value-objects/
│               │   │   │   ├── time-range.ts
│               │   │   │   ├── metric-value.ts
│               │   │   │   └── trend-indicator.ts
│               │   │   ├── use-cases/
│               │   │   │   ├── calculate-perceived-failures/
│               │   │   │   │   ├── dtos.ts
│               │   │   │   │   ├── fixtures.ts
│               │   │   │   │   ├── index.spec.ts
│               │   │   │   │   ├── index.ts
│               │   │   │   │   └── types.ts
│               │   │   │   ├── calculate-mttr/
│               │   │   │   │   ├── dtos.ts
│               │   │   │   │   ├── fixtures.ts
│               │   │   │   │   ├── index.spec.ts
│               │   │   │   │   ├── index.ts
│               │   │   │   │   └── types.ts
│               │   │   │   ├── calculate-bug-fix-slo/
│               │   │   │   ├── calculate-deployment-frequency/
│               │   │   │   ├── calculate-lead-time/
│               │   │   │   └── calculate-cycle-time/
│               │   │   └── services/
│               │   │       ├── jira-data-transformer/
│               │   │       │   ├── dtos.ts
│               │   │       │   ├── fixtures.ts
│               │   │       │   ├── index.spec.ts
│               │   │       │   ├── index.ts
│               │   │       │   └── types.ts
│               │   │       └── metrics-aggregator/
│               │   │           ├── dtos.ts
│               │   │           ├── fixtures.ts
│               │   │           ├── index.spec.ts
│               │   │           ├── index.ts
│               │   │           └── types.ts
│               │   └── adapters/
│               │       ├── next-dashboard-controller.ts
│               │       ├── express-metrics-controller.ts
│               │       ├── express-metrics-middleware.ts
│               │       ├── jira-api-repository.ts
│               │       ├── dexie-database-repository.ts
│               │       ├── indexeddb-repository.ts
│               │       └── mock-data-repository.ts
│               │
│               └── jira-integration-v1/          // Jira integration domain
│                   ├── core/
│                   │   ├── entities/
│                   │   │   ├── jira-issue.ts
│                   │   │   ├── jira-project.ts
│                   │   │   └── jira-user.ts
│                   │   ├── repositories/
│                   │   │   └── jira-api-repository.ts
│                   │   ├── use-cases/
│                   │   │   ├── fetch-issues/
│                   │   │   ├── sync-project-data/
│                   │   │   └── handle-rate-limits/
│                   │   └── services/
│                   │       ├── jql-query-builder/
│                   │       └── api-rate-limiter/
│                   └── adapters/
│                       ├── jira-rest-api-client.ts
│                       ├── jira-webhook-handler.ts
│                       └── jira-mock-client.ts
├── package.json
├── pnpm-workspace.yaml
├── README.md
└── scripts/                                     // Setup and management scripts
    ├── setup.sh
    ├── build.sh
    └── deploy.sh
```

**Technology Stack:**
- Next.js 15+ with App Router and TypeScript
- Tailwind CSS with custom design system
- Recharts for data visualization
- Dexie.js for IndexedDB operations
- Zod for runtime type validation
- React Query for server state management
- Framer Motion for animations

### 3. Jira Integration Strategy

**API Integration:**
- Implement exponential backoff with jitter for rate limiting
- Use JQL optimization for efficient data fetching
- Implement request deduplication and caching
- Handle pagination for large datasets
- Comprehensive error handling with user-friendly messages

**Required JQL Queries:**
```javascript
// Bug tracking
`project = "${PROJECT_KEY}" AND type = Bug AND created >= -${days}d ORDER BY created DESC`

// Deployment tracking  
`project = "${PROJECT_KEY}" AND fixVersion is not EMPTY AND resolved >= -${days}d`

// Status transitions (with changelog expansion)
`project = "${PROJECT_KEY}" AND updated >= -${days}d&expand=changelog`
```

### 4. Offline-First Implementation

**Data Synchronization:**
- Background sync every 6 hours when online
- Intelligent conflict resolution
- Progressive data loading with skeleton states
- Offline indicators and graceful degradation
- Cache invalidation strategies

**Storage Strategy:**
- IndexedDB for structured data with 30-day retention
- Service Worker for static asset caching
- Optimistic updates with rollback capability

### 5. Performance & UX Requirements

**Performance Optimizations:**
- Server-side rendering with ISR (6-hour revalidation)
- Code splitting and lazy loading
- Image optimization and WebP support
- Bundle analysis and tree shaking

**User Experience:**
- Loading skeletons for all async operations
- Error boundaries with recovery actions
- Toast notifications for user feedback
- Responsive design (mobile-first)
- Dark/light theme with system preference detection
- Accessibility compliance (WCAG 2.1 AA)

## 🔧 Environment & Configuration

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
# Required
JIRA_URL=https://company.atlassian.net
JIRA_API_TOKEN=your_token
JIRA_PROJECT_KEY=PROJ

# Optional
NEXT_PUBLIC_APP_URL=https://metrics.company.com
CACHE_TTL=21600
SYNC_INTERVAL=21600
```

### Mock Data Strategy

If Jira credentials are unavailable, the application implements comprehensive mock data generators that:
- Simulate realistic DevOps patterns over 90 days
- Include seasonal variations and anomalies
- Demonstrate all dashboard functionality
- Provide data export capabilities

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd devops-metrics
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your Jira credentials
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🏗️ Production Readiness

### Deployment Configuration

**Docker:**
- Multi-stage build with Alpine Linux
- Health check endpoints (`/api/health`, `/api/ready`)
- Structured logging with correlation IDs
- Environment validation on startup
- Graceful shutdown handling

**Monitoring & Observability:**
- Performance metrics collection
- Error tracking and alerting
- User analytics (privacy-compliant)
- API usage monitoring

**Security:**
- API token encryption at rest
- CORS configuration
- Rate limiting on API endpoints
- Input validation and sanitization

### Health Checks

The application provides health check endpoints:

- `GET /api/health` - Basic health status
- `GET /api/ready` - Readiness check including database connectivity

## 🧪 Testing Strategy

- **Unit tests** for business logic (Jest)
- **Integration tests** for API endpoints
- **E2E tests** for critical user flows (Playwright)
- **Visual regression testing**
- **Performance testing** with Lighthouse CI

Run tests:
```bash
npm run test
npm run test:watch
```

## 📁 Project Structure

The project follows a hybrid Next.js application architecture where the dashboard, API, and sync worker are integrated into a single Next.js application:

```
devops-metrics/
├── apps/
│   ├── devops-dashboard/                         // Hybrid Next.js application (dashboard + API + worker)
│   │   ├── src/
│   │   │   ├── app/                             // Next.js 15 app router
│   │   │   │   ├── (dashboard)/                 // Dashboard route group
│   │   │   │   │   ├── page.tsx                 // Dashboard overview
│   │   │   │   │   ├── perceived-failures/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── mttr/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── bug-fix-slo/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── deployment-frequency/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── lead-time/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── cycle-time/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── api/                         // Next.js API routes
│   │   │   │   │   ├── metrics/
│   │   │   │   │   │   ├── route.ts             // GET /api/metrics
│   │   │   │   │   │   └── [metricType]/
│   │   │   │   │   │       └── route.ts         // GET /api/metrics/[metricType]
│   │   │   │   │   ├── sync/
│   │   │   │   │   │   ├── route.ts             // POST /api/sync (manual sync)
│   │   │   │   │   │   └── status/
│   │   │   │   │   │       └── route.ts         // GET /api/sync/status
│   │   │   │   │   ├── health/
│   │   │   │   │   │   └── route.ts             // GET /api/health
│   │   │   │   │   └── cron/
│   │   │   │   │       └── sync-jira/
│   │   │   │   │           └── route.ts         // Background sync worker endpoint
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── error.tsx
│   │   │   │   └── globals.css
│   │   │   ├── components/                      // React components
│   │   │   │   ├── ui/                         // Base UI components
│   │   │   │   ├── charts/                     // Chart components
│   │   │   │   ├── layout/                     // Layout components
│   │   │   │   └── metrics/                    // Metric-specific components
│   │   │   ├── hooks/                          // Custom React hooks
│   │   │   ├── providers/                      // Context providers
│   │   │   ├── lib/                            // Utility functions
│   │   │   └── workers/                        // Background sync workers
│   │   │       ├── jira-sync-worker.ts
│   │   │       └── metrics-calculator.ts
│   │   ├── package.json
│   │   ├── next.config.js
│   │   └── tailwind.config.js
│   │
│   ├── cli/                                     // CLI tools and maintenance scripts
│   │   └── src/
│   │       ├── commands/                        // CLI command implementations
│   │       ├── app.ts                           // CLI application setup
│   │       └── main.ts                          // CLI initialization
│   │
│   └── base/                                    // Shared utilities and infrastructure
│       └── src/
│           ├── utils/
│           │   ├── configuration/               // Environment configuration
│           │   │   ├── configuration-manager.ts
│           │   │   └── default-configuration.ts
│           │   ├── database/                    // Database drivers and config
│           │   │   ├── dexie-driver.ts
│           │   │   └── indexeddb-driver.ts
│           │   ├── events/                      // Event system drivers
│           │   │   └── driver.ts
│           │   └── rest-api/                    // REST API utilities
│           │       ├── app.ts
│           │       ├── server.ts
│           │       ├── middlewares/
│           │       │   ├── auth.ts
│           │       │   ├── cors.ts
│           │       │   └── rate-limit.ts
│           │       ├── routes/
│           │       │   └── v1/
│           │       │       ├── metrics/
│           │       │       │   ├── controller.spec.ts
│           │       │       │   ├── controller.ts
│           │       │       │   └── [metricType]/
│           │       │       │       ├── controller.spec.ts
│           │       │       │       └── controller.ts
│           │       │       └── sync/
│           │       │           ├── controller.spec.ts
│           │       │           └── controller.ts
│           │       └── routes.ts
│           └── domains/
│               ├── delivery/                     // Product Feature delivery domain
│               │   ├── product-idea-v1/         // New features/functionality for product differentiation
│               │   │   ├── core/
│               │   │   │   ├── entity.spec.ts
│               │   │   │   ├── entity.ts         // Product idea enterprise business rules
│               │   │   │   ├── repository.ts     // Interface for persistence implementations
│               │   │   │   ├── types.ts          // Types related to product ideas
│               │   │   │   ├── use-cases/        // Application business rules
│               │   │   │   │   ├── create/
│               │   │   │   │   │   ├── dtos.ts   // Input/output ports
│               │   │   │   │   │   ├── fixtures.ts // Mock data for tests
│               │   │   │   │   │   ├── index.spec.ts // Use case tests
│               │   │   │   │   │   ├── index.ts  // Use case implementation
│               │   │   │   │   │   └── types.ts  // TypeScript types
│               │   │   │   │   ├── list/
│               │   │   │   │   │   ├── dtos.ts
│               │   │   │   │   │   ├── fixtures.ts
│               │   │   │   │   │   ├── index.spec.ts
│               │   │   │   │   │   ├── index.ts
│               │   │   │   │   │   └── types.ts
│               │   │   │   │   └── calculate-lead-time/
│               │   │   │   │       ├── dtos.ts
│               │   │   │   │       ├── fixtures.ts
│               │   │   │   │       ├── index.spec.ts
│               │   │   │   │       ├── index.ts
│               │   │   │   │       └── types.ts
│               │   │   │   └── services/         // Operations between entities
│               │   │   │       └── idea-to-epic-converter/
│               │   │   │           ├── dtos.ts
│               │   │   │           ├── fixtures.ts
│               │   │   │           ├── index.spec.ts
│               │   │   │           ├── index.ts
│               │   │   │           └── types.ts
│               │   │   └── adapters/
│               │   │       ├── next-product-idea-controller.ts
│               │   │       ├── jira-product-idea-repository.ts
│               │   │       ├── dexie-product-idea-repository.ts
│               │   │       └── mock-product-idea-repository.ts
│               │   │
│               │   └── product-enhancement-v1/   // Minor product improvements from user feedback
│               │       ├── core/
│               │       │   ├── entity.spec.ts
│               │       │   ├── entity.ts
│               │       │   ├── repository.ts
│               │       │   ├── types.ts
│               │       │   ├── use-cases/
│               │       │   │   ├── create/
│               │       │   │   │   ├── dtos.ts
│               │       │   │   │   ├── fixtures.ts
│               │       │   │   │   ├── index.spec.ts
│               │       │   │   │   ├── index.ts
│               │       │   │   │   └── types.ts
│               │       │   │   ├── list/
│               │       │   │   │   ├── dtos.ts
│               │       │   │   │   ├── fixtures.ts
│               │       │   │   │   ├── index.spec.ts
│               │       │   │   │   ├── index.ts
│               │       │   │   │   └── types.ts
│               │       │   │   └── calculate-cycle-time/
│               │       │   │       ├── dtos.ts
│               │       │   │       ├── fixtures.ts
│               │       │   │       ├── index.spec.ts
│               │       │   │       ├── index.ts
│               │       │   │       └── types.ts
│               │       │   └── services/
│               │       │       └── enhancement-prioritizer/
│               │       │           ├── dtos.ts
│               │       │           ├── fixtures.ts
│               │       │           ├── index.spec.ts
│               │       │           ├── index.ts
│               │       │           └── types.ts
│               │       └── adapters/
│               │           ├── next-product-enhancement-controller.ts
│               │           ├── jira-product-enhancement-repository.ts
│               │           ├── dexie-product-enhancement-repository.ts
│               │           └── mock-product-enhancement-repository.ts
│               │
│               ├── maintenance/                  // Product Health/Failure domain
│               │   ├── corrective-maintenance-v1/ // Bugs affecting customers (reactive)
│               │   │   ├── core/
│               │   │   │   ├── entity.spec.ts
│               │   │   │   ├── entity.ts         // Bug/incident enterprise business rules
│               │   │   │   ├── repository.ts
│               │   │   │   ├── types.ts
│               │   │   │   ├── use-cases/
│               │   │   │   │   ├── create/
│               │   │   │   │   │   ├── dtos.ts
│               │   │   │   │   │   ├── fixtures.ts
│               │   │   │   │   │   ├── index.spec.ts
│               │   │   │   │   │   ├── index.ts
│               │   │   │   │   │   └── types.ts
│               │   │   │   │   ├── calculate-mttr/
│               │   │   │   │   │   ├── dtos.ts
│               │   │   │   │   │   ├── fixtures.ts
│               │   │   │   │   │   ├── index.spec.ts
│               │   │   │   │   │   ├── index.ts
│               │   │   │   │   │   └── types.ts
│               │   │   │   │   ├── calculate-bug-fix-slo/
│               │   │   │   │   └── calculate-perceived-failures/
│               │   │   │   │       ├── dtos.ts
│               │   │   │   │       ├── fixtures.ts
│               │   │   │   │       ├── index.spec.ts
│               │   │   │   │       ├── index.ts
│               │   │   │   │       └── types.ts
│               │   │   │   └── services/
│               │   │   │       └── slo-calculator/
│               │   │   │           ├── dtos.ts
│               │   │   │           ├── fixtures.ts
│               │   │   │           ├── index.spec.ts
│               │   │   │           ├── index.ts
│               │   │   │           └── types.ts
│               │   │   └── adapters/
│               │   │       ├── next-corrective-maintenance-controller.ts
│               │   │       ├── jira-corrective-maintenance-repository.ts
│               │   │       ├── dexie-corrective-maintenance-repository.ts
│               │   │       └── mock-corrective-maintenance-repository.ts
│               │   │
│               │   └── non-corrective-maintenance-v1/ // Preventive/predictive maintenance
│               │       ├── core/
│               │       │   ├── entity.spec.ts
│               │       │   ├── entity.ts         // Maintenance task enterprise business rules
│               │       │   ├── repository.ts
│               │       │   ├── types.ts
│               │       │   ├── use-cases/
│               │       │   │   ├── create/
│               │       │   │   │   ├── dtos.ts
│               │       │   │   │   ├── fixtures.ts
│               │       │   │   │   ├── index.spec.ts
│               │       │   │   │   ├── index.ts
│               │       │   │   │   └── types.ts
│               │       │   │   ├── schedule-maintenance/
│               │       │   │   │   ├── dtos.ts
│               │       │   │   │   ├── fixtures.ts
│               │       │   │   │   ├── index.spec.ts
│               │       │   │   │   ├── index.ts
│               │       │   │   │   └── types.ts
│               │       │   │   └── predict-failures/
│               │       │   │       ├── dtos.ts
│               │       │   │       ├── fixtures.ts
│               │       │   │       ├── index.spec.ts
│               │       │   │       ├── index.ts
│               │       │   │       └── types.ts
│               │       │   └── services/
│               │       │       └── maintenance-scheduler/
│               │       │           ├── dtos.ts
│               │       │           ├── fixtures.ts
│               │       │           ├── index.spec.ts
│               │       │           ├── index.ts
│               │       │           └── types.ts
│               │       └── adapters/
│               │           ├── next-non-corrective-maintenance-controller.ts
│               │           ├── jira-non-corrective-maintenance-repository.ts
│               │           ├── dexie-non-corrective-maintenance-repository.ts
│               │           └── mock-non-corrective-maintenance-repository.ts
│               │
│               └── waste-reduction/              // Process Improvement domain
│                   └── process-kaizen-v1/       // Dedicated waste removal periods
│                       ├── core/
│                       │   ├── entity.spec.ts
│                       │   ├── entity.ts        // Kaizen initiative enterprise business rules
│                       │   ├── repository.ts
│                       │   ├── types.ts
│                       │   ├── use-cases/
│                       │   │   ├── create/
│                       │   │   │   ├── dtos.ts
│                       │   │   │   ├── fixtures.ts
│                       │   │   │   ├── index.spec.ts
│                       │   │   │   ├── index.ts
│                       │   │   │   └── types.ts
│                       │   │   ├── calculate-deployment-frequency/
│                       │   │   │   ├── dtos.ts
│                       │   │   │   ├── fixtures.ts
│                       │   │   │   ├── index.spec.ts
│                       │   │   │   ├── index.ts
│                       │   │   │   └── types.ts
│                       │   │   └── identify-waste/
│                       │   │       ├── dtos.ts
│                       │   │       ├── fixtures.ts
│                       │   │       ├── index.spec.ts
│                       │   │       ├── index.ts
│                       │   │       └── types.ts
│                       │   └── services/
│                       │       └── waste-analyzer/
│                       │           ├── dtos.ts
│                       │           ├── fixtures.ts
│                       │           ├── index.spec.ts
│                       │           ├── index.ts
│                       │           └── types.ts
│                       └── adapters/
│                           ├── next-process-kaizen-controller.ts
│                           ├── jira-process-kaizen-repository.ts
│                           ├── dexie-process-kaizen-repository.ts
│                           └── mock-process-kaizen-repository.ts
├── docs/                                        // Documentation
│   ├── api.md
│   ├── architecture.md
│   ├── deployment.md
│   └── contributing.md
├── tests/                                       // Cross-cutting tests
│   ├── e2e/
│   ├── integration/
│   └── performance/
├── docker/                                      // Docker configurations
│   ├── Dockerfile
│   └── docker-compose.yml
├── scripts/                                     // Setup and management scripts
│   ├── setup.sh
│   ├── build.sh
│   ├── deploy.sh
│   └── test.sh
├── package.json                                 // Root package.json
├── pnpm-workspace.yaml                          // PNPM workspace configuration
└── README.md
```

## 🎨 UI/UX Features

### Design System
- Custom Tailwind CSS configuration
- Consistent color palette and typography
- Dark/light theme support
- Responsive breakpoints
- Accessibility-first components

### Navigation
- Sidebar navigation with metric icons
- Breadcrumb navigation on each page
- Header with theme toggle and sync status
- Footer with last update timestamp

### Data Visualization
- Interactive time-series charts
- Donut charts for percentage-based metrics
- Trend indicators with percentage changes
- Export functionality for all visualizations

## 🔌 API Integration

### Jira API Endpoints

The application integrates with the following Jira REST API endpoints:

- `/rest/api/3/search` - JQL search for issues
- `/rest/api/3/issue/{issueKey}` - Individual issue details
- `/rest/api/3/project/{projectKey}` - Project information
- `/rest/api/3/field` - Custom field definitions

### Rate Limiting

- Implements exponential backoff with jitter
- Respects Jira Cloud rate limits (10 requests per second)
- Request queuing and deduplication
- Graceful degradation on rate limit exceeded

## 📈 Metrics Calculations

### Perceived Failures
- Tracks bugs created per week
- Calculates failure rate trends
- Identifies failure patterns and anomalies

### Mean Time to Restore (MTTR)
- Measures time from bug creation to resolution
- Tracks SLA compliance
- Provides restoration time distribution

### Bug Fix SLO
- Percentage of critical issues resolved within 8 hours
- SLA breach tracking and alerting
- Historical SLO performance trends

### Deployment Frequency
- Tracks releases per week/month
- Deployment velocity trends
- Release success rate monitoring

### Lead Time
- End-to-end delivery time measurement
- From idea creation to production deployment
- Bottleneck identification and analysis

### Cycle Time
- Active development time tracking
- Excludes wait states and blocked time
- Development efficiency metrics

## 🛠️ Development Guidelines

### Code Style
- ESLint configuration with TypeScript rules
- Prettier for code formatting
- Husky for pre-commit hooks
- Conventional commits

### Architecture Principles
- Clean Architecture with dependency inversion
- Domain-driven design patterns
- SOLID principles
- Separation of concerns

### Performance Guidelines
- Bundle size monitoring
- Core Web Vitals optimization
- Progressive loading strategies
- Efficient re-rendering patterns

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [Architecture Guide](./docs/architecture.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guidelines](./docs/contributing.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the `/docs` folder
- Review the troubleshooting guide

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.
