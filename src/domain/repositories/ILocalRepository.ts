import { Issue, Epic, Idea } from '../entities';

/**
 * Abstract repository interface for local storage operations
 * Defines the contract for offline data persistence using IndexedDB
 */
export interface ILocalRepository {
  // Issue operations
  saveIssues(issues: Issue[]): Promise<void>;
  getIssues(filter?: Partial<Issue>): Promise<Issue[]>;
  getIssueByKey(key: string): Promise<Issue | null>;
  deleteIssue(id: string): Promise<void>;
  
  // Epic operations
  saveEpics(epics: Epic[]): Promise<void>;
  getEpics(filter?: Partial<Epic>): Promise<Epic[]>;
  getEpicById(id: string): Promise<Epic | null>;
  deleteEpic(id: string): Promise<void>;
  
  // Idea operations
  saveIdeas(ideas: Idea[]): Promise<void>;
  getIdeas(filter?: Partial<Idea>): Promise<Idea[]>;
  getIdeaById(id: string): Promise<Idea | null>;
  deleteIdea(id: string): Promise<void>;
  
  // Utility operations
  clearAllData(): Promise<void>;
  getLastSyncTimestamp(): Promise<Date | null>;
  setLastSyncTimestamp(timestamp: Date): Promise<void>;
}