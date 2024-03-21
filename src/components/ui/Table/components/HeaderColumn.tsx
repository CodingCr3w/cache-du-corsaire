import React from "react"
import clsx from "clsx"
import { flexRender } from "@tanstack/react-table"
import type { Header } from "@tanstack/react-table"

export default function HeaderColumn<TData, TValue>({
  header,
  ...props
}: React.ComponentProps<"th"> & {
  header: Header<TData, TValue>
}) {
  return (
    <th
      key={header.id}
      colSpan={header.colSpan}
      {...props}
      className={clsx(
        "first:pl-4 last:pr-4 sm:first:pl-6 sm:last:pl-6",
        "border-b border-gray-600 backdrop-blur backdrop-filter",
        "bg-surface-300/75 text-gray-100",
        "p-3 text-left font-medium"
      )}
    >
      {header.isPlaceholder ? null : (
        <div
          onClick={header.column.getToggleSortingHandler()}
          className={clsx({
            "cursor-pointer select-none": header.column.getCanSort(),
          })}
        >
          <span>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </span>
          {{
            asc: " 🔼",
            desc: " 🔽",
          }[header.column.getIsSorted() as string] ?? null}
        </div>
      )}
    </th>
  )
}
