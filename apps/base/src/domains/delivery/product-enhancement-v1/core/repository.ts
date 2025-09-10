import { IProductEnhancementV1 } from './entity.schema.types';

export interface IProductEnhancementV1Repository {
  // Basic CRUD operations
  findById(id: string): Promise<IProductEnhancementV1 | null>;
  update(id: string, dto: IProductEnhancementV1): Promise<IProductEnhancementV1>;
  delete(id: string): Promise<void>;

  // Query operations
  findAll(options?: {
    limit?: number;
    offset?: number;
    sortBy?: keyof IProductEnhancementV1;
    sortOrder?: 'asc' | 'desc';
  }): Promise<IProductEnhancementV1[]>;

  findByStatus(
    status: IProductEnhancementV1['status'],
    options?: {
      limit?: number;
      offset?: number;
    }
  ): Promise<IProductEnhancementV1[]>;

  findByPriority(
    priority: IProductEnhancementV1['priority'],
    options?: {
      limit?: number;
      offset?: number;
    }
  ): Promise<IProductEnhancementV1[]>;

  findByEffort(
    effort: IProductEnhancementV1['effort'],
    options?: {
      limit?: number;
      offset?: number;
    }
  ): Promise<IProductEnhancementV1[]>;

  findByAssignee(
    assignee: string,
    options?: {
      limit?: number;
      offset?: number;
    }
  ): Promise<IProductEnhancementV1[]>;

  findByKey(key: string): Promise<IProductEnhancementV1 | null>;

  findByLabels(
    labels: string[],
    options?: {
      limit?: number;
      offset?: number;
      matchAll?: boolean; // true = AND, false = OR
    }
  ): Promise<IProductEnhancementV1[]>;

  findByDateRange(
    startDate: string,
    endDate: string,
    dateField: 'createdAt' | 'updatedAt' | 'startedAt' | 'completedAt',
    options?: {
      limit?: number;
      offset?: number;
    }
  ): Promise<IProductEnhancementV1[]>;

  // Metrics and analytics
  countByStatus(): Promise<Record<IProductEnhancementV1['status'], number>>;
  countByPriority(): Promise<Record<IProductEnhancementV1['priority'], number>>;
  countByEffort(): Promise<Record<IProductEnhancementV1['effort'], number>>;
  
  findCompletedInDateRange(
    startDate: string,
    endDate: string
  ): Promise<IProductEnhancementV1[]>;

  findCancelledInDateRange(
    startDate: string,
    endDate: string
  ): Promise<IProductEnhancementV1[]>;

  findStartedInDateRange(
    startDate: string,
    endDate: string
  ): Promise<IProductEnhancementV1[]>;

  findActive(): Promise<IProductEnhancementV1[]>;

  // Cycle time calculations
  findCompleted(
    startDate: string,
    endDate: string
  ): Promise<Array<IProductEnhancementV1 & { cycleTimeHours: number }>>;

  // Existence checks
  exists(id: string): Promise<boolean>;
}
