import { HttpResponse, delay, http } from "msw"
import Fuse from "fuse.js"

import { generateRaids } from "mocks/data/raids"
import type { LootType } from "config/loot"

// Simule un délai de réponse de 1 seconde
const DELAY = 1000

// Génère un jeu de données de raids
const raids = generateRaids()

type NewRaid = {
  name: string
  location: string
  date: Date
  loot: Record<LootType, number>
}

export const handlers = [
  // GET /api/raids
  http.get("api/raids", async ({ request }) => {
    // Commence avec la liste complète des raids
    let results = raids

    // Filtre à partir de la query string
    const url = new URL(request.url)
    const query = url.searchParams.get("query")
    if (!!query) {
      // On utilise Fuse.js pour faire une "recherche floue" sur les raids
      const fuse = new Fuse(raids, {
        keys: ["name", "from", "located"],
        threshold: 0.3,
      })
      results = fuse.search(query).map((r) => r.item)
    }

    // Filtre pour les types de butin
    const lootTypes =
      url.searchParams.get("lootTypes")?.split(",").filter(Boolean) || []
    if (lootTypes.length > 0) {
      results = results.filter((item) =>
        // Item must contain ALL lootTypes
        lootTypes.every((lootType) =>
          item.loot.some((loot) => loot.type === lootType)
        )
      )
    }

    // Filtre de localisation
    const location = url.searchParams.get("location")
    if (!!location) {
      results = results.filter(
        (item) => item.located.toLowerCase() === location.toLowerCase()
      )
    }

    // Simule un délai de réponse
    await delay(DELAY)
    return HttpResponse.json(results)
  }),
  // POST /api/raids
  http.post<any, NewRaid>("api/raids", async ({ request }) => {
    // Récupère le raid depuis la requête
    const raid = await request.json()
    // Ajoute le raid à la liste
    raids.push({
      id: raids.length.toString(),
      name: raid.name,
      from: raid.location,
      time: new Date().getTime(),
      located: raid.location,
      loot: Object.entries(raid.loot).map(([type, quantity]) => ({
        type: type as LootType,
        quantity,
      })),
    })
    await delay(DELAY)
    return HttpResponse.json({ ok: true })
  }),
  // PATCH /api/raids/:id
  http.patch<{ id: string }, NewRaid>(
    "api/raids/:id",
    async ({ params, request }) => {
      const raidId = params.id
      const raidIndex = raids.findIndex((raid) => raid.id === raidId)
      const raid = await request.json()
      // Met à jour le raid dans la liste
      raids[raidIndex] = {
        ...raids[raidIndex],
        name: raid.name,
        from: raid.location,
        located: raid.location,
        loot: Object.entries(raid.loot).map(([type, quantity]) => ({
          type: type as LootType,
          quantity,
        })),
      }
      await delay(DELAY)
      return HttpResponse.json({ ok: true })
    }
  ),
  // DELETE /api/raids/:id
  http.delete<{ id: string }>("api/raids/:id", async ({ params }) => {
    const raidId = params.id
    // Supprime le raid de la liste
    const raidIndex = raids.findIndex((raid) => raid.id === raidId)
    raids.splice(raidIndex, 1)
    await delay(DELAY)
    return HttpResponse.json({ ok: true })
  }),
]
