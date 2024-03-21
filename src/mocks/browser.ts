import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"

// Configure un Service Worker avec les handlers de requêtes
export const worker = setupWorker(...handlers)
