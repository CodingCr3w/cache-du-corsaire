import useDeleteRaid from "api/useDeleteRaid"
import Button from "components/ui/Button"
import Modal from "components/ui/Modal"
import type { Raid } from "schemas/raids"

type Props = {
  raid?: Raid
  onClose: () => void
}

export default function ConfirmDeleteModal({ raid, onClose }: Props) {
  const { mutate, isPending } = useDeleteRaid()
  if (!raid) return null

  return (
    <Modal open onClose={onClose}>
      <Modal.Title>Supprimer ce raid ?</Modal.Title>
      <Modal.Body>
        <p className="text-gray-400">
          Êtes-vous sûr de vouloir supprimer le raid <b>{raid.name}</b> et tous
          les butins qu'il contient ?
        </p>
      </Modal.Body>
      <Modal.Actions>
        <Button fullWidth variant="outlinePrimary" onClick={onClose}>
          Annuler
        </Button>
        <Button
          fullWidth
          disabled={isPending}
          onClick={() => mutate(raid.id, { onSuccess: onClose })}
        >
          Supprimer{isPending && "..."}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
