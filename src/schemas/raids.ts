import * as z from "zod"
import { lootSchema } from "./loot"

const raidSchema = z.object({
  id: z.string(),
  name: z.string(),
  from: z.string(),
  time: z.number(),
  located: z.string(),
  loot: z.array(lootSchema),
})
export type Raid = z.infer<typeof raidSchema>

export function parseRaids(data: unknown) {
  return Array.isArray(data)
    ? (data
        .map((item) => {
          try {
            return raidSchema.parse(item)
          } catch (error) {
            console.error("Raid au format invalide: ", item, error)
            return null
          }
        })
        .filter(Boolean) as Raid[])
    : []
}
