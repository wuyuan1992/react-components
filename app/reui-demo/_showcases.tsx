"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Toggle } from "@/components/ui/toggle"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { ThemeSwitcher } from "@/components/features/theme/ThemeSwitcher"
import {
  LineChart,
  AreaChart,
  BarChart,
  PieChart,
} from "@/components/features/charts"
import { MarkdownEditor } from "@/components/features/markdown/MarkdownEditor"
import { MarkdownPreview } from "@/components/features/markdown/MarkdownPreview"
import { FlowCanvas, type Node, type Edge } from "@/components/features/flow"
import { DataTable } from "@/components/features/table"
import { FormWrapper, TextField, TextareaField, SelectField, CheckboxField, SwitchField, DatePickerField, TagsField } from "@/components/features/form"
import { Tree, DirectoryTree, CheckboxTree, type TreeNode } from "@/components/features/tree"
import { CodeEditor, DiffCodeEditor } from "@/components/features/editor"
import { PdfViewer, type PdfViewerRef } from "@/components/features/pdf"
import { VirtualList, InfiniteScrollList } from "@/components/features/virtual-list"
import { GanttWithToolbar, type GanttTask } from "@/components/features/gantt"
import { FlameGraph, type FlameGraphNode, type FlameGraphRef } from "@/components/features/flamegraph"
import { Terminal as TerminalEmulator, type TerminalRef } from "@/components/features/terminal"
import { SortableList, KanbanBoard, type KanbanColumn } from "@/components/features/dnd"
import type { UniqueIdentifier } from "@dnd-kit/core"
import { z } from "zod"
import type { ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import {
  AlertCircle,
  ChevronRight,
  Mail,
  Plus,
  Search,
  Settings,
  Terminal as TerminalIcon,
  Trash,
  User,
} from "lucide-react"

// Types
interface PropDef {
  name: string
  type: string
  default?: string
  description: string
}

interface NavItem {
  id: string
  label: string
}

interface NavSection {
  id: string
  label: string
  items: NavItem[]
}

// Helper Components
function PageHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  )
}

function PropTable({ props: propsList }: { props: PropDef[] }) {
  return (
    <div className="my-6 rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Prop</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">Default</TableHead>
            <TableHead className="font-semibold">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {propsList.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="font-mono text-sm text-primary">
                {prop.name}
              </TableCell>
              <TableCell className="font-mono text-sm">{prop.type}</TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {prop.default || "-"}
              </TableCell>
              <TableCell className="text-sm">{prop.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function ExampleSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      <div className="rounded-lg border p-4 bg-card">{children}</div>
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto mt-3 font-mono">
      <code>{code}</code>
    </pre>
  )
}

// Navigation Data
export const NAV_SECTIONS: NavSection[] = [
  {
    id: "basic",
    label: "Basic Components",
    items: [
      { id: "button", label: "Button" },
      { id: "badge", label: "Badge" },
      { id: "avatar", label: "Avatar" },
      { id: "input", label: "Input" },
      { id: "textarea", label: "Textarea" },
      { id: "select", label: "Select" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio", label: "Radio Group" },
      { id: "switch", label: "Switch" },
      { id: "slider", label: "Slider" },
      { id: "progress", label: "Progress" },
      { id: "tabs", label: "Tabs" },
      { id: "accordion", label: "Accordion" },
      { id: "alert", label: "Alert" },
      { id: "dialog", label: "Dialog" },
      { id: "sheet", label: "Sheet" },
      { id: "popover", label: "Popover" },
      { id: "tooltip", label: "Tooltip" },
      { id: "card", label: "Card" },
      { id: "table", label: "Table" },
      { id: "separator", label: "Separator" },
      { id: "skeleton", label: "Skeleton" },
      { id: "spinner", label: "Spinner" },
      { id: "toggle", label: "Toggle" },
      { id: "kbd", label: "Keyboard" },
      { id: "empty", label: "Empty" },
      { id: "calendar", label: "Calendar" },
      { id: "dropdown", label: "Dropdown Menu" },
      { id: "collapsible", label: "Collapsible" },
      { id: "otp", label: "Input OTP" },
    ],
  },
  {
    id: "feature",
    label: "Feature Components",
    items: [
      { id: "theme", label: "Theme" },
      { id: "charts", label: "Charts" },
      { id: "markdown", label: "Markdown" },
      { id: "flow", label: "Flow" },
      { id: "data-table", label: "Data Table" },
      { id: "form", label: "Form" },
      { id: "tree", label: "Tree" },
      { id: "editor", label: "Code Editor" },
      { id: "pdf", label: "PDF Viewer" },
      { id: "virtual-list", label: "Virtual List" },
      { id: "gantt", label: "Gantt Chart" },
      { id: "flame-graph", label: "Flame Graph" },
      { id: "terminal", label: "Terminal" },
      { id: "dnd", label: "Drag & Drop" },
    ],
  },
  {
    id: "blocks",
    label: "Blocks",
    items: [
      { id: "dashboard", label: "Dashboard" },
    ],
  },
]

// Component Views
function ButtonView() {
  return (
    <div>
      <PageHeader
        title="Button"
        description="Triggers an action or event, such as submitting a form or opening a dialog."
      />
      <ExampleSection title="Variants">
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <CodeBlock
          code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
        />
      </ExampleSection>
      <ExampleSection title="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Plus className="size-4" /></Button>
        </div>
        <CodeBlock
          code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus className="size-4" /></Button>`}
        />
      </ExampleSection>
      <ExampleSection title="With Icons">
        <div className="flex flex-wrap gap-3">
          <Button><Mail className="mr-2 size-4" />Login with Email</Button>
          <Button variant="outline"><Search className="mr-2 size-4" />Search</Button>
          <Button variant="destructive"><Trash className="mr-2 size-4" />Delete</Button>
        </div>
        <CodeBlock
          code={`<Button><Mail className="mr-2 size-4" />Login with Email</Button>
<Button variant="outline"><Search className="mr-2 size-4" />Search</Button>`}
        />
      </ExampleSection>
      <ExampleSection title="States">
        <div className="flex flex-wrap gap-3">
          <Button disabled>Disabled</Button>
          <Button className="opacity-70 pointer-events-none">
            <Spinner className="size-4 mr-2" />
            Loading
          </Button>
        </div>
        <CodeBlock code={`<Button disabled>Disabled</Button>`} />
      </ExampleSection>
      <PropTable
        props={[
          { name: "variant", type: "string", default: '"default"', description: "Button style variant" },
          { name: "size", type: "string", default: '"default"', description: "Button size" },
          { name: "loading", type: "boolean", default: "false", description: "Show loading spinner" },
          { name: "asChild", type: "boolean", default: "false", description: "Render as child element" },
        ]}
      />
    </div>
  )
}

function BadgeView() {
  return (
    <div>
      <PageHeader title="Badge" description="Displays a badge or label." />
      <ExampleSection title="Variants">
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <CodeBlock
          code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>`}
        />
      </ExampleSection>
      <PropTable
        props={[
          { name: "variant", type: "string", default: '"default"', description: "Badge style variant" },
        ]}
      />
    </div>
  )
}

function AvatarView() {
  return (
    <div>
      <PageHeader title="Avatar" description="Displays a user avatar with fallback." />
      <ExampleSection title="Sizes">
        <div className="flex items-center gap-4">
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <CodeBlock
          code={`<Avatar className="size-8">
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}
        />
      </ExampleSection>
      <PropTable
        props={[
          { name: "src", type: "string", description: "Image source URL" },
          { name: "fallback", type: "ReactNode", description: "Fallback content when image fails" },
        ]}
      />
    </div>
  )
}

function InputView() {
  return (
    <div>
      <PageHeader title="Input" description="Displays a form input field." />
      <ExampleSection title="Basic">
        <div className="space-y-3 max-w-sm">
          <Input placeholder="Enter your email" />
          <Input type="password" placeholder="Password" />
          <Input disabled placeholder="Disabled input" />
        </div>
        <CodeBlock
          code={`<Input placeholder="Enter your email" />
<Input type="password" placeholder="Password" />
<Input disabled placeholder="Disabled input" />`}
        />
      </ExampleSection>
      <ExampleSection title="With Label">
        <div className="space-y-2 max-w-sm">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <CodeBlock
          code={`<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="you@example.com" />`}
        />
      </ExampleSection>
      <PropTable
        props={[
          { name: "type", type: "string", default: '"text"', description: "Input type" },
          { name: "placeholder", type: "string", description: "Placeholder text" },
          { name: "disabled", type: "boolean", default: "false", description: "Disable input" },
        ]}
      />
    </div>
  )
}

function TextareaView() {
  return (
    <div>
      <PageHeader title="Textarea" description="Displays a multi-line text input." />
      <ExampleSection title="Basic">
        <div className="max-w-sm">
          <Textarea placeholder="Type your message here." rows={4} />
        </div>
        <CodeBlock code={`<Textarea placeholder="Type your message here." rows={4} />`} />
      </ExampleSection>
      <PropTable
        props={[
          { name: "rows", type: "number", default: "3", description: "Number of visible text lines" },
          { name: "placeholder", type: "string", description: "Placeholder text" },
        ]}
      />
    </div>
  )
}

function SelectView() {
  return (
    <div>
      <PageHeader title="Select" description="Displays a list of options for the user to pick from." />
      <ExampleSection title="Basic">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
        <CodeBlock
          code={`<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>`}
        />
      </ExampleSection>
      <PropTable
        props={[
          { name: "value", type: "string", description: "Controlled selected value" },
          { name: "defaultValue", type: "string", description: "Default selected value" },
          { name: "onValueChange", type: "function", description: "Callback when value changes" },
        ]}
      />
    </div>
  )
}

function CheckboxView() {
  const [checked, setChecked] = useState(true)
  return (
    <div>
      <PageHeader title="Checkbox" description="A control that allows the user to toggle options." />
      <ExampleSection title="Basic">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={checked} onCheckedChange={(v) => setChecked(!!v)} />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <CodeBlock
          code={`<Checkbox id="terms" checked={checked} onCheckedChange={setChecked} />
<Label htmlFor="terms">Accept terms and conditions</Label>`}
        />
      </ExampleSection>
      <PropTable
        props={[
          { name: "checked", type: "boolean", description: "Checked state" },
          { name: "onCheckedChange", type: "function", description: "Callback when checked changes" },
        ]}
      />
    </div>
  )
}

function RadioGroupView() {
  return (
    <div>
      <PageHeader title="Radio Group" description="A set of checkable buttons with no two pressed." />
      <ExampleSection title="Basic">
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="r1" />
            <Label htmlFor="r1">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="r2" />
            <Label htmlFor="r2">Option Two</Label>
          </div>
        </RadioGroup>
        <CodeBlock
          code={`<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="r1" />
    <Label htmlFor="r1">Option One</Label>
  </div>
</RadioGroup>`}
        />
      </ExampleSection>
    </div>
  )
}

function SwitchView() {
  const [enabled, setEnabled] = useState(false)
  return (
    <div>
      <PageHeader title="Switch" description="A control to toggle between checked and unchecked." />
      <ExampleSection title="Basic">
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" checked={enabled} onCheckedChange={setEnabled} />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
        <p className="text-sm text-muted-foreground mt-2">Status: {enabled ? "On" : "Off"}</p>
        <CodeBlock
          code={`<Switch id="airplane-mode" checked={enabled} onCheckedChange={setEnabled} />
<Label htmlFor="airplane-mode">Airplane Mode</Label>`}
        />
      </ExampleSection>
    </div>
  )
}

function SliderView() {
  const [value, setValue] = useState([50])
  return (
    <div>
      <PageHeader title="Slider" description="An input to select a value from a range." />
      <ExampleSection title="Basic">
        <div className="w-full max-w-sm space-y-4">
          <Slider value={value} onValueChange={setValue} max={100} step={1} />
          <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
        </div>
        <CodeBlock
          code={`<Slider value={value} onValueChange={setValue} max={100} step={1} />`}
        />
      </ExampleSection>
    </div>
  )
}

function ProgressView() {
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

function TabsView() {
  return (
    <div>
      <PageHeader title="Tabs" description="A set of layered sections of content." />
      <ExampleSection title="Basic">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Manage your account settings.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
        <CodeBlock
          code={`<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">...</TabsContent>
</Tabs>`}
        />
      </ExampleSection>
    </div>
  )
}

function AccordionView() {
  return (
    <div>
      <PageHeader title="Accordion" description="A vertically stacked set of interactive sections." />
      <ExampleSection title="Basic">
        <Accordion type="single" collapsible className="w-full max-w-sm">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>Yes. It comes with default styles.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <CodeBlock
          code={`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        />
      </ExampleSection>
    </div>
  )
}

function AlertView() {
  return (
    <div>
      <PageHeader title="Alert" description="Displays a callout for user attention." />
      <ExampleSection title="Variants">
        <div className="space-y-3">
          <Alert>
            <TerminalIcon className="size-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Your session has expired.</AlertDescription>
          </Alert>
        </div>
        <CodeBlock
          code={`<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components.</AlertDescription>
</Alert>
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
</Alert>`}
        />
      </ExampleSection>
    </div>
  )
}

function DialogView() {
  return (
    <div>
      <PageHeader title="Dialog" description="A modal dialog that overlays the page." />
      <ExampleSection title="Basic">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Make changes to your profile here.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input placeholder="Enter your name" />
            </div>
            <DialogFooter>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <CodeBlock
          code={`<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>`}
        />
      </ExampleSection>
    </div>
  )
}

function AlertDialogView() {
  return (
    <div>
      <PageHeader title="Alert Dialog" description="A modal dialog for confirmations." />
      <ExampleSection title="Basic">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <CodeBlock
          code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>...</AlertDialogContent>
</AlertDialog>`}
        />
      </ExampleSection>
    </div>
  )
}

function SheetView() {
  return (
    <div>
      <PageHeader title="Sheet" description="Extends the Dialog component to slide in." />
      <ExampleSection title="Basic">
        <Sheet>
          <SheetTrigger asChild>
            <Button>Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>Make changes to your profile.</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <Input placeholder="Name" />
            </div>
          </SheetContent>
        </Sheet>
        <CodeBlock
          code={`<Sheet>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent side="right">...</SheetContent>
</Sheet>`}
        />
      </ExampleSection>
    </div>
  )
}

function PopoverView() {
  return (
    <div>
      <PageHeader title="Popover" description="Displays content in a floating panel." />
      <ExampleSection title="Basic">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">Set the dimensions.</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <CodeBlock
          code={`<Popover>
  <PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>`}
        />
      </ExampleSection>
    </div>
  )
}

function TooltipView() {
  return (
    <div>
      <PageHeader title="Tooltip" description="A popup that displays info on hover." />
      <ExampleSection title="Basic">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <CodeBlock
          code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button>Hover</Button></TooltipTrigger>
    <TooltipContent>Add to library</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
        />
      </ExampleSection>
    </div>
  )
}

function HoverCardView() {
  return (
    <div>
      <PageHeader title="Hover Card" description="A card that appears on hover." />
      <ExampleSection title="Basic">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-64">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">The React Framework.</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <CodeBlock
          code={`<HoverCard>
  <HoverCardTrigger asChild><Button variant="link">@nextjs</Button></HoverCardTrigger>
  <HoverCardContent>...</HoverCardContent>
</HoverCard>`}
        />
      </ExampleSection>
    </div>
  )
}

function CardView() {
  return (
    <div>
      <PageHeader title="Card" description="Displays a card with header, content, and footer." />
      <ExampleSection title="Basic">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one click.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input placeholder="Project name" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
        <CodeBlock
          code={`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>`}
        />
      </ExampleSection>
    </div>
  )
}

function TableView() {
  const invoices = [
    { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
    { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  ]
  return (
    <div>
      <PageHeader title="Table" description="Displays data in a table format." />
      <ExampleSection title="Basic">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.invoice}>
                <TableCell className="font-medium">{inv.invoice}</TableCell>
                <TableCell>{inv.status}</TableCell>
                <TableCell>{inv.method}</TableCell>
                <TableCell className="text-right">{inv.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CodeBlock
          code={`<Table>
  <TableHeader>
    <TableRow><TableHead>Invoice</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>INV001</TableCell></TableRow>
  </TableBody>
</Table>`}
        />
      </ExampleSection>
    </div>
  )
}

function SeparatorView() {
  return (
    <div>
      <PageHeader title="Separator" description="A visual divider between sections." />
      <ExampleSection title="Basic">
        <div className="space-y-4">
          <div>
            <p className="text-sm">Section 1</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm">Section 2</p>
          </div>
          <Separator orientation="vertical" className="h-6 mx-2 inline-block" />
          <span className="text-sm">Inline text</span>
        </div>
        <CodeBlock code={`<Separator />\n<Separator orientation="vertical" />`} />
      </ExampleSection>
    </div>
  )
}

function SkeletonView() {
  return (
    <div>
      <PageHeader title="Skeleton" description="A placeholder for loading content." />
      <ExampleSection title="Basic">
        <div className="flex items-center space-x-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <CodeBlock
          code={`<Skeleton className="size-12 rounded-full" />
<Skeleton className="h-4 w-[250px]" />`}
        />
      </ExampleSection>
    </div>
  )
}

function SpinnerView() {
  return (
    <div>
      <PageHeader title="Spinner" description="A loading spinner indicator." />
      <ExampleSection title="Basic">
        <div className="flex items-center gap-4">
          <Spinner className="size-4" />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </div>
        <CodeBlock code={`<Spinner className="size-4" />\n<Spinner className="size-8" />`} />
      </ExampleSection>
    </div>
  )
}

function ToggleView() {
  const [pressed, setPressed] = useState(false)
  return (
    <div>
      <PageHeader title="Toggle" description="A two-state button that can be on or off." />
      <ExampleSection title="Basic">
        <div className="flex gap-2">
          <Toggle aria-label="Toggle bold" pressed={pressed} onPressedChange={setPressed}>
            <span className="font-bold">B</span>
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle italic">
            <span className="italic">I</span>
          </Toggle>
        </div>
        <CodeBlock code={`<Toggle pressed={pressed} onPressedChange={setPressed}>B</Toggle>`} />
      </ExampleSection>
    </div>
  )
}

function KbdView() {
  return (
    <div>
      <PageHeader title="Keyboard" description="Keyboard key display component." />
      <ExampleSection title="Basic">
        <div className="flex items-center gap-4">
          <Kbd>⌘</Kbd>
          <Kbd>Ctrl</Kbd>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>
        <CodeBlock code={`<Kbd>⌘</Kbd>\n<KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>`} />
      </ExampleSection>
    </div>
  )
}

function EmptyView() {
  return (
    <div>
      <PageHeader title="Empty" description="A placeholder for empty states." />
      <ExampleSection title="Basic">
        <Empty className="w-[300px] h-[200px] border rounded-lg">
          <EmptyHeader>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>Try searching for something else.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline"><Plus className="mr-2 size-4" />Add new</Button>
          </EmptyContent>
        </Empty>
        <CodeBlock
          code={`<Empty>
  <EmptyHeader>
    <EmptyTitle>No results</EmptyTitle>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add new</Button>
  </EmptyContent>
</Empty>`}
        />
      </ExampleSection>
    </div>
  )
}

function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div>
      <PageHeader title="Calendar" description="A date picker component." />
      <ExampleSection title="Basic">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <CodeBlock code={`<Calendar mode="single" selected={date} onSelect={setDate} />`} />
      </ExampleSection>
    </div>
  )
}

function DropdownMenuView() {
  return (
    <div>
      <PageHeader title="Dropdown Menu" description="A menu of actions or options." />
      <ExampleSection title="Basic">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CodeBlock
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild><Button>Open</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        />
      </ExampleSection>
    </div>
  )
}

function CollapsibleView() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <PageHeader title="Collapsible" description="An interactive component to show/hide content." />
      <ExampleSection title="Basic">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Pedigree</span>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronRight className={cn("size-4 transition-transform", isOpen && "rotate-90")} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Hidden content revealed here.</p>
          </CollapsibleContent>
        </Collapsible>
        <CodeBlock
          code={`<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>`}
        />
      </ExampleSection>
    </div>
  )
}

function InputOTPView() {
  const [otp, setOtp] = useState("")
  return (
    <div>
      <PageHeader title="Input OTP" description="A one-time password input component." />
      <ExampleSection title="Basic">
        <div className="space-y-2">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">Value: {otp || "-"}</p>
        </div>
        <CodeBlock
          code={`<InputOTP maxLength={6} value={otp} onChange={setOtp}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
  </InputOTPGroup>
</InputOTP>`}
        />
      </ExampleSection>
    </div>
  )
}

// Feature Component Views
function ThemeView() {
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

function ChartsView() {
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
function FlowView() {
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

function MarkdownView() {
  const [content, setContent] = useState(`# Markdown Editor

This is a **markdown** editor with *live preview*.

## Features

- GFM support (tables, task lists)
- Syntax highlighting
- Emoji support :smile:

\`\`\`typescript
const greeting = "Hello, World!"
console.log(greeting)
\`\`\`

| Feature | Status |
|---------|--------|
| GFM     | ✅     |
| Highlight | ✅   |
`)
  return (
    <div>
      <PageHeader title="Markdown" description="Markdown editor and preview components." />
      <ExampleSection title="Editor">
        <MarkdownEditor
          value={content}
          onChange={setContent}
          height={300}
          placeholder="Start writing..."
        />
        <CodeBlock
          code={`<MarkdownEditor
  value={content}
  onChange={setContent}
  height={300}
  placeholder="Start writing..."
/>`}
        />
      </ExampleSection>
      <ExampleSection title="Preview">
        <div className="rounded-lg border p-4">
          <MarkdownPreview value={content} />
        </div>
        <CodeBlock code={`<MarkdownPreview value={content} />`} />
      </ExampleSection>
      <PropTable
        props={[
          { name: "value", type: "string", description: "Markdown content" },
          { name: "onChange", type: "(value: string) => void", description: "Change callback (editor only)" },
          { name: "height", type: "number | string", default: "500", description: "Editor height" },
          { name: "mode", type: '"split" | "tab" | "auto"', default: '"auto"', description: "Layout mode" },
        ]}
      />
    </div>
  )
}

function DashboardView() {
  return (
    <div>
      <PageHeader title="Dashboard Block" description="Pre-built dashboard layout example." />
      <ExampleSection title="Stats Cards">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-3xl">$45,231</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Subscriptions</CardDescription>
              <CardTitle className="text-3xl">+2,350</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Sales</CardDescription>
              <CardTitle className="text-3xl">+12,234</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
        </div>
      </ExampleSection>
      <ExampleSection title="Recent Transactions">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell><Badge>Paid</Badge></TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV002</TableCell>
              <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
              <TableCell className="text-right">$150.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV003</TableCell>
              <TableCell><Badge variant="destructive">Unpaid</Badge></TableCell>
              <TableCell className="text-right">$350.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ExampleSection>
    </div>
  )
}

// DataTable View
function DataTableView() {
  interface User {
    id: string
    name: string
    email: string
    role: string
    status: string
    createdAt: Date
  }

  const users: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "admin", status: "active", createdAt: new Date("2024-01-15") },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user", status: "active", createdAt: new Date("2024-02-20") },
    { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "user", status: "inactive", createdAt: new Date("2024-03-10") },
    { id: "4", name: "Alice Brown", email: "alice@example.com", role: "guest", status: "pending", createdAt: new Date("2024-04-05") },
    { id: "5", name: "Charlie Davis", email: "charlie@example.com", role: "user", status: "active", createdAt: new Date("2024-05-12") },
  ]

  const columns = [
    { accessorKey: "name", header: "Name", cell: ({ getValue }: { getValue: () => unknown }) => <span className="font-medium">{String(getValue())}</span> },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ getValue }: { getValue: () => unknown }) => {
        const role = String(getValue())
        const variant = role === "admin" ? "default" : role === "user" ? "secondary" : "outline"
        return <Badge variant={variant}>{role}</Badge>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }: { getValue: () => unknown }) => {
        const status = String(getValue())
        const colorClass = status === "active" ? "bg-success text-success-foreground" : status === "inactive" ? "bg-destructive text-destructive-foreground" : "bg-warning text-warning-foreground"
        return <Badge className={colorClass}>{status}</Badge>
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ getValue }: { getValue: () => unknown }) => (getValue() as Date).toLocaleDateString(),
    },
  ]

  return (
    <div>
      <PageHeader title="Data Table" description="Full-featured data table with sorting, filtering, pagination, and selection powered by TanStack Table." />
      <ExampleSection title="Users Table">
        <DataTable
          columns={columns}
          data={users}
          searchable
          searchPlaceholder="Search users..."
          pagination
          selectable
          getRowId={(row) => row.id}
        />
        <CodeBlock
          code={`import { DataTable } from "@/components/features/table"
import type { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
]

<DataTable
  columns={columns}
  data={users}
  searchable
  pagination
  selectable
/>`}
        />
      </ExampleSection>
    </div>
  )
}

// Form View
function FormView() {
  const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    bio: z.string().max(200).optional(),
    role: z.string().min(1, "Please select a role"),
    notifications: z.boolean().default(false),
    public: z.boolean().default(true),
    birthDate: z.string().optional(),
    tags: z.array(z.string()).optional(),
  })

  type UserForm = z.infer<typeof userSchema>

  return (
    <div>
      <PageHeader title="Form" description="Form components with react-hook-form + zod validation." />
      <ExampleSection title="User Form">
        <div className="max-w-md">
          <FormWrapper
            schema={userSchema}
            onSubmit={async (data: UserForm) => {
              console.log(data)
            }}
            submitText="Create User"
            defaultValues={{
              name: "",
              email: "",
              role: "",
              notifications: false,
              public: true,
            }}
          >
            <TextField name="name" label="Name" required placeholder="John Doe" />
            <TextField name="email" label="Email" type="email" required placeholder="john@example.com" />
            <TextareaField name="bio" label="Bio" placeholder="Tell us about yourself..." rows={3} />
            <SelectField
              name="role"
              label="Role"
              required
              placeholder="Select a role"
              options={[
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
                { value: "guest", label: "Guest" },
              ]}
            />
            <DatePickerField name="birthDate" label="Birth Date" />
            <TagsField name="tags" label="Tags" placeholder="Type and press Enter..." />
            <SwitchField name="notifications" label="Email Notifications" description="Receive email updates" />
            <CheckboxField name="public" label="Public Profile" description="Make your profile visible to others" />
          </FormWrapper>
        </div>
        <CodeBlock
          code={`import { FormWrapper, TextField, SelectField } from "@/components/features/form"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(1),
})

type FormData = z.infer<typeof schema>

<FormWrapper
  schema={schema}
  onSubmit={async (data) => console.log(data)}
  submitText="Submit"
>
  <TextField name="name" label="Name" required />
  <TextField name="email" label="Email" type="email" required />
  <SelectField name="role" label="Role" options={[...]} />
</FormWrapper>`}
        />
      </ExampleSection>
    </div>
  )
}

// Tree View
function TreeView() {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(["src"])
  const [checkedKeys, setCheckedKeys] = useState<string[]>(["src/components/ui/button.tsx"])

  const treeData: TreeNode[] = [
    {
      key: "src",
      title: "src",
      children: [
        {
          key: "src/components",
          title: "components",
          children: [
            { key: "src/components/ui", title: "ui", children: [{ key: "src/components/ui/button.tsx", title: "button.tsx" }, { key: "src/components/ui/input.tsx", title: "input.tsx" }] },
            { key: "src/components/features", title: "features", children: [{ key: "src/components/features/form", title: "form" }, { key: "src/components/features/table", title: "table" }] },
          ],
        },
        { key: "src/lib", title: "lib", children: [{ key: "src/lib/utils.ts", title: "utils.ts" }] },
        { key: "src/app", title: "app", children: [{ key: "src/app/layout.tsx", title: "layout.tsx" }, { key: "src/app/page.tsx", title: "page.tsx" }] },
      ],
    },
    { key: "package.json", title: "package.json" },
    { key: "tsconfig.json", title: "tsconfig.json" },
  ]

  return (
    <div>
      <PageHeader title="Tree" description="Tree components with selection, checkboxes, and file/folder icons powered by rc-tree." />
      <ExampleSection title="Directory Tree">
        <div className="max-w-sm border rounded-lg p-4">
          <DirectoryTree treeData={treeData} expandedKeys={expandedKeys} onExpand={(keys) => setExpandedKeys(keys as string[])} />
        </div>
      </ExampleSection>
      <ExampleSection title="Checkbox Tree">
        <div className="max-w-sm border rounded-lg p-4">
          <CheckboxTree treeData={treeData} checkedKeys={checkedKeys} onCheck={(keys) => setCheckedKeys(keys)} expandedKeys={expandedKeys} onExpand={(keys) => setExpandedKeys(keys as string[])} />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Checked: {checkedKeys.join(", ") || "None"}</p>
      </ExampleSection>
      <CodeBlock
        code={`import { DirectoryTree, CheckboxTree } from "@/components/features/tree"

const treeData = [
  {
    key: "src",
    title: "src",
    children: [
      { key: "src/app", title: "app" },
      { key: "src/lib", title: "lib" },
    ],
  },
]

// Directory tree with file/folder icons
<DirectoryTree treeData={treeData} />

// Checkbox tree for selection
<CheckboxTree
  treeData={treeData}
  checkedKeys={checkedKeys}
  onCheck={(keys) => setCheckedKeys(keys)}
/>`}
      />
    </div>
  )
}

// Code Editor View
function EditorView() {
  const [code, setCode] = useState(`// Welcome to Monaco Editor
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  )
}

export default Counter
`)

  const originalCode = `const greeting = "Hello"`
  const modifiedCode = `const greeting = "Hello, World!"`

  return (
    <div>
      <PageHeader title="Code Editor" description="Monaco Editor - VS Code's editor engine with syntax highlighting, IntelliSense, and more." />
      <ExampleSection title="Code Editor">
        <div className="h-[400px]">
          <CodeEditor
            value={code}
            onChange={setCode}
            language="typescript"
            theme="vs-dark"
            height="100%"
          />
        </div>
        <CodeBlock
          code={`import { CodeEditor } from "@/components/features/editor"

<CodeEditor
  value={code}
  onChange={setCode}
  language="typescript"
  theme="vs-dark"
  height="400px"
  minimap={true}
  fontSize={14}
/>`}
        />
      </ExampleSection>
      <ExampleSection title="Diff Editor">
        <div className="h-[300px]">
          <DiffCodeEditor
            original={originalCode}
            modified={modifiedCode}
            language="typescript"
            theme="vs-dark"
            height="100%"
          />
        </div>
      </ExampleSection>
    </div>
  )
}

// PDF Viewer View
function PdfView() {
  const [currentPage, setCurrentPage] = useState(1)
  const viewerRef = useRef<PdfViewerRef>(null)

  // Sample PDF URL
  const samplePdf = "https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf"

  return (
    <div>
      <PageHeader title="PDF Viewer" description="PDF document viewer with navigation, zoom, and text selection." />
      <ExampleSection title="PDF Viewer with Toolbar">
        <div className="h-[500px]">
          <PdfViewer
            ref={viewerRef}
            file={samplePdf}
            height="100%"
            onPageChange={setCurrentPage}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Current page: {currentPage}</p>
        <CodeBlock
          code={`import { PdfViewer, type PdfViewerRef } from "@/components/features/pdf"

const viewerRef = useRef<PdfViewerRef>(null)

<PdfViewer
  ref={viewerRef}
  file="/path/to/document.pdf"
  height="500px"
  showToolbar={true}
  onPageChange={(page) => console.log(page)}
/>

// Imperative API
viewerRef.current?.goToPage(5)
viewerRef.current?.zoomIn()
viewerRef.current?.zoomOut()`}
        />
      </ExampleSection>
    </div>
  )
}

// Virtual List View
function VirtualListView() {
  const [items] = useState(() =>
    Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Item ${i + 1}`,
      value: Math.floor(Math.random() * 1000),
    }))
  )

  const [infiniteItems, setInfiniteItems] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({ id: i, name: `Infinite Item ${i + 1}` }))
  )
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = useCallback(() => {
    if (isLoading) return
    setIsLoading(true)
    setTimeout(() => {
      const newItems = Array.from({ length: 20 }, (_, i) => ({
        id: infiniteItems.length + i,
        name: `Infinite Item ${infiniteItems.length + i + 1}`,
      }))
      setInfiniteItems((prev) => [...prev, ...newItems])
      setIsLoading(false)
    }, 1000)
  }, [infiniteItems.length, isLoading])

  return (
    <div>
      <PageHeader title="Virtual List" description="High-performance virtualized list for rendering large datasets with @tanstack/react-virtual." />
      <ExampleSection title="Virtual List (10,000 items)">
        <div className="h-[300px] border rounded-lg">
          <VirtualList
            items={items}
            estimateSize={50}
            height="100%"
            renderItem={(item, index) => (
              <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3 hover:bg-[var(--color-accent)]">
                <span className="font-medium">{item.name}</span>
                <Badge variant="secondary">{item.value}</Badge>
              </div>
            )}
          />
        </div>
        <CodeBlock
          code={`import { VirtualList } from "@/components/features/virtual-list"

<VirtualList
  items={items}
  estimateSize={50}
  height="300px"
  renderItem={(item, index) => (
    <div className="p-3 border-b">
      {item.name}
    </div>
  )}
/>`}
        />
      </ExampleSection>
      <ExampleSection title="Infinite Scroll">
        <div className="h-[300px] border rounded-lg">
          <InfiniteScrollList
            items={infiniteItems}
            isLoading={isLoading}
            hasMore={infiniteItems.length < 100}
            onLoadMore={loadMore}
            height="100%"
            renderItem={(item) => (
              <div className="flex items-center border-b border-[var(--color-border)] px-4 py-3 hover:bg-[var(--color-accent)]">
                {item.name}
              </div>
            )}
          />
        </div>
      </ExampleSection>
    </div>
  )
}

// Gantt Chart View
function GanttView() {
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

// Flame Graph View
function FlameGraphDemo() {
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

// Terminal View
function TerminalView() {
  const terminalRef = useRef<TerminalRef>(null)

  const handleData = useCallback((data: string) => {
    if (data === "\r") {
      terminalRef.current?.writeln("")
      terminalRef.current?.write("$ ")
    } else if (data === "\x7f") {
      // Backspace
    } else {
      terminalRef.current?.write(data)
    }
  }, [])

  return (
    <div>
      <PageHeader title="Terminal" description="Terminal emulator powered by xterm.js - the same engine used in VS Code." />
      <ExampleSection title="Interactive Terminal">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                terminalRef.current?.clear()
                terminalRef.current?.write("$ ")
              }}
            >
              Clear
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                terminalRef.current?.writeln("Hello from terminal! Type something and press Enter...")
              }
            >
              Write Message
            </Button>
          </div>
          <div className="h-[350px]">
            <TerminalEmulator
              ref={terminalRef}
              height="100%"
              onData={handleData}
              initialCommand="$ Welcome to Terminal! Press any key to start..."
            />
          </div>
        </div>
        <CodeBlock
          code={`import { Terminal, type TerminalRef } from "@/components/features/terminal"

const terminalRef = useRef<TerminalRef>(null)

<Terminal
  ref={terminalRef}
  height="350px"
  onData={(data) => {
    // Handle user input
  }}
  theme={{
    background: "#1e1e1e",
    foreground: "#d4d4d4",
  }}
/>

// Imperative API
terminalRef.current?.write("Hello!")
terminalRef.current?.clear()
terminalRef.current?.focus()`}
        />
      </ExampleSection>
    </div>
  )
}

// DnD View
function DnDView() {
  // Sortable List
  const [sortableItems, setSortableItems] = useState([
    { id: "1", title: "Task 1", priority: "high" },
    { id: "2", title: "Task 2", priority: "medium" },
    { id: "3", title: "Task 3", priority: "low" },
    { id: "4", title: "Task 4", priority: "high" },
    { id: "5", title: "Task 5", priority: "medium" },
  ])

  // Kanban Board
  const [kanbanColumns, setKanbanColumns] = useState<KanbanColumn<{ id: string; title: string }>[]>([
    { id: "todo", title: "To Do", items: [{ id: "t1", title: "Setup project" }, { id: "t2", title: "Create components" }] },
    { id: "in-progress", title: "In Progress", items: [{ id: "t3", title: "Write tests" }] },
    { id: "done", title: "Done", items: [{ id: "t4", title: "Design mockups" }] },
  ])

  const handleItemMove = useCallback(
    (itemId: UniqueIdentifier, fromColumnId: UniqueIdentifier, toColumnId: UniqueIdentifier, newIndex: number) => {
      setKanbanColumns((prev) => {
        const newColumns = [...prev]
        let movedItem: { id: string; title: string } | undefined

        // Remove from source column
        for (const column of newColumns) {
          const itemIndex = column.items.findIndex((item) => item.id === itemId)
          if (itemIndex !== -1) {
            movedItem = column.items[itemIndex]
            column.items = [...column.items.slice(0, itemIndex), ...column.items.slice(itemIndex + 1)]
            break
          }
        }

        // Add to target column
        if (movedItem) {
          const targetColumn = newColumns.find((col) => col.id === toColumnId)
          if (targetColumn) {
            targetColumn.items = [
              ...targetColumn.items.slice(0, newIndex),
              movedItem,
              ...targetColumn.items.slice(newIndex),
            ]
          }
        }

        return newColumns
      })
    },
    []
  )

  return (
    <div>
      <PageHeader title="Drag & Drop" description="Flexible drag and drop components with @dnd-kit for sortable lists, kanban boards, and more." />
      <ExampleSection title="Sortable List">
        <div className="max-w-md border rounded-lg p-4">
          <SortableList
            items={sortableItems}
            getId={(item) => item.id}
            onReorder={setSortableItems}
            renderItem={(item, index, isDragging) => (
              <div
                className={cn(
                  "flex items-center justify-between rounded-md border px-4 py-3",
                  isDragging && "border-[var(--color-primary)] bg-[var(--color-primary)]/10"
                )}
              >
                <span>{item.title}</span>
                <Badge variant={item.priority === "high" ? "destructive" : "secondary"}>{item.priority}</Badge>
              </div>
            )}
            itemClassName="mb-2 last:mb-0"
          />
        </div>
        <CodeBlock
          code={`import { SortableList } from "@/components/features/dnd"

<SortableList
  items={items}
  getId={(item) => item.id}
  onReorder={setItems}
  renderItem={(item, index, isDragging) => (
    <div className="p-3 border rounded">
      {item.title}
    </div>
  )}
/>`}
        />
      </ExampleSection>
      <ExampleSection title="Kanban Board">
        <KanbanBoard
          columns={kanbanColumns}
          getItemId={(item) => item.id}
          onItemMove={handleItemMove}
          renderItem={(item, columnId) => (
            <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3 shadow-sm">
              {item.title}
            </div>
          )}
          itemClassName="mb-2"
          className="h-[300px]"
        />
      </ExampleSection>
    </div>
  )
}

// Views Registry
export const VIEWS: Record<string, () => JSX.Element> = {
  button: ButtonView,
  badge: BadgeView,
  avatar: AvatarView,
  input: InputView,
  textarea: TextareaView,
  select: SelectView,
  checkbox: CheckboxView,
  radio: RadioGroupView,
  switch: SwitchView,
  slider: SliderView,
  progress: ProgressView,
  tabs: TabsView,
  accordion: AccordionView,
  alert: AlertView,
  dialog: DialogView,
  "alert-dialog": AlertDialogView,
  sheet: SheetView,
  popover: PopoverView,
  tooltip: TooltipView,
  "hover-card": HoverCardView,
  card: CardView,
  table: TableView,
  separator: SeparatorView,
  skeleton: SkeletonView,
  spinner: SpinnerView,
  toggle: ToggleView,
  kbd: KbdView,
  empty: EmptyView,
  calendar: CalendarView,
  dropdown: DropdownMenuView,
  collapsible: CollapsibleView,
  otp: InputOTPView,
  theme: ThemeView,
  charts: ChartsView,
  markdown: MarkdownView,
  flow: FlowView,
  dashboard: DashboardView,
  "data-table": DataTableView,
  form: FormView,
  tree: TreeView,
  editor: EditorView,
  pdf: PdfView,
  "virtual-list": VirtualListView,
  gantt: GanttView,
  "flame-graph": FlameGraphDemo,
  terminal: TerminalView,
  dnd: DnDView,
}
