import Dexie, { Table } from 'dexie'

// Base entity interface
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

// Database schema interfaces
export interface ProductIdea extends BaseEntity {
  description: string
  effort: 1 | 2 | 3 | 4 | 5
  status: 'backlog' | 'in-progress' | 'completed' | 'cancelled'
  epicId?: string
  tags?: string[]
  priority: 'low' | 'medium' | 'high' | 'critical'
}

export interface ProductEnhancement extends BaseEntity {
  jiraId: string
  title: string
  ideas: string[] // Array of idea IDs
  status: 'backlog' | 'in-progress' | 'done' | 'cancelled'
  statusHistory: Array<{ status: string; timestamp: Date }>
  startedAt?: Date
  completedAt?: Date
  labels?: string[]
  assignee?: string
  reporter?: string
  priority: 'lowest' | 'low' | 'medium' | 'high' | 'highest'
}

export interface MaintenanceTask extends BaseEntity {
  jiraId: string
  title: string
  type: 'corrective' | 'non-corrective'
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  statusHistory: Array<{ status: string; timestamp: Date }>
  severity: 'low' | 'medium' | 'high' | 'critical'
  priority: 'lowest' | 'low' | 'medium' | 'high' | 'highest'
  assignee?: string
  reporter?: string
  resolutionTime?: number // in hours
  labels?: string[]
}

export interface ProcessKaizen extends BaseEntity {
  title: string
  description: string
  category: 'process' | 'tooling' | 'documentation' | 'automation'
  status: 'proposed' | 'approved' | 'in-progress' | 'completed' | 'rejected'
  impact: 'low' | 'medium' | 'high'
  effort: 1 | 2 | 3 | 4 | 5
  proposedBy: string
  approvedBy?: string
  implementedAt?: Date
  measuredImpact?: string
}

export interface SyncMetadata extends BaseEntity {
  entityType: string
  lastSyncAt: Date
  syncStatus: 'success' | 'error' | 'pending'
  errorMessage?: string
  recordCount: number
}

// Database class
export class DevOpsMetricsDB extends Dexie {
  // Delivery Domain
  productIdeas!: Table<ProductIdea>
  productEnhancements!: Table<ProductEnhancement>

  // Maintenance Domain
  maintenanceTasks!: Table<MaintenanceTask>

  // Waste Reduction Domain
  processKaizens!: Table<ProcessKaizen>

  // Sync metadata
  syncMetadata!: Table<SyncMetadata>

  constructor() {
    super('DevOpsMetricsDB')

    this.version(1).stores({
      productIdeas: 'id, status, priority, epicId, createdAt, updatedAt',
      productEnhancements: 'id, jiraId, status, priority, assignee, createdAt, updatedAt, startedAt, completedAt',
      maintenanceTasks: 'id, jiraId, type, status, severity, priority, assignee, createdAt, updatedAt',
      processKaizens: 'id, category, status, impact, proposedBy, createdAt, updatedAt',
      syncMetadata: 'id, entityType, lastSyncAt, syncStatus',
    })

    // Add hooks for automatic timestamp updates
    this.productIdeas.hook('creating', (primKey, obj, trans) => {
      obj.createdAt = new Date()
      obj.updatedAt = new Date()
    })

    this.productIdeas.hook('updating', (modifications, primKey, obj, trans) => {
      modifications.updatedAt = new Date()
    })

    this.productEnhancements.hook('creating', (primKey, obj, trans) => {
      obj.createdAt = new Date()
      obj.updatedAt = new Date()
    })

    this.productEnhancements.hook('updating', (modifications, primKey, obj, trans) => {
      modifications.updatedAt = new Date()
    })

    this.maintenanceTasks.hook('creating', (primKey, obj, trans) => {
      obj.createdAt = new Date()
      obj.updatedAt = new Date()
    })

    this.maintenanceTasks.hook('updating', (modifications, primKey, obj, trans) => {
      modifications.updatedAt = new Date()
    })

    this.processKaizens.hook('creating', (primKey, obj, trans) => {
      obj.createdAt = new Date()
      obj.updatedAt = new Date()
    })

    this.processKaizens.hook('updating', (modifications, primKey, obj, trans) => {
      modifications.updatedAt = new Date()
    })
  }
}

// Database instance
export const db = new DevOpsMetricsDB()

// Database utilities
export class DatabaseUtils {
  static async clearAllData(): Promise<void> {
    await db.transaction('rw', db.tables, async () => {
      await Promise.all(db.tables.map(table => table.clear()))
    })
  }

  static async getStorageInfo(): Promise<{
    usage: number
    quota: number
    percentage: number
  }> {
    if (typeof window !== 'undefined' && 'storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate()
      const usage = estimate.usage || 0
      const quota = estimate.quota || 0
      const percentage = quota > 0 ? (usage / quota) * 100 : 0

      return { usage, quota, percentage }
    }

    return { usage: 0, quota: 0, percentage: 0 }
  }

  static async exportData(): Promise<string> {
    const data = {
      productIdeas: await db.productIdeas.toArray(),
      productEnhancements: await db.productEnhancements.toArray(),
      maintenanceTasks: await db.maintenanceTasks.toArray(),
      processKaizens: await db.processKaizens.toArray(),
      syncMetadata: await db.syncMetadata.toArray(),
      exportedAt: new Date().toISOString(),
    }

    return JSON.stringify(data, null, 2)
  }

  static async importData(jsonData: string): Promise<void> {
    const data = JSON.parse(jsonData)

    await db.transaction('rw', db.tables, async () => {
      if (data.productIdeas) {
        await db.productIdeas.bulkPut(data.productIdeas)
      }
      if (data.productEnhancements) {
        await db.productEnhancements.bulkPut(data.productEnhancements)
      }
      if (data.maintenanceTasks) {
        await db.maintenanceTasks.bulkPut(data.maintenanceTasks)
      }
      if (data.processKaizens) {
        await db.processKaizens.bulkPut(data.processKaizens)
      }
      if (data.syncMetadata) {
        await db.syncMetadata.bulkPut(data.syncMetadata)
      }
    })
  }
}
