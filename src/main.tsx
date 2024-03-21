import React from "react"
import ReactDOM from "react-dom/client"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { Toaster } from "react-hot-toast"

import App from "./App"
import { worker } from "./mocks/browser"
import "./main.css"

if (process.env.NODE_ENV === "development") {
  // Ajoute une classe CSS pour afficher le breakpoint
  // responsive courant à l'écran (tailwindcss-debug-screens)
  document.body.classList.add("debug-screens")
}

/**
 * Démarre le worker MSW pour intercepter les requêtes
 * @note normalement, on ne fait cela que dans un environnement de développement
 **/
worker.start()

/**
 * Point d'entrée de l'application
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TooltipProvider delayDuration={200}>
      <App />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          success: {
            style: {
              color: "#00173D",
            },
          },
        }}
      />
    </TooltipProvider>
  </React.StrictMode>
)
