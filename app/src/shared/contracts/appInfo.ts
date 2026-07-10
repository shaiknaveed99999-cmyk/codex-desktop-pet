import { z } from 'zod'

export const appInfoSchema = z.object({
  name: z.literal('Pets'),
  version: z.string().min(1),
  platform: z.literal('win32'),
  isPackaged: z.boolean(),
})

export type AppInfo = z.infer<typeof appInfoSchema>

export const appInfoRequestSchema = z.undefined()
