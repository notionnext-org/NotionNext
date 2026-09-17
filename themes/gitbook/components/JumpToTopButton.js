/**
 * 跳转到网页顶部
 * 当屏幕下滑500像素后会出现该控件
 * @param targetRef 关联高度的目标html标签
 * @param showPercent 是否显示百分比
 * @returns {JSX.Element}
 * @constructor
 */
const JumpToTopButton = ({ showPercent = false, percent, className }) => {
  return (
    <div
      id='jump-to-top'
      data-aos='fade-up'
      data-aos-duration='300'
      data-aos-once='false'
      data-aos-anchor-placement='top-center'
      className='fixed right-3 md:right-6 bottom-24 md:bottom-8 z-20'>
      <i
        className='shadow fas fa-chevron-up cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full border bg-white dark:bg-hexo-black-gray'
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />
    </div>
  )
}

export default JumpToTopButton
