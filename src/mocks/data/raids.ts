import { getRandomInt } from "utils/numbers"
import { getRandomPastDate } from "utils/dates"
import { LootType } from "config/loot"
import type { Loot } from "schemas/loot"
import type { Raid } from "schemas/raids"

enum PirateHideout {
  MainShip = "Navire Principal",
  SecretCave = "Caverne Secrète",
  DesertedIsland = "Île Déserte",
  SecludedBeach = "Plage Isolée",
  AbandonedFort = "Fort Abandonné",
  SunkenShip = "Navire Coulé",
}

const RAID_NAMES = [
  "Assaut Nocturne",
  "Abordage Éclair",
  "Chasse au Trésor",
  "L'Attaque Furtive",
  "Embuscade Lunaire",
  "Razzia des Mers",
  "Pillage du Crépuscule",
  "Incursion Étoilée",
  "Raid des Alizés",
  "Brigandage Océanique",
  "Capture de la Brise",
  "Saccage Solaire",
  "Expédition du Vent",
]

const RAID_ORIGINS = [
  "La Mer des Éperons",
  "L'Océan de la Hache",
  "Le Flot de l'Épée",
  "La Vague du Sabre",
  "Le Courant du Corbeau",
  "La Mare du Kraken",
  "Les Abysses du Leviathan",
  "Le Gouffre du Serpent",
  "Les Flots du Trident",
  "La Baie du Spectre",
  "Les Eaux de la Sirène",
  "L'Archipel du Phénix",
  "Le Récif du Dragon",
]

export function generateRaids(count = 50): Raid[] {
  const raids: Raid[] = []

  for (let i = 0; i < count; i++) {
    const name = RAID_NAMES[getRandomInt(0, RAID_NAMES.length - 1)]
    const from = RAID_ORIGINS[getRandomInt(0, RAID_ORIGINS.length - 1)]
    const located = Object.values(PirateHideout)[
      getRandomInt(0, Object.values(PirateHideout).length - 1)
    ] as PirateHideout

    const lootCount = getRandomInt(1, 4) // A raid can bring back between 1 and 4 different types of loots
    const loot: Loot[] = []

    while (loot.length < lootCount) {
      const lootType = Object.values(LootType)[
        getRandomInt(0, Object.values(LootType).length - 1)
      ] as LootType

      // To avoid adding the same type of loot twice
      if (!loot.some((l) => l.type === lootType)) {
        loot.push({
          type: lootType,
          quantity: getRandomInt(1, 100),
        })
      }
    }

    raids.push({
      id: i.toString(),
      name,
      from,
      located,
      loot,
      time: getRandomPastDate().getTime(),
    })
  }

  return raids
}

export const RAIDS = generateRaids()
