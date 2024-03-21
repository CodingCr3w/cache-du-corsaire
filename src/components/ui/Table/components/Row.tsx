import clsx from "clsx"
import type { Row } from "@tanstack/react-table"

export default function Row<TData>({
  row,
  ...props
}: React.ComponentProps<"tr"> & { row?: Row<TData> }) {
  function handleRowClick() {
    if (!row || !row.getCanSelect()) return
    row.toggleSelected()
  }

  return (
    <tr
      {...props}
      aria-selected={row?.getIsSelected()}
      onClick={handleRowClick}
      className={clsx(
        props.className,
        "text-gray-300 group",
        "even:bg-surface-900 odd:bg-surface-700",
        "child:whitespace-nowrap child:px-3 child:py-2",
        {
          "cursor-pointer": row?.getCanSelect(),
          "hover:!bg-gray-600": row?.getCanSelect() && !row?.getIsSelected(),
          "!bg-primary-main/20 hover:bg-primary-darker/20":
            row?.getIsSelected(),
        }
      )}
    />
  )
}
