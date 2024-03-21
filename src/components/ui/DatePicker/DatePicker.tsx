import React from "react"
import * as Popover from "@radix-ui/react-popover"
import { useDatePicker } from "@rehookify/datepicker"
import clsx from "clsx"

import { formatDate, isDateBefore } from "utils/dates"

import CalendarIcon from "components/icons/Calendar"
import PopoverContent from "components/ui/PopoverContent"
import LabelWithTooltip from "components/ui/LabelWithTooltip"
import BaseInput from "components/ui/BaseInput"
import * as Calendar from "./components/Calendar"
import NavigationButton from "./components/NavigationButton"
import ChevronDoubleRight from "components/icons/ChevronDoubleRight"
import ChevronRight from "components/icons/ChevronRight"

type Props = {
  dates?: Date[]
  defaultDates?: Date[]
  onDatesChange?: (dates: Date[]) => void
  label: string
  name?: string
  error?: string
  tooltip?: string
  hideLabel?: boolean
  minDate?: Date
  maxDate?: Date
  isValid?: boolean
  disabled?: boolean
}

export default function DatePicker({
  dates,
  defaultDates = [new Date()],
  label,
  name,
  error,
  tooltip,
  hideLabel = false,
  minDate,
  maxDate,
  disabled = false,
  isValid = true,
  onDatesChange,
}: Props) {
  const [internalDates, setInternalDates] = React.useState<Date[]>(
    dates || defaultDates
  )
  React.useEffect(() => {
    if (dates) setInternalDates(dates)
  }, [dates])

  const {
    data: { calendars, weekDays },
    propGetters: { dayButton, addOffset, subtractOffset },
  } = useDatePicker({
    selectedDates: internalDates,
    onDatesChange: (dates) => {
      if (!!onDatesChange) onDatesChange(dates)
      else setInternalDates(dates)
    },
    calendar: {
      startDay: 1,
    },
    dates: {
      minDate,
      maxDate,
    },
  })
  const { month, year, days } = calendars[0]

  const inputId = React.useId()
  const [open, setOpen] = React.useState(false)

  const inputRef = React.useRef<HTMLInputElement>(null)

  const isInvalid =
    !isValid ||
    internalDates.some(
      (date) =>
        (!!minDate && isDateBefore(date, minDate)) ||
        (maxDate && isDateBefore(maxDate, date))
    )

  return (
    <div>
      <Popover.Root
        open={open}
        onOpenChange={(val) => {
          // Gives focus back to the input when closing the popover
          if (!val) inputRef.current?.focus()
          setOpen(val)
        }}
      >
        {!hideLabel && (
          <LabelWithTooltip id={inputId} tooltip={tooltip}>
            {label}
          </LabelWithTooltip>
        )}
        <Popover.Anchor>
          <BaseInput
            ref={inputRef}
            readOnly
            disabled={disabled}
            isValid={!isInvalid}
            error={error}
            name={name}
            id={inputId}
            value={!!internalDates[0] ? formatDate(internalDates[0]) : ""}
            aria-label={hideLabel ? label : undefined}
            aria-invalid={isInvalid}
            aria-current={open}
            className={clsx(
              "pr-14",
              open && "!border-primary-main !ring-primary-main"
            )}
            onFocus={() => setOpen(true)}
            onClick={() => setOpen(true)}
            trailingIcon={
              <CalendarIcon
                className={clsx("h-5 w-auto", open && "text-primary-main")}
              />
            }
          />
        </Popover.Anchor>
        <Popover.Portal>
          <PopoverContent className="flex px-4 text-gray-50">
            <div className={clsx("space-y-4 py-6")}>
              <div className="flex items-center gap-2">
                <NavigationButton {...subtractOffset({ years: 1 })}>
                  <ChevronDoubleRight className="rotate-180" />
                </NavigationButton>
                <NavigationButton {...subtractOffset({ months: 1 })}>
                  <ChevronRight className="rotate-180" />
                </NavigationButton>
                <span className="mx-auto text-xs">
                  {month} {year}
                </span>
                <NavigationButton {...addOffset({ months: 1 })}>
                  <ChevronRight />
                </NavigationButton>
                <NavigationButton {...addOffset({ years: 1 })}>
                  <ChevronDoubleRight />
                </NavigationButton>
              </div>
              <Calendar.Container className="mt-4">
                {weekDays.map((day) => (
                  <Calendar.WeekDay key={day}>{day}</Calendar.WeekDay>
                ))}
              </Calendar.Container>
              <Calendar.Container className="mt-4">
                {days.map((d) => {
                  const { onClick, ...props } = dayButton(d)
                  return (
                    <Calendar.DayButton
                      key={d.$date.toString()}
                      day={d}
                      {...props}
                      onClick={(evt) => {
                        onClick?.(evt)
                        setOpen(false)
                      }}
                    >
                      {d.day}
                    </Calendar.DayButton>
                  )
                })}
              </Calendar.Container>
            </div>
          </PopoverContent>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
