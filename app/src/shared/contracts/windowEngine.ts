import { z } from 'zod'
import { appErrorSchema } from '../errors/appError'

export const windowBoundsSchema = z.object({ x: z.number().int(), y: z.number().int(), width: z.number().int().positive(), height: z.number().int().positive() })
export type WindowBounds = z.infer<typeof windowBoundsSchema>
export const savedWindowStateSchema = z.object({ bounds: windowBoundsSchema })
export type SavedWindowState = z.infer<typeof savedWindowStateSchema>
export const displayInfoSchema = z.object({ id: z.number(), scaleFactor: z.number().positive(), workArea: windowBoundsSchema })
export const windowEngineStateSchema = z.object({ bounds: windowBoundsSchema, alwaysOnTop: z.boolean(), clickThrough: z.boolean(), debugOverlay: z.boolean(), display: displayInfoSchema })
export type WindowEngineState = z.infer<typeof windowEngineStateSchema>
export const windowActionSchema = z.object({ action: z.enum(['toggleAlwaysOnTop', 'toggleClickThrough', 'snapToEdge', 'toggleDebugOverlay', 'hide']), enabled: z.boolean().optional() })
export type WindowAction = z.infer<typeof windowActionSchema>
export const windowEngineResultSchema = z.discriminatedUnion('ok', [z.object({ ok: z.literal(true), data: windowEngineStateSchema }), z.object({ ok: z.literal(false), error: appErrorSchema })])
export type WindowEngineResult = z.infer<typeof windowEngineResultSchema>
