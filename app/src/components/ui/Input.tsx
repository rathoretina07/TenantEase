import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1 relative">
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-md bg-surface-container-low px-md py-sm text-body-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-outline focus-visible:outline-none focus-visible:ring-2 focus-visible:bg-white transition-all disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border border-error focus-visible:ring-error" : "border-transparent focus-visible:ring-primary",
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-description` : undefined}
          {...props}
        />
        {error && (
          <span id={`${props.id}-error`} className="text-body-sm text-error" role="alert">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={`${props.id}-description`} className="text-body-sm text-on-surface-variant">
            {helperText}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
