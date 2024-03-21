import React from "react"

/**
 * Hook pour animer une valeur d'un état initial à une cible sur une durée donnée.
 * @param targetValue - La valeur cible de l'animation.
 * @param duration - La durée de l'animation en millisecondes (par défaut 500ms).
 * @returns - La valeur courante de l'animation.
 */
export default function useAnimatedValue(
  targetValue: number,
  duration: number = 500
): number {
  // Valeur courante de l'animation
  const [currentValue, setCurrentValue] = React.useState(targetValue)

  // Utilisation des refs pour conserver la cohérence des valeurs pendant toute la durée de l'animation
  // et éviter les problèmes de dépendance.

  // Valeur de départ pour l'animation
  const startValueRef = React.useRef<number>(targetValue)
  // Temps de début de l'animation
  const startTimeRef = React.useRef<number>(Date.now())
  // Valeur cible de l'animation
  const targetValueRef = React.useRef<number>(targetValue)

  React.useEffect(() => {
    // Si la valeur cible n'a pas changé, on ne fait rien
    if (targetValueRef.current === targetValue) return

    // Mise à jour des refs avec les nouvelles valeurs
    targetValueRef.current = targetValue
    startValueRef.current = currentValue
    startTimeRef.current = Date.now()

    // Fonction pour animer la valeur au fil du temps
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      const nextValue =
        startValueRef.current +
        progress * (targetValueRef.current - startValueRef.current)

      setCurrentValue(nextValue)

      // Si l'animation n'est pas terminée, on demande une autre animation frame
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    // Démarre l'animation
    requestAnimationFrame(animate)
  }, [targetValue, duration, currentValue])

  return currentValue
}
