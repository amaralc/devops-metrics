import type { JSONSchema7 } from 'json-schema';

const productEnhancementV1JsonSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'IProductEnhancementV1',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
      description: 'The unique identifier of a product enhancement as a UUID string.',
    },
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 200,
      description: 'The title of the product enhancement',
    },
    description: {
      type: 'string',
      minLength: 1,
      maxLength: 2000,
      description: 'Detailed description of the product enhancement',
    },
    priority: {
      type: 'string',
      enum: ['lowest', 'low', 'medium', 'high', 'highest'],
      description: 'The priority level of the enhancement',
    },
    effort: {
      type: 'integer',
      minimum: 1,
      maximum: 5,
      description: 'Story points estimation (1=XS, 2=S, 3=M, 4=L, 5=XL)',
    },
    status: {
      type: 'string',
      enum: ['backlog', 'ready', 'in-progress', 'review', 'done', 'cancelled'],
      description: 'Current status of the product enhancement',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'When the enhancement was created',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'When the enhancement was last updated',
    },
    startedAt: {
      type: ['string', 'null'],
      format: 'date-time',
      description: 'When development started on the enhancement',
    },
    completedAt: {
      type: ['string', 'null'],
      format: 'date-time',
      description: 'When the enhancement was completed',
    },
    jiraId: {
      type: ['string', 'null'],
      pattern: '^[A-Z]+-[0-9]+$',
      description: 'Jira issue key if synced from Jira',
    },
    labels: {
      type: 'array',
      items: {
        type: 'string',
        minLength: 1,
        maxLength: 50,
      },
      uniqueItems: true,
      description: 'Labels associated with the enhancement',
    },
    assignee: {
      type: ['string', 'null'],
      minLength: 1,
      maxLength: 100,
      description: 'Person assigned to work on the enhancement',
    },
    reporter: {
      type: ['string', 'null'],
      minLength: 1,
      maxLength: 100,
      description: 'Person who reported/created the enhancement',
    },
    reviewers: {
      type: 'array',
      items: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
      },
      uniqueItems: true,
      description: 'People assigned to review the enhancement',
    },
    parentIdeaIds: {
      type: 'array',
      items: {
        type: 'string',
        pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
      },
      uniqueItems: true,
      description: 'IDs of product ideas that inspired this enhancement',
    },
  },
  required: [
    'id',
    'title', 
    'description',
    'priority',
    'effort',
    'status',
    'createdAt',
    'updatedAt',
    'labels',
    'reviewers',
    'parentIdeaIds'
  ],
  additionalProperties: false,
};

export default productEnhancementV1JsonSchema;
