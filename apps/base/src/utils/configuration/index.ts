import { z } from 'zod'

// Environment configuration schema
export const EnvConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  JIRA_URL: z.string().url().optional(),
  JIRA_API_TOKEN: z.string().optional(),
  JIRA_PROJECT_KEY: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
})

export type EnvConfig = z.infer<typeof EnvConfigSchema>

// Configuration manager
export class ConfigManager {
  private static instance: ConfigManager
  private config: EnvConfig

  private constructor() {
    this.config = this.loadConfig()
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  private loadConfig(): EnvConfig {
    const rawConfig = {
      NODE_ENV: process.env.NODE_ENV,
      JIRA_URL: process.env.JIRA_URL,
      JIRA_API_TOKEN: process.env.JIRA_API_TOKEN,
      JIRA_PROJECT_KEY: process.env.JIRA_PROJECT_KEY,
      DATABASE_URL: process.env.DATABASE_URL,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    }

    try {
      return EnvConfigSchema.parse(rawConfig)
    } catch (error) {
      console.warn('Environment validation failed, using defaults:', error)
      return EnvConfigSchema.parse({})
    }
  }

  public get<K extends keyof EnvConfig>(key: K): EnvConfig[K] {
    return this.config[key]
  }

  public getAll(): EnvConfig {
    return { ...this.config }
  }

  public isJiraConfigured(): boolean {
    return !!(
      this.config.JIRA_URL &&
      this.config.JIRA_API_TOKEN &&
      this.config.JIRA_PROJECT_KEY
    )
  }

  public isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development'
  }

  public isProduction(): boolean {
    return this.config.NODE_ENV === 'production'
  }

  public isTest(): boolean {
    return this.config.NODE_ENV === 'test'
  }
}

// Export singleton instance
export const config = ConfigManager.getInstance()
