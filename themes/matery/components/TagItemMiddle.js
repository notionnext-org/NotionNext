import SmartLink from '@/components/SmartLink'

const TagItemMiddle = ({ tag, selected = false }) => {
  return (
    <SmartLink
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={`inline-block max-w-full cursor-pointer break-words rounded-full px-3 py-1 text-sm leading-5 text-white duration-200 hover:text-white ${
        selected ? 'bg-black' : 'bg-indigo-700'
      }`}
    >
      <span className='font-light'>
        {selected && <i className='mr-1 fas fa-tag' />}
        {tag.name + (tag.count ? ` (${tag.count})` : '')}
      </span>
    </SmartLink>
  )
}

export default TagItemMiddle
