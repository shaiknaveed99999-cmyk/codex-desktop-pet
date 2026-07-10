import { describe, expect, it } from 'vitest'
import { appInfoSchema } from '../../src/shared/contracts/appInfo'

describe('appInfoSchema', () => {
  it('accepts the Windows app information response', () => {
    expect(appInfoSchema.parse({ name: 'Pets', version: '0.1.0', platform: 'win32', isPackaged: false })).toMatchObject({ name: 'Pets', isPackaged: false })
  })

  it('rejects unsupported platforms', () => {
    expect(() => appInfoSchema.parse({ name: 'Pets', version: '0.1.0', platform: 'linux', isPackaged: false })).toThrow()
  })
})
