import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import type { RaidForm } from "components/home/Raids/components/RaidModal/useRaidForm"
import client from "./client"

type Params = {
  raidId: string
  data: RaidForm
}

export default function useUpdateRaid() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ data, raidId }: Params) =>
      client(`api/raids/${raidId}`, {
        method: "PATCH",
        data,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["raids"] })
      toast.success(`Raid "${variables.data.name}" mise à jour`)
    },
    meta: {
      error: "Impossible de mettre à jour le raid",
    },
  })
}
