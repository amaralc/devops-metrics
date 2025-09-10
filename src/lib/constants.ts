// Application constants for DevOps Metrics Dashboard

export const METRIC_CONFIGS = {
  PERCEIVED_FAILURES: {
    name: 'Perceived Failures',
    description: 'Number of bugs reported per week',
    unit: 'bugs/week',
    target: 5,
    threshold: {
      good: 5,
      warning: 10,
      critical: 20
    },
    jqlQuery: 'project = YOUR_PROJECT AND type = Bug AND created >= -7d'
  },
  MEAN_TIME_TO_RESTORE: {
    name: 'Mean Time to Restore',
    description: 'Average time to restore service after failure',
    unit: 'hours',
    target: 4,
    threshold: {
      good: 4,
      warning: 8,
      critical: 24
    },
    jqlQuery: 'project = YOUR_PROJECT AND type = Bug AND status = Done AND resolved >= -30d'
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
    },
    jqlQuery: 'project = YOUR_PROJECT AND type = Bug AND status = Done AND resolved >= -30d'
  },
  DEPLOYMENT_FREQUENCY: {
    name: 'Deployment Frequency',
    description: 'Number of releases per week',
    unit: 'releases/week',
    target: 5,
    threshold: {
      good: 5,
      warning: 3,
      critical: 1
    },
    jqlQuery: 'project = YOUR_PROJECT AND labels = "release" AND created >= -7d'
  },
  LEAD_TIME: {
    name: 'Lead Time',
    description: 'Days from demand creation to delivery',
    unit: 'days',
    target: 7,
    threshold: {
      good: 7,
      warning: 14,
      critical: 30
    },
    jqlQuery: 'project = YOUR_PROJECT AND status = Done AND resolved >= -30d'
  },
  CYCLE_TIME: {
    name: 'Cycle Time',
    description: 'Days in progress or review',
    unit: 'days',
    target: 3,
    threshold: {
      good: 3,
      warning: 7,
      critical: 14
    },
    jqlQuery: 'project = YOUR_PROJECT AND status in ("In Progress", "In Review") AND updated >= -30d'
  }
} as const;

export const JIRA_CONFIG = {
  MAX_RESULTS: 100,
  DEFAULT_TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RATE_LIMIT_DELAY: 1000,
  API_VERSION: '3',
  FIELDS: [
    'key',
    'summary',
    'description',
    'issuetype',
    'status',
    'priority',
    'assignee',
    'reporter',
    'created',
    'updated',
    'resolved',
    'labels',
    'components',
    'customfield_10016', // Story Points (common field ID)
    'parent'
  ].join(',')
} as const;

export const CACHE_CONFIG = {
  SYNC_INTERVAL: 6 * 60 * 60 * 1000, // 6 hours in milliseconds
  REVALIDATE_TIME: 21600, // 6 hours in seconds for ISR
  MAX_CACHE_AGE: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  STALE_WHILE_REVALIDATE: 60 * 60 * 1000 // 1 hour in milliseconds
} as const;

// Database configuration for IndexedDB
export const DB_CONFIG = {
  NAME: 'devops-metrics-db',
  VERSION: 1,
  STORES: {
    ISSUES: 'issues',
    EPICS: 'epics',
    IDEAS: 'ideas',
    SYNC_METADATA: 'sync_metadata'
  }
} as const;

// Time range options for metric filtering
export const TIME_RANGES = {
  LAST_7_DAYS: {
    label: 'Last 7 days',
    days: 7,
    jqlSuffix: '>= -7d'
  },
  LAST_30_DAYS: {
    label: 'Last 30 days',
    days: 30,
    jqlSuffix: '>= -30d'
  },
  LAST_90_DAYS: {
    label: 'Last 90 days',
    days: 90,
    jqlSuffix: '>= -90d'
  },
  LAST_6_MONTHS: {
    label: 'Last 6 months',
    days: 180,
    jqlSuffix: '>= -180d'
  }
} as const;

// Chart configuration
export const CHART_CONFIG = {
  DEFAULT_HEIGHT: 300,
  COLORS: {
    PRIMARY: '#3b82f6',
    SUCCESS: '#10b981',
    WARNING: '#f59e0b',
    DANGER: '#ef4444',
    SECONDARY: '#6b7280'
  },
  ANIMATION_DURATION: 750
} as const;

// Status mappings for different Jira workflows
export const STATUS_MAPPINGS = {
  TODO: ['To Do', 'Backlog', 'Open', 'New'],
  IN_PROGRESS: ['In Progress', 'In Development', 'Development'],
  IN_REVIEW: ['In Review', 'Code Review', 'Review', 'Testing'],
  DONE: ['Done', 'Closed', 'Resolved', 'Complete']
} as const;

// Mock data configuration (used when Jira credentials are not available)
export const MOCK_DATA_CONFIG = {
  ENABLED: !process.env.JIRA_URL || !process.env.JIRA_API_TOKEN,
  ISSUE_COUNT: 50,
  EPIC_COUNT: 10,
  IDEA_COUNT: 20,
  DATE_RANGE_DAYS: 90
} as const;