import type { ReactNode } from 'react'

export default function Container({
  children,
  className = '',
  size = 'default',
}: {
  children: ReactNode
  className?: string
  size?: 'default' | 'wide' | 'narrow'
}) {
  const width = size === 'wide' ? 'max-w-7xl' : size === 'narrow' ? 'max-w-3xl' : 'max-w-6xl'
  return <div className={`mx-auto w-full ${width} px-5 sm:px-8 ${className}`}>{children}</div>
}
