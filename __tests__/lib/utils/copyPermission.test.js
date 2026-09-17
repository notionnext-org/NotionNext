/**
 * @jest-environment node
 */

import { getPageCanCopy } from '@/lib/utils/copyPermission'

describe('getPageCanCopy', () => {
  it('falls back to site copy setting', () => {
    expect(getPageCanCopy(true, {})).toBe(true)
    expect(getPageCanCopy(false, {})).toBe(false)
  })

  it('lets page copy setting override site setting', () => {
    expect(getPageCanCopy(true, { CAN_COPY: 'false' })).toBe(false)
    expect(getPageCanCopy(false, { CAN_COPY: 'true' })).toBe(true)
    expect(getPageCanCopy(true, { canCopy: ['否'] })).toBe(false)
    expect(getPageCanCopy(true, { ext: { CAN_COPY: 0 } })).toBe(false)
  })
})
