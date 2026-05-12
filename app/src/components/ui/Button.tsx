import * as React from "react"
import { cn } from "../../lib/utils"

import { Spinner } from "./Loader"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'error'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "btn-primary",
      secondary: "bg-secondary text-white hover:opacity-90",
      ghost: "bg-transparent hover:bg-surface-container text-on-surface",
      outline: "bg-transparent border border-outline text-on-surface hover:bg-surface-container",
      error: "bg-error text-white hover:opacity-90",
    }

    const sizes = {
      sm: "px-sm py-xs text-body-sm",
      md: "px-md py-sm text-body-md",
      lg: "px-lg py-md text-h3",
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none gap-2",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Spinner size={16} className={variant === 'primary' || variant === 'error' ? 'text-white' : 'text-primary'} />}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
