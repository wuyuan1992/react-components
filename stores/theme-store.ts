import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type ThemeStyle = "vega" | "nova" | "lyra" | "maia" | "mira"
export type ThemeMode = "light" | "dark"

interface ThemeState {
  style: ThemeStyle
  mode: ThemeMode
  setStyle: (style: ThemeStyle) => void
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      style: "vega",
      mode: "light",
      setStyle: (style) => set({ style }),
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set((state) => ({
          mode: state.mode === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "app-theme",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
