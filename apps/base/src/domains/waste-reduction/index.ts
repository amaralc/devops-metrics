// Waste Reduction Domain - Process Improvement entities and types

export interface ProcessKaizen {
  id: string
  title: string
  description: string
  category: 'process' | 'tooling' | 'documentation' | 'automation'
  status: 'proposed' | 'approved' | 'in-progress' | 'completed' | 'rejected'
  impact: 'low' | 'medium' | 'high'
  effort: 1 | 2 | 3 | 4 | 5 // 1-5 scale
  proposedBy: string
  approvedBy?: string
  createdAt: Date
  updatedAt: Date
  implementedAt?: Date
  measuredImpact?: string
}

// Waste reduction metrics types
export interface WasteReductionMetrics {
  processImprovements: {
    totalProposed: number
    totalImplemented: number
    implementationRate: number // percentage
    trend: 'up' | 'down' | 'stable'
  }
  automationGains: {
    hoursAutomated: number
    costSavings: number
    trend: 'up' | 'down' | 'stable'
  }
}

// Domain service interfaces
export interface WasteReductionRepository {
  createKaizen(kaizen: Omit<ProcessKaizen, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProcessKaizen>
  getKaizen(id: string): Promise<ProcessKaizen | null>
  updateKaizen(id: string, updates: Partial<ProcessKaizen>): Promise<ProcessKaizen>
  deleteKaizen(id: string): Promise<void>
  listKaizens(filters?: { 
    category?: string
    status?: string
    impact?: string
    proposedBy?: string
  }): Promise<ProcessKaizen[]>
}

export interface WasteReductionService {
  calculateProcessImprovements(): Promise<{
    totalProposed: number
    totalImplemented: number
    implementationRate: number
  }>
  calculateAutomationGains(): Promise<{
    hoursAutomated: number
    costSavings: number
  }>
  getWasteReductionMetrics(): Promise<WasteReductionMetrics>
}
