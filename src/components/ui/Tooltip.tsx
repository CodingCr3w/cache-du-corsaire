import React from "react"
import * as RadixTooltip from "@radix-ui/react-tooltip"
import clsx from "clsx"

type Props = {
  title?: React.ReactNode
  contentProps?: RadixTooltip.TooltipContentProps
  children: React.ReactNode
}

export default function Tooltip({ title, contentProps, children }: Props) {
  if (!title) return <>{children}</>
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          align="start"
          {...contentProps}
          className={clsx(
            "max-w-xs rounded bg-black/90 p-2 text-white",
            contentProps?.className
          )}
        >
          {title}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}
