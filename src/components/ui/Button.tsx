import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  as?: 'button' | 'a'
  href?: string
  children: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-magenta text-white hover:bg-magenta/85 shadow-md hover:shadow-magenta/30 hover:shadow-lg',
  secondary:
    'bg-celeste text-gray-900 hover:bg-celeste/85 shadow-md',
  outline:
    'border-2 border-magenta text-magenta hover:bg-magenta hover:text-white dark:text-magenta',
  ghost:
    'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'btn-border-anim inline-flex items-center justify-center gap-2 rounded-full font-semibold',
    'transition-all duration-300 cursor-pointer select-none',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  if (Tag === 'a') {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
