// Maintenance Domain - Product Health entities and types

export interface MaintenanceTask {
  id: string
  jiraId: string
  title: string
  type: 'corrective' | 'non-corrective'
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  statusHistory: Array<{ status: string; timestamp: Date }>
  severity: 'low' | 'medium' | 'high' | 'critical'
  priority: 'lowest' | 'low' | 'medium' | 'high' | 'highest'
  createdAt: Date
  updatedAt: Date
  assignee?: string
  reporter?: string
  resolutionTime?: number // in hours
  labels?: string[]
}

// Maintenance metrics types
export interface MaintenanceMetrics {
  perceivedFailures: {
    bugsPerWeek: number
    trend: 'up' | 'down' | 'stable'
  }
  meanTimeToRestore: {
    averageHours: number
    trend: 'up' | 'down' | 'stable'
  }
  bugFixSLO: {
    percentage: number // % of issues restored within 8 hours
    target: number // target percentage
    trend: 'up' | 'down' | 'stable'
  }
}

// Domain service interfaces
export interface MaintenanceRepository {
  createTask(task: Omit<MaintenanceTask, 'id' | 'createdAt' | 'updatedAt'>): Promise<MaintenanceTask>
  getTask(id: string): Promise<MaintenanceTask | null>
  updateTask(id: string, updates: Partial<MaintenanceTask>): Promise<MaintenanceTask>
  deleteTask(id: string): Promise<void>
  listTasks(filters?: { 
    type?: 'corrective' | 'non-corrective'
    status?: string
    severity?: string
    priority?: string
    assignee?: string
  }): Promise<MaintenanceTask[]>
}

export interface MaintenanceService {
  calculatePerceivedFailures(period: 'week' | 'month'): Promise<number>
  calculateMeanTimeToRestore(): Promise<number>
  calculateBugFixSLO(): Promise<number>
  getMaintenanceMetrics(): Promise<MaintenanceMetrics>
}
