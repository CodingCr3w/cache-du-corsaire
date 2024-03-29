import React from "react"
import clsx from "clsx"

import { LOOT_CONFIG } from "config/loot"
import type { LootType } from "config/loot"

import Button from "components/ui/Button"
import DatePicker from "components/ui/DatePicker"
import Modal from "components/ui/Modal"
import TextInput from "components/ui/TextInput"
import Trash from "components/icons/TrashOutline"
import IconButton from "components/ui/IconButton"

type Props = {
  open: boolean
  onClose: () => void
}

export default function RaidModal(props: Props) {
  return (
    <Modal {...props} large>
      <Modal.Title>Nouveau Raid</Modal.Title>
      <Modal.Subtitle>
        L'équipage a pillé un nouvel emplacement ? Enregistre le butin récolté :
      </Modal.Subtitle>
      <form>
        <Modal.Body className="flex flex-col gap-4">
          <TextInput
            autoComplete="off"
            name="raid-name"
            label="Nom du raid"
            placeholder="Ex: Attaque surprise de la flotte royale"
          />
          <TextInput
            autoComplete="off"
            name="raid-location"
            label="Lieu"
            placeholder="Ex: La baie des requins"
          />
          <DatePicker name="raid-date" label="Date du raid" />
          <fieldset
            name="raid-loot"
            className="px-4 pb-4 border rounded-lg border-surface-300 aria-[invalid=true]:border-red-600"
          >
            <legend className="px-2 mb-2 font-semibold text-gray-50">
              Butin
            </legend>
            <div className="flex flex-wrap max-w-[44rem] gap-4">
              {Object.keys(LOOT_CONFIG).map((type) => (
                <LootItem key={type} type={type as LootType} />
              ))}
            </div>
          </fieldset>
        </Modal.Body>
        <Modal.Actions>
          <Button fullWidth variant="outlinePrimary" onClick={props.onClose}>
            Annuler
          </Button>
          <Button fullWidth type="submit">
            Enregistrer
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  )
}

function LootItem({
  type,
  quantity,
  onChange,
}: {
  type: LootType
  quantity?: number
  onChange?: (value: string | null) => void
}) {
  const config = LOOT_CONFIG[type]
  const lootItemRef = React.useRef<HTMLDivElement>(null)

  const handleMouseLeave = () => {
    lootItemRef.current?.blur()
    // Blur children
    lootItemRef.current
      ?.querySelectorAll<HTMLElement>("button, input, textarea, select")
      .forEach((el) => el.blur())
  }

  return (
    <div
      aria-label={type}
      ref={lootItemRef}
      key={type}
      onMouseLeave={handleMouseLeave}
      className="relative p-2 rounded-lg shadow-lg group bg-surface-500 aspect-square isolate w-[8rem]"
    >
      <img src={config.asset} alt={type} />
      <div className="absolute left-0 right-0 flex items-center justify-center gap-1 bottom-2">
        <LootQuantityButton
          aria-label="Retirer 5"
          tabIndex={0}
          value={-5}
          disabled={typeof quantity !== "number" || quantity < 5}
          onClick={() => onChange?.((Number(quantity) - 5).toString())}
        />
        <input
          aria-label="Quantité"
          tabIndex={0}
          value={quantity || "0"}
          onChange={(evt) => onChange?.(evt.target.value)}
          className={clsx(
            "px-2 py-1 my-1 bg-gray-800 border border-gray-500 rounded-lg w-[5ch]",
            "text-center text-sm text-white font-bold appearance-none",
            "focus:bg-gray-500 focus:border-gray-400 focus:ring-0"
          )}
        />
        <LootQuantityButton
          aria-label="Ajouter 5"
          tabIndex={0}
          value={5}
          onClick={() => onChange?.(((quantity || 0) + 5).toString())}
        />
      </div>
      <IconButton
        tabIndex={0}
        aria-label="Supprimer du butin"
        onClick={() => onChange?.(null)}
        className={clsx(
          "absolute top-2 right-2 p-1",
          "hidden group-hover:flex group-focus:flex group-focus-within:flex",
          "items-center justify-center",
          "bg-red-500 text-white"
        )}
      >
        <Trash />
      </IconButton>
    </div>
  )
}

function LootQuantityButton({
  value,
  ...props
}: React.ComponentProps<"button"> & { value: number }) {
  return (
    <IconButton
      {...props}
      className={clsx(
        "hidden w-8",
        "group-hover:inline-flex group-focus:inline-flex group-focus-within:inline-flex",
        "font-semibold bg-blue-500 text-white",
        "disabled:opacity-50",
        props.className
      )}
    >
      <span>
        {value > 0 ? "+" : "-"}
        {Math.abs(value)}
      </span>
    </IconButton>
  )
}
