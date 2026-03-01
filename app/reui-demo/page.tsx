"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { VIEWS, NAV_SECTIONS } from "./_showcases"

export default function ReUIDemo() {
  const [activeView, setActiveView] = useState<string>("button")
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["basic", "feature", "blocks"])
  )

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
        <div className="h-14 flex items-center gap-2 px-4 border-b shrink-0">
          <span className="font-semibold text-sm">ReUI</span>
          <span className="text-xs text-muted-foreground font-medium">Components</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <nav className="px-2 py-3 space-y-3">
              {NAV_SECTIONS.map((section) => (
                <div key={section.id}>
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="flex w-full items-center gap-1 px-1 py-0.5 text-xs font-semibold text-muted-foreground hover:text-foreground uppercase tracking-widest mb-1"
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
                            "flex w-full items-center rounded-md px-3 py-1.5 text-sm transition-colors",
                            activeView === item.id
                              ? "bg-primary text-primary-foreground font-medium"
                              : "text-muted-foreground hover:bg-accent hover:text-foreground"
                          )}
                        >
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
