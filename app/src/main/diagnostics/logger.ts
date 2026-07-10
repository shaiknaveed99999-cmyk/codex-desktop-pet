type LogFields = Readonly<Record<string, unknown>>

const sensitiveFieldPattern = /token|secret|password|authorization|cookie/i

function redact(fields: LogFields): LogFields {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, sensitiveFieldPattern.test(key) ? '[REDACTED]' : value]),
  )
}

export function logInfo(event: string, fields: LogFields = {}): void {
  console.info(JSON.stringify({ level: 'info', event, fields: redact(fields) }))
}
