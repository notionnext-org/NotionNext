import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { IconX } from '@tabler/icons-react'
import SmartLink from '@/components/SmartLink'

/**
 * SearchInput Component - Refined Tech Interface
 * Search input component
 */
export const SearchInput = ({ keyword = '', locale, compact = false, titleMeta = '', allNavPages = [] }) => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(keyword || '')
  const [isFocused, setIsFocused] = useState(false)
  const inputFocusClass = compact
    ? 'focus:bg-[var(--endspace-bg-secondary)] focus:text-[var(--endspace-text-primary)] focus:border-[var(--endspace-border-base)]'
    : 'focus:bg-black focus:text-[#FBFB46] focus:border-[var(--endspace-accent-yellow)]'
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()
  const suggestions = normalizedSearchTerm
    ? allNavPages
      .filter(post => {
        const searchableText = [
          post?.title,
          post?.summary,
          post?.category,
          ...(Array.isArray(post?.tags) ? post.tags : [])
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return searchableText.includes(normalizedSearchTerm)
      })
    : []

  useEffect(() => {
    setSearchTerm(keyword || '')
  }, [keyword])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search/${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  return (
    <div className={`${compact ? '' : 'endspace-frame p-6'} transition-colors ${isFocused && !compact ? 'border-[var(--endspace-accent-yellow)]' : ''}`}>
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Label */}
        <div className="endspace-section-title flex items-center tech-text tracking-wider">
          <span className="text-5xl font-black">SEARCH</span>
          {titleMeta && (
            <span className="endspace-section-meta">
              {'// '}{titleMeta}
            </span>
          )}
        </div>

        {/* Search Input Container */}
        <div className="relative group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={locale?.SEARCH?.ARTICLES || 'Input query...'}
            className={`w-full px-4 py-3 bg-[var(--endspace-bg-secondary)] border border-[var(--endspace-border-base)] text-[var(--endspace-text-primary)] ${inputFocusClass} focus:outline-none transition-colors pr-24 tech-text text-sm placeholder-[var(--endspace-text-muted)]`}
          />

          {isFocused && suggestions.length > 0 && (
            <div
              className="absolute left-0 right-0 top-full z-30 mt-2 max-h-80 overflow-y-auto border border-[var(--endspace-border-base)] bg-[var(--endspace-bg-primary)] shadow-lg"
              onMouseDown={event => event.preventDefault()}
            >
              {suggestions.map((post, index) => (
                <SmartLink key={post.id || post.slug} href={`/${post.slug}`}>
                  <div className="group/item flex cursor-pointer items-start gap-3 border-b border-[var(--endspace-border-base)] px-3 py-2.5 last:border-b-0 hover:bg-[#FBFB46]">
                    <span className="mt-0.5 w-5 flex-shrink-0 text-[10px] font-mono text-[var(--endspace-text-muted)] group-hover/item:text-black">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-[var(--endspace-text-primary)] group-hover/item:text-black">
                        {post.title || post.slug}
                      </div>
                      <div className="mt-1 truncate text-[10px] text-[var(--endspace-text-muted)] group-hover/item:text-black">
                        {[post.category, ...(Array.isArray(post.tags) ? post.tags.slice(0, 3).map(tag => `#${tag}`) : [])]
                          .filter(Boolean)
                          .join(' / ') || 'NO_METADATA'}
                      </div>
                    </div>
                  </div>
                </SmartLink>
              ))}
            </div>
          )}

          {/* Clear Button */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-16 top-1/2 -translate-y-1/2 text-[var(--endspace-text-muted)] hover:text-red-500 transition-colors px-2"
            >
              <IconX size={14} stroke={1.5} />
            </button>
          )}

          {/* Search Button (Enter) */}
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 px-3 bg-[var(--endspace-bg-tertiary)] text-black hover:bg-[#FBFB46] hover:text-black transition-colors font-bold text-xs border-l border-[var(--endspace-border-base)]"
          >
            GO
          </button>
        </div>

        {/* Status Line */}
        <div className="flex items-center justify-between text-[10px] text-[var(--endspace-text-muted)] font-mono">
          <div>
            SYSTEM_STATUS: <span className="text-green-500">ONLINE</span>
          </div>
          <div>
             Index_v4.2.0
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchInput
