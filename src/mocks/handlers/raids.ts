import { HttpResponse, delay, http } from "msw"
import Fuse from "fuse.js"

import { generateRaids } from "mocks/data/raids"

// Simule un délai de réponse de 1 seconde
const DELAY = 1000

// Génère un jeu de données de raids
const raids = generateRaids()

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
]
