"use client"

import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"
import { FlameGraph, type FlameGraphNode, type FlameGraphRef } from "@/components/features/flamegraph"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

export function FlameGraphDemo() {
  const flameData: FlameGraphNode = {
    name: "root",
    value: 1000,
    children: [
      {
        name: "main()",
        value: 800,
        children: [
          {
            name: "processData()",
            value: 400,
            children: [
              { name: "parse()", value: 200, children: [] },
              { name: "validate()", value: 150, children: [] },
            ],
          },
          {
            name: "render()",
            value: 300,
            children: [
              { name: "draw()", value: 150, children: [] },
              { name: "layout()", value: 100, children: [] },
            ],
          },
        ],
      },
      { name: "init()", value: 200, children: [{ name: "loadConfig()", value: 100, children: [] }] },
    ],
  }

  const graphRef = useRef<FlameGraphRef>(null)

  return (
    <div>
      <PageHeader title="Flame Graph" description="Performance profiling visualization with d3-flame-graph." />
      <ExampleSection title="CPU Flame Graph">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => graphRef.current?.resetZoom()}>
              Reset Zoom
            </Button>
          </div>
          <div className="h-[350px]">
            <FlameGraph
              ref={graphRef}
              data={flameData}
              height="100%"
              onClick={(d) => console.log("Clicked:", d.data)}
            />
          </div>
        </div>
        <CodeBlock
          code={`import { FlameGraph, type FlameGraphNode } from "@/components/features/flamegraph"

const data: FlameGraphNode = {
  name: "root",
  value: 1000,
  children: [
    { name: "main()", value: 500, children: [...] },
    { name: "init()", value: 200, children: [...] },
  ],
}

<FlameGraph
  data={data}
  height="350px"
  onClick={(d) => console.log(d.data)}
/>`}
        />
      </ExampleSection>
    </div>
  )
}
