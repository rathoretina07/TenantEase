import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'primary'
}

function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
  const variants = {
    primary: "bg-primary-container/10 text-primary",
    success: "bg-tertiary-container/10 text-tertiary", // Tertiary seems to be used for success-like actions in the design
    warning: "bg-secondary-container/10 text-secondary",
    error: "bg-error-container/10 text-error",
    info: "bg-surface-container-high text-on-surface",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-sm py-xs text-label-caps font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
