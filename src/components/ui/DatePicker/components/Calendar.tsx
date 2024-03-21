import type { DPDay } from "@rehookify/datepicker"
import clsx from "clsx"

/**
 * Calendar components
 */

/**
 * Utilisé pour afficher un jour dans le calendrier.
 */
export function DayButton({
  hideOutsideCurrentMonth,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  day: DPDay
  hideOutsideCurrentMonth?: boolean
}) {
  return (
    <button
      {...props}
      className={getDayClassName(
        props.day,
        clsx(
          "mx-auto flex w-8 items-center justify-center rounded border border-transparent p-1 text-xs",
          props.className
        ),
        hideOutsideCurrentMonth
      )}
    />
  )
}

/**
 * Noms de classes tailwind pour un bouton de jour.
 */
function getDayClassName(
  { selected, disabled, inCurrentMonth, now, range }: DPDay,
  className?: string,
  hideOutsideCurrentMonth?: boolean
) {
  return clsx("day", className, range, {
    "bg-primary-main text-gray-900 hover:bg-primary-darker opacity-100":
      selected,
    "opacity-25 cursor-not-allowed": disabled,
    "pointer-events-none": !inCurrentMonth,
    "opacity-0": !inCurrentMonth && hideOutsideCurrentMonth,
    "opacity-25": !inCurrentMonth && !hideOutsideCurrentMonth,
    "border-primary-lighter text-primary-main hover:bg-gray-200":
      now && !selected,
    "hover:bg-gray-700": !selected && !now,
  })
}

/**
 * Utilisé dans l'en-tête du calendrier pour afficher un jour de la semaine.
 */
export function WeekDay({ children: day }: React.PropsWithChildren) {
  return (
    <div className="text-xs font-medium leading-4 text-center text-gray-300">
      {day}
    </div>
  )
}

export function Container(props: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={clsx(props.className, "grid grid-cols-7 gap-y-2")}
    />
  )
}
