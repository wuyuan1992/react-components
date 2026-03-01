"use client"

import { ThemeSwitcher } from "@/components/features/theme/ThemeSwitcher"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function ThemeView() {
  return (
    <div>
      <PageHeader title="Theme" description="Theme customization and switching." />
      <ExampleSection title="Theme Switcher">
        <div className="space-y-4">
          <ThemeSwitcher />
        </div>
      </ExampleSection>
      <ExampleSection title="Color Tokens">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-md bg-primary" />
            <span className="text-sm font-mono">--primary</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-md bg-secondary" />
            <span className="text-sm font-mono">--secondary</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-md bg-accent" />
            <span className="text-sm font-mono">--accent</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-md bg-destructive" />
            <span className="text-sm font-mono">--destructive</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-md bg-muted" />
            <span className="text-sm font-mono">--muted</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-md border bg-popover" />
            <span className="text-sm font-mono">--popover</span>
          </div>
        </div>
      </ExampleSection>
    </div>
  )
}
