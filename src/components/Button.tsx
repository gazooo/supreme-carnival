import type { ComponentPropsWithoutRef } from 'react'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'sm' | 'md' | 'lg'

/** Two shared button styles for navigation and form actions. */
// eslint-disable-next-line react-refresh/only-export-components
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className = '',
): string {
  const base =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-md font-medium select-none transition-colors duration-150'
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-accent text-white hover:bg-fg',
    secondary: 'border border-line-strong text-fg hover:border-fg-3 hover:bg-canvas-2',
  }
  const sizes: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-[0.8125rem]',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-[0.9375rem]',
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
