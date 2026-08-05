/**
 * 主题配置文件
 */
const CONFIG = {
  THOUGHTLITE_COLOR_BG: '#faf9f7',
  THOUGHTLITE_COLOR_SURFACE: '#ffffff',
  THOUGHTLITE_COLOR_TEXT: '#1a1a1a',
  THOUGHTLITE_COLOR_MUTED: '#6b6b6b',
  THOUGHTLITE_COLOR_BORDER: '#e8e6e3',
  THOUGHTLITE_COLOR_ACCENT: '#2563eb',

  // 菜单配置
  THOUGHTLITE_MENU_CATEGORY: true, // 显示分类
  THOUGHTLITE_MENU_TAG: true, // 显示标签
  THOUGHTLITE_MENU_ARCHIVE: true, // 显示归档
  THOUGHTLITE_MENU_SEARCH: true, // 显示搜索

  /** 首页（无分类/标签/搜索关键词）使用按日分组时间线 */
  THOUGHTLITE_HOME_TIMELINE: true,
  /** 首页顶部「Latest」摘要卡片（取最新一篇） */
  THOUGHTLITE_HOME_LATEST_CARD: true,
  /** 仅文章页显示侧栏（目录、公告等）；列表/归档等不显示 */
  THOUGHTLITE_SIDEBAR_ONLY_ON_POST: true,

  THOUGHTLITE_POST_LIST_COVER: false, // 时间线模式建议关闭封面以保清爽

  THOUGHTLITE_TITLE_IMAGE: false, // 标题栏，是否背景图片
  /** 首页隐藏大块 TitleBar，仅保留顶栏 */
  THOUGHTLITE_HOME_MINIMAL_HEADER: true,

  // 文章页面布局
  THOUGHTLITE_ARTICLE_LAYOUT_VERTICAL: false, // 文章详情，左右布局改为上下布局
  THOUGHTLITE_ARTICLE_HIDDEN_NOTIFICATION: false // 文章详情隐藏公告
}
export default CONFIG
