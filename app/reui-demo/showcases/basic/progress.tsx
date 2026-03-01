"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function ProgressView() {
  const [progress, setProgress] = useState(60)
  return (
    <div>
      <PageHeader title="Progress" description="Displays an indicator showing progress." />
      <ExampleSection title="Basic">
        <div className="w-full max-w-sm space-y-4">
          <Progress value={progress} />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>-10</Button>
            <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
          </div>
        </div>
        <CodeBlock code={`<Progress value={progress} />`} />
      </ExampleSection>
    </div>
  )
}
