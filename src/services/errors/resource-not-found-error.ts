export class ResourseNotFoundError extends Error {
  constructor() {
    super('Resource not found.')
  }
}
