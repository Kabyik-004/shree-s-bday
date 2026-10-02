import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

/*
 * Button — reusable design-system button.
 *
 * Variants: primary | secondary | ghost
 * Sizes:    sm | md | lg
 *
 * Renders a <button> by default. Pass `as="a"` (or any element/component)
 * when the same styling is needed on a link.
 */

const BASE_STYLES = cn(
  'group relative inline-flex select-none items-center justify-center gap-2',
  'whitespace-nowrap rounded-full font-sans font-medium tracking-wide',
  'transition-all duration-300 ease-gentle',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/80',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-night',
  'active:scale-[0.98]',
  'disabled:pointer-events-none disabled:opacity-50',
)

const VARIANTS = {
  // Major actions — e.g. "Begin Our Story"
  primary: cn(
    'bg-gradient-to-r from-rose to-rose-deep text-night',
    'shadow-glow-rose',
    'hover:-translate-y-0.5 hover:brightness-110 hover:shadow-glow-rose',
  ),
  // Less important actions
  secondary: cn(
    'border border-blush/25 bg-white/5 text-ivory backdrop-blur-sm',
    'hover:-translate-y-0.5 hover:border-blush/45 hover:bg-white/10',
  ),
  // Subtle actions — e.g. "Skip"
  ghost: 'text-muted hover:bg-white/5 hover:text-ivory',
}

const SIZES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm sm:text-base',
  lg: 'h-13 px-8 text-base sm:text-lg',
}

const Button = forwardRef(function Button(
  { as: Component = 'button', variant = 'primary', size = 'md', className, children, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(BASE_STYLES, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </Component>
  )
})

export default Button
