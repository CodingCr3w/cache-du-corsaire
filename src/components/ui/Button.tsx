import React from "react"
import clsx from "clsx"

type Variant = "primary" | "outlinePrimary"
type Size = "xs" | "sm" | "md" | "lg" | "xl"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary: clsx(
    "bg-primary-main border-transparent text-gray-900 font-semibold",
    "hover:bg-primary-darker focus:ring-primary-lighter"
  ),
  outlinePrimary: clsx(
    "border-primary-main bg-transparent text-primary-main",
    "hover:bg-black focus:ring-primary-lighter"
  ),
}

const sizeClasses: Record<Size, string> = {
  xs: "rounded text-sm px-2.5 py-1.5",
  sm: "rounded-md text-sm px-3 py-2 leading-4",
  md: "rounded-md text-sm px-4 py-2",
  lg: "rounded-md text-base px-4 py-2",
  xl: "rounded-md text-base px-6 py-3",
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", size = "md", fullWidth = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        {...props}
        className={clsx(
          "inline-flex items-center gap-1 border shadow-sm",
          "font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
          fullWidth && "w-full justify-center",
          variantClasses[variant],
          sizeClasses[size],
          props.disabled && "pointer-events-none opacity-60",
          props.className
        )}
      />
    )
  }
)

export default Button
