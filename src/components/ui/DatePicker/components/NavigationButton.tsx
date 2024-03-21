import React from "react"
import clsx from "clsx"

export default function NavigationButton({
  children: icon,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactElement
}) {
  return (
    <button
      {...props}
      className={clsx(
        "flex items-center justify-center rounded border border-transparent p-1 text-xs",
        "hover:bg-surface-300",
        props.className
      )}
    >
      {React.cloneElement(icon, {
        className: clsx("h-4 w-auto", icon.props.className),
      })}
    </button>
  )
}
