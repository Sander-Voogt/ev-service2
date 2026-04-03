import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  isLoading?: boolean
  fullWidth?: boolean
}

const variantClasses = {
  primary: `
    bg-green-700 hover:bg-green-800 text-white font-semibold
    active:scale-95
  `,
  secondary: `
    bg-green-100 hover:bg-green-200 text-green-900 font-medium
    active:scale-95
  `,
  outline: `
    border-2 border-green-700 text-green-700 hover:bg-green-50 font-medium
    active:scale-95
  `,
  ghost: `
    text-green-700 hover:text-green-800 hover:bg-green-50 font-medium
    active:scale-95
  `,
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      isLoading = false,
      fullWidth = false,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center gap-2
          rounded-lg font-medium
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600
          disabled:opacity-70 disabled:cursor-not-allowed
          transition-all duration-200
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            {children}
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
export type { ButtonProps }
