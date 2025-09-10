// Global type definitions

export interface MetricData {
  value: number;
  timestamp: Date;
  trend?: 'up' | 'down' | 'stable';
}

export interface ChartDataPoint {
  x: string | Date;
  y: number;
  label?: string;
}

export interface MetricConfig {
  name: string;
  description: string;
  unit: string;
  target?: number;
  threshold?: {
    good: number;
    warning: number;
    critical: number;
  };
}

export interface DashboardMetrics {
  perceivedFailures: MetricData;
  meanTimeToRestore: MetricData;
  bugFixSLO: MetricData;
  deploymentFrequency: MetricData;
  leadTime: MetricData;
  cycleTime: MetricData;
}