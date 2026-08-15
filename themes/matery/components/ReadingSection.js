import SmartLink from '@/components/SmartLink'
import { IconArrowRight } from '@tabler/icons-react'

const ReadingSection = ({
  children,
  description,
  href,
  icon: Icon,
  id,
  linkLabel,
  title
}) => {
  return (
    <section id={id} className='w-full scroll-mt-24 px-4 py-10'>
      <header className='mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 dark:border-gray-800 sm:flex-row sm:items-end sm:justify-between'>
        <div className='flex min-w-0 items-start gap-3'>
          {Icon && (
            <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-white shadow-md'>
              <Icon aria-hidden='true' size={20} stroke={1.8} />
            </span>
          )}
          <div className='min-w-0'>
            <h2 className='text-2xl font-semibold text-gray-950 dark:text-white'>
              {title}
            </h2>
            {description && (
              <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400'>
                {description}
              </p>
            )}
          </div>
        </div>
        {href && linkLabel && (
          <SmartLink
            href={href}
            className='inline-flex shrink-0 items-center gap-1 text-sm font-medium text-indigo-700 hover:text-orange-600 dark:text-indigo-300 dark:hover:text-orange-300'
          >
            {linkLabel}
            <IconArrowRight aria-hidden='true' size={17} stroke={1.8} />
          </SmartLink>
        )}
      </header>
      {children}
    </section>
  )
}

export default ReadingSection
