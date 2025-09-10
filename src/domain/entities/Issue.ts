/**
 * Domain Entity: Issue
 * Represents a Jira issue with story points, status transitions, and timestamps
 */
export interface Issue {
  id: string;
  jiraKey: string;
  title: string;
  description: string;
  issueType: IssueType;
  status: IssueStatus;
  priority: IssuePriority;
  storyPoints?: number;
  epicId?: string;
  assignee?: string;
  reporter: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  statusTransitions: StatusTransition[];
  labels: string[];
  components: string[];
}

export interface StatusTransition {
  id: string;
  fromStatus: string;
  toStatus: string;
  transitionDate: Date;
  author: string;
}

export enum IssueType {
  STORY = 'story',
  BUG = 'bug',
  TASK = 'task',
  EPIC = 'epic',
  SUBTASK = 'subtask'
}

export enum IssueStatus {
  BACKLOG = 'backlog',
  TO_DO = 'to_do',
  IN_PROGRESS = 'in_progress',
  IN_REVIEW = 'in_review',
  TESTING = 'testing',
  DONE = 'done',
  CANCELLED = 'cancelled'
}

export enum IssuePriority {
  LOWEST = 'lowest',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  HIGHEST = 'highest'
}