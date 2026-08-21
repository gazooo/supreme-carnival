import type { ComponentPropsWithoutRef } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'onInk'
export type ButtonSize = 'sm' | 'md' | 'lg'

// eslint-disable-next-line react-refresh/only-export-components
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className = '',
): string {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight select-none transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out active:translate-x-0 active:translate-y-0'
  const variants: Record<ButtonVariant, string> = {
    primary:
      'border-2 border-ink bg-ink text-cream shadow-pop-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop active:shadow-pop-sm',
    secondary:
      'border-2 border-ink bg-transparent text-ink hover:-translate-y-0.5 hover:bg-butter hover:shadow-pop-sm active:shadow-none',
    onInk:
      'on-ink border-2 border-cream bg-cream text-ink hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-butter hover:border-butter hover:shadow-pop-butter',
  }
  const sizes: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-7 py-3.5 text-lg sm:px-9 sm:py-4',
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
