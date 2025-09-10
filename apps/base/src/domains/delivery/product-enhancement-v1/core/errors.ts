export class ProductEnhancementV1NotFoundError extends Error {
  constructor(id: string) {
    super(`Product enhancement with id ${id} not found`)
  }
}

export class InvalidProductEnhancementV1StatusTransitionError extends Error {
  constructor(fromStatus: string, toStatus: string) {
    super(`Cannot transition product enhancement from ${fromStatus} to ${toStatus}`)
  }
}

export class ProductEnhancementV1BusinessRuleViolationError extends Error {
  constructor(message: string) {
    super(`Business rule violation: ${message}`)
  }
}
