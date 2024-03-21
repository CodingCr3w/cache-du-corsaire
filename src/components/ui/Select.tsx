import React from "react"
import * as RadixSelect from "@radix-ui/react-select"
import clsx from "clsx"
import LabelWithTooltip from "./LabelWithTooltip"
import ChevronRight from "components/icons/ChevronRight"
import Check from "components/icons/Check"

type Props = RadixSelect.SelectProps & {
  label: string
  tooltip?: string
  hideLabel?: boolean
  placeholder?: string
  isValid?: boolean
}

function Select({
  label,
  tooltip,
  hideLabel = false,
  placeholder,
  isValid = true,
  children,
  ...props
}: Props) {
  const selectId = React.useId()

  return (
    <RadixSelect.Root {...props}>
      <div>
        {!hideLabel && (
          <LabelWithTooltip id={selectId} tooltip={tooltip}>
            {label}
          </LabelWithTooltip>
        )}
        <RadixSelect.Trigger
          id={selectId}
          aria-invalid={!isValid}
          aria-label={hideLabel ? label : undefined}
          className={clsx(
            "relative group rounded-md text-left shadow-sm sm:text-sm",
            "w-full py-2 px-3",
            "flex items-center justify-between gap-2",
            "border bg-surface-500 text-gray-50 hover:bg-surface-900",
            "focus:border-primary-main focus:outline-none focus:ring-1 focus:ring-primary-main",
            isValid
              ? "border-gray-600"
              : "border-red-500 ring-2 ring-red-500/40"
          )}
        >
          <div className="truncate">
            <RadixSelect.Value placeholder={placeholder} />
          </div>
          <RadixSelect.Icon>
            <ChevronRight className="w-4 h-auto rotate-90 group-focus:text-primary-main" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            side="bottom"
            className={clsx(
              "w-full overflow-hidden rounded-md",
              "bg-surface-500",
              "shadow-lg ring-1 ring-black ring-opacity-5"
            )}
          >
            <RadixSelect.ScrollUpButton className="flex items-center justify-center py-2 text-gray-400">
              <ChevronRight className="w-4 h-auto -rotate-90" />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport className="p-1">
              {children}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className="flex items-center justify-center py-2 text-gray-400">
              <ChevronRight className="w-4 h-auto rotate-90" />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </div>
    </RadixSelect.Root>
  )
}

function Group({
  children,
  label,
  ...props
}: RadixSelect.SelectGroupProps & { label: string }) {
  return (
    <RadixSelect.Group {...props}>
      <RadixSelect.Label className="px-8 py-2 text-xs text-gray-400">
        {label}
      </RadixSelect.Label>
      {children}
    </RadixSelect.Group>
  )
}
Select.Group = Group

function Separator() {
  return <RadixSelect.Separator className="h-px m-2 bg-gray-300" />
}
Select.Separator = Separator

const SelectItem = React.forwardRef<
  HTMLDivElement,
  RadixSelect.SelectItemProps
>(function SelectItem({ children, className, ...props }, forwardedRef) {
  return (
    <RadixSelect.Item
      {...props}
      ref={forwardedRef}
      className={clsx(
        "relative select-none rounded text-sm text-gray-200",
        "flex items-center py-2 pl-8 pr-4",
        "data-[highlighted]:bg-primary-main data-[highlighted]:!text-gray-900",
        "hover:bg-primary-main hover:!text-white", // Sometimes the `data-[highlighted]` doesn't work
        "data-[disabled]:pointer-events-none data-[disabled]:text-gray-400",
        "data-[state=checked]:text-primary-main",
        "focus:outline-none focus:ring-0 border-0",
        className
      )}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute top-0 bottom-0 flex items-center left-2">
        <Check className="w-4 h-auto" />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
})
Select.Item = SelectItem

export default Select
