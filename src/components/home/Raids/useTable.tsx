import React from "react"
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import clsx from "clsx"

import { LOOT_CONFIG } from "config/loot"
import type { Raid } from "types/data"

import Tooltip from "components/ui/Tooltip"
import IconButton from "components/ui/IconButton"
import Pen from "components/icons/Pen"

// On précise le type de données que l'on souhaite afficher dans le tableau
// en créant un helper qui va nous permettre de définir les colonnes
const columnHelper = createColumnHelper<Raid>()

const DEFAULT_DATA: Raid[] = []

type Params = {
  data?: Raid[]
  onEdit?: (raid: Raid) => void
}

export default function useTable({ data, onEdit }: Params = {}) {
  // Définition des colonnes du tableau
  const columns = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Nom du raid",
      }),
      columnHelper.accessor("from", { header: "Origine" }),
      columnHelper.accessor("time", {
        header: "Date",
        // Formatage de la date
        cell: (row) => (
          <span className="text-gray-400">
            {new Intl.DateTimeFormat("fr-FR").format(row.getValue())}
          </span>
        ),
        sortingFn: "datetime",
      }),
      columnHelper.accessor("located", { header: "Localisation du butin" }),
      columnHelper.accessor("loot", {
        header: "Butin",
        // Affichage du butin sous forme de petites pastilles
        cell: (row) => (
          <div className="flex items-center gap-1 my-auto">
            {row.getValue().map((loot) => (
              <span
                key={loot.type}
                className={clsx(
                  "bg-surface-300 rounded-full px-2 py-0 shadow",
                  "inline-flex items-center gap-px"
                )}
              >
                <Tooltip title={loot.type}>
                  <img
                    key={loot.type}
                    src={LOOT_CONFIG[loot.type].asset}
                    alt={loot.type}
                    className="w-6 aspect-square"
                  />
                </Tooltip>
                <span className="text-xs font-bold min-w-[3ch]">
                  {loot.quantity}
                </span>
              </span>
            ))}
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        // Affichage des boutons d'actions sur la ligne
        cell: ({ row }) => (
          <div className="w-10 h-5">
            <span className="items-center hidden gap-2 group-hover:inline-flex">
              <IconButton
                tooltip="Éditer le raid"
                onClick={() => onEdit?.(row.original)}
              >
                <Pen className="text-primary-main" />
              </IconButton>
            </span>
          </div>
        ),
      }),
    ],
    [onEdit]
  )

  return useReactTable({
    data: data || DEFAULT_DATA,
    columns,
    initialState: {
      sorting: [{ id: "time", desc: true }],
    },
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })
}
