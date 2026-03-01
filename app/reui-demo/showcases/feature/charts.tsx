"use client"

import {
  LineChart,
  AreaChart,
  BarChart,
  PieChart,
} from "@/components/features/charts"
import type { ChartConfig } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function ChartsView() {
  const data = [
    { month: "Jan", value: 186 },
    { month: "Feb", value: 305 },
    { month: "Mar", value: 237 },
    { month: "Apr", value: 173 },
    { month: "May", value: 209 },
    { month: "Jun", value: 214 },
  ]
  const lineConfig = {
    value: { label: "Value", color: "var(--chart-1)" },
  } satisfies ChartConfig

  const pieData = [
    { browser: "chrome", visitors: 275 },
    { browser: "safari", visitors: 200 },
    { browser: "firefox", visitors: 187 },
    { browser: "edge", visitors: 173 },
  ]
  const pieConfig = {
    chrome: { label: "Chrome", color: "var(--chart-1)" },
    safari: { label: "Safari", color: "var(--chart-2)" },
    firefox: { label: "Firefox", color: "var(--chart-3)" },
    edge: { label: "Edge", color: "var(--chart-4)" },
  } satisfies ChartConfig

  return (
    <div>
      <PageHeader title="Charts" description="Data visualization components built on Recharts." />
      <ExampleSection title="Line Chart">
        <LineChart
          data={data}
          xAxisKey="month"
          lines={["value"]}
          config={lineConfig}
          height={200}
        />
        <CodeBlock
          code={`<LineChart
  data={data}
  xAxisKey="month"
  lines={["value"]}
  config={config}
  height={200}
/>`}
        />
      </ExampleSection>
      <ExampleSection title="Area Chart">
        <AreaChart
          data={data}
          xAxisKey="month"
          areas={["value"]}
          config={lineConfig}
          height={200}
        />
      </ExampleSection>
      <ExampleSection title="Bar Chart">
        <BarChart
          data={data}
          xAxisKey="month"
          bars={["value"]}
          config={lineConfig}
          height={200}
        />
      </ExampleSection>
      <ExampleSection title="Pie Chart">
        <PieChart
          data={pieData}
          dataKey="visitors"
          nameKey="browser"
          config={pieConfig}
          height={200}
        />
      </ExampleSection>
    </div>
  )
}

// Block Views
