import artefactImg from "assets/artefact.webp"
import carvingImg from "assets/carving.webp"
import goldImg from "assets/gold.webp"
import gunImg from "assets/gun.webp"
import manuscriptImg from "assets/manuscript.webp"
import paintImg from "assets/paint.webp"
import preciousStonesImg from "assets/precious-stones.webp"
import saberImg from "assets/saber.webp"
import swordImg from "assets/sword.webp"

// Catégories de butin
export enum LootCategory {
  Gold = "Or",
  PreciousStones = "Pierres précieuses",
  Weapons = "Armes",
  Art = "Art",
}

// Types de butin
export enum LootType {
  Gold = "Or",
  PreciousStones = "Pierres précieuses",
  Saber = "Sabres",
  Gun = "Pistolets",
  Sword = "Épées",
  Paint = "Peintures",
  Carving = "Gravures",
  Manuscript = "Manuscrits",
  Artefact = "Artefacts",
}

// Configuration du butin
export type LootConfig = {
  [key in LootType]: {
    category: LootCategory
    asset: string
  }
}

export const LOOT_CONFIG: LootConfig = {
  [LootType.Gold]: {
    category: LootCategory.Gold,
    asset: goldImg,
  },
  [LootType.PreciousStones]: {
    category: LootCategory.PreciousStones,
    asset: preciousStonesImg,
  },
  [LootType.Saber]: {
    category: LootCategory.Weapons,
    asset: saberImg,
  },
  [LootType.Gun]: {
    category: LootCategory.Weapons,
    asset: gunImg,
  },
  [LootType.Sword]: {
    category: LootCategory.Weapons,
    asset: swordImg,
  },
  [LootType.Paint]: {
    category: LootCategory.Art,
    asset: paintImg,
  },
  [LootType.Carving]: {
    category: LootCategory.Art,
    asset: carvingImg,
  },
  [LootType.Manuscript]: {
    category: LootCategory.Art,
    asset: manuscriptImg,
  },
  [LootType.Artefact]: {
    category: LootCategory.Art,
    asset: artefactImg,
  },
}
