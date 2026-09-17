/**
 * @jest-environment node
 */
import fs from 'fs'
import path from 'path'

describe('ShareButtons static export icons', () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), 'components', 'ShareButtons.js'),
    'utf8'
  )

  it.each(['/svg/csdn.svg', '/svg/juejin.svg'])(
    'does not optimize the local %s icon',
    iconPath => {
      const iconBlock = source.match(
        new RegExp(
          `<Image[\\s\\S]*?src=['"]${iconPath.replaceAll('/', '\\/')}['"][\\s\\S]*?\\/>`
        )
      )?.[0]

      expect(iconBlock).toBeTruthy()
      expect(iconBlock).toContain('unoptimized')
    }
  )
})
