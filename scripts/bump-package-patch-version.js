#!/usr/bin/env node
/**
 * Increment the last numeric segment of package.json "version".
 * Supports 4-part versions (e.g. 4.9.5.2 -> 4.9.5.3) used by this repo,
 * and falls back to semver patch for 3-part (x.y.z -> x.y.(z+1)).
 *
 * Usage: node scripts/bump-package-patch-version.js [--dry-run]
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const pkgPath = path.join(root, 'package.json')

const dryRun = process.argv.includes('--dry-run')

function bumpVersionString(current) {
  const parts = current.split('.').map(p => {
    const n = parseInt(p, 10)
    if (Number.isNaN(n)) {
      throw new Error(`Invalid version segment in "${current}"`)
    }
    return n
  })

  if (parts.length < 3) {
    throw new Error(`Expected at least semver x.y.z, got "${current}"`)
  }

  parts[parts.length - 1] += 1
  return parts.join('.')
}

function main() {
  const raw = fs.readFileSync(pkgPath, 'utf8')
  const match = raw.match(/"version"\s*:\s*"([^"]+)"/)
  if (!match) {
    console.error('Could not find "version" field in package.json')
    process.exit(1)
  }

  const current = match[1]
  const next = bumpVersionString(current)

  if (dryRun) {
    console.log(`[dry-run] ${current} -> ${next}`)
    return
  }

  const updated = raw.replace(
    /("version"\s*:\s*")([^"]+)(")/,
    (_, a, __, c) => `${a}${next}${c}`
  )

  fs.writeFileSync(pkgPath, updated)
  console.log(`Bumped package.json version: ${current} -> ${next}`)
}

main()
