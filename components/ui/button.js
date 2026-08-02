import { forwardRef } from 'react'

const cx = (...classes) => classes.filter(Boolean).join(' ')

const baseClasses =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50'

const variants = {
  glass: 'liquid-glass-strong px-5 py-2.5 text-white',
  secondary: 'bg-white px-5 py-2.5 text-black',
  ghost: 'px-4 py-2 text-white/90 hover:text-white'
}

const sizes = {
  default: '',
  lg: 'px-6 py-3',
  sm: 'px-3.5 py-1.5 text-sm'
}

const Button = forwardRef(function Button(
  { className, variant = 'glass', size = 'default', asChild = false, ...props },
  ref
) {
  const Comp = asChild ? 'span' : 'button'

  return (
    <Comp
      ref={ref}
      className={cx(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    />
  )
})

export { Button }
