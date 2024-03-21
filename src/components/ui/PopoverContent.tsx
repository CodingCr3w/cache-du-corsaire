import React from "react"
import clsx from "clsx"
import * as Popover from "@radix-ui/react-popover"

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  Popover.PopoverContentProps
>((props, ref) => (
  <Popover.Content
    ref={ref}
    {...props}
    className={clsx(
      "animate-scale-in rounded-md shadow-lg",
      "ring-1 ring-black ring-opacity-5 bg-surface-500",
      props.className
    )}
  />
))

export default PopoverContent
