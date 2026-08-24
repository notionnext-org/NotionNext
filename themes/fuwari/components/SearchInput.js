import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useImperativeHandle, useRef, useState } from 'react'

/**
 * Fuwari 站内搜索输入框
 */
const SearchInput = ({ keyword = '', cRef, className = '' }) => {
  const router = useRouter()
  const { locale } = useGlobal()
  const searchInputRef = useRef(null)
  const lockRef = useRef(false)
  const [onLoading, setLoadingState] = useState(false)
  const [showClean, setShowClean] = useState(Boolean(keyword))

  useImperativeHandle(cRef, () => ({
    focus: () => searchInputRef.current?.focus()
  }))

  const handleSearch = () => {
    const key = (searchInputRef.current?.value || '').trim()
    if (key) {
      setLoadingState(true)
      router.push(`/search/${encodeURIComponent(key)}`).finally(() => {
        setLoadingState(false)
      })
      return
    }
    router.push('/search')
  }

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      handleSearch()
    } else if (e.keyCode === 27) {
      cleanSearch()
    }
  }

  const cleanSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = ''
    }
    setShowClean(false)
  }

  const updateSearchKey = val => {
    if (lockRef.current) return
    if (searchInputRef.current) {
      searchInputRef.current.value = val
    }
    setShowClean(Boolean(val))
  }

  return (
    <div className={`fuwari-card flex w-full items-center gap-2 px-4 py-3 ${className}`}>
      <i className='fas fa-search text-[var(--fuwari-muted)]' aria-hidden='true' />
      <input
        ref={searchInputRef}
        type='search'
        className='w-full bg-transparent text-sm outline-none text-[var(--fuwari-text)] placeholder:text-[var(--fuwari-muted)]'
        placeholder={locale?.SEARCH?.ARTICLES || '搜索文章…'}
        defaultValue={keyword}
        onKeyUp={handleKeyUp}
        onCompositionStart={() => {
          lockRef.current = true
        }}
        onCompositionUpdate={() => {
          lockRef.current = true
        }}
        onCompositionEnd={() => {
          lockRef.current = false
        }}
        onChange={e => updateSearchKey(e.target.value)}
        autoFocus
      />
      {showClean && (
        <button
          type='button'
          className='fuwari-tool-btn'
          aria-label='Clear'
          onClick={cleanSearch}>
          <i className='fas fa-times' />
        </button>
      )}
      <button
        type='button'
        className='fuwari-tool-btn'
        aria-label='Search'
        onClick={handleSearch}>
        <i
          className={`fas ${onLoading ? 'fa-spinner animate-spin' : 'fa-arrow-right'}`}
        />
      </button>
    </div>
  )
}

export default SearchInput
