"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useThemeStore, type ThemeStyle } from "@/stores/theme-store"

const STYLES: { value: ThemeStyle; label: string; accent: string }[] = [
  { value: "vega", label: "Vega", accent: "bg-violet-500" },
  { value: "nova", label: "Nova", accent: "bg-orange-500" },
  { value: "lyra", label: "Lyra", accent: "bg-blue-500" },
  { value: "maia", label: "Maia", accent: "bg-rose-500" },
  { value: "mira", label: "Mira", accent: "bg-emerald-500" },
]

export function ThemeSwitcher() {
  const { style, mode, setStyle, toggleMode } = useThemeStore()

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Style
        </p>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <Button
              key={s.value}
              variant={style === s.value ? "outline" : "secondary"}
              size="sm"
              onClick={() => setStyle(s.value)}
              className="gap-2"
            >
              <span className={cn("size-2 rounded-full", s.accent)} />
              {s.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Mode
        </p>
        <div className="flex items-center gap-3">
          <Sun className="size-4 text-muted-foreground" />
          <Switch
            id="dark-mode"
            checked={mode === "dark"}
            onCheckedChange={toggleMode}
          />
          <Moon className="size-4 text-muted-foreground" />
          <Label htmlFor="dark-mode" className="text-sm cursor-pointer">
            {mode === "dark" ? "Dark" : "Light"}
          </Label>
        </div>
      </div>
    </div>
  )
}
