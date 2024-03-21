import React from "react"
import { ZodError, z } from "zod"

import { LootType } from "config/loot"
import type { Raid } from "schemas/raids"

// Décrit le schéma de validation du formulaire
const raidFormSchema = z.object({
  name: z.string().min(1, "Le nom du raid est obligatoire"),
  location: z.string().min(1, "Le lieu du raid est obligatoire"),
  date: z.date({
    required_error: "La date du raid est obligatoire",
    invalid_type_error: "La date du raid est invalide",
  }),
  loot: z
    .record(z.nativeEnum(LootType), z.number().int().min(0))
    .refine((data) => Object.values(data).some((value) => value > 0), {
      message: "Au moins un élément de butin est nécessaire",
      path: ["loot"],
    }),
})
export type RaidForm = z.infer<typeof raidFormSchema>

// Décrit les erreurs possibles du formulaire (pour chaque champ)
type FormErrors = {
  [K in keyof RaidForm as `${K}Error`]?: string
}

// Récupère le message d'erreur d'un champ du formulaire dans les erreurs Zod
const getErrorMsg = (zodErrors: ZodError, path: string) =>
  zodErrors?.issues.find((issue) => issue.path[0] === path)?.message

// Etat initial du formulaire
const initialState: RaidForm = {
  name: "",
  location: "",
  date: new Date(),
  loot: {},
}

/**
 * Hook responsable du state et de la validation du formulaire de raid.
 */
export default function useForm({
  raid,
  onSubmit,
}: {
  raid?: Raid
  onSubmit: (data: RaidForm) => void
}) {
  const [state, setState] = React.useState<RaidForm>(initialState)
  const { name, location, date, loot } = state

  // Si on a un raid, on le charge dans le formulaire
  React.useEffect(() => {
    if (!!raid) {
      setState({
        name: raid.name,
        location: raid.located,
        date: new Date(raid.time),
        loot: raid.loot.reduce(
          (acc, item) => {
            const key = item.type as LootType
            acc[key] = item.quantity
            return acc
          },
          {} as RaidForm["loot"]
        ),
      })
    }
  }, [raid])

  const [errors, setErrors] = React.useState<FormErrors>({})
  // Réinitialise les erreurs quand les champs changent
  React.useEffect(() => {
    setErrors((prev) => ({ ...prev, nameError: undefined }))
  }, [name])
  React.useEffect(() => {
    setErrors((prev) => ({ ...prev, locationError: undefined }))
  }, [location])
  React.useEffect(() => {
    setErrors((prev) => ({ ...prev, dateError: undefined }))
  }, [date])
  React.useEffect(() => {
    setErrors((prev) => ({ ...prev, lootError: undefined }))
  }, [loot])

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    try {
      // Supprime les éléments de butin avec une quantité nulle
      const newRaid = {
        ...state,
        loot: Object.fromEntries(
          Object.entries(state.loot).filter(([, quantity]) => quantity > 0)
        ),
      }
      // Valide le formulaire (throw une erreur si invalide)
      raidFormSchema.parse(newRaid)
      // Formulaire ok, on soumet les données
      onSubmit(newRaid)
    } catch (err) {
      // Formulaire invalide, on met à jour les erreurs
      if (err instanceof ZodError) {
        setErrors({
          nameError: getErrorMsg(err, "name"),
          locationError: getErrorMsg(err, "location"),
          dateError: getErrorMsg(err, "date"),
          lootError: getErrorMsg(err, "loot"),
        })
      }
      return
    }
  }

  // Réinitialise le formulaire
  function reset() {
    setState(initialState)
    setErrors({})
  }

  return { state, setState, errors, handleSubmit, reset }
}
