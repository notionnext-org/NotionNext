import { useGlobal } from '@/lib/global'

/**
 * 文章详情路由切换时：主栏保留卡片容器，中间显示转圈加载（非全屏遮罩）。
 */
export default function ArticleSwitchPlaceholder() {
  const { locale } = useGlobal()
  const hint =
    locale?.COMMON?.LOADING_ARTICLE ?? locale?.COMMON?.LOADING ?? '加载中…'

  return (
    <div className='w-full lg:hover:shadow lg:border rounded-t-xl lg:rounded-xl lg:px-2 lg:py-4 bg-white dark:bg-hexo-black-gray dark:border-black article'>
      <div className='flex min-h-[280px] flex-col items-center justify-center px-5 py-16 md:min-h-[360px]'>
        <div
          className='h-11 w-11 animate-spin rounded-full border-[3px] border-neutral-200 border-t-indigo-500 dark:border-neutral-600 dark:border-t-indigo-400'
          aria-hidden
        />
        <p className='mt-6 text-sm text-gray-500 dark:text-gray-400'>{hint}</p>
      </div>
    </div>
  )
}
