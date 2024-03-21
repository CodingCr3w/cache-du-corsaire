type Options = {
  baseUrl?: string // in case we need the client for external APIs
  data?: any
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  headers?: Record<string, string>
}

export default async function client<T = any>(
  endpoint: string,
  { baseUrl = "", method, data, headers }: Options = {}
): Promise<T> {
  const config = {
    method: method ?? (data ? "POST" : "GET"),
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  }

  return fetch(`${baseUrl}/${endpoint}`, config).then(async (response) => {
    const data = await response.json()
    return response.ok ? data : Promise.reject(data)
  })
}
