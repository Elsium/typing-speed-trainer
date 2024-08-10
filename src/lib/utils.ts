import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Функция объединения классов из shadcn ui
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
