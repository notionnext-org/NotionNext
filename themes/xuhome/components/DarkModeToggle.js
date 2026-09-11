import { useGlobal } from '@/lib/global'

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useGlobal()

  return (
    <button
      onClick={toggleDarkMode}
      className='w-8 h-8 flex items-center justify-center border-2 border-[#0284c7] rounded-sm font-black text-sm transition-all cursor-pointer select-none shadow-[2px_2px_0px_0px_#0284c7] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none bg-[#ffffff] dark:bg-slate-700 text-[#0284c7] hover:bg-[#fde68a]'
      title={isDarkMode ? 'Light mode' : 'Dark mode'}
    >
      {isDarkMode ? '\u263C' : '\u263D'}
    </button>
  )
}
