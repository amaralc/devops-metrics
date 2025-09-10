// Generated types from JSON schema
export interface IProductEnhancementV1 {
  id: string;
  title: string;
  description: string;
  priority: 'lowest' | 'low' | 'medium' | 'high' | 'highest';
  effort: 1 | 2 | 3 | 4 | 5;
  status: 'backlog' | 'ready' | 'in-progress' | 'review' | 'done' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  startedAt?: string | null;
  completedAt?: string | null;
  jiraId?: string | null;
  labels: string[];
  assignee?: string | null;
  reporter?: string | null;
  reviewers: string[];
  parentIdeaIds: string[];
}
