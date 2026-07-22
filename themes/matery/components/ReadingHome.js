import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import {
  IconArrowRight,
  IconCompass,
  IconFileText,
  IconFolder,
  IconFolders,
  IconRss
} from '@tabler/icons-react'
import BlogPostCard from './BlogPostCard'
import ReadingSection from './ReadingSection'

const ReadingHome = ({
  categoryOptions = [],
  latestPosts = [],
  posts = [],
  siteInfo
}) => {
  const { lang } = useGlobal()
  const copy = getCopy(lang)
  const allPosts = uniquePosts([...latestPosts, ...posts])
  const recommended = allPosts.filter(hasRecommendTag)
  const startPosts = (recommended.length > 0 ? recommended : allPosts).slice(
    0,
    3
  )
  const startIds = new Set(startPosts.map(postIdentity))
  const latest = allPosts
    .filter(post => !startIds.has(postIdentity(post)))
    .slice(0, 6)
  const topics = categoryOptions.filter(topic => topic?.name).slice(0, 6)

  return (
    <div className='w-full pb-12'>
      {startPosts.length > 0 && (
        <ReadingSection
          id='start-here'
          icon={IconCompass}
          title={copy.startTitle}
          description={copy.startDescription}
        >
          <PostGrid posts={startPosts} siteInfo={siteInfo} />
        </ReadingSection>
      )}

      {topics.length > 0 && (
        <ReadingSection
          id='topics'
          icon={IconFolders}
          title={copy.topicTitle}
          description={copy.topicDescription}
          href='/category'
          linkLabel={copy.allTopics}
        >
          <TopicGrid topics={topics} copy={copy} />
        </ReadingSection>
      )}

      {latest.length > 0 && (
        <ReadingSection
          id='latest'
          icon={IconFileText}
          title={copy.latestTitle}
          description={copy.latestDescription}
          href='/archive'
          linkLabel={copy.allArticles}
        >
          <PostGrid posts={latest} siteInfo={siteInfo} />
        </ReadingSection>
      )}

      {siteConfig('ENABLE_RSS') !== false && (
        <ReadingSection
          id='follow'
          icon={IconRss}
          title={copy.followTitle}
          description={copy.followDescription}
        >
          <a
            href='/rss/feed.xml'
            className='inline-flex items-center gap-2 font-medium text-indigo-700 hover:text-orange-600 dark:text-indigo-300 dark:hover:text-orange-300'
          >
            <IconRss aria-hidden='true' size={18} stroke={1.8} />
            {copy.rssLabel}
          </a>
        </ReadingSection>
      )}
    </div>
  )
}

const PostGrid = ({ posts, siteInfo }) => {
  return (
    <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
      {posts.map((post, index) => (
        <BlogPostCard
          key={postIdentity(post)}
          index={index}
          post={post}
          siteInfo={siteInfo}
        />
      ))}
    </div>
  )
}

const TopicGrid = ({ copy, topics }) => {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {topics.map(topic => (
        <SmartLink
          key={topic.name}
          href={`/category/${encodeURIComponent(topic.name)}`}
          className='group flex min-h-28 items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md dark:border-black dark:bg-hexo-black-gray dark:hover:border-indigo-700'
        >
          <span className='min-w-0'>
            <span className='flex items-center gap-2 font-semibold text-gray-950 dark:text-white'>
              <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'>
                <IconFolder aria-hidden='true' size={16} stroke={1.8} />
              </span>
              <span className='break-words'>{topic.name}</span>
            </span>
            <span className='mt-3 block text-sm text-gray-500 dark:text-gray-400'>
              {copy.postCount(topic.count || 0)}
            </span>
          </span>
          <IconArrowRight
            aria-hidden='true'
            className='mt-2 shrink-0 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100'
            size={17}
            stroke={1.8}
          />
        </SmartLink>
      ))}
    </div>
  )
}

const hasRecommendTag = post => {
  const tags = [
    ...(Array.isArray(post?.tags) ? post.tags : []),
    ...(Array.isArray(post?.tagItems) ? post.tagItems : [])
  ].map(tag =>
    String(tag?.name || tag)
      .trim()
      .toLowerCase()
  )
  return tags.some(tag =>
    ['featured', 'recommend', 'recommended', '推荐'].includes(tag)
  )
}

const postIdentity = post => post?.id || post?.href

const uniquePosts = posts => {
  const seen = new Set()
  return posts.filter(post => {
    const identity = postIdentity(post)
    if (!identity || seen.has(identity)) return false
    seen.add(identity)
    return true
  })
}

const getCopy = lang => {
  const isChinese = String(lang).toLowerCase().startsWith('zh')
  if (isChinese) {
    return {
      startTitle: '从这里开始',
      startDescription: '为第一次访问的读者准备的推荐文章。',
      topicTitle: '按主题探索',
      topicDescription: '从感兴趣的方向进入，而不是翻阅完整时间流。',
      allTopics: '全部分类',
      latestTitle: '最新文章',
      latestDescription: '最近发布或更新的内容。',
      allArticles: '文章归档',
      followTitle: '订阅更新',
      followDescription: '无需注册账号，通过 RSS 获取新文章。',
      rssLabel: '订阅 RSS',
      postCount: count => `${count} 篇文章`
    }
  }
  return {
    startTitle: 'Start here',
    startDescription: 'Recommended posts for first-time readers.',
    topicTitle: 'Explore topics',
    topicDescription:
      'Enter through a subject instead of scanning the full timeline.',
    allTopics: 'All categories',
    latestTitle: 'Latest articles',
    latestDescription: 'Recently published or updated writing.',
    allArticles: 'Article archive',
    followTitle: 'Follow updates',
    followDescription: 'Get new posts through RSS without creating an account.',
    rssLabel: 'Subscribe via RSS',
    postCount: count => `${count} ${count === 1 ? 'post' : 'posts'}`
  }
}

export default ReadingHome
