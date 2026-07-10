import { describe, expect, it } from 'vitest'
import { redactForDiagnostics } from '../../src/main/diagnostics/logger'

describe('redactForDiagnostics', () => {
  it('redacts sensitive fields recursively in objects and arrays', () => {
    expect(redactForDiagnostics({ token: 'top-level', nested: { authorization: 'nested', safe: 'value' }, list: [{ cookie: 'session' }] })).toEqual({ token: '[REDACTED]', nested: { authorization: '[REDACTED]', safe: 'value' }, list: [{ cookie: '[REDACTED]' }] })
  })
})
