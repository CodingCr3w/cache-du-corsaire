import React from "react"
import clsx from "clsx"

import { useTable } from "../hooks/useTable"

import ChevronDoubleRight from "components/icons/ChevronDoubleRight"
import ChevronRight from "components/icons/ChevronRight"
import TextInput from "components/ui/TextInput"
import Select from "components/ui/Select"

export default function Pagination<TData>() {
  const table = useTable<TData>()

  return (
    <div
      className={clsx(
        "flex items-center justify-between px-6 py-3",
        "text-sm text-gray-300",
        "border-t border-gray-600"
      )}
    >
      <div className="inline-flex items-center gap-4">
        <div className="inline-flex items-center -space-x-px">
          <PageNavButton
            className="rounded-l"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronDoubleRight className="rotate-180" />
          </PageNavButton>
          <PageNavButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronRight className="rotate-180" />
          </PageNavButton>
          <PageNavButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </PageNavButton>
          <PageNavButton
            className="rounded-r"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronDoubleRight />
          </PageNavButton>
        </div>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} sur{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
      <div className="inline-flex items-center gap-4">
        <span className="flex items-center gap-1">
          Aller à la page :
          <TextInput
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            className="!w-16"
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
          />
        </span>
        <Select
          hideLabel
          label="Afficher par page"
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(val) => {
            table.setPageSize(Number(val))
          }}
        >
          {[10, 20, 30, 40, 50, 100].map((pageSize) => (
            <Select.Item key={pageSize} value={pageSize.toString()}>
              Afficher {pageSize}
            </Select.Item>
          ))}
        </Select>
      </div>
    </div>
  )
}

function PageNavButton({
  children: icon,
  ...props
}: React.ComponentProps<"button"> & { children: React.ReactElement }) {
  return (
    <button
      {...props}
      className={clsx(
        props.className,
        "relative text-gray-400",
        "inline-flex items-center p-2",
        "ring-1 ring-inset ring-gray-400",
        props.disabled ? "cursor-not-allowed" : "hover:bg-surface-500",
        "focus:z-20 focus:outline-offset-0"
      )}
    >
      {React.cloneElement(icon, {
        className: clsx("h-4 w-auto", icon.props.className),
      })}
    </button>
  )
}
