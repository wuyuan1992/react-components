"use client"

import { useState, useCallback } from "react"
import { FlowCanvas, type Node, type Edge } from "@/components/features/flow"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function FlowView() {
  const sampleNodes: Node[] = [
    // Start
    { id: "start", type: "start", position: { x: 250, y: 0 }, data: { label: "Webhook Trigger" } },
    // Input validation
    { id: "validate", type: "process", position: { x: 250, y: 100 }, data: { label: "Validate Input", status: "success" } },
    // Decision
    { id: "decision", type: "decision", position: { x: 250, y: 220 }, data: { label: "Valid?", condition: "schema.check()" } },
    // Error path
    { id: "error", type: "errorHandler", position: { x: 50, y: 350 }, data: { label: "Handle Error", errorType: "ValidationError" } },
    { id: "end-error", type: "end", position: { x: 50, y: 470 }, data: { label: "End", status: "error" } },
    // Success path - parallel processing
    { id: "parallel", type: "parallel", position: { x: 250, y: 380 }, data: { label: "Process in Parallel", branches: 3 } },
    // Branch 1 - API
    { id: "api", type: "api", position: { x: 100, y: 520 }, data: { label: "Fetch User", method: "GET", endpoint: "/api/users/:id" } },
    // Branch 2 - Database
    { id: "db", type: "database", position: { x: 250, y: 520 }, data: { label: "Query Orders", operation: "query" } },
    // Branch 3 - Transform
    { id: "transform", type: "transform", position: { x: 400, y: 520 }, data: { label: "Transform Data", transformType: "map" } },
    // Merge
    { id: "merge", type: "merge", position: { x: 250, y: 660 }, data: { label: "Merge Results", mode: "all" } },
    // Code processing
    { id: "code", type: "code", position: { x: 250, y: 780 }, data: { label: "Run Logic", language: "typescript" } },
    // Delay
    { id: "delay", type: "delay", position: { x: 250, y: 880 }, data: { label: "Rate Limit", duration: "5s" } },
    // Message
    { id: "message", type: "message", position: { x: 250, y: 980 }, data: { label: "Send Notification", channel: "slack" } },
    // End
    { id: "end", type: "end", position: { x: 250, y: 1080 }, data: { label: "Complete", status: "success" } },
  ]

  const sampleEdges: Edge[] = [
    { id: "e1", source: "start", target: "validate", type: "primary" },
    { id: "e2", source: "validate", target: "decision", type: "default" },
    { id: "e3", source: "decision", target: "error", sourceHandle: "no", type: "error", label: "No" },
    { id: "e4", source: "error", target: "end-error", type: "error" },
    { id: "e5", source: "decision", target: "parallel", sourceHandle: "yes", type: "success", label: "Yes" },
    { id: "e6", source: "parallel", target: "api", sourceHandle: "branch-0", type: "default" },
    { id: "e7", source: "parallel", target: "db", sourceHandle: "branch-1", type: "default" },
    { id: "e8", source: "parallel", target: "transform", sourceHandle: "branch-2", type: "default" },
    { id: "e9", source: "api", target: "merge", type: "default" },
    { id: "e10", source: "db", target: "merge", type: "default" },
    { id: "e11", source: "transform", target: "merge", type: "default" },
    { id: "e12", source: "merge", target: "code", type: "default" },
    { id: "e13", source: "code", target: "delay", type: "default" },
    { id: "e14", source: "delay", target: "message", type: "animated" },
    { id: "e15", source: "message", target: "end", type: "success" },
  ]

  // Node types for legend
  const nodeTypesList = [
    { type: "start", label: "Start", color: "bg-emerald-500" },
    { type: "end", label: "End", color: "bg-destructive" },
    { type: "process", label: "Process", color: "bg-primary" },
    { type: "decision", label: "Decision", color: "bg-warning" },
    { type: "api", label: "API", color: "bg-accent" },
    { type: "database", label: "Database", color: "bg-violet-500" },
    { type: "message", label: "Message", color: "bg-sky-500" },
    { type: "code", label: "Code", color: "bg-pink-500" },
    { type: "delay", label: "Delay", color: "bg-amber-500" },
    { type: "parallel", label: "Parallel", color: "bg-cyan-500" },
    { type: "errorHandler", label: "Error", color: "bg-destructive" },
  ]

  const edgeTypesList = [
    { type: "default", label: "Default", style: "solid" },
    { type: "animated", label: "Animated", style: "dashed animated" },
    { type: "success", label: "Success", style: "solid green" },
    { type: "error", label: "Error", style: "solid red" },
    { type: "primary", label: "Primary", style: "solid primary" },
    { type: "dashed", label: "Dashed", style: "dashed" },
  ]

  return (
    <div>
      <PageHeader
        title="Flow"
        description="Workflow designer with custom nodes and edges powered by React Flow."
      />
      <ExampleSection title="Workflow Example">
        <div className="h-[500px]">
          <FlowCanvas nodes={sampleNodes} edges={sampleEdges} />
        </div>
        <CodeBlock
          code={`import { FlowCanvas, type Node, type Edge } from "@/components/features/flow"

const nodes: Node[] = [
  { id: "start", type: "start", position: { x: 0, y: 0 }, data: { label: "Start" } },
  { id: "process", type: "process", position: { x: 0, y: 100 }, data: { label: "Process" } },
  { id: "end", type: "end", position: { x: 0, y: 200 }, data: { label: "End" } },
]

const edges: Edge[] = [
  { id: "e1", source: "start", target: "process", type: "primary" },
  { id: "e2", source: "process", target: "end", type: "success" },
]

<FlowCanvas nodes={nodes} edges={edges} />`}
        />
      </ExampleSection>
      <ExampleSection title="Node Types">
        <div className="grid grid-cols-4 gap-2">
          {nodeTypesList.map((n) => (
            <div key={n.type} className="flex items-center gap-2 p-2 rounded border bg-card">
              <div className={cn("size-3 rounded", n.color)} />
              <span className="text-xs font-medium">{n.label}</span>
            </div>
          ))}
        </div>
      </ExampleSection>
      <ExampleSection title="Edge Types">
        <div className="grid grid-cols-3 gap-2">
          {edgeTypesList.map((e) => (
            <div key={e.type} className="flex items-center gap-2 p-2 rounded border bg-card">
              <div className="w-8 h-0.5 bg-muted-foreground" />
              <span className="text-xs font-medium">{e.label}</span>
            </div>
          ))}
        </div>
      </ExampleSection>
      <PropTable
        props={[
          { name: "nodes", type: "Node[]", description: "Array of flow nodes" },
          { name: "edges", type: "Edge[]", description: "Array of flow edges" },
          { name: "showControls", type: "boolean", default: "true", description: "Show zoom controls" },
          { name: "showMinimap", type: "boolean", default: "true", description: "Show minimap" },
          { name: "editable", type: "boolean", default: "true", description: "Enable editing" },
        ]}
      />
    </div>
  )
}
