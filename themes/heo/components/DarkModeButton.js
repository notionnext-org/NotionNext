import { Moon, Sun } from '@/components/HeroIcons'
import { useGlobal } from '@/lib/global'

/**
 * HEO day/night toggle. Theme state and persistence remain owned by useGlobal.
 */
const DarkModeButton = ({ className = '', label }) => {
  const { isDarkMode, locale, toggleDarkMode } = useGlobal()
  const actionLabel = isDarkMode
    ? locale?.MENU?.LIGHT_MODE || 'Switch to light mode'
    : locale?.MENU?.DARK_MODE || 'Switch to dark mode'
  const labelledButton = Boolean(label)

  return (
    <button
      type='button'
      onClick={toggleDarkMode}
      aria-label={actionLabel}
      aria-pressed={isDarkMode}
      title={actionLabel}
      className={`${className} group flex cursor-pointer items-center rounded-lg transition-colors duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--heo-color-border)] focus-visible:ring-offset-2 dark:focus-visible:ring-[var(--heo-color-border-dark)] dark:focus-visible:ring-offset-[var(--heo-color-bg-dark)] ${
        labelledButton
          ? 'w-full justify-between border px-2 py-2 hover:bg-[var(--heo-color-primary)] hover:text-[var(--heo-color-primary-text)] hover:shadow-md dark:border-gray-600 dark:bg-[var(--heo-color-card-dark)] dark:hover:bg-[var(--heo-color-accent)] dark:hover:text-white'
          : 'h-10 w-10 justify-center hover:bg-black hover:bg-opacity-10'
      }`}
    >
      {label && <span>{label}</span>}
      <span
        aria-hidden='true'
        className={`relative inline-flex h-6 w-10 flex-shrink-0 items-center rounded-full border shadow-inner transition-colors duration-200 motion-reduce:transition-none ${
          isDarkMode
            ? 'border-[var(--heo-color-border-dark)] bg-slate-800'
            : 'border-[var(--heo-color-border)] bg-indigo-100'
        }`}
      >
        <span
          className={`absolute flex h-5 w-5 items-center justify-center rounded-full shadow-sm transition-transform duration-200 motion-reduce:transition-none ${
            isDarkMode
              ? 'translate-x-[18px] bg-[var(--heo-color-accent)] text-[#18171d]'
              : 'translate-x-[1px] bg-white text-[var(--heo-color-primary)]'
          }`}
        >
          <span className='h-3.5 w-3.5'>{isDarkMode ? <Moon /> : <Sun />}</span>
        </span>
      </span>
    </button>
  )
}

export default DarkModeButton
