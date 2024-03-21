import treasureImg from "assets/treasure.webp"
import clsx from "clsx"

import Loot from "components/home/Loot"
import Raids from "components/home/Raids/Raids"

export default function App() {
  return (
    <div className="min-h-full text-gray-50 bg-surface-900">
      <main className="px-5 py-6 mx-auto max-w-7xl ">
        <div className="flex justify-center">
          <header
            className={clsx(
              "w-fit flex flex-col items-center py-14 px-16 mb-5",
              "bg-gradient-radial from-surface-300 via-surface-900 to-transparent"
            )}
          >
            <img src={treasureImg} alt="Trésor" />
            <h1 className="text-5xl text-center text-white font-bangers">
              La cache du corsaire
            </h1>
          </header>
        </div>
        <Loot className="mb-16" />
        <Raids />
      </main>
    </div>
  )
}
