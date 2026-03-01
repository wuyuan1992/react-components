"use client"

import { useEffect } from "react"
import { useThemeStore, type ThemeStyle } from "@/stores/theme-store"

const ALL_STYLES: ThemeStyle[] = ["vega", "nova", "lyra", "maia", "mira"]

export function ThemeApplier() {
  const style = useThemeStore((s) => s.style)
  const mode = useThemeStore((s) => s.mode)

  useEffect(() => {
    const html = document.documentElement
    ALL_STYLES.forEach((s) => html.classList.remove(`style-${s}`))
    html.classList.add(`style-${style}`)
    if (mode === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }, [style, mode])

  return null
}
