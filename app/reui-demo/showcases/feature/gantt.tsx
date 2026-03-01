"use client"

import { useState } from "react"
import { GanttWithToolbar, type GanttTask } from "@/components/features/gantt"
import { Button } from "@/components/ui/button"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function GanttView() {
  const [tasks] = useState<GanttTask[]>([
    { id: "1", name: "Project Planning", start: "2024-01-01", end: "2024-01-15", progress: 100 },
    { id: "2", name: "Design Phase", start: "2024-01-10", end: "2024-01-25", progress: 75, dependencies: ["1"] },
    { id: "3", name: "Development", start: "2024-01-20", end: "2024-02-15", progress: 50, dependencies: ["2"] },
    { id: "4", name: "Testing", start: "2024-02-10", end: "2024-02-28", progress: 25, dependencies: ["3"] },
    { id: "5", name: "Deployment", start: "2024-02-25", end: "2024-03-05", progress: 0, dependencies: ["4"] },
  ])

  return (
    <div>
      <PageHeader title="Gantt Chart" description="Project timeline visualization with frappe-gantt." />
      <ExampleSection title="Project Timeline">
        <div className="h-[400px]">
          <GanttWithToolbar
            tasks={tasks}
            height="100%"
            onTaskClick={(task) => console.log("Clicked:", task)}
          />
        </div>
        <CodeBlock
          code={`import { GanttWithToolbar, type GanttTask } from "@/components/features/gantt"

const tasks: GanttTask[] = [
  { id: "1", name: "Planning", start: "2024-01-01", end: "2024-01-15", progress: 100 },
  { id: "2", name: "Development", start: "2024-01-15", end: "2024-02-15", progress: 50, dependencies: ["1"] },
]

<GanttWithToolbar
  tasks={tasks}
  height="400px"
  onTaskClick={(task) => console.log(task)}
/>`}
        />
      </ExampleSection>
    </div>
  )
}
