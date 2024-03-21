import React from "react"
import clsx from "clsx"

export type BasicInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isValid?: boolean
  error?: string
  leadingIcon?: React.ReactElement
  trailingIcon?: React.ReactElement
}

const BaseInput = React.forwardRef<HTMLInputElement, BasicInputProps>(
  ({ isValid = true, error, leadingIcon, trailingIcon, ...props }, ref) => {
    const hasError = !isValid || !!error
    return (
      <div className="relative group">
        <input
          ref={ref}
          aria-invalid={hasError}
          type="text"
          {...props}
          className={clsx(
            "block w-full rounded-md shadow-sm sm:text-sm",
            "text-gray-50",
            props.disabled
              ? "cursor-not-allowed bg-gray-800"
              : "bg-surface-500",
            "focus:border-primary-main focus:ring-primary-main",
            hasError
              ? "border-red-500 ring-2 ring-red-500/40"
              : "border-gray-600",
            !!leadingIcon && "pl-9",
            !!trailingIcon && "pr-9",
            props.className
          )}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {leadingIcon && (
          <span
            className={clsx(
              "absolute -translate-y-1/2 top-1/2 left-3",
              "text-gray-400 group-focus:text-primary-main group-focus-within:text-primary-main"
            )}
          >
            {React.cloneElement(leadingIcon, {
              className: clsx(leadingIcon.props.className, "w-5 h-auto"),
            })}
          </span>
        )}
        {trailingIcon && (
          <span
            className={clsx(
              "absolute -translate-y-1/2 top-1/2 right-3",
              "text-gray-400 group-focus:text-primary-main group-focus-within:text-primary-main"
            )}
          >
            {React.cloneElement(trailingIcon, {
              className: clsx(trailingIcon.props.className, "w-5 h-auto"),
            })}
          </span>
        )}
      </div>
    )
  }
)

export default BaseInput
