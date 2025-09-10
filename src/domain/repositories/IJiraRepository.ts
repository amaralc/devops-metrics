import { Issue, Epic } from '../entities';

/**
 * Abstract repository interface for Jira API operations
 * Defines the contract for fetching data from Jira
 */
export interface IJiraRepository {
  /**
   * Fetch issues using JQL query
   */
  fetchIssues(jql: string, startAt?: number, maxResults?: number): Promise<Issue[]>;
  
  /**
   * Fetch epics using JQL query
   */
  fetchEpics(jql: string, startAt?: number, maxResults?: number): Promise<Epic[]>;
  
  /**
   * Fetch a specific issue by key
   */
  fetchIssueByKey(key: string): Promise<Issue | null>;
  
  /**
   * Fetch issue status transitions
   */
  fetchIssueTransitions(issueKey: string): Promise<Issue['statusTransitions']>;
  
  /**
   * Test connection to Jira API
   */
  testConnection(): Promise<boolean>;
}