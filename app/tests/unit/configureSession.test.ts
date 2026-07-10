import { describe, expect, it } from 'vitest'
import { createContentSecurityPolicy } from '../../src/main/security/configureSession'

describe('createContentSecurityPolicy', () => {
  it('does not allow websocket connections in production', () => {
    expect(createContentSecurityPolicy(undefined)).not.toContain('ws:')
  })

  it('allows only the configured development server and its websocket origin', () => {
    expect(createContentSecurityPolicy('http://localhost:5173')).toContain("connect-src 'self' http://localhost:5173 ws://localhost:5173")
  })
})
