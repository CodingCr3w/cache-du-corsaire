import { HttpResponse, http } from "msw"

export const handlers = [
  http.get("api/hello-world", async () => {
    return HttpResponse.json({ message: "Hello world" })
  }),
]
