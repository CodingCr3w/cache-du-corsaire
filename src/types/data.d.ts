import type { LootType } from "config/loot"

type Raid = {
  id: string
  name: string
  from: string
  time: number
  located: string
  loot: Loot[]
}

type Loot = {
  type: LootType
  quantity: number
}
