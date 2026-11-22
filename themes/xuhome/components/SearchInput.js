import { useRouter } from 'next/router'

export default function SearchInput(props) {
  const { keyword } = props
  const router = useRouter()

  return (
    <input
      type='text'
      defaultValue={keyword || ''}
      placeholder='Search posts...'
      onKeyDown={e => {
        if (e.key === 'Enter' && e.target.value) {
          const query = { keyword: e.target.value }
          if (router.query.theme) query.theme = router.query.theme
          router.push({ pathname: '/search/[keyword]', query })
        }
      }}
      className='w-full border-[3px] border-[#0284c7] rounded-sm shadow-[2px_2px_0px_0px_#0284c7] px-4 py-3 font-extrabold text-base outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:shadow-[4px_4px_0px_0px_#0284c7] transition-shadow'
    />
  )
}
