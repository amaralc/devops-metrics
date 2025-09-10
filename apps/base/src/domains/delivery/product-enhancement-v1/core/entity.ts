import { differenceInDays, differenceInHours } from 'date-fns';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import entitySchema from './entity.schema';
import { IProductEnhancementV1 } from './entity.schema.types';
import {
  InvalidProductEnhancementV1InputDtoError,
  InvalidProductEnhancementV1StatusTransitionError,
  ProductEnhancementV1BusinessRuleViolationError
} from './errors';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export class ProductEnhancementV1Entity {
  private dto: IProductEnhancementV1;

  constructor(inputDto: IProductEnhancementV1) {
    this.dto = inputDto;
    this.validate();
  }

  validate(): this {
    this.validateInputDto();
    this.validateBusinessRules();
    return this;
  }

  private validateInputDto(): void {
    const validate = ajv.compile(entitySchema);
    const valid = validate(this.dto);
    
    if (!valid) {
      const errors = validate.errors?.map(err => `${err.instancePath} ${err.message}`).join(', ') || 'Unknown validation error';
      throw new InvalidProductEnhancementV1InputDtoError(errors);
    }
  }

  private validateBusinessRules(): void {
    // Rule: Cannot complete an enhancement that was never started
    if (this.dto.completedAt && !this.dto.startedAt) {
      throw new ProductEnhancementV1BusinessRuleViolationError('Cannot complete an enhancement that was never started');
    }

    // Rule: Start date cannot be before creation date
    if (this.dto.startedAt && new Date(this.dto.startedAt) < new Date(this.dto.createdAt)) {
      throw new ProductEnhancementV1BusinessRuleViolationError('Start date cannot be before creation date');
    }

    // Rule: Completion date cannot be before start date
    if (this.dto.completedAt && this.dto.startedAt && 
        new Date(this.dto.completedAt) < new Date(this.dto.startedAt)) {
      throw new ProductEnhancementV1BusinessRuleViolationError('Completion date cannot be before start date');
    }

    // Rule: Done status must have completion date
    if (this.dto.status === 'done' && !this.dto.completedAt) {
      throw new ProductEnhancementV1BusinessRuleViolationError('Enhancements with done status must have completion date');
    }

    // Rule: In-progress/review status must have start date
    if ((this.dto.status === 'in-progress' || this.dto.status === 'review') && !this.dto.startedAt) {
      throw new ProductEnhancementV1BusinessRuleViolationError('Enhancements in progress or review must have start date');
    }

    // Rule: Review status must have at least one reviewer
    if (this.dto.status === 'review' && this.dto.reviewers.length === 0) {
      throw new ProductEnhancementV1BusinessRuleViolationError('Enhancements in review must have at least one reviewer');
    }
  }

  // Business logic methods
  calculateCycleTime(): number | null {
    if (!this.dto.completedAt || !this.dto.startedAt) {
      return null; // Not completed or never started
    }
    return differenceInHours(new Date(this.dto.completedAt), new Date(this.dto.startedAt));
  }

  calculateLeadTime(): number | null {
    if (!this.dto.completedAt) {
      return null; // Not completed yet
    }
    return differenceInDays(new Date(this.dto.completedAt), new Date(this.dto.createdAt));
  }

  calculateWaitTime(): number | null {
    if (!this.dto.startedAt) {
      return differenceInDays(new Date(), new Date(this.dto.createdAt)); // Time waiting to start
    }
    return differenceInDays(new Date(this.dto.startedAt), new Date(this.dto.createdAt));
  }

  isActive(): boolean {
    return this.dto.status === 'in-progress' || this.dto.status === 'review';
  }

  isDone(): boolean {
    return this.dto.status === 'done';
  }

  isCancelled(): boolean {
    return this.dto.status === 'cancelled';
  }

  isBlocked(): boolean {
    // An enhancement is considered blocked if it's been in ready state for more than 3 days
    if (this.dto.status === 'ready') {
      const daysInReady = differenceInDays(new Date(), new Date(this.dto.updatedAt));
      return daysInReady > 3;
    }
    
    // Or if it's been in review for more than 5 days
    if (this.dto.status === 'review') {
      const daysInReview = differenceInDays(new Date(), new Date(this.dto.updatedAt));
      return daysInReview > 5;
    }
    
    return false;
  }

  getPriorityWeight(): number {
    const weights = {
      lowest: 1,
      low: 2,
      medium: 3,
      high: 4,
      highest: 5
    };
    return weights[this.dto.priority];
  }

  getComplexityScore(): number {
    // Complexity based on effort and number of reviewers needed
    const baseComplexity = this.dto.effort;
    const reviewComplexity = this.dto.reviewers.length > 0 ? this.dto.reviewers.length * 0.5 : 0;
    return baseComplexity + reviewComplexity;
  }

  getDto(): IProductEnhancementV1 {
    return { ...this.dto };
  }

  // Convert to enriched object with calculated values
  toEnrichedObject(): IProductEnhancementV1 & {
    cycleTime: number | null;
    leadTime: number | null;
    waitTime: number | null;
    priorityWeight: number;
    complexityScore: number;
    isBlocked: boolean;
    isActive: boolean;
    isDone: boolean;
    isCancelled: boolean;
  } {
    return {
      ...this.dto,
      cycleTime: this.calculateCycleTime(),
      leadTime: this.calculateLeadTime(),
      waitTime: this.calculateWaitTime(),
      priorityWeight: this.getPriorityWeight(),
      complexityScore: this.getComplexityScore(),
      isBlocked: this.isBlocked(),
      isActive: this.isActive(),
      isDone: this.isDone(),
      isCancelled: this.isCancelled()
    };
  }
}
