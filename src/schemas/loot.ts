import { LootType } from "config/loot"
import * as z from "zod"

export const lootSchema = z.object({
  type: z.nativeEnum(LootType),
  quantity: z.number(),
})
export type Loot = z.infer<typeof lootSchema>
