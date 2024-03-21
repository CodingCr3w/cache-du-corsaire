import { useQuery } from "@tanstack/react-query"

import type { Raid } from "schemas/raids"
import { parseRaids } from "schemas/raids"
import client from "./client"
import type { LootType } from "config/loot"

type Params<T> = {
  filters?: {
    query?: string
    lootTypes?: LootType[]
    location?: string
  }
  select?: (data: Raid[]) => T
}

export default function useRaids<T = Raid[]>({
  filters = {
    query: "",
    lootTypes: [],
    location: "",
  },
  select,
}: Params<T>) {
  return useQuery({
    queryKey: ["raids", filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters.query) params.set("query", filters.query)
      if (filters.lootTypes)
        params.set("lootTypes", filters.lootTypes.join(","))
      if (filters.location) params.set("location", filters.location)
      const result = await client("api/raids?" + params.toString())
      const raids = parseRaids(result)
      return raids
    },
    select,
    meta: {
      error: "Impossible de récupérer les raids",
    },
  })
}
