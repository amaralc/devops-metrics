import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { config } from '../configuration'

// API response wrapper
export interface ApiResponse<T = any> {
  data: T
  success: boolean
  message?: string
  error?: string
}

// API error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Base API client
export class BaseApiClient {
  protected client: AxiosInstance

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add timestamp to prevent caching
        if (config.method === 'get') {
          config.params = {
            ...config.params,
            _t: Date.now(),
          }
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const apiError = new ApiError(
          error.response?.data?.message || error.message || 'Unknown API error',
          error.response?.status,
          error.response?.data?.code,
          error.response?.data
        )
        return Promise.reject(apiError)
      }
    )
  }

  protected async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.request(config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url })
  }

  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }

  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url, data })
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url })
  }
}

// Jira API client
export class JiraApiClient extends BaseApiClient {
  constructor() {
    const jiraUrl = config.get('JIRA_URL')
    const jiraToken = config.get('JIRA_API_TOKEN')

    if (!jiraUrl || !jiraToken) {
      throw new Error('Jira configuration is missing. Please set JIRA_URL and JIRA_API_TOKEN.')
    }

    super(`${jiraUrl}/rest/api/3`, {
      Authorization: `Bearer ${jiraToken}`,
    })
  }

  async getIssues(jql: string, fields?: string[]): Promise<any> {
    const params: any = {
      jql,
      maxResults: 1000,
    }

    if (fields && fields.length > 0) {
      params.fields = fields.join(',')
    }

    return this.get('/search', { params })
  }

  async getIssue(issueKey: string, fields?: string[]): Promise<any> {
    const params: any = {}
    if (fields && fields.length > 0) {
      params.fields = fields.join(',')
    }

    return this.get(`/issue/${issueKey}`, { params })
  }

  async getProject(projectKey: string): Promise<any> {
    return this.get(`/project/${projectKey}`)
  }

  async getIssueTransitions(issueKey: string): Promise<any> {
    return this.get(`/issue/${issueKey}/transitions`)
  }
}

// Mock API client for development/testing
export class MockApiClient {
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getIssues(jql: string): Promise<any> {
    await this.delay()
    
    return {
      issues: [
        {
          key: 'DEMO-1',
          fields: {
            summary: 'Implement user authentication',
            status: { name: 'Done' },
            issuetype: { name: 'Story' },
            priority: { name: 'High' },
            created: '2024-01-01T00:00:00.000Z',
            updated: '2024-01-15T00:00:00.000Z',
            resolutiondate: '2024-01-15T00:00:00.000Z',
          },
        },
        {
          key: 'DEMO-2',
          fields: {
            summary: 'Fix login bug',
            status: { name: 'Done' },
            issuetype: { name: 'Bug' },
            priority: { name: 'Critical' },
            created: '2024-01-02T00:00:00.000Z',
            updated: '2024-01-03T00:00:00.000Z',
            resolutiondate: '2024-01-03T00:00:00.000Z',
          },
        },
        {
          key: 'DEMO-3',
          fields: {
            summary: 'Add dashboard metrics',
            status: { name: 'In Progress' },
            issuetype: { name: 'Story' },
            priority: { name: 'Medium' },
            created: '2024-01-05T00:00:00.000Z',
            updated: '2024-01-10T00:00:00.000Z',
          },
        },
      ],
      total: 3,
    }
  }

  async getIssue(issueKey: string): Promise<any> {
    await this.delay()
    
    return {
      key: issueKey,
      fields: {
        summary: `Sample issue ${issueKey}`,
        status: { name: 'Done' },
        issuetype: { name: 'Story' },
        priority: { name: 'Medium' },
        created: '2024-01-01T00:00:00.000Z',
        updated: '2024-01-15T00:00:00.000Z',
        resolutiondate: '2024-01-15T00:00:00.000Z',
      },
    }
  }

  async getProject(projectKey: string): Promise<any> {
    await this.delay()
    
    return {
      key: projectKey,
      name: `Sample Project ${projectKey}`,
      projectTypeKey: 'software',
    }
  }
}

// API client factory
export function createApiClient(): JiraApiClient | MockApiClient {
  if (config.isJiraConfigured() && !config.isTest()) {
    return new JiraApiClient()
  }
  return new MockApiClient()
}
