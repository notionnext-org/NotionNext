import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'
import NotByAI from '@/components/NotByAI'
import { resolveArticleCopyrightText } from '@/lib/utils/articleCopyright'

export default function ArticleCopyright({ author, url, post }) {
  const { locale } = useGlobal()
  const copyrightText = resolveArticleCopyrightText({
    post,
    locale,
    mode: siteConfig('NEXT_ARTICLE_COPYRIGHT', null, CONFIG)
  })

  if (!copyrightText) {
    return <></>
  }
  return (
    <section className='dark:text-gray-300 mt-6'>
      <ul className='overflow-x-auto whitespace-nowrap text-sm dark:bg-gray-700 bg-gray-100 p-5 leading-8 border-l-2 border-blue-500'>
        <li>
          <strong className='mr-2'>{locale.COMMON.AUTHOR}:</strong>
          <SmartLink href={'/about'} className='hover:underline'>
            {author}
          </SmartLink>
        </li>
        <li>
          <strong className='mr-2'>{locale.COMMON.URL}:</strong>
          <a className='hover:underline' href={url}>
            {url}
          </a>
        </li>
        <li>
          <strong className='mr-2'>{locale.COMMON.COPYRIGHT}:</strong>
          {copyrightText}
        </li>
        {siteConfig('NEXT_ARTICLE_NOT_BY_AI', false, CONFIG) && (
          <li>
            <NotByAI />
          </li>
        )}
      </ul>
    </section>
  )
}
