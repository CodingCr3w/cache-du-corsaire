import { useQuery } from "@tanstack/react-query"

import { parseRaids } from "schemas/raids"
import client from "./client"
import type { LootType } from "config/loot"

type Params = {
  query?: string
  lootTypes?: LootType[]
}

export default function useRaids(filters: Params = {}) {
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
      const result = await client("api/raids?" + params.toString())
      return parseRaids(result)
    },
    meta: {
      error: "La liste des raids n'a pas pu être récupérée",
    },
  })
}
