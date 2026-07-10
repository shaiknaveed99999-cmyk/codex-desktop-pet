export const appErrorCodes = {
  invalidRequest: 'INVALID_REQUEST',
  permissionDenied: 'PERMISSION_DENIED',
} as const

export type AppErrorCode = (typeof appErrorCodes)[keyof typeof appErrorCodes]

export class AppError extends Error {
  public constructor(
    public readonly code: AppErrorCode,
    message: string,
  ) {
    super(message)
    this.name = 'AppError'
  }
}
