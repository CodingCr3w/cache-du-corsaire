import type { Table } from "@tanstack/react-table"
import React from "react"

// Context to store the table and avoid prop drilling
type TableContextType<TData> = {
  table: Table<TData>
}
export const TableContext = React.createContext<TableContextType<any> | null>(
  null
)

export function useTable<TData>() {
  const context = React.useContext(TableContext) as TableContextType<TData>
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider")
  }
  return context.table
}
