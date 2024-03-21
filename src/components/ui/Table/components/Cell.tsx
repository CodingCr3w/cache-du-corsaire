import React from "react"
import clsx from "clsx"

type Props = React.ComponentProps<"td"> & {
  isCentered?: boolean
}

const Cell = React.forwardRef<HTMLTableCellElement, Props>(
  ({ className, isCentered = false, ...props }, ref) => {
    return (
      <td
        ref={ref}
        {...props}
        className={clsx(
          "first:pl-4 last:pr-4 sm:first:pl-6 sm:last:pl-6",
          "first:font-medium first:text-gray-50",
          "text-sm",
          isCentered && "text-center",
          className
        )}
      />
    )
  }
)

export default Cell
