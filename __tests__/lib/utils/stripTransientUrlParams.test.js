import {
  stripTransientQueryParamsFromAsPath,
  stripTransientQueryParamsFromUrl
} from '@/lib/utils/stripTransientUrlParams'

describe('stripTransientQueryParamsFromUrl', () => {
  it('removes giscus and target from full URL', () => {
    const u =
      'https://blog.example.com/post/foo?giscus=abc&x=1&target=comment#h'
    const out = stripTransientQueryParamsFromUrl(u)
    expect(out).toBe('https://blog.example.com/post/foo?x=1#h')
  })
})

describe('stripTransientQueryParamsFromAsPath', () => {
  it('strips giscus from asPath', () => {
    expect(stripTransientQueryParamsFromAsPath('/a/b?giscus=1')).toBe('/a/b')
  })
  it('preserves other query and hash', () => {
    expect(
      stripTransientQueryParamsFromAsPath('/p?k=1&giscus=x#c')
    ).toBe('/p?k=1#c')
  })
})
