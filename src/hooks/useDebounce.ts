import React from "react"

export default function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    // Créer un timer pour retarder la mise à jour de la valeur
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
    // Si la valeur change, on annule le timer et on ne met pas à jour la valeur
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
