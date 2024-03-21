import { useQuery } from "@tanstack/react-query"

import { parseRaids } from "schemas/raids"
import client from "./client"

export default function useRaids() {
  return useQuery({
    queryKey: ["raids"],
    queryFn: async () => {
      const result = await client("api/raids")
      return parseRaids(result)
    },
    meta: {
      error: "La liste des raids n'a pas pu être récupérée",
    },
  })
}
