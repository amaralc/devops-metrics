// Delivery Domain - Product Feature entities and types

export interface ProductIdea {
  id: string
  description: string
  effort: 1 | 2 | 3 | 4 | 5 // 1-5 scale
  status: 'backlog' | 'in-progress' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
  epicId?: string
  tags?: string[]
  priority: 'low' | 'medium' | 'high' | 'critical'
}

export interface StatusTimestamp {
  status: string
  timestamp: Date
}

export interface ProductEnhancement {
  id: string
  jiraId: string
  title: string
  ideas: ProductIdea[]
  status: 'backlog' | 'in-progress' | 'done' | 'cancelled'
  statusHistory: StatusTimestamp[]
  createdAt: Date
  updatedAt: Date
  startedAt?: Date
  completedAt?: Date
  labels?: string[]
  assignee?: string
  reporter?: string
  priority: 'lowest' | 'low' | 'medium' | 'high' | 'highest'
}

// Delivery metrics types
export interface DeliveryMetrics {
  deploymentFrequency: {
    value: number
    period: 'week' | 'month'
    trend: 'up' | 'down' | 'stable'
  }
  leadTime: {
    averageDays: number
    trend: 'up' | 'down' | 'stable'
  }
  cycleTime: {
    averageDays: number
    trend: 'up' | 'down' | 'stable'
  }
}

// Domain service interfaces
export interface DeliveryRepository {
  // Product Ideas
  createIdea(idea: Omit<ProductIdea, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductIdea>
  getIdea(id: string): Promise<ProductIdea | null>
  updateIdea(id: string, updates: Partial<ProductIdea>): Promise<ProductIdea>
  deleteIdea(id: string): Promise<void>
  listIdeas(filters?: { status?: string; priority?: string; epicId?: string }): Promise<ProductIdea[]>

  // Product Enhancements
  createEnhancement(enhancement: Omit<ProductEnhancement, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductEnhancement>
  getEnhancement(id: string): Promise<ProductEnhancement | null>
  updateEnhancement(id: string, updates: Partial<ProductEnhancement>): Promise<ProductEnhancement>
  deleteEnhancement(id: string): Promise<void>
  listEnhancements(filters?: { status?: string; priority?: string; assignee?: string }): Promise<ProductEnhancement[]>
}

export interface DeliveryService {
  calculateDeploymentFrequency(period: 'week' | 'month'): Promise<number>
  calculateLeadTime(): Promise<number>
  calculateCycleTime(): Promise<number>
  getDeliveryMetrics(): Promise<DeliveryMetrics>
}
