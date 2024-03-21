import React from "react"

import useRaids from "api/useRaids"
import useDebounce from "hooks/useDebounce"
import useTable from "./useTable"
import type { Raid } from "schemas/raids"
import type { LootType } from "config/loot"

import Table from "components/ui/Table"
import TextInput from "components/ui/TextInput"
import Search from "components/icons/Search"
import Button from "components/ui/Button"
import Plus from "components/icons/Plus"
import RaidModal from "./components/RaidModal"
import FiltersPopover from "./components/FiltersPopover"

export default function Raids(props: React.ComponentProps<"section">) {
  const [newRaidModalOpen, setNewRaidModalOpen] = React.useState(false)

  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query)
  const [selectedLootTypes, setSelectedLootTypes] = React.useState<LootType[]>(
    []
  )
  const [selectedRaid, setSelectedRaid] = React.useState<Raid>()

  const { data, isLoading } = useRaids({
    query: debouncedQuery,
    lootTypes: selectedLootTypes,
  })
  const table = useTable({
    data,
    onEdit: setSelectedRaid,
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
            value={selectedLootTypes}
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
        raid={selectedRaid}
        open={newRaidModalOpen || !!selectedRaid}
        onClose={() => {
          setNewRaidModalOpen(false)
          setSelectedRaid(undefined)
        }}
      />
    </section>
  )
}
