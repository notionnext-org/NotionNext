jest.mock('@/lib/config', () => ({
  siteConfig: (_key, defaultValue, notionConfig) => {
    if (notionConfig && notionConfig.PWA_ENABLE !== undefined) {
      return notionConfig.PWA_ENABLE
    }
    return defaultValue
  },
}))

import { render, act } from '@testing-library/react'
import PWAInstaller from '@/components/PWAInstaller'

describe('PWAInstaller', () => {
  let getRegistrationMock
  let registerMock
  let unregisterMock
  let resolveGetRegistration

  beforeEach(() => {
    unregisterMock = jest.fn()
    registerMock = jest.fn().mockResolvedValue(undefined)

    // Deferred promise so we can control when getRegistration resolves
    resolveGetRegistration = null
    const registrationPromise = new Promise(resolve => {
      resolveGetRegistration = resolve
    })
    getRegistrationMock = jest.fn().mockReturnValue(registrationPromise)

    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: {
        getRegistration: getRegistrationMock,
        register: registerMock,
      },
    })
  })

  it('does not unregister when switching from disabled to enabled before getRegistration resolves', async () => {
    // Step 1: render with PWA disabled — triggers getRegistration()
    const { rerender } = render(<PWAInstaller NOTION_CONFIG={{ PWA_ENABLE: false }} />)

    expect(getRegistrationMock).toHaveBeenCalledWith('/sw.js')
    expect(unregisterMock).not.toHaveBeenCalled()

    // Step 2: switch to enabled before getRegistration resolves
    // Cleanup of the disabled effect sets cancelled = true,
    // then the enabled effect registers the SW.
    rerender(<PWAInstaller NOTION_CONFIG={{ PWA_ENABLE: true }} />)

    expect(registerMock).toHaveBeenCalledWith('/sw.js', { scope: '/' })

    // Step 3: resolve the pending getRegistration promise
    // cancelled flag should prevent unregister from being called
    await act(async () => {
      resolveGetRegistration({ unregister: unregisterMock })
      await Promise.resolve()
    })

    expect(unregisterMock).not.toHaveBeenCalled()
  })

  it('unregisters existing service worker when PWA is disabled', async () => {
    render(<PWAInstaller NOTION_CONFIG={{ PWA_ENABLE: false }} />)

    await act(async () => {
      resolveGetRegistration({ unregister: unregisterMock })
      await Promise.resolve()
    })

    expect(unregisterMock).toHaveBeenCalledTimes(1)
  })
})
