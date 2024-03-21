import React from "react"
import ReactDOM from "react-dom/client"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import toast, { Toaster } from "react-hot-toast"

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

function toastError(error: unknown) {
  if (typeof error === "string") {
    toast.error(error)
  } else {
    toast.error("Une erreur est survenue")
  }
}

/**
 * Configuration de react-query
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount) {
        return failureCount < 2
      },
    },
  },
  queryCache: new QueryCache({
    onError: (_error, query) => {
      toastError(query.meta?.error)
      if (typeof query.meta?.onError === "function") {
        query.meta?.onError()
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (_error, _variables, _context, mutation) => {
      toastError(mutation.meta?.error)
    },
    onSuccess: (_data, _variables, _context, mutation) => {
      if (typeof mutation.meta?.success === "string") {
        toast.success(mutation.meta?.success)
      }
    },
  }),
})

/**
 * Point d'entrée de l'application
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)
