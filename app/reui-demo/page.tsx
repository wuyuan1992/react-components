"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MarkdownEditor } from "@/components/features/markdown/MarkdownEditor"
import { MarkdownPreview } from "@/components/features/markdown/MarkdownPreview"
import type { BytemdPlugin } from "bytemd"
import gfm from "@bytemd/plugin-gfm"
import highlight from "@bytemd/plugin-highlight"
import breaks from "@bytemd/plugin-breaks"
import gemoji from "@bytemd/plugin-gemoji"
import { cn } from "@/lib/utils"
import type { ChartConfig, CurveType } from "@/components/features/charts"
import {
  LineChart,
  BarChart,
  SingleBarChart,
  AreaChart,
  PieChart,
  ScatterChart,
  RadarChart,
  ComposedChart,
} from "@/components/features/charts"

// ── Markdown sample content ───────────────────────────────────────────────────

const RICH_MARKDOWN = `# Getting Started with ByteMD :wave:

A **powerful**, *lightweight* Markdown editor built on [CodeMirror](https://codemirror.net) with a live preview and plugin system.

---

## Supported Syntax

### GFM Extensions

| Feature | Syntax | Rendered |
|---------|--------|----------|
| Strikethrough | \`~~text~~\` | ~~deleted text~~ |
| Task List | \`- [ ] item\` | see below |
| Tables | \`| col | col |\` | this table! |
| Autolink | raw URL | https://github.com |

### Task List

- [x] Install \`@bytemd/react\`
- [x] Configure GFM plugin :white_check_mark:
- [x] Add syntax highlighting
- [ ] Write documentation
- [ ] Deploy to production :rocket:

### Code Highlighting

\`\`\`typescript
interface Post {
  id: string
  title: string
  content: string
  publishedAt: Date | null
}

async function publishPost(id: string): Promise<Post> {
  const res = await fetch(\`/api/posts/\${id}/publish\`, { method: "PATCH" })
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
  return res.json() as Promise<Post>
}
\`\`\`

\`\`\`bash
pnpm add @bytemd/react @bytemd/plugin-gfm @bytemd/plugin-highlight
\`\`\`

### Blockquote

> "Markdown is not a replacement for HTML, or even close to it."
> — **John Gruber**, creator of Markdown

### Inline Formatting

Use \`backticks\` for inline code. Support for **bold**, *italic*, ~~strikethrough~~.

Emoji via gemoji plugin: :sparkles: :rocket: :fire: :tada: :zap:
`

const PREVIEW_ONLY_MARKDOWN = `## MarkdownPreview Component

This section renders using the **read-only** \`MarkdownPreview\` component — no editor, no toolbar, just clean rendered output.

### When to use

- Blog post rendering
- Comment display
- Documentation viewer
- Any static markdown display

### Feature matrix

| Plugin | Purpose | Enabled |
|--------|---------|---------|
| \`@bytemd/plugin-gfm\` | Tables, task lists, strikethrough | :white_check_mark: |
| \`@bytemd/plugin-highlight\` | 180+ language code blocks | :white_check_mark: |
| \`@bytemd/plugin-breaks\` | Soft line breaks | :white_check_mark: |
| \`@bytemd/plugin-gemoji\` | Emoji shortcodes | :white_check_mark: |
| \`@bytemd/plugin-mermaid\` | Diagrams & flowcharts | optional |
| \`@bytemd/plugin-math\` | LaTeX math formulas | optional |

### Code example

\`\`\`tsx
import { MarkdownPreview } from "@/components/features/markdown/MarkdownPreview"

export function BlogPost({ content }: { content: string }) {
  return (
    <article className="max-w-prose mx-auto py-8">
      <MarkdownPreview value={content} />
    </article>
  )
}
\`\`\`

> Pass a custom \`plugins\` prop to extend with mermaid, math, or your own \`BytemdPlugin\`.
`

const DISABLED_MARKDOWN = `# Read-only Content

This editor is in **disabled** mode — \`editorConfig={{ readOnly: true }}\` is applied and the wrapper has \`pointer-events-none opacity-60\`.

\`\`\`typescript
<MarkdownEditor
  value={content}
  onChange={() => {}}
  disabled={true}
/>
\`\`\`

Useful for **previewing** a submission before publishing, or showing archived content.
`

// ── Chart data ────────────────────────────────────────────────────────────────

const MONTHLY_DATA = [
  { month: "Jan", revenue: 18400, profit: 4200, expenses: 14200 },
  { month: "Feb", revenue: 22100, profit: 5800, expenses: 16300 },
  { month: "Mar", revenue: 19800, profit: 4600, expenses: 15200 },
  { month: "Apr", revenue: 28500, profit: 7900, expenses: 20600 },
  { month: "May", revenue: 32100, profit: 9400, expenses: 22700 },
  { month: "Jun", revenue: 29700, profit: 8200, expenses: 21500 },
  { month: "Jul", revenue: 35200, profit: 11800, expenses: 23400 },
  { month: "Aug", revenue: 38900, profit: 13200, expenses: 25700 },
  { month: "Sep", revenue: 34600, profit: 10500, expenses: 24100 },
  { month: "Oct", revenue: 41300, profit: 15700, expenses: 25600 },
  { month: "Nov", revenue: 43800, profit: 16900, expenses: 26900 },
  { month: "Dec", revenue: 48200, profit: 19400, expenses: 28800 },
]

const BROWSER_DATA = [
  { browser: "chrome", visitors: 12840 },
  { browser: "safari", visitors: 7520 },
  { browser: "firefox", visitors: 4230 },
  { browser: "edge", visitors: 3180 },
  { browser: "other", visitors: 1490 },
]

const PLATFORM_DATA = [
  { name: "desktop", value: 52400 },
  { name: "mobile", value: 38200 },
  { name: "tablet", value: 12800 },
  { name: "tv", value: 4100 },
]

const RADAR_DATA = [
  { subject: "Performance", product: 88, benchmark: 72 },
  { subject: "Security", product: 95, benchmark: 88 },
  { subject: "Usability", product: 76, benchmark: 82 },
  { subject: "Reliability", product: 91, benchmark: 85 },
  { subject: "Features", product: 83, benchmark: 78 },
  { subject: "Support", product: 70, benchmark: 90 },
]

const SCATTER_SERIES = [
  {
    key: "alpha",
    data: [
      { x: 8, y: 32 }, { x: 14, y: 41 }, { x: 20, y: 56 }, { x: 25, y: 62 },
      { x: 31, y: 70 }, { x: 38, y: 74 }, { x: 44, y: 82 }, { x: 52, y: 90 },
    ],
  },
  {
    key: "beta",
    data: [
      { x: 5, y: 18 }, { x: 12, y: 27 }, { x: 18, y: 35 }, { x: 24, y: 42 },
      { x: 30, y: 48 }, { x: 36, y: 52 }, { x: 42, y: 58 }, { x: 48, y: 65 },
    ],
  },
  {
    key: "gamma",
    data: [
      { x: 10, y: 55 }, { x: 16, y: 60 }, { x: 22, y: 65 }, { x: 28, y: 58 },
      { x: 34, y: 72 }, { x: 40, y: 78 }, { x: 46, y: 85 }, { x: 50, y: 91 },
    ],
  },
]

const COMPOSED_DATA = [
  { period: "Q1'23", revenue: 24000, profit: 8000, target: 22000 },
  { period: "Q2'23", revenue: 28500, profit: 9200, target: 26000 },
  { period: "Q3'23", revenue: 31200, profit: 10800, target: 30000 },
  { period: "Q4'23", revenue: 38900, profit: 14200, target: 35000 },
  { period: "Q1'24", revenue: 32100, profit: 11600, target: 34000 },
  { period: "Q2'24", revenue: 41300, profit: 16700, target: 40000 },
  { period: "Q3'24", revenue: 44800, profit: 18300, target: 45000 },
  { period: "Q4'24", revenue: 52600, profit: 21900, target: 50000 },
]

// ── Chart configs (defined outside component to avoid recreation) ─────────────

const MONTHLY_CONFIG: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--color-chart-1)" },
  profit: { label: "Profit", color: "var(--color-chart-2)" },
  expenses: { label: "Expenses", color: "var(--color-chart-3)" },
}

const BROWSER_CONFIG: ChartConfig = {
  chrome: { label: "Chrome", color: "var(--color-chart-1)" },
  safari: { label: "Safari", color: "var(--color-chart-2)" },
  firefox: { label: "Firefox", color: "var(--color-chart-3)" },
  edge: { label: "Edge", color: "var(--color-chart-4)" },
  other: { label: "Other", color: "var(--color-chart-5)" },
}

const PLATFORM_CONFIG: ChartConfig = {
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" },
  tablet: { label: "Tablet", color: "var(--color-chart-3)" },
  tv: { label: "TV", color: "var(--color-chart-4)" },
}

const RADAR_CONFIG: ChartConfig = {
  product: { label: "Our Product", color: "var(--color-chart-1)" },
  benchmark: { label: "Benchmark", color: "var(--color-chart-2)" },
}

const SCATTER_CONFIG: ChartConfig = {
  alpha: { label: "Team Alpha", color: "var(--color-chart-1)" },
  beta: { label: "Team Beta", color: "var(--color-chart-2)" },
  gamma: { label: "Team Gamma", color: "var(--color-chart-3)" },
}

const COMPOSED_CONFIG: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--color-chart-1)" },
  profit: { label: "Profit", color: "var(--color-chart-2)" },
  target: { label: "Target", color: "var(--color-chart-3)" },
}

const SERIES_KEYS = ["revenue", "profit", "expenses"] as const

// ── KPI helper ────────────────────────────────────────────────────────────────

function formatK(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n}`
}

function pct(a: number, b: number) {
  const diff = ((a - b) / b) * 100
  return { change: `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}%`, up: diff >= 0 }
}

interface KpiItem {
  label: string
  value: string
  change?: string
  value2?: string
  up: boolean
  sub: string
  invert?: boolean
}

const KPI_DATA: KpiItem[] = [
  {
    label: "Revenue (Dec)",
    value: formatK(48200),
    ...pct(48200, 43800),
    sub: "vs November",
  },
  {
    label: "Net Profit",
    value: formatK(19400),
    ...pct(19400, 16900),
    sub: "vs November",
  },
  {
    label: "Expenses",
    value: formatK(28800),
    ...pct(28800, 26900),
    sub: "vs November",
    invert: true,
  },
  {
    label: "Profit Margin",
    value: "40.2%",
    value2: "+1.6 pts",
    up: true,
    sub: "vs November",
  },
]

// ── Page component ────────────────────────────────────────────────────────────

export default function ReUIDemoPage() {
  // Markdown demo state
  const [liveValue, setLiveValue] = useState(RICH_MARKDOWN)
  const [editorMode, setEditorMode] = useState<"auto" | "split" | "tab">("tab")
  const [editorHeight, setEditorHeight] = useState(480)
  const [showCustomPlugin, setShowCustomPlugin] = useState(false)

  const defaultPlugins = useMemo<BytemdPlugin[]>(
    () => [gfm(), highlight(), breaks(), gemoji()],
    [],
  )

  const customPlugins = useMemo<BytemdPlugin[]>(() => {
    if (!showCustomPlugin) return defaultPlugins
    const markPlugin: BytemdPlugin = {
      remark: (processor) =>
        processor.use(() => (tree: object) => tree),
    }
    return [...defaultPlugins, markPlugin]
  }, [defaultPlugins, showCustomPlugin])

  // Chart controls — time series
  const [tsType, setTsType] = useState<"line" | "area" | "bar">("line")
  const [tsGrid, setTsGrid] = useState(true)
  const [tsLegend, setTsLegend] = useState(true)
  const [tsDots, setTsDots] = useState(false)
  const [tsStacked, setTsStacked] = useState(false)
  const [tsCurve, setTsCurve] = useState<CurveType>("monotone")
  const [activeSeries, setActiveSeries] = useState<string[]>([
    "revenue",
    "profit",
    "expenses",
  ])

  function toggleSeries(key: string) {
    setActiveSeries((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key],
    )
  }

  // Chart controls — pie
  const [pieDonut, setPieDonut] = useState(true)
  const [pieLabel, setPieLabel] = useState(false)
  const [pieLegend, setPieLegend] = useState(true)

  // Chart controls — radar
  const [radarLineOnly, setRadarLineOnly] = useState(false)
  const [radarFillOpacity, setRadarFillOpacity] = useState(20)

  // Chart controls — scatter
  const [scatterLegend, setScatterLegend] = useState(true)

  return (
    <div className="container mx-auto py-10 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">ReUI Component Showcase</h1>
        <p className="text-muted-foreground">
          A comprehensive demo of the installed ReUI components.
        </p>
      </div>

      <Tabs defaultValue="charts" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
          <TabsTrigger value="buttons">Buttons & Inputs</TabsTrigger>
          <TabsTrigger value="cards">Cards & Layout</TabsTrigger>
          <TabsTrigger value="data">Data Display</TabsTrigger>
          <TabsTrigger value="feedback">Feedback & Overlay</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
        </TabsList>

        {/* ── Charts Tab ────────────────────────────────────────────────────── */}
        <TabsContent value="charts" className="space-y-8">

          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {KPI_DATA.map((kpi) => {
              const isUp = kpi.invert ? !kpi.up : kpi.up
              return (
                <Card key={kpi.label} className="overflow-hidden">
                  <CardContent className="pt-5 pb-5">
                    <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                    <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Badge
                        variant={isUp ? "default" : "destructive"}
                        className="text-[10px] px-1.5 py-0 h-4 font-medium"
                      >
                        {kpi.value2 ?? kpi.change}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">{kpi.sub}</span>
                    </div>
                  </CardContent>
                  <div
                    className={cn(
                      "h-1 w-full",
                      isUp ? "bg-chart-2" : "bg-destructive",
                    )}
                    style={{ opacity: 0.6 }}
                  />
                </Card>
              )
            })}
          </div>

          {/* ── Time Series Section ──────────────────────────────────────── */}
          <section className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold">Time Series</h2>
              <p className="text-sm text-muted-foreground">
                Monthly revenue, profit and expenses — toggle chart type and display options live.
              </p>
            </div>

            <Card>
              <CardHeader className="pb-2 border-b">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Chart type button group */}
                  <div className="inline-flex rounded-md border overflow-hidden shrink-0">
                    {(["line", "area", "bar"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTsType(type)}
                        className={cn(
                          "px-3 h-8 text-xs font-medium capitalize border-r last:border-r-0 transition-colors",
                          tsType === type
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted/60 text-muted-foreground",
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* Series toggles */}
                  <div className="flex items-center gap-3">
                    {SERIES_KEYS.map((key) => {
                      const colorIdx = SERIES_KEYS.indexOf(key) + 1
                      return (
                        <label
                          key={key}
                          className="flex items-center gap-1.5 cursor-pointer select-none"
                        >
                          <Checkbox
                            checked={activeSeries.includes(key)}
                            onCheckedChange={() => toggleSeries(key)}
                            style={
                              {
                                "--cb-color": `var(--color-chart-${colorIdx})`,
                              } as React.CSSProperties
                            }
                          />
                          <span className="text-xs capitalize">{key}</span>
                        </label>
                      )
                    })}
                  </div>

                  <div className="ml-auto flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Switch
                        id="ts-grid"
                        checked={tsGrid}
                        onCheckedChange={setTsGrid}
                        className="scale-90"
                      />
                      <Label htmlFor="ts-grid" className="text-xs">Grid</Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Switch
                        id="ts-legend"
                        checked={tsLegend}
                        onCheckedChange={setTsLegend}
                        className="scale-90"
                      />
                      <Label htmlFor="ts-legend" className="text-xs">Legend</Label>
                    </div>

                    {tsType !== "bar" && (
                      <>
                        <div className="flex items-center gap-1.5">
                          <Switch
                            id="ts-dots"
                            checked={tsDots}
                            onCheckedChange={setTsDots}
                            className="scale-90"
                          />
                          <Label htmlFor="ts-dots" className="text-xs">Dots</Label>
                        </div>
                        <Select
                          value={tsCurve}
                          onValueChange={(v) => setTsCurve(v as CurveType)}
                        >
                          <SelectTrigger className="h-7 text-xs w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monotone">Monotone</SelectItem>
                            <SelectItem value="linear">Linear</SelectItem>
                            <SelectItem value="step">Step</SelectItem>
                            <SelectItem value="natural">Natural</SelectItem>
                            <SelectItem value="basis">Basis</SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}

                    {(tsType === "area" || tsType === "bar") && (
                      <div className="flex items-center gap-1.5">
                        <Switch
                          id="ts-stacked"
                          checked={tsStacked}
                          onCheckedChange={setTsStacked}
                          className="scale-90"
                        />
                        <Label htmlFor="ts-stacked" className="text-xs">Stacked</Label>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                {tsType === "line" && (
                  <LineChart
                    data={MONTHLY_DATA}
                    config={MONTHLY_CONFIG}
                    lines={activeSeries}
                    xAxisKey="month"
                    curveType={tsCurve}
                    showDots={tsDots}
                    showGrid={tsGrid}
                    showLegend={tsLegend}
                    height={320}
                  />
                )}
                {tsType === "area" && (
                  <AreaChart
                    data={MONTHLY_DATA}
                    config={MONTHLY_CONFIG}
                    areas={activeSeries}
                    xAxisKey="month"
                    curveType={tsCurve}
                    stacked={tsStacked}
                    showGrid={tsGrid}
                    showLegend={tsLegend}
                    height={320}
                  />
                )}
                {tsType === "bar" && (
                  <BarChart
                    data={MONTHLY_DATA}
                    config={MONTHLY_CONFIG}
                    bars={activeSeries}
                    xAxisKey="month"
                    stacked={tsStacked}
                    showGrid={tsGrid}
                    showLegend={tsLegend}
                    height={320}
                  />
                )}
              </CardContent>
            </Card>
          </section>

          {/* ── Distribution ─────────────────────────────────────────────── */}
          <section className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold">Distribution</h2>
              <p className="text-sm text-muted-foreground">
                Categorical breakdowns — pie / donut and per-category bar.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Pie / Donut */}
              <Card>
                <CardHeader className="pb-2 border-b">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-sm font-semibold">Browser Market Share</CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        Monthly unique visitors by browser
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <Switch
                          id="pie-donut"
                          checked={pieDonut}
                          onCheckedChange={setPieDonut}
                          className="scale-75"
                        />
                        <span className="text-xs text-muted-foreground">Donut</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <Switch
                          id="pie-label"
                          checked={pieLabel}
                          onCheckedChange={setPieLabel}
                          className="scale-75"
                        />
                        <span className="text-xs text-muted-foreground">Labels</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <Switch
                          id="pie-legend"
                          checked={pieLegend}
                          onCheckedChange={setPieLegend}
                          className="scale-75"
                        />
                        <span className="text-xs text-muted-foreground">Legend</span>
                      </label>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <PieChart
                    data={BROWSER_DATA}
                    config={BROWSER_CONFIG}
                    nameKey="browser"
                    dataKey="visitors"
                    donut={pieDonut}
                    showLabel={pieLabel}
                    showLegend={pieLegend}
                    height={260}
                  />
                </CardContent>
              </Card>

              {/* Per-category bar */}
              <Card>
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-sm font-semibold">Platform Breakdown</CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Sessions by device category — each bar colored individually
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <SingleBarChart
                    data={PLATFORM_DATA}
                    config={PLATFORM_CONFIG}
                    height={260}
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ── Horizontal bar + Stacked area ────────────────────────────── */}
          <section className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold">Layout Variants</h2>
              <p className="text-sm text-muted-foreground">
                Horizontal bar for ranked lists, stacked area for part-to-whole over time.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Horizontal bar */}
              <Card>
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-sm font-semibold">Revenue by Channel</CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Horizontal layout — ideal for ranked comparisons
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <BarChart
                    data={[
                      { channel: "Direct", revenue: 48200, profit: 19400 },
                      { channel: "Organic", revenue: 34600, profit: 13800 },
                      { channel: "Paid", revenue: 22100, profit: 6600 },
                      { channel: "Referral", revenue: 15300, profit: 5800 },
                      { channel: "Social", revenue: 9400, profit: 2800 },
                    ]}
                    config={{
                      revenue: { label: "Revenue", color: "var(--color-chart-1)" },
                      profit: { label: "Profit", color: "var(--color-chart-2)" },
                    }}
                    bars={["revenue", "profit"]}
                    xAxisKey="channel"
                    layout="horizontal"
                    showLegend
                    height={260}
                  />
                </CardContent>
              </Card>

              {/* Stacked area */}
              <Card>
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-sm font-semibold">Cost Composition</CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Stacked area — profit vs expenses as proportion of revenue
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <AreaChart
                    data={MONTHLY_DATA}
                    config={{
                      profit: { label: "Profit", color: "var(--color-chart-2)" },
                      expenses: { label: "Expenses", color: "var(--color-chart-3)" },
                    }}
                    areas={["profit", "expenses"]}
                    xAxisKey="month"
                    stacked
                    fillOpacity={0.7}
                    showLegend
                    height={260}
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ── Radar + Scatter ───────────────────────────────────────────── */}
          <section className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold">Multi-dimensional</h2>
              <p className="text-sm text-muted-foreground">
                Radar for holistic scoring, scatter for correlation analysis.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Radar */}
              <Card>
                <CardHeader className="pb-2 border-b">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-sm font-semibold">Product Benchmarking</CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        Our product vs industry benchmark across 6 dimensions
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <Switch
                          id="radar-line"
                          checked={radarLineOnly}
                          onCheckedChange={setRadarLineOnly}
                          className="scale-75"
                        />
                        <span className="text-xs text-muted-foreground">Lines only</span>
                      </label>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground shrink-0">Fill</span>
                    <Slider
                      min={0}
                      max={60}
                      step={5}
                      value={[radarFillOpacity]}
                      onValueChange={([v]) => setRadarFillOpacity(v)}
                      className="w-28"
                      disabled={radarLineOnly}
                    />
                    <span className="text-xs text-muted-foreground w-6">{radarFillOpacity}%</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <RadarChart
                    data={RADAR_DATA}
                    config={RADAR_CONFIG}
                    radars={["product", "benchmark"]}
                    angleKey="subject"
                    lineOnly={radarLineOnly}
                    fillOpacity={radarFillOpacity / 100}
                    showLegend
                    height={300}
                  />
                </CardContent>
              </Card>

              {/* Scatter */}
              <Card>
                <CardHeader className="pb-2 border-b">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-sm font-semibold">Performance Correlation</CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        Effort vs output across three teams over 8 sprints
                      </CardDescription>
                    </div>
                    <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
                      <Switch
                        id="scatter-legend"
                        checked={scatterLegend}
                        onCheckedChange={setScatterLegend}
                        className="scale-75"
                      />
                      <span className="text-xs text-muted-foreground">Legend</span>
                    </label>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ScatterChart
                    series={SCATTER_SERIES}
                    config={SCATTER_CONFIG}
                    xAxisLabel="Effort (pts)"
                    yAxisLabel="Velocity"
                    showLegend={scatterLegend}
                    height={300}
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ── Composed ─────────────────────────────────────────────────── */}
          <section className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold">Composed Chart</h2>
              <p className="text-sm text-muted-foreground">
                Mix area, bars, and a reference line in a single canvas.
              </p>
            </div>

            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-sm font-semibold">Quarterly Performance vs Target</CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Revenue (area) · Profit (bars) · Target (line) — Q1 2023 → Q4 2024
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ComposedChart
                  data={COMPOSED_DATA}
                  config={COMPOSED_CONFIG}
                  elements={[
                    { type: "area", dataKey: "revenue", fillOpacity: 0.15, curveType: "monotone" },
                    { type: "bar", dataKey: "profit", radius: 3 },
                    { type: "line", dataKey: "target", curveType: "linear", showDots: true, strokeWidth: 2 },
                  ]}
                  xAxisKey="period"
                  showLegend
                  height={340}
                />
              </CardContent>
            </Card>
          </section>

          {/* ── Compact sparklines ───────────────────────────────────────── */}
          <section className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold">Compact Sparklines</h2>
              <p className="text-sm text-muted-foreground">
                Small embedded charts — no axes, no grid, no legend.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {(
                [
                  { key: "revenue", label: "Revenue trend", color: "var(--color-chart-1)" },
                  { key: "profit", label: "Profit trend", color: "var(--color-chart-2)" },
                  { key: "expenses", label: "Expense trend", color: "var(--color-chart-3)" },
                ] as const
              ).map(({ key, label, color }) => {
                const last = MONTHLY_DATA[MONTHLY_DATA.length - 1][key]
                const prev = MONTHLY_DATA[MONTHLY_DATA.length - 2][key]
                const up = last >= prev
                return (
                  <Card key={key} className="overflow-hidden">
                    <CardContent className="pt-4 pb-0">
                      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                      <p className="text-xl font-bold">{formatK(last)}</p>
                      <Badge
                        variant={up ? "secondary" : "outline"}
                        className="text-[10px] mt-1 mb-3"
                      >
                        {pct(last, prev).change}
                      </Badge>
                    </CardContent>
                    <LineChart
                      data={MONTHLY_DATA}
                      config={{ [key]: { label, color } }}
                      lines={[key]}
                      xAxisKey="month"
                      height={72}
                      showGrid={false}
                      showTooltip={false}
                      showLegend={false}
                      curveType="monotone"
                    />
                  </Card>
                )
              })}
            </div>
          </section>
        </TabsContent>

        {/* ── Markdown Tab ──────────────────────────────────────────────────── */}
        <TabsContent value="markdown" className="space-y-8">

          <section className="space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">MarkdownEditor</h2>
              <p className="text-sm text-muted-foreground">
                Full-featured editor — GFM, syntax highlighting, emoji, image upload support.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-muted/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="mode-select" className="text-sm font-medium shrink-0">
                  Layout mode
                </Label>
                <Select
                  value={editorMode}
                  onValueChange={(v) => setEditorMode(v as typeof editorMode)}
                >
                  <SelectTrigger id="mode-select" className="w-28 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tab">tab</SelectItem>
                    <SelectItem value="split">split</SelectItem>
                    <SelectItem value="auto">auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="height-select" className="text-sm font-medium shrink-0">
                  Height
                </Label>
                <Select
                  value={String(editorHeight)}
                  onValueChange={(v) => setEditorHeight(Number(v))}
                >
                  <SelectTrigger id="height-select" className="w-24 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="320">320 px</SelectItem>
                    <SelectItem value="480">480 px</SelectItem>
                    <SelectItem value="640">640 px</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="custom-plugin"
                  checked={showCustomPlugin}
                  onCheckedChange={setShowCustomPlugin}
                />
                <Label htmlFor="custom-plugin" className="text-sm">
                  Custom plugin demo
                </Label>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs">
                  {liveValue.length} chars
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setLiveValue(RICH_MARKDOWN)}
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={() =>
                    toast.success("Saved!", {
                      description: `${liveValue.length} characters saved.`,
                    })
                  }
                >
                  Save
                </Button>
              </div>
            </div>

            <MarkdownEditor
              value={liveValue}
              onChange={setLiveValue}
              mode={editorMode}
              height={editorHeight}
              plugins={customPlugins}
              placeholder="Start writing your markdown here..."
            />
          </section>

          <Separator />

          <section className="space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">MarkdownPreview</h2>
              <p className="text-sm text-muted-foreground">
                Read-only viewer — renders markdown with no editor chrome.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <MarkdownPreview value={PREVIEW_ONLY_MARKDOWN} />
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">Editor + Detached Preview</h2>
              <p className="text-sm text-muted-foreground">
                Compose the editor and preview independently.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Editor (mode="tab", height=300)
                </p>
                <MarkdownEditor
                  value={liveValue}
                  onChange={setLiveValue}
                  mode="tab"
                  height={300}
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Preview (MarkdownPreview)
                </p>
                <div className="h-[300px] overflow-y-auto rounded-lg border p-4">
                  <MarkdownPreview value={liveValue} />
                </div>
              </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">States</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Disabled</CardTitle>
                  <CardDescription>
                    Pass <code className="font-mono text-xs">disabled</code> to prevent all interaction.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MarkdownEditor
                    value={DISABLED_MARKDOWN}
                    onChange={() => undefined}
                    height={260}
                    mode="tab"
                    disabled
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Character Limit</CardTitle>
                  <CardDescription>
                    <code className="font-mono text-xs">maxLength=280</code> — useful for comments or short-form content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MarkdownEditor
                    value="Type something here... :pencil:"
                    onChange={() => undefined}
                    height={260}
                    mode="tab"
                    maxLength={280}
                    placeholder="Max 280 characters..."
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">Editor in a Dialog</h2>
              <p className="text-sm text-muted-foreground">
                Mount the editor inside any overlay.
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Markdown Editor</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Edit post</DialogTitle>
                  <DialogDescription>
                    Write your content in Markdown. Changes are not saved automatically.
                  </DialogDescription>
                </DialogHeader>
                <MarkdownEditor
                  value={liveValue}
                  onChange={setLiveValue}
                  mode="split"
                  height="calc(60vh - 6rem)"
                />
                <DialogFooter>
                  <Button variant="outline">Discard</Button>
                  <Button
                    onClick={() =>
                      toast.success("Post saved!", {
                        description: `${liveValue.length} characters`,
                      })
                    }
                  >
                    Save post
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
        </TabsContent>

        {/* ── Buttons Tab ───────────────────────────────────────────────────── */}
        <TabsContent value="buttons" className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🔔</Button>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Badges</h2>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </section>
        </TabsContent>

        {/* ── Cards Tab ─────────────────────────────────────────────────────── */}
        <TabsContent value="cards" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content goes here.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Name of your project" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="framework">Framework</Label>
                      <Select>
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="next">Next.js</SelectItem>
                          <SelectItem value="sveltekit">SvelteKit</SelectItem>
                          <SelectItem value="astro">Astro</SelectItem>
                          <SelectItem value="nuxt">Nuxt.js</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Accordion</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </TabsContent>

        {/* ── Data Tab ──────────────────────────────────────────────────────── */}
        <TabsContent value="data" className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Table</h2>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV-001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV-002</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Avatar</h2>
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </section>
        </TabsContent>

        {/* ── Feedback Tab ──────────────────────────────────────────────────── */}
        <TabsContent value="feedback" className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Dialog & Alert</h2>
              <div className="flex flex-wrap gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dialog-name" className="text-right">Name</Label>
                        <Input id="dialog-name" defaultValue="Pedro Duarte" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Toast & Tooltip</h2>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    toast("Event has been created", {
                      description: "Sunday, December 03, 2023 at 9:00 AM",
                      action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                      },
                    })
                  }
                >
                  Show Toast
                </Button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover Me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Progress & Skeleton</h2>
              <div className="space-y-4">
                <Progress value={33} />
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </TabsContent>

        {/* ── Forms Tab ─────────────────────────────────────────────────────── */}
        <TabsContent value="forms" className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Switch & Checkbox</h2>
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Radio Group</h2>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Option One</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Option Two</Label>
                </div>
              </RadioGroup>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Slider</h2>
              <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Calendar</h2>
              <div className="border rounded-md p-4 w-fit">
                <Calendar mode="single" className="rounded-md border" />
              </div>
            </section>
          </div>
        </TabsContent>
      </Tabs>

      <Toaster richColors />
    </div>
  )
}
