// Event system for decoupled communication between components

export interface BaseEvent {
  type: string
  timestamp: Date
  source: string
}

export interface DataSyncEvent extends BaseEvent {
  type: 'data-sync'
  entityType: string
  operation: 'create' | 'update' | 'delete' | 'sync'
  entityId?: string
  success: boolean
  error?: string
}

export interface MetricCalculationEvent extends BaseEvent {
  type: 'metric-calculation'
  metricType: string
  value: number
  period: string
}

export interface UserActionEvent extends BaseEvent {
  type: 'user-action'
  action: string
  context?: Record<string, any>
}

export type AppEvent = DataSyncEvent | MetricCalculationEvent | UserActionEvent

// Event listener type
export type EventListener<T extends AppEvent = AppEvent> = (event: T) => void | Promise<void>

// Event emitter class
export class EventEmitter {
  private listeners: Map<string, Set<EventListener>> = new Map()

  on<T extends AppEvent>(eventType: T['type'], listener: EventListener<T>): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set())
    }
    this.listeners.get(eventType)!.add(listener as EventListener)
  }

  off<T extends AppEvent>(eventType: T['type'], listener: EventListener<T>): void {
    const eventListeners = this.listeners.get(eventType)
    if (eventListeners) {
      eventListeners.delete(listener as EventListener)
      if (eventListeners.size === 0) {
        this.listeners.delete(eventType)
      }
    }
  }

  async emit<T extends AppEvent>(event: T): Promise<void> {
    const eventListeners = this.listeners.get(event.type)
    if (eventListeners) {
      const promises = Array.from(eventListeners).map(listener => {
        try {
          return Promise.resolve(listener(event))
        } catch (error) {
          console.error(`Error in event listener for ${event.type}:`, error)
          return Promise.resolve()
        }
      })
      await Promise.all(promises)
    }
  }

  removeAllListeners(eventType?: string): void {
    if (eventType) {
      this.listeners.delete(eventType)
    } else {
      this.listeners.clear()
    }
  }

  getListenerCount(eventType: string): number {
    return this.listeners.get(eventType)?.size || 0
  }
}

// Global event emitter instance
export const eventEmitter = new EventEmitter()

// Utility functions for common events
export const emitDataSyncEvent = (
  entityType: string,
  operation: DataSyncEvent['operation'],
  success: boolean,
  entityId?: string,
  error?: string,
  source = 'unknown'
): void => {
  eventEmitter.emit({
    type: 'data-sync',
    timestamp: new Date(),
    source,
    entityType,
    operation,
    entityId,
    success,
    error,
  })
}

export const emitMetricCalculationEvent = (
  metricType: string,
  value: number,
  period: string,
  source = 'metric-calculator'
): void => {
  eventEmitter.emit({
    type: 'metric-calculation',
    timestamp: new Date(),
    source,
    metricType,
    value,
    period,
  })
}

export const emitUserActionEvent = (
  action: string,
  context?: Record<string, any>,
  source = 'user-interface'
): void => {
  eventEmitter.emit({
    type: 'user-action',
    timestamp: new Date(),
    source,
    action,
    context,
  })
}
