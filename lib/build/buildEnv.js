/**
 * 构建 / 导出阶段环境变量（Cloudflare Pages、慢速 Notion API 等）
 *
 * BUILD_PREFETCH_ENABLED          是否全量预热 block（export 默认 true；false 可跳过）
 * BUILD_PREFETCH_CONCURRENCY      预热并发（默认 8；慢环境建议 2–4）
 * NOTION_BUILD_RATE_MAX_PER_MINUTE  构建时限流：每分钟最大请求数（默认 50）
 * NOTION_BUILD_RATE_MIN_INTERVAL_MS 构建时限流：相邻请求最小间隔 ms（默认 300）
 * STATIC_PAGE_GENERATION_TIMEOUT  Next.js 单页 SSG 超时秒数（默认 300）
 */

let buildEnvLogged = false

function parsePositiveInt(value, fallback, { min = 1, max = Infinity } = {}) {
  const n = Number.parseInt(String(value ?? '').trim(), 10)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, n))
}

function isTruthyEnv(value) {
  if (value === undefined || value === '') return true
  const v = String(value).trim().toLowerCase()
  if (['0', 'false', 'no', 'off', 'skip', 'disabled'].includes(v)) return false
  return true
}

function isBuildOrExport() {
  return process.env.BUILD_MODE === 'true' || process.env.EXPORT === 'true'
}

function isBuildPrefetchEnabled() {
  if (process.env.BUILD_PREFETCH_ENABLED === undefined) return false
  return isTruthyEnv(process.env.BUILD_PREFETCH_ENABLED)
}

function getBuildPrefetchConcurrency() {
  return parsePositiveInt(process.env.BUILD_PREFETCH_CONCURRENCY, 8, {
    min: 1,
    max: 32
  })
}

function getNotionBuildRateMaxPerMinute() {
  return parsePositiveInt(process.env.NOTION_BUILD_RATE_MAX_PER_MINUTE, 50, {
    min: 1,
    max: 600
  })
}

function getNotionBuildRateMinIntervalMs() {
  return parsePositiveInt(process.env.NOTION_BUILD_RATE_MIN_INTERVAL_MS, 300, {
    min: 0,
    max: 60_000
  })
}

function getStaticPageGenerationTimeoutSec() {
  return parsePositiveInt(process.env.STATIC_PAGE_GENERATION_TIMEOUT, 300, {
    min: 60,
    max: 3600
  })
}

function logBuildEnvSummary() {
  if (buildEnvLogged || !isBuildOrExport()) return
  buildEnvLogged = true
  console.log(
    '[BuildEnv]',
    JSON.stringify(
      {
        prefetchEnabled: isBuildPrefetchEnabled(),
        prefetchConcurrency: getBuildPrefetchConcurrency(),
        notionRateMaxPerMinute: getNotionBuildRateMaxPerMinute(),
        notionRateMinIntervalMs: getNotionBuildRateMinIntervalMs(),
        staticPageGenerationTimeoutSec: getStaticPageGenerationTimeoutSec()
      },
      null,
      0
    )
  )
}

module.exports = {
  isBuildPrefetchEnabled,
  getBuildPrefetchConcurrency,
  getNotionBuildRateMaxPerMinute,
  getNotionBuildRateMinIntervalMs,
  getStaticPageGenerationTimeoutSec,
  logBuildEnvSummary
}
