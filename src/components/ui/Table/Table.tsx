import clsx from "clsx"
import { flexRender } from "@tanstack/react-table"
import type { Table } from "@tanstack/react-table"

import HeaderColumn from "./components/HeaderColumn"
import LoadingBody from "./components/LoadingBody"
import Row from "./components/Row"
import Cell from "./components/Cell"
import Pagination from "./components/Pagination"
import { TableContext, useTable } from "./hooks/useTable"

type Props<TData> = {
  table: Table<TData>
  stickyHeader?: boolean
  isLoading?: boolean
  className?: string
}

export default function Table<TData>({ table, ...props }: Props<TData>) {
  return (
    <TableContext.Provider value={{ table }}>
      <Root {...props} />
    </TableContext.Provider>
  )
}

function Root<TData>({
  stickyHeader,
  isLoading,
  className,
}: Omit<Props<TData>, "table">) {
  const table = useTable<TData>()

  const rows = table.getRowModel().rows
  const leafColumns = table
    .getAllLeafColumns()
    .filter((column) => column.getIsVisible())

  return (
    <div className="overflow-hidden">
      <div
        className={clsx(
          className,
          "m-1 overflow-auto shadow ring-1 ring-opacity-80 ring-gray-600 md:rounded-lg"
        )}
      >
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={clsx(
                  "cursor-default text-xs font-medium uppercase tracking-wide",
                  stickyHeader && "child:sticky child:top-0 child:z-10"
                )}
              >
                {headerGroup.headers.map((header) => (
                  <HeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          {isLoading ? (
            <LoadingBody cells={leafColumns.length} />
          ) : (
            <tbody className="divide-y divide-gray-600">
              {rows.length === 0 ? (
                <Row>
                  <Cell colSpan={leafColumns.length} isCentered>
                    <i>Pas de données à afficher.</i>
                  </Cell>
                </Row>
              ) : (
                rows.map((row) => (
                  <Row key={row.id} row={row}>
                    {row.getVisibleCells().map((cell) => (
                      <Cell
                        key={cell.id}
                        {...(cell.column.columnDef.meta || {})}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Cell>
                    ))}
                  </Row>
                ))
              )}
            </tbody>
          )}
        </table>
        <Pagination />
      </div>
    </div>
  )
}
