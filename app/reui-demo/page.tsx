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

// ── Sample content ──────────────────────────────────────────────────────────

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

// ── Page component ───────────────────────────────────────────────────────────

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

  // Add a custom plugin example: wrap ==text== in <mark>
  const customPlugins = useMemo<BytemdPlugin[]>(() => {
    if (!showCustomPlugin) return defaultPlugins
    const markPlugin: BytemdPlugin = {
      remark: (processor) =>
        // Demo: a no-op remark plugin showing the extension point
        processor.use(() => (tree: object) => tree),
    }
    return [...defaultPlugins, markPlugin]
  }, [defaultPlugins, showCustomPlugin])

  return (
    <div className="container mx-auto py-10 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">ReUI Component Showcase</h1>
        <p className="text-muted-foreground">
          A comprehensive demo of the installed ReUI components.
        </p>
      </div>

      <Tabs defaultValue="markdown" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
          <TabsTrigger value="buttons">Buttons & Inputs</TabsTrigger>
          <TabsTrigger value="cards">Cards & Layout</TabsTrigger>
          <TabsTrigger value="data">Data Display</TabsTrigger>
          <TabsTrigger value="feedback">Feedback & Overlay</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
        </TabsList>

        {/* ── Markdown Tab ──────────────────────────────────────────────── */}
        <TabsContent value="markdown" className="space-y-8">

          {/* 1. Interactive Editor */}
          <section className="space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">MarkdownEditor</h2>
              <p className="text-sm text-muted-foreground">
                Full-featured editor — GFM, syntax highlighting, emoji, image upload support.
              </p>
            </div>

            {/* Controls */}
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

          {/* 2. Preview-only viewer */}
          <section className="space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">MarkdownPreview</h2>
              <p className="text-sm text-muted-foreground">
                Read-only viewer — renders markdown with no editor chrome. Pass the same
                <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs font-mono">plugins</code>
                prop as the editor for consistent output.
              </p>
            </div>

            <div className="rounded-lg border p-6">
              <MarkdownPreview value={PREVIEW_ONLY_MARKDOWN} />
            </div>
          </section>

          <Separator />

          {/* 3. Live editor + detached preview side-by-side */}
          <section className="space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">Editor + Detached Preview</h2>
              <p className="text-sm text-muted-foreground">
                Compose the editor and preview independently. Useful for custom layouts — e.g. a
                dialog editor with a full-page preview panel.
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

          {/* 4. States */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">States</h2>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Disabled */}
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

              {/* maxLength */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Character Limit</CardTitle>
                  <CardDescription>
                    <code className="font-mono text-xs">maxLength=280</code> — useful for comments
                    or short-form content. ByteMD shows the counter in the status bar.
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

          {/* 5. Dialog editor */}
          <section className="space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">Editor in a Dialog</h2>
              <p className="text-sm text-muted-foreground">
                Mount the editor inside any overlay. Uses{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">height="calc(60vh - 6rem)"</code>
                {" "}for flexible sizing.
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

          <Separator />

          {/* 6. Upload images demo */}
          <section className="space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">Custom Image Upload</h2>
              <p className="text-sm text-muted-foreground">
                Pass <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">uploadImages</code> to
                handle image drag-and-drop or the toolbar upload button. The handler receives{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">File[]</code> and
                returns <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">{"{ title, url, alt? }[]"}</code>.
              </p>
            </div>

            <MarkdownEditor
              value="Drop an image here or click the image button in the toolbar :camera:"
              onChange={() => undefined}
              height={200}
              mode="tab"
              uploadImages={async (files) => {
                // Simulate upload — in production, call your UploadThing/S3 handler
                await new Promise((r) => setTimeout(r, 600))
                toast.success(`Uploaded ${files.length} file(s)`)
                return files.map((f) => ({
                  title: f.name,
                  url: URL.createObjectURL(f),
                  alt: f.name,
                }))
              }}
            />
          </section>
        </TabsContent>

        {/* ── Original tabs (unchanged) ──────────────────────────────────── */}
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
                        <Input id="dialog-name" value="Pedro Duarte" className="col-span-3" />
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
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
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
