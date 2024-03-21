import React from "react"

import useTable from "./useTable"

import Table from "components/ui/Table"
import TextInput from "components/ui/TextInput"
import Search from "components/icons/Search"
import Button from "components/ui/Button"
import Plus from "components/icons/Plus"
import RaidModal from "./components/RaidModal"
import FiltersPopover from "./components/FiltersPopover"

export default function Raids(props: React.ComponentProps<"section">) {
  const table = useTable()
  const [newRaidModalOpen, setNewRaidModalOpen] = React.useState(false)

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
            placeholder="Rechercher un raid"
            leadingIcon={<Search />}
            className="min-w-[14rem]"
          />
          <FiltersPopover />
          <Button onClick={() => setNewRaidModalOpen(true)}>
            <Plus className="w-5 h-auto" />
            Nouveau raid
          </Button>
        </div>
      </div>
      <Table table={table} className="mt-5" />
      <RaidModal
        open={newRaidModalOpen}
        onClose={() => setNewRaidModalOpen(false)}
      />
    </section>
  )
}
