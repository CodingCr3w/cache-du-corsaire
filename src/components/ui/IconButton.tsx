import React from "react"
import clsx from "clsx"
import Tooltip from "./Tooltip"

type Props = React.ComponentProps<"button"> & {
  tooltip?: string
  // Spécifie que l'on attend un élément React en tant qu'enfant (= une icône)
  children: React.ReactElement
}

export default function IconButton({
  children: icon,
  tooltip,
  ...props
}: Props) {
  return (
    <Tooltip title={tooltip}>
      <button
        type="button"
        {...props}
        className={clsx(
          "rounded-full aspect-square",
          "inline-flex items-center justify-center",
          "transition-transform hover:scale-125 disabled:scale-100 disabled:pointer-events-none",
          props.className
        )}
      >
        {React.cloneElement(icon, {
          className: clsx(icon.props.className, "w-5 h-auto"),
        })}
      </button>
    </Tooltip>
  )
}
