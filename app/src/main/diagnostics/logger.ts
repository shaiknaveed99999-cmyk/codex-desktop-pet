type LogFields = Readonly<Record<string, unknown>>

const sensitiveFieldPattern = /token|secret|password|authorization|cookie/i

function redactValue(value: unknown, seen: WeakSet<object>): unknown {
  if (typeof value === 'bigint') return value.toString()
  if (value === null || typeof value !== 'object') return value
  if (seen.has(value)) return '[CIRCULAR]'

  seen.add(value)
  if (Array.isArray(value)) return value.map((item) => redactValue(item, seen))

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => [
      key,
      sensitiveFieldPattern.test(key) ? '[REDACTED]' : redactValue(nestedValue, seen),
    ]),
  )
}

export function redactForDiagnostics(fields: LogFields): LogFields {
  return redactValue(fields, new WeakSet<object>()) as LogFields
}

export function logInfo(event: string, fields: LogFields = {}): void {
  console.info(JSON.stringify({ level: 'info', event, fields: redactForDiagnostics(fields) }))
}
