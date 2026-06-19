import { siteConfig } from '@/lib/config';
import { useGlobal } from '@/lib/global';
import throttle from 'lodash.throttle';
import { useCallback, useEffect, useRef, useState } from 'react';
import BlogCard from './BlogCard';
import BlogPostListEmpty from './BlogListEmpty';

const BlogListScroll = ({ posts }) => {
  const { locale, NOTION_CONFIG } = useGlobal();
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG);
  const [filterPostsGroups, setFilterPostsGroups] = useState([]);

  // 每页显示的文章数量
  const postsPerPage = POSTS_PER_PAGE;

  // 计算总页数
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 加载更多文章
  const loadMorePosts = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };


  const targetRef = useRef(null)


  // 监听滚动自动分页加载
  const scrollTrigger = useCallback(
    throttle(() => {
      const scrollS = window.scrollY + window.outerHeight
      const clientHeight = targetRef
        ? targetRef.current
          ? targetRef.current.clientHeight
          : 0
        : 0
      if (scrollS > clientHeight + 100) {
        loadMorePosts()
      }
    }, 500)
  )

  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger, { passive: true })
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  })

  // 根据当前页和每页文章数截取应该显示的文章
  useEffect(() => {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = posts.slice(startIndex, endIndex);
    const columns = 3; // 假设有3列

    // 重新排列文章，保证列优先顺序
    const newFilterPosts = [];
    for (let col = 0; col < columns; col++) {
      for (let i = col; i < postsToShow.length; i += columns) {
        newFilterPosts.push(postsToShow[i]);
      }
    }

    setFilterPostsGroups((prev) => [...prev, newFilterPosts]);
  }, [posts, page]);

  if (!posts || posts.length === 0) {
    return <BlogPostListEmpty />;
  } else {
    return (
      <div ref={targetRef}>
        {filterPostsGroups.map((group, groupIndex) => (
          <div key={groupIndex} id="posts-wrapper" className="grid-container mb-10">
            {group.map((post) => (
              <div
                key={post.id}
                className="grid-item justify-center flex"
                style={{ breakInside: 'avoid' }}
              >
                <BlogCard key={post.id} post={post} showAnimate={groupIndex > 0}/>
              </div>
            ))}
          </div>
        ))}
        <div
          className="w-full my-4 py-4 text-center cursor-pointer"
          onClick={loadMorePosts}
        >
          {page < totalPages ? locale.COMMON.MORE : `${locale.COMMON.NO_MORE} 😰`}
        </div>
      </div>
    );
  }
};

export default BlogListScroll;

