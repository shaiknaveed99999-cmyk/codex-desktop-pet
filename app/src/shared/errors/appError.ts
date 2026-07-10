import { z } from 'zod'

export const appErrorCodes = {
  invalidRequest: 'INVALID_REQUEST',
  permissionDenied: 'PERMISSION_DENIED',
  internal: 'INTERNAL_ERROR',
  windowUnavailable: 'WINDOW_UNAVAILABLE',
} as const

export type AppErrorCode = (typeof appErrorCodes)[keyof typeof appErrorCodes]

export const appErrorSchema = z.object({
  code: z.enum([appErrorCodes.invalidRequest, appErrorCodes.permissionDenied, appErrorCodes.internal, appErrorCodes.windowUnavailable]),
  message: z.string().min(1),
})

export type AppError = z.infer<typeof appErrorSchema>
