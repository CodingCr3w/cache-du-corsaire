import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import client from "./client"
import type { RaidForm } from "components/home/Raids/components/RaidModal/useRaidForm"

export default function useNewRaid() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RaidForm) => client("api/raids", { data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["raids"] })
      toast.success(`Raid "${variables.name}" créé`)
    },
    meta: {
      error: "Impossible de créer le raid",
    },
  })
}
