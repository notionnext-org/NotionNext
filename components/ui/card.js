const cx = (...classes) => classes.filter(Boolean).join(' ')

function Card({ className, ...props }) {
  return (
    <div className={cx('liquid-glass rounded-2xl', className)} {...props} />
  )
}

function CardContent({ className, ...props }) {
  return <div className={cx('p-6', className)} {...props} />
}

export { Card, CardContent }
