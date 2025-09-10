import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function calculateTrend(current: number, previous: number): 'up' | 'down' | 'stable' {
  const threshold = 0.05; // 5% threshold for stability
  const change = (current - previous) / previous;
  
  if (Math.abs(change) < threshold) return 'stable';
  return change > 0 ? 'up' : 'down';
}

export function formatMetricValue(value: number, unit: string): string {
  switch (unit) {
    case '%':
      return `${value.toFixed(1)}%`;
    case 'hours':
      return `${value.toFixed(1)}h`;
    case 'days':
      return `${value.toFixed(1)}d`;
    default:
      return value.toFixed(1);
  }
}