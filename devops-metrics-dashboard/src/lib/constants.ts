// Application constants

export const METRIC_CONFIGS = {
  PERCEIVED_FAILURES: {
    name: 'Perceived Failures',
    description: 'Number of bugs reported per week',
    unit: 'bugs/week',
    threshold: {
      good: 5,
      warning: 10,
      critical: 20
    }
  },
  MEAN_TIME_TO_RESTORE: {
    name: 'Mean Time to Restore',
    description: 'Average time to restore service after failure',
    unit: 'hours',
    threshold: {
      good: 4,
      warning: 8,
      critical: 24
    }
  },
  BUG_FIX_SLO: {
    name: 'Bug Fix SLO',
    description: 'Percentage of issues restored within 8 hours',
    unit: '%',
    target: 95,
    threshold: {
      good: 95,
      warning: 85,
      critical: 75
    }
  },
  DEPLOYMENT_FREQUENCY: {
    name: 'Deployment Frequency',
    description: 'Number of releases per week',
    unit: 'releases/week',
    threshold: {
      good: 5,
      warning: 3,
      critical: 1
    }
  },
  LEAD_TIME: {
    name: 'Lead Time',
    description: 'Days from demand creation to delivery',
    unit: 'days',
    threshold: {
      good: 7,
      warning: 14,
      critical: 30
    }
  },
  CYCLE_TIME: {
    name: 'Cycle Time',
    description: 'Days in progress or review',
    unit: 'days',
    threshold: {
      good: 3,
      warning: 7,
      critical: 14
    }
  }
} as const;

export const JIRA_CONFIG = {
  MAX_RESULTS: 100,
  DEFAULT_TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RATE_LIMIT_DELAY: 1000
} as const;

export const CACHE_CONFIG = {
  SYNC_INTERVAL: 6 * 60 * 60 * 1000, // 6 hours in milliseconds
  REVALIDATE_TIME: 21600 // 6 hours in seconds for ISR
} as const;