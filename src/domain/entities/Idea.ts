/**
 * Domain Entity: Idea
 * Represents a business idea or requirement with effort estimates
 */
export interface Idea {
  id: string;
  title: string;
  description: string;
  effortEstimate: EffortEstimate; // 1-5 scale
  status: IdeaStatus;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  tags: string[];
}

export enum EffortEstimate {
  VERY_LOW = 1,
  LOW = 2,
  MEDIUM = 3,
  HIGH = 4,
  VERY_HIGH = 5
}

export enum IdeaStatus {
  DRAFT = 'draft',
  PROPOSED = 'proposed',
  APPROVED = 'approved',
  IN_DEVELOPMENT = 'in_development',
  COMPLETED = 'completed',
  REJECTED = 'rejected'
}