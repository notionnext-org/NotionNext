import { defineConfig } from 'vitepress'
import { getThemeSidebarItems } from '../scripts/lib/builtin-themes.mjs'

const themeDocLinks = getThemeSidebarItems()

const giscusEnabled = process.env.VITE_GISCUS_ENABLED !== 'false'
const giscusRepoId = process.env.VITE_GISCUS_REPO_ID || ''
const giscusCategoryId = process.env.VITE_GISCUS_CATEGORY_ID || ''

/**
 * 在线站仅发布：
 *   docs/index.md
 *   docs/DOCUMENTATION_POLICY.md
 *   docs/user-guide/**
 * 开发者文档在 docs/developer/**（整目录排除）
 */
const srcExclude = ['developer/**', 'README.md', 'README.en.md']

export default defineConfig({
  title: 'NotionNext 使用说明',
  description: 'NotionNext 部署、配置、主题与 Notion 教程',
  lang: 'zh-CN',
  srcDir: 'docs',
  srcExclude,
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: [/^https?:\/\//],
  head: [['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]],
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: '使用说明', link: '/user-guide/intro', activeMatch: '/user-guide/' },
      { text: '主题', link: '/user-guide/themes/THEMES_CATALOG', activeMatch: '/user-guide/themes/' },
      { text: '参考手册', link: '/user-guide/reference/features', activeMatch: '/user-guide/reference/' },
      { text: '维护策略', link: '/DOCUMENTATION_POLICY' },
      { text: '参与社区', link: '/user-guide/community-participate' },
      { text: '参与维护', link: '/user-guide/maintain-docs' },
      { text: '旧版手册', link: '/user-guide/help/legacy-docs' },
      {
        text: 'GitHub',
        link: 'https://github.com/notionnext-org/NotionNext/tree/main/docs'
      }
    ],
    sidebar: {
      '/user-guide/': [
        {
          text: '快速开始',
          items: [
            { text: '介绍', link: '/user-guide/intro' },
            { text: 'Vercel 部署', link: '/user-guide/deploy-vercel' },
            { text: 'Notion 数据库', link: '/user-guide/notion-database' },
            { text: '配置站点', link: '/user-guide/config-site' },
            { text: '菜单 Menu', link: '/user-guide/menu-secondary' },
            { text: '升级', link: '/user-guide/update' }
          ]
        },
        {
          text: '参考（4.9.x）',
          items: [
            { text: '全站配置索引', link: '/user-guide/reference/features' },
            { text: 'Notion 4.x', link: '/user-guide/reference/notion-4x' }
          ]
        },
        {
          text: '部署',
          collapsed: true,
          items: [
            { text: '部署索引', link: '/user-guide/deploy/' },
            { text: 'Vercel 域名', link: '/user-guide/deploy/vercel-domain' },
            { text: 'Vercel 静态导出', link: '/user-guide/deploy/vercel-static' },
            { text: 'Cloudflare 文档站', link: '/user-guide/deploy/cloudflare-pages-docs' },
            { text: 'Cloudflare 博客静态', link: '/user-guide/deploy/cloudflare-pages' },
            { text: 'EdgeOne Pages', link: '/user-guide/deploy/edgeone-pages' },
            { text: '构建性能调优', link: '/user-guide/deploy/build-tuning' },
            { text: 'Netlify', link: '/user-guide/deploy/netlify' },
            { text: 'VPS', link: '/user-guide/deploy/vps' }
          ]
        },
        {
          text: '配置',
          collapsed: true,
          items: [
            { text: '基础功能', link: '/user-guide/config/site-basics' },
            { text: 'URL 自定义', link: '/user-guide/config/url-customize' },
            { text: 'Algolia', link: '/user-guide/config/algolia' }
          ]
        },
        {
          text: '主题（25）',
          collapsed: true,
          items: [
            { text: '主题目录', link: '/user-guide/themes/' },
            { text: '全览表', link: '/user-guide/themes/THEMES_CATALOG' },
            { text: '主题总览', link: '/user-guide/themes/overview' },
            ...themeDocLinks
          ]
        },
        {
          text: '评论 · 统计 · 插件',
          collapsed: true,
          items: [
            { text: '评论总览', link: '/user-guide/comments/overview' },
            { text: '统计总览', link: '/user-guide/analytics/overview' },
            { text: '插件总览', link: '/user-guide/plugins/overview' },
            { text: '音乐播放器', link: '/user-guide/plugins/music-player' }
          ]
        },
        {
          text: '开发与帮助',
          collapsed: true,
          items: [
            { text: '参与社区', link: '/user-guide/community-participate' },
            { text: '开发入门', link: '/user-guide/development/getting-started' },
            { text: '运行原理', link: '/user-guide/development/architecture' },
            { text: '反馈', link: '/user-guide/help/feedback' },
            { text: '旧版手册入口', link: '/user-guide/help/legacy-docs' },
            { text: 'Notion 排版示例', link: '/user-guide/notion/example-article' },
            { text: '双语库翻译 CLI（可选）', link: '/user-guide/notion/bilingual-translator' },
            { text: '参与维护（在线站）', link: '/user-guide/maintain-docs' },
            { text: '维护工作流', link: '/user-guide/MAINTENANCE_WORKFLOW' },
            { text: '迁移索引', link: '/user-guide/ARTICLE_INDEX' }
          ]
        },
        {
          text: '更新日志',
          collapsed: true,
          items: [
            { text: '最新版本', link: '/user-guide/changelog/latest' },
            { text: 'V4 历史', link: '/user-guide/changelog/v4-history' }
          ]
        }
      ],
      '/': [
        {
          text: '文档',
          items: [
            { text: '首页', link: '/' },
            { text: '使用说明', link: '/user-guide/intro' },
            { text: '参与社区', link: '/user-guide/community-participate' },
            { text: '文档维护策略', link: '/DOCUMENTATION_POLICY' },
            { text: '参与维护', link: '/user-guide/maintain-docs' }
          ]
        }
      ]
    },
    editLink: {
      pattern:
        'https://github.com/notionnext-org/NotionNext/edit/main/docs/:path',
      text: '在 GitHub 上维护此页'
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/notionnext-org/NotionNext/tree/main/docs'
      }
    ],
    footer: {
      message:
        '以 GitHub 仓库为准 · <a href="https://github.com/notionnext-org/NotionNext/tree/main/docs" target="_blank" rel="noreferrer">浏览 docs 目录</a> · <a href="https://github.com/notionnext-org/NotionNext/blob/main/docs/README.md" target="_blank" rel="noreferrer">目录说明</a>',
      copyright: 'NotionNext · MIT'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除搜索条件',
                backButtonTitle: '关闭搜索',
                noResultsText: '未找到与',
                footer: {
                  selectText: '打开',
                  selectKeyAriaLabel: '回车键',
                  navigateText: '切换',
                  navigateUpKeyAriaLabel: '上方向键',
                  navigateDownKeyAriaLabel: '下方向键',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc 键'
                }
              }
            }
          }
        },
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 2 }
          }
        }
      }
    },
    /** 文档页底 Giscus → GitHub Discussions；ID 见 giscus.app */
    giscus: {
      enabled: giscusEnabled,
      repo: 'notionnext-org/NotionNext',
      repoId: giscusRepoId,
      category: 'General',
      categoryId: giscusCategoryId,
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'top',
      theme: 'preferred_color_scheme',
      lang: 'zh-CN'
    }
  }
})
