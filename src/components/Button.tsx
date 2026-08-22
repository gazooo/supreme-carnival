import type { ComponentPropsWithoutRef } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'onInk' | 'onInkGhost'
export type ButtonSize = 'sm' | 'md' | 'lg'

// eslint-disable-next-line react-refresh/only-export-components
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className = '',
): string {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium select-none transition-colors duration-200 ease-out'
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-ink text-paper hover:bg-accent',
    secondary: 'border border-line-strong text-ink hover:border-ink hover:bg-paper-alt',
    onInk: 'on-ink bg-paper text-ink hover:bg-accent-on-dark',
    onInkGhost: 'on-ink border border-ink-line text-paper hover:border-paper hover:bg-white/5',
  }
  const sizes: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-[0.9375rem]',
    lg: 'px-6 py-3.5 text-base',
  }
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim()
}

type CommonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<'a'>) {
  return (
    <a className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </a>
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}
