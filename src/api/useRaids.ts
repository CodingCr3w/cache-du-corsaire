import { useQuery } from "@tanstack/react-query"

import { parseRaids } from "schemas/raids"
import client from "./client"
import type { Raid } from "schemas/raids"
import type { LootType } from "config/loot"

type Params<T> = {
  query?: string
  lootTypes?: LootType[]
  hideout?: string
  select?: (data: Raid[]) => T
}

export default function useRaids<T = Raid[]>({
  select,
  ...filters
}: Params<T> = {}) {
  return useQuery({
    queryKey: ["raids", filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters.query) {
        params.set("query", filters.query)
      }
      if (filters.lootTypes) {
        params.set("lootTypes", filters.lootTypes.join(","))
      }
      if (filters.hideout) {
        params.set("location", filters.hideout)
      }
      const result = await client("api/raids?" + params.toString())
      return parseRaids(result)
    },
    select,
    meta: {
      error: "La liste des raids n'a pas pu être récupérée",
    },
  })
}
