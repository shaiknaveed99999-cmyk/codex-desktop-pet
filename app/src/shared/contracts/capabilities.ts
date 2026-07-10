import { z } from 'zod'

export const capabilitySchema = z.enum(['app.readInfo'])
export type Capability = z.infer<typeof capabilitySchema>

export const permissionRequestSchema = z.object({
  capability: capabilitySchema,
  subject: z.literal('renderer'),
  scope: z.literal('application'),
  reason: z.string().min(1),
  correlationId: z.string().uuid(),
})

export type PermissionRequest = z.infer<typeof permissionRequestSchema>
