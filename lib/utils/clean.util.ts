import { deepClone } from '@/lib/utils'

type WithOptionalId = object & { id?: unknown }

export function cleanIds<T extends WithOptionalId>(items?: T[]): T[] {
  if (!Array.isArray(items)) return []
  return deepClone(items.map(({ id, ...item }) => item)) as T[]
}

export function cleanPages<T>(
  pages?: T[],
  tagOptions?: Array<Record<string, unknown>>
): T[] {
  if (!Array.isArray(pages)) return pages || []
  return pages
}

export function shortenIds<T>(items?: T[]): T[] | undefined {
  if (!Array.isArray(items)) return items
  return items
}
