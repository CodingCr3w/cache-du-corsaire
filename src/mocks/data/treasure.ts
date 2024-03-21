import type { Loot } from "schemas/loot"
import { LootType } from "config/loot"

export const TREASURE: Loot[] = [
  {
    type: LootType.Gold,
    quantity: 100,
  },
  {
    type: LootType.PreciousStones,
    quantity: 0,
  },
  {
    type: LootType.Saber,
    quantity: 7,
  },
  {
    type: LootType.Gun,
    quantity: 24,
  },
  {
    type: LootType.Sword,
    quantity: 53,
  },
  {
    type: LootType.Paint,
    quantity: 12,
  },
  {
    type: LootType.Carving,
    quantity: 4,
  },
  {
    type: LootType.Manuscript,
    quantity: 0,
  },
  {
    type: LootType.Artefact,
    quantity: 12,
  },
]
