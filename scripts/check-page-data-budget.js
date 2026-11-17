const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const pagesDir = path.join(projectRoot, '.next', 'server', 'pages')
const reportDir = path.join(projectRoot, '.perf')
const reportFile = path.join(reportDir, 'page-data-budget.json')
const warnBudgetKb = Number(process.env.PERF_PAGE_DATA_WARN_KB || 128)
const failOnBudget = process.env.PERF_PAGE_DATA_FAIL === 'true'

function walkJsonFiles(dir) {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walkJsonFiles(fullPath)
    if (
      entry.isFile() &&
      entry.name.endsWith('.json') &&
      !entry.name.endsWith('.js.nft.json')
    ) {
      return [fullPath]
    }
    return []
  })
}

function routeFromFile(file) {
  const relative = path.relative(pagesDir, file).replace(/\\/g, '/')
  const withoutExt = relative.replace(/\.json$/, '')
  if (withoutExt === 'index') return '/'
  return `/${withoutExt.replace(/\/index$/, '')}`
}

function formatKb(bytes) {
  return Math.round((bytes / 1024) * 10) / 10
}

function main() {
  const files = walkJsonFiles(pagesDir)
  if (!files.length) {
    console.error('No page-data JSON files found. Run `yarn build` first.')
    process.exit(1)
  }

  const pages = files
    .map(file => {
      const bytes = fs.statSync(file).size
      return {
        route: routeFromFile(file),
        bytes,
        kb: formatKb(bytes),
        overBudget: bytes > warnBudgetKb * 1024
      }
    })
    .sort((a, b) => b.bytes - a.bytes)

  const report = {
    generatedAt: new Date().toISOString(),
    warnBudgetKb,
    totalPages: pages.length,
    overBudgetPages: pages.filter(page => page.overBudget).length,
    largestPages: pages.slice(0, 20),
    pages
  }

  fs.mkdirSync(reportDir, { recursive: true })
  fs.writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`)

  console.log(`Page-data budget report written to ${reportFile}`)
  console.table(
    report.largestPages.map(page => ({
      route: page.route,
      kb: page.kb,
      overBudget: page.overBudget
    }))
  )

  if (failOnBudget && report.overBudgetPages > 0) {
    console.error(
      `${report.overBudgetPages} page-data files exceed ${warnBudgetKb}KB.`
    )
    process.exit(1)
  }
}

main()
