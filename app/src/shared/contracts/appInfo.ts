import { z } from 'zod'
import { appErrorSchema } from '../errors/appError'

export const appInfoSchema = z.object({
  name: z.literal('Pets'),
  version: z.string().min(1),
  platform: z.literal('win32'),
  isPackaged: z.boolean(),
})

export type AppInfo = z.infer<typeof appInfoSchema>

export const appInfoRequestSchema = z.undefined()

export const appInfoResultSchema = z.discriminatedUnion('ok', [
  z.object({ ok: z.literal(true), data: appInfoSchema }),
  z.object({ ok: z.literal(false), error: appErrorSchema }),
])

export type AppInfoResult = z.infer<typeof appInfoResultSchema>
