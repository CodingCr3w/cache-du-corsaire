import clsx from "clsx"
import * as Checkbox from "@radix-ui/react-checkbox"
import * as Popover from "@radix-ui/react-popover"

import { LOOT_CONFIG } from "config/loot"
import type { LootType } from "config/loot"

import Filters from "components/icons/Filters"
import PopoverContent from "components/ui/PopoverContent"

export default function FiltersPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={clsx(
            "bg-surface-500 border border-gray-600 rounded-md shadow-sm text-gray-50",
            "inline-flex items-center justify-center px-2 py-2 relative",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main",
            "hover:bg-surface-900"
          )}
        >
          <Filters className="w-5 h-auto" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <PopoverContent className="px-4 py-5 mt-1">
          <label className="font-semibold text-white">Type de butin</label>
          <p className="mb-2 text-sm text-gray-300">
            Sélectionnez les types de butin des raids à afficher :
          </p>
          <div className="grid grid-cols-4 gap-2">
            {Object.keys(LOOT_CONFIG).map((type) => (
              <Checkbox.Root
                key={type}
                name="butin"
                value={type}
                className={clsx(
                  "w-20 p-2 rounded-lg bg-surface-500 aspect-square",
                  "flex items-center justify-center",
                  "transition-colors",
                  "hover:bg-surface-300",
                  "data-[state=checked]:bg-primary-main"
                )}
              >
                <img src={LOOT_CONFIG[type as LootType].asset} alt={type} />
              </Checkbox.Root>
            ))}
          </div>
        </PopoverContent>
      </Popover.Portal>
    </Popover.Root>
  )
}
