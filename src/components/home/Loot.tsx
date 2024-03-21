import React from "react"
import clsx from "clsx"

import { LOOT_CONFIG } from "config/loot"
import useAnimatedValue from "hooks/useAnimatedValue"
import { TREASURE } from "mocks/data/treasure"
import type { LootType } from "config/loot"

import Select from "components/ui/Select"
import Spinner from "components/ui/Spinner"

const DEFAULT_HIDEOUT = "Toutes les planques"

export default function Loot(props: React.ComponentProps<"section">) {
  const isLoading = false
  return (
    <section aria-label="Butin de l'équipage" {...props}>
      <div className="flex flex-col justify-between gap-2 mb-5 md:items-center md:flex-row">
        <p>
          Ahoy Matelot ! Voici la liste des butins à disposition du <b>Crew</b>{" "}
          actuellement :
        </p>
        <div className="flex items-center gap-2">
          <Select hideLabel defaultValue={DEFAULT_HIDEOUT} label="Planque">
            {[DEFAULT_HIDEOUT].map((planque) => (
              <Select.Item key={planque} value={planque}>
                {planque}
              </Select.Item>
            ))}
          </Select>
          <span className="min-w-[2rem]">
            {isLoading && <Spinner className="w-8" />}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-3 lg:gap-5">
        {TREASURE.map((treasure) => (
          <LootItem
            key={treasure.type}
            type={treasure.type}
            quantity={treasure.quantity}
          />
        ))}
      </div>
    </section>
  )
}

function LootItem({ type, quantity }: { type: LootType; quantity?: number }) {
  // On récupère l'asset correspondant au type de butin dans sa configuration
  const { asset } = LOOT_CONFIG[type]
  // Animation des changements de quantité
  const animatedQuantity = useAnimatedValue(quantity ?? 0)

  return (
    <div
      className={clsx(
        // "flex flex-col",
        "relative pt-2 rounded-lg shadow-lg bg-surface-500 w-44 overflow-hidden",
        quantity === 0 && "opacity-25"
      )}
    >
      <img src={asset} alt={type} className="w-2/3 mx-auto select-none" />
      <div
        className={clsx(
          "text-white text-center",
          "flex items-center justify-between px-3 py-2 bg-surface-300"
        )}
      >
        <span className="text-xs">{type}</span>
        <span className={clsx("text-lg leading-7 font-bangers")}>
          {typeof quantity === "number" ? Math.round(animatedQuantity) : "-"}
        </span>
      </div>
    </div>
  )
}
