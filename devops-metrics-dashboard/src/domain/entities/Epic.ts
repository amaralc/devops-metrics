/**
 * Domain Entity: Epic
 * Represents an epic that implements ideas and links to Jira epics
 */
export interface Epic {
  id: string;
  jiraEpicKey: string;
  title: string;
  description: string;
  ideaIds: string[]; // Links to implemented ideas
  status: EpicStatus;
  startDate?: Date;
  endDate?: Date;
  estimatedStoryPoints: number;
  actualStoryPoints: number;
  createdAt: Date;
  updatedAt: Date;
  assignedTeam?: string;
}

export enum EpicStatus {
  BACKLOG = 'backlog',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  TESTING = 'testing',
  DONE = 'done',
  CANCELLED = 'cancelled'
}