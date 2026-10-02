// Tiny className combiner — no extra dependencies needed.
// Usage: cn('base', condition && 'active', className)
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default cn
