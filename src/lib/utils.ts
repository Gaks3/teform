import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const containsUppercase = (str: string) => /[A-Z]/.test(str)

export const containsNumber = (str: string) => /\d/.test(str)

export const containsSpecialChars = (str: string) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

  return specialChars.test(str)
}

export const idGenerator = (): string => {
  return Math.floor(Math.random() * 1001).toString()
}

export const getDates = (startDate: Date, endDate: Date) => {
  const dates = []
  let currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

export const getKeys = (data: Array<{ [key: string]: any }>) => {
  const combinedObject = data.reduce((result, obj) => {
    for (const key in obj) {
      result[key] = obj[key]
    }
    return result
  }, {})

  const uniqueKeys = Array.from(new Set(Object.keys(combinedObject)))

  return uniqueKeys
}
