# DevOps Metrics Dashboard

A comprehensive Next.js application for tracking and visualizing DevOps metrics with Jira integration, built using clean architecture principles and offline-first design.

## Features

### Core Metrics
- **Quality Metrics:**
  - Perceived Failures (bugs/week)
  - Mean Time to Restore (hours)
  - Bug Fix SLO (% issues restored in less than 8h)

- **Delivery Metrics:**
  - Deployment Frequency (releases/week)
  - Lead Time (days since demand created)
  - Cycle Time (days in progress or review)

### Technical Features
- **Clean Architecture:** Domain-driven design with clear separation of concerns
- **Offline-First:** IndexedDB integration with Dexie.js for local data persistence
- **Performance:** Incremental Static Regeneration (ISR) with 6-hour revalidation
- **Modern UI:** Responsive design with Tailwind CSS and dark/light theme support
- **Real-time Charts:** Interactive data visualization with Chart.js

## Architecture

```
src/
├── domain/
│   ├── entities/          # Core business entities (Idea, Epic, Issue)
│   └── repositories/      # Abstract repository interfaces
├── application/
│   └── use-cases/         # Business logic and metric calculations
├── infrastructure/
│   ├── jira/             # Jira API implementation
│   └── persistence/      # IndexedDB implementation
└── presentation/
    ├── components/       # React components
    └── pages/           # Next.js pages
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- Jira API access token
- Jira instance URL

### Environment Setup
Create a `.env.local` file in the root directory:

```env
JIRA_URL=https://your-domain.atlassian.net
JIRA_API_TOKEN=your_api_token
```

### Installation
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Development

### Project Structure
- **Domain Layer:** Contains business entities and repository interfaces
- **Application Layer:** Implements use cases and business logic
- **Infrastructure Layer:** Handles external integrations (Jira API, IndexedDB)
- **Presentation Layer:** React components and Next.js pages

### Key Technologies
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** for styling
- **Dexie.js** for IndexedDB operations
- **Chart.js** for data visualization
- **Lucide React** for icons

## Deployment

The application is optimized for production deployment with:
- Static generation for optimal performance
- ISR for data freshness
- Offline capabilities
- Error handling and loading states

Build for production:
```bash
npm run build
npm start
```

## Contributing

This project follows clean architecture principles. When adding new features:
1. Define entities in the domain layer
2. Create repository interfaces
3. Implement use cases in the application layer
4. Add infrastructure implementations
5. Create presentation components

## License

MIT License - see LICENSE file for details.