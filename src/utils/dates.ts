import { getRandomInt } from "./numbers"

export function getRandomPastDate(years = 2): Date {
  const date = new Date()
  const days = getRandomInt(0, years * 365)
  date.setDate(date.getDate() - days)
  return date
}

export function isDateBefore(date1: Date, date2: Date): boolean {
  const year1 = date1.getUTCFullYear()
  const month1 = date1.getUTCMonth()
  const day1 = date1.getUTCDate()

  const year2 = date2.getUTCFullYear()
  const month2 = date2.getUTCMonth()
  const day2 = date2.getUTCDate()

  if (year1 < year2) {
    return true
  } else if (year1 === year2) {
    if (month1 < month2) {
      return true
    } else if (month1 === month2) {
      return day1 < day2
    }
  }

  return false
}

export function formatDate(date: Date, locale = "fr"): string {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
