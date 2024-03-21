import { useMutation, useQueryClient } from "@tanstack/react-query"
import client from "./client"

export default function useDeleteRaid() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (raidId: string) =>
      client(`api/raids/${raidId}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["raids"] })
    },
    meta: {
      error: "Impossible de supprimer le raid",
      success: "Raid supprimé",
    },
  })
}
