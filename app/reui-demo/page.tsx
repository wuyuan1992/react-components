"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ChevronRight, Moon, Sun } from "lucide-react"
import { VIEWS, NAV_SECTIONS } from "./_showcases"
import { useThemeStore, type ThemeStyle } from "@/stores/theme-store"

const STYLE_DOTS: { value: ThemeStyle; label: string; bg: string }[] = [
  { value: "vega", label: "Vega", bg: "bg-violet-500" },
  { value: "nova", label: "Nova", bg: "bg-orange-500" },
  { value: "lyra", label: "Lyra", bg: "bg-blue-500" },
  { value: "maia", label: "Maia", bg: "bg-rose-500" },
  { value: "mira", label: "Mira", bg: "bg-emerald-500" },
]

const SECTION_COLORS: Record<string, string> = {
  basic: "text-muted-foreground hover:text-foreground",
  feature: "text-primary/70 hover:text-primary",
  blocks: "text-muted-foreground hover:text-foreground",
}

export default function ReUIDemo() {
  const [activeView, setActiveView] = useState<string>("button")
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["basic", "feature", "blocks"])
  )
  const { style, mode, setStyle, toggleMode } = useThemeStore()

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const View = VIEWS[activeView]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-56 border-r flex flex-col shrink-0 h-screen">
        {/* Header: logo + theme dots + mode toggle */}
        <div className="h-14 flex items-center justify-between px-3 border-b shrink-0">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground text-[10px] font-bold leading-none">R</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm leading-tight">ReUI</span>
              <span className="text-[10px] text-muted-foreground leading-tight">Components</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {STYLE_DOTS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setStyle(s.value)}
                title={s.label}
                className={cn(
                  "size-2.5 rounded-full transition-all duration-150",
                  s.bg,
                  style === s.value
                    ? "ring-2 ring-offset-1 ring-ring opacity-100"
                    : "opacity-30 hover:opacity-70"
                )}
              />
            ))}
            <button
              type="button"
              onClick={toggleMode}
              title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              {mode === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <nav className="px-2 py-3 space-y-3">
              {NAV_SECTIONS.map((section) => (
                <div key={section.id}>
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className={cn(
                      "flex w-full items-center gap-1 px-1 py-0.5 text-xs font-semibold uppercase tracking-widest mb-1 transition-colors",
                      SECTION_COLORS[section.id] ?? "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <ChevronRight
                      className={cn(
                        "size-3 shrink-0 transition-transform duration-150",
                        openSections.has(section.id) && "rotate-90"
                      )}
                    />
                    {section.label}
                  </button>
                  {openSections.has(section.id) && (
                    <div className="space-y-px">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveView(item.id)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
                            activeView === item.id
                              ? "bg-primary text-primary-foreground font-medium"
                              : "text-muted-foreground hover:bg-accent hover:text-foreground"
                          )}
                        >
                          {section.id === "feature" && (
                            <span
                              className={cn(
                                "size-1.5 rounded-full shrink-0 transition-colors",
                                activeView === item.id ? "bg-primary-foreground/70" : "bg-primary/30"
                              )}
                            />
                          )}
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-hidden h-screen">
        <ScrollArea className="h-full">
          <main className="max-w-3xl mx-auto px-8 py-8">
            {View && <View />}
          </main>
        </ScrollArea>
      </div>
    </div>
  )
}
