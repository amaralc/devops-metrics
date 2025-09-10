#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import { config } from '@devops-metrics/base'

const program = new Command()

program
  .name('devops-metrics')
  .description('DevOps Metrics Dashboard CLI')
  .version('0.1.0')

program
  .command('config')
  .description('Show current configuration')
  .action(() => {
    console.log(chalk.blue('DevOps Metrics Configuration:'))
    console.log(chalk.gray('NODE_ENV:'), config.get('NODE_ENV'))
    console.log(chalk.gray('JIRA_URL:'), config.get('JIRA_URL') || chalk.red('Not configured'))
    console.log(chalk.gray('JIRA_PROJECT_KEY:'), config.get('JIRA_PROJECT_KEY') || chalk.red('Not configured'))
    console.log(chalk.gray('Jira Configured:'), config.isJiraConfigured() ? chalk.green('Yes') : chalk.red('No'))
  })

program
  .command('sync')
  .description('Sync data from Jira')
  .action(async () => {
    console.log(chalk.blue('Starting data sync...'))
    
    if (!config.isJiraConfigured()) {
      console.log(chalk.red('Jira is not configured. Please set JIRA_URL, JIRA_API_TOKEN, and JIRA_PROJECT_KEY.'))
      process.exit(1)
    }

    // TODO: Implement sync logic
    console.log(chalk.yellow('Sync functionality will be implemented in Step 4.'))
  })

program.parse()
