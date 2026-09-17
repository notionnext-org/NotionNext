import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import NotByAI from '@/components/NotByAI'
import { resolveArticleCopyrightText } from '@/lib/utils/articleCopyright'

/**
 * 版权声明
 * @returns
 */
export default function PostCopyright({ post }) {
  const router = useRouter()
  const [path, setPath] = useState(siteConfig('LINK') + router.asPath)
  useEffect(() => {
    setPath(window.location.href)
  })

  const { locale } = useGlobal()
  const copyrightText = resolveArticleCopyrightText({
    post,
    locale,
    mode: siteConfig('HEO_ARTICLE_COPYRIGHT', null, CONFIG)
  })

  if (!copyrightText) {
    return <></>
  }

  return (
    <section className='dark:text-gray-300 mt-6 mx-1 '>
      <ul className='overflow-x-auto whitespace-nowrap text-sm dark:bg-gray-900 bg-gray-100 p-5 leading-8 border-l-2 border-[var(--heo-color-border)]'>
        <li>
          <strong className='mr-2'>{locale.COMMON.AUTHOR}:</strong>
          <SmartLink href={'/about'} className='hover:underline'>
            {siteConfig('AUTHOR')}
          </SmartLink>
        </li>
        <li>
          <strong className='mr-2'>{locale.COMMON.URL}:</strong>
          <a
            className='whitespace-normal break-words hover:underline'
            href={path}
          >
            {path}
          </a>
        </li>
        <li>
          <strong className='mr-2'>{locale.COMMON.COPYRIGHT}:</strong>
          {copyrightText}
        </li>
        {siteConfig('HEO_ARTICLE_NOT_BY_AI', false, CONFIG) && (
          <li>
            <NotByAI />
          </li>
        )}
      </ul>
    </section>
  )
}
