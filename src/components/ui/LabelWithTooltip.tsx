import clsx from "clsx"

import InformationCircle from "components/icons/InformationCircle"
import Tooltip from "./Tooltip"

type Props = {
  id?: string
  tooltip?: string
  count?: number
  optional?: boolean
  children?: React.ReactNode
}

export default function LabelWithTooltip({
  id,
  tooltip,
  count,
  optional = false,
  children: label,
}: Props) {
  if (!label) return null
  return (
    <div
      className={clsx(
        "mb-1 flex w-full items-center gap-1",
        !!tooltip && "justify-between"
      )}
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor={id}
          className={clsx(
            "text-sm font-medium leading-5 text-gray-100",
            optional &&
              "after:ml-2 after:text-xs after:font-semibold after:uppercase after:text-gray-400 after:content-['(optional)']"
          )}
        >
          {label}
        </label>
        {typeof count !== "undefined" && (
          <span
            className={clsx(
              "flex items-center justify-center",
              "h-5 w-5 rounded-full shadow-md",
              "bg-primary-main text-xs text-white"
            )}
          >
            {count}
          </span>
        )}
      </div>
      {tooltip ? (
        <Tooltip title={tooltip}>
          <InformationCircle className="w-auto h-6 text-gray-400" />
        </Tooltip>
      ) : (
        <span className="h-6" />
      )}
    </div>
  )
}
