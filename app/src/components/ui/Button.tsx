import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
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
          "inline-flex items-center justify-center rounded-md font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
