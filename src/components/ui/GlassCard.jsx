import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

/*
 * GlassCard — reusable soft-glass surface for future content cards.
 *
 * Deliberately restrained: slight transparency, soft backdrop blur, a thin
 * border, a gentle shadow and a subtle top highlight. No heavy glassmorphism.
 *
 * Props:
 *   as     — element/component to render (default: 'div')
 *   hover  — enable the elegant lift-on-hover interaction (default: true)
 *   padded — apply default responsive inner padding (default: false)
 */

const GlassCard = forwardRef(function GlassCard(
  { as: Component = 'div', hover = true, padded = false, className, children, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-card border border-white/10',
        'bg-white/[0.045] backdrop-blur-md shadow-glass',
        hover &&
          cn(
            'transition-all duration-500 ease-gentle',
            'hover:-translate-y-1 hover:border-blush/25 hover:bg-white/[0.07] hover:shadow-glass-hover',
          ),
        padded && 'p-5 sm:p-6 lg:p-8',
        className,
      )}
      {...props}
    >
      {/* Hairline highlight along the top edge — subtle premium detail */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blush/40 to-transparent"
      />
      {children}
    </Component>
  )
})

export default GlassCard
