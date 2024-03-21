import React from "react"

import useRaids from "api/useRaids"
import useDebounce from "hooks/useDebounce"
import useTable from "./useTable"
import type { LootType } from "config/loot"
import type { Raid } from "schemas/raids"

import Table from "components/ui/Table"
import Button from "components/ui/Button"
import Plus from "components/icons/Plus"
import TextInput from "components/ui/TextInput"
import Search from "components/icons/Search"
import RaidModal from "./components/RaidModal"
import FiltersPopover from "./components/FiltersPopover"
import ConfirmDeleteModal from "./components/ConfirmDeleteModal"

export default function Raids(props: React.ComponentProps<"section">) {
  const [newRaidModalOpen, setNewRaidModalOpen] = React.useState(false)

  // Filters
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query)
  const [selectedLootTypes, setSelectedLootTypes] = React.useState<LootType[]>(
    []
  )

  // Récupération des données (liste des raids)
  const { data, isLoading } = useRaids({
    filters: {
      query: debouncedQuery,
      lootTypes: selectedLootTypes,
    },
  })

  // Gestion des actions sur les lignes du tableau
  const [raidToDelete, setRaidToDelete] = React.useState<Raid>()
  const [raidToEdit, setRaidToEdit] = React.useState<Raid>()

  // Construction du tableau
  const table = useTable({
    data,
    onDelete: setRaidToDelete,
    onEdit: setRaidToEdit,
  })

  return (
    <section aria-label="Raids de l'équipage" {...props}>
      <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bangers">
            Les raids de l'équipage
          </h2>
          <p>
            Voici la liste des raids effectués par l'équipage du <b>Crew</b> :
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <TextInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un raid"
            leadingIcon={<Search />}
            className="min-w-[14rem]"
          />
          <FiltersPopover
            selectedLootTypes={selectedLootTypes}
            onChange={setSelectedLootTypes}
          />
          <Button onClick={() => setNewRaidModalOpen(true)}>
            <Plus className="w-5 h-auto" />
            Nouveau raid
          </Button>
        </div>
      </div>
      <Table isLoading={isLoading} table={table} className="mt-5" />
      <RaidModal
        raid={raidToEdit}
        open={newRaidModalOpen || !!raidToEdit}
        onClose={() => {
          setNewRaidModalOpen(false)
          setRaidToEdit(undefined)
        }}
      />
      <ConfirmDeleteModal
        raid={raidToDelete}
        onClose={() => setRaidToDelete(undefined)}
      />
    </section>
  )
}
