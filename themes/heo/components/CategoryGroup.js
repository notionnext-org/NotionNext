import SmartLink from '@/components/SmartLink'

const CategoryGroup = ({ currentCategory, categories }) => {
  if (!categories) {
    return <></>
  }
  return <>
    <div id='category-list' className='dark:border-gray-700 flex flex-wrap  mx-4'>
      {categories.map(category => {
        const selected = currentCategory === category.name
        return (
          <SmartLink
            key={category.name}
            href={`/category/${category.name}`}
            passHref
            className={(selected
              ? 'hover:text-[var(--heo-color-primary-text)] dark:hover:text-white bg-[var(--heo-color-primary)] text-[var(--heo-color-primary-text)] '
              : 'dark:text-gray-400 text-gray-500 hover:text-[var(--heo-color-primary-text)] dark:hover:text-white hover:bg-[var(--heo-color-primary)]') +
              '  text-sm w-full items-center duration-300 px-2  cursor-pointer py-1 font-light'}>

            <div> <i className={`mr-2 fas ${selected ? 'fa-folder-open' : 'fa-folder'}`} />{category.name}({category.count})</div>

          </SmartLink>
        )
      })}
    </div>
  </>
}

export default CategoryGroup
