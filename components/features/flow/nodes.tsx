"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Square,
  CircleDot,
  GitBranch,
  ArrowDownToLine,
  ArrowUpFromLine,
  Globe,
  Database,
  MessageSquare,
  Clock,
  Workflow,
  Webhook,
  Mail,
  MessageCircle,
  FileText,
  Code,
  Settings,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  type LucideIcon,
} from "lucide-react"

// Base node wrapper with consistent styling
interface BaseNodeProps {
  children?: React.ReactNode
  className?: string
  selected?: boolean
  icon?: LucideIcon
  iconClassName?: string
  label: string
  description?: string
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  handles?: {
    target?: boolean | Position
    source?: boolean | Position
  }
  handleClassName?: string
}

function BaseNode({
  children,
  className,
  selected,
  icon: Icon,
  iconClassName,
  label,
  description,
  badge,
  badgeVariant = "secondary",
  handles,
  handleClassName,
}: BaseNodeProps) {
  return (
    <div
      className={cn(
        "relative min-w-[160px] rounded-lg border bg-card shadow-sm transition-all",
        "hover:shadow-md hover:border-primary/50",
        selected && "border-primary ring-2 ring-primary/20 shadow-md",
        className
      )}
    >
      {handles?.target !== false && (
        <Handle
          type="target"
          position={typeof handles?.target === "number" ? handles.target : Position.Top}
          className={cn(
            "w-3! h-3! bg-muted-foreground/30! border-2! border-background! hover:bg-primary!",
            handleClassName
          )}
        />
      )}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          {Icon && (
            <div className={cn("p-1.5 rounded-md", iconClassName)}>
              <Icon className="size-4" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium truncate">{label}</span>
              {badge && (
                <Badge variant={badgeVariant} className="text-[10px] px-1.5 py-0">
                  {badge}
                </Badge>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground truncate">{description}</p>
            )}
          </div>
        </div>
        {children}
      </div>
      {handles?.source !== false && (
        <Handle
          type="source"
          position={typeof handles?.source === "number" ? handles.source : Position.Bottom}
          className={cn(
            "w-3! h-3! bg-muted-foreground/30! border-2! border-background! hover:bg-primary!",
            handleClassName
          )}
        />
      )}
    </div>
  )
}

// Helper to extract data from node props
function getNodeData<T>(data: Node["data"]): T {
  return (data || {}) as T
}

// Start Node - Entry point of flow
export interface StartNodeData {
  label?: string
  description?: string
}
export const StartNode = memo(function StartNode(props: NodeProps) {
  const data = getNodeData<StartNodeData>(props.data)
  return (
    <BaseNode
      selected={props.selected}
      icon={Play}
      iconClassName="bg-success/10 text-success"
      label={data.label || "Start"}
      description={data.description}
      badge="Trigger"
      badgeVariant="outline"
      handles={{ target: false, source: Position.Bottom }}
      className="border-success/50"
    />
  )
})

// End Node - Terminal point of flow
export interface EndNodeData {
  label?: string
  description?: string
  status?: "success" | "error" | "cancelled"
}
export const EndNode = memo(function EndNode(props: NodeProps) {
  const data = getNodeData<EndNodeData>(props.data)
  const statusIcon = {
    success: CheckCircle2,
    error: XCircle,
    cancelled: AlertTriangle,
  }[data.status || "success"]

  return (
    <BaseNode
      selected={props.selected}
      icon={statusIcon || Square}
      iconClassName={cn(
        data.status === "success" && "bg-success/10 text-success",
        data.status === "error" && "bg-destructive/10 text-destructive",
        data.status === "cancelled" && "bg-warning/10 text-warning"
      )}
      label={data.label || "End"}
      description={data.description}
      badge={data.status || "success"}
      handles={{ target: Position.Top, source: false }}
      className={cn(
        data.status === "success" && "border-success/50",
        data.status === "error" && "border-destructive/50",
        data.status === "cancelled" && "border-warning/50"
      )}
    />
  )
})

// Process Node - Standard action/task
export interface ProcessNodeData {
  label?: string
  description?: string
  status?: "idle" | "running" | "success" | "error"
}
export const ProcessNode = memo(function ProcessNode(props: NodeProps) {
  const data = getNodeData<ProcessNodeData>(props.data)
  const StatusIcon = {
    idle: CircleDot,
    running: Loader2,
    success: CheckCircle2,
    error: XCircle,
  }[data.status || "idle"]

  return (
    <BaseNode
      selected={props.selected}
      icon={StatusIcon}
      iconClassName={cn(
        "bg-primary/10 text-primary",
        data.status === "running" && "animate-spin",
        data.status === "success" && "bg-success/10 text-success",
        data.status === "error" && "bg-destructive/10 text-destructive"
      )}
      label={data.label || "Process"}
      description={data.description}
      handles={{ target: Position.Top, source: Position.Bottom }}
    />
  )
})

// Decision Node - Conditional branching
export interface DecisionNodeData {
  label?: string
  description?: string
  condition?: string
}
export const DecisionNode = memo(function DecisionNode(props: NodeProps) {
  const data = getNodeData<DecisionNodeData>(props.data)
  return (
    <div className="relative">
      {/* Top handle - centered */}
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        className="w-3! h-3! bg-muted-foreground/30! border-2! border-background! hover:bg-primary! left-1/2! -translate-x-1/2!"
        style={{ top: 0 }}
      />
      {/* Diamond container */}
      <div
        className={cn(
          "rotate-45 w-[100px] h-[100px] rounded-lg border bg-card shadow-sm transition-all",
          "hover:shadow-md hover:border-primary/50",
          props.selected && "border-primary shadow-md"
        )}
      >
        <div className="-rotate-45 w-full h-full flex flex-col items-center justify-center p-2">
          <GitBranch className="size-5 text-warning mb-1" />
          <span className="text-xs font-medium text-center">{data.label || "Decision"}</span>
          {data.condition && (
            <span className="text-[10px] text-muted-foreground text-center truncate w-full">
              {data.condition}
            </span>
          )}
        </div>
      </div>
      {/* Yes handle - bottom left corner of diamond */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        className="w-3! h-3! border-2! border-background! hover:bg-success!"
        style={{
          left: `calc(50% - 35px)`,
          bottom: 0,
          backgroundColor: "var(--success)",
        }}
      />
      {/* No handle - bottom right corner of diamond */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        className="w-3! h-3! border-2! border-background! hover:bg-destructive!"
        style={{
          left: `calc(50% + 35px)`,
          bottom: 0,
          backgroundColor: "var(--destructive)",
        }}
      />
      {/* Labels */}
      <div
        className="absolute text-[10px] font-medium text-success"
        style={{ bottom: -18, left: `calc(50% - 50px)` }}
      >
        Yes
      </div>
      <div
        className="absolute text-[10px] font-medium text-destructive"
        style={{ bottom: -18, left: `calc(50% + 30px)` }}
      >
        No
      </div>
    </div>
  )
})

// Input Node - Data input
export interface InputNodeData {
  label?: string
  description?: string
  inputType?: string
}
export const InputNode = memo(function InputNode(props: NodeProps) {
  const data = getNodeData<InputNodeData>(props.data)
  return (
    <BaseNode
      selected={props.selected}
      icon={ArrowDownToLine}
      iconClassName="bg-info/10 text-info"
      label={data.label || "Input"}
      description={data.description || data.inputType}
      badge={data.inputType || "data"}
      handles={{ target: Position.Top, source: Position.Bottom }}
      className="border-info/50"
    />
  )
})

// Output Node - Data output
export interface OutputNodeData {
  label?: string
  description?: string
  outputType?: string
}
export const OutputNode = memo(function OutputNode(props: NodeProps) {
  const data = getNodeData<OutputNodeData>(props.data)
  return (
    <BaseNode
      selected={props.selected}
      icon={ArrowUpFromLine}
      iconClassName="bg-info/10 text-info"
      label={data.label || "Output"}
      description={data.description || data.outputType}
      badge={data.outputType || "data"}
      handles={{ target: Position.Top, source: Position.Bottom }}
      className="border-info/50"
    />
  )
})

// API Node - HTTP/API call
export interface APINodeData {
  label?: string
  description?: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  endpoint?: string
}
export const APINode = memo(function APINode(props: NodeProps) {
  const data = getNodeData<APINodeData>(props.data)
  const methodColors = {
    GET: "bg-success/10 text-success border-success/30",
    POST: "bg-primary/10 text-primary border-primary/30",
    PUT: "bg-warning/10 text-warning border-warning/30",
    DELETE: "bg-destructive/10 text-destructive border-destructive/30",
    PATCH: "bg-info/10 text-info border-info/30",
  }

  return (
    <BaseNode
      selected={props.selected}
      icon={Globe}
      iconClassName="bg-accent text-accent-foreground"
      label={data.label || "API Call"}
      description={data.endpoint || data.description}
      handles={{ target: Position.Top, source: Position.Bottom }}
    >
      {data.method && (
        <Badge variant="outline" className={cn("mt-2 text-[10px] font-mono", methodColors[data.method])}>
          {data.method}
        </Badge>
      )}
    </BaseNode>
  )
})

// Database Node - Database operations
export interface DatabaseNodeData {
  label?: string
  description?: string
  operation?: "query" | "insert" | "update" | "delete"
}
export const DatabaseNode = memo(function DatabaseNode(props: NodeProps) {
  const data = getNodeData<DatabaseNodeData>(props.data)
  return (
    <BaseNode
      selected={props.selected}
      icon={Database}
      iconClassName="bg-chart-4/10 text-chart-4"
      label={data.label || "Database"}
      description={data.description || data.operation}
      badge={data.operation}
      handles={{ target: Position.Top, source: Position.Bottom }}
      className="border-chart-4/50"
    />
  )
})

// Message Node - Notifications/messages
export interface MessageNodeData {
  label?: string
  description?: string
  channel?: "email" | "slack" | "sms" | "webhook"
}
export const MessageNode = memo(function MessageNode(props: NodeProps) {
  const data = getNodeData<MessageNodeData>(props.data)
  const channelIcon = {
    email: Mail,
    slack: MessageCircle,
    sms: MessageSquare,
    webhook: Webhook,
  }[data.channel || "email"]

  return (
    <BaseNode
      selected={props.selected}
      icon={channelIcon || MessageSquare}
      iconClassName="bg-chart-2/10 text-chart-2"
      label={data.label || "Message"}
      description={data.description}
      badge={data.channel || "email"}
      handles={{ target: Position.Top, source: Position.Bottom }}
      className="border-chart-2/50"
    />
  )
})

// Delay Node - Wait/timer
export interface DelayNodeData {
  label?: string
  description?: string
  duration?: string
}
export const DelayNode = memo(function DelayNode(props: NodeProps) {
  const data = getNodeData<DelayNodeData>(props.data)
  return (
    <BaseNode
      selected={props.selected}
      icon={Clock}
      iconClassName="bg-chart-3/10 text-chart-3"
      label={data.label || "Delay"}
      description={data.description || `Wait ${data.duration || "5s"}`}
      badge={data.duration || "5s"}
      handles={{ target: Position.Top, source: Position.Bottom }}
      className="border-chart-3/50"
    />
  )
})

// Subflow Node - Nested workflow
export interface SubflowNodeData {
  label?: string
  description?: string
  flowName?: string
}
export const SubflowNode = memo(function SubflowNode(props: NodeProps) {
  const data = getNodeData<SubflowNodeData>(props.data)
  return (
    <BaseNode
      selected={props.selected}
      icon={Workflow}
      iconClassName="bg-chart-4/10 text-chart-4"
      label={data.label || "Subflow"}
      description={data.description || data.flowName}
      badge="sub"
      handles={{ target: Position.Top, source: Position.Bottom }}
      className="border-chart-4/50"
    />
  )
})

// Webhook Node - Webhook trigger
export interface WebhookNodeData {
  label?: string
  description?: string
  method?: string
  path?: string
}
export const WebhookNode = memo(function WebhookNode(props: NodeProps) {
  const data = getNodeData<WebhookNodeData>(props.data)
  return (
    <BaseNode
      selected={props.selected}
      icon={Webhook}
      iconClassName="bg-warning/10 text-warning"
      label={data.label || "Webhook"}
      description={data.description || data.path}
      badge={data.method || "POST"}
      handles={{ target: false, source: Position.Bottom }}
      className="border-warning/50"
    />
  )
})

// Code Node - Custom code execution
export interface CodeNodeData {
  label?: string
  description?: string
  language?: string
}
export const CodeNode = memo(function CodeNode(props: NodeProps) {
  const data = getNodeData<CodeNodeData>(props.data)
  return (
    <BaseNode
      selected={props.selected}
      icon={Code}
      iconClassName="bg-chart-5/10 text-chart-5"
      label={data.label || "Code"}
      description={data.description || data.language}
      badge={data.language || "js"}
      handles={{ target: Position.Top, source: Position.Bottom }}
      className="border-chart-5/50"
    />
  )
})

// Transform Node - Data transformation
export interface TransformNodeData {
  label?: string
  description?: string
  transformType?: string
}
export const TransformNode = memo(function TransformNode(props: NodeProps) {
  const data = getNodeData<TransformNodeData>(props.data)
  return (
    <BaseNode
      selected={props.selected}
      icon={Settings}
      iconClassName="bg-accent/10 text-accent-foreground"
      label={data.label || "Transform"}
      description={data.description || data.transformType}
      badge={data.transformType || "map"}
      handles={{ target: Position.Top, source: Position.Bottom }}
      className="border-accent/50"
    />
  )
})

// Trigger Node - Event trigger
export interface TriggerNodeData {
  label?: string
  description?: string
  triggerType?: "schedule" | "event" | "manual"
}
export const TriggerNode = memo(function TriggerNode(props: NodeProps) {
  const data = getNodeData<TriggerNodeData>(props.data)
  return (
    <BaseNode
      selected={props.selected}
      icon={Zap}
      iconClassName="bg-warning/10 text-warning"
      label={data.label || "Trigger"}
      description={data.description}
      badge={data.triggerType || "event"}
      handles={{ target: false, source: Position.Bottom }}
      className="border-warning/50"
    />
  )
})

// File Node - File operations
export interface FileNodeData {
  label?: string
  description?: string
  operation?: "read" | "write" | "delete"
}
export const FileNode = memo(function FileNode(props: NodeProps) {
  const data = getNodeData<FileNodeData>(props.data)
  return (
    <BaseNode
      selected={props.selected}
      icon={FileText}
      iconClassName="bg-muted/50 text-muted-foreground"
      label={data.label || "File"}
      description={data.description || data.operation}
      badge={data.operation || "read"}
      handles={{ target: Position.Top, source: Position.Bottom }}
      className="border-muted/50"
    />
  )
})

// Parallel Node - Parallel execution
export interface ParallelNodeData {
  label?: string
  description?: string
  branches?: number
}
export const ParallelNode = memo(function ParallelNode(props: NodeProps) {
  const data = getNodeData<ParallelNodeData>(props.data)
  const branches = data.branches || 3
  return (
    <div
      className={cn(
        "relative min-w-[180px] rounded-lg border bg-card shadow-sm transition-all p-3",
        "hover:shadow-md hover:border-primary/50",
        props.selected && "border-primary ring-2 ring-primary/20 shadow-md"
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3! h-3! bg-muted-foreground/30! border-2! border-background! hover:bg-primary!"
      />
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-md bg-chart-2/10 text-chart-2">
          <GitBranch className="size-4" />
        </div>
        <div>
          <span className="text-sm font-medium">{data.label || "Parallel"}</span>
          <p className="text-xs text-muted-foreground">
            {data.description || `${branches} branches`}
          </p>
        </div>
      </div>
      <div className="flex justify-around mt-3 pt-3 border-t">
        {Array.from({ length: branches }).map((_, i) => (
          <Handle
            key={i}
            type="source"
            position={Position.Bottom}
            id={`branch-${i}`}
            className="w-2.5! h-2.5! border-2! border-background! relative! transform-none! left-auto! right-auto!"
            style={{ position: "relative", backgroundColor: "var(--chart-2)" }}
          />
        ))}
      </div>
    </div>
  )
})

// Merge Node - Merge parallel branches
export interface MergeNodeData {
  label?: string
  description?: string
  branches?: number
  mode?: "all" | "any"
}
export const MergeNode = memo(function MergeNode(props: NodeProps) {
  const data = getNodeData<MergeNodeData>(props.data)
  const branches = data.branches || 3
  return (
    <div
      className={cn(
        "relative min-w-[180px] rounded-lg border bg-card shadow-sm transition-all p-3",
        "hover:shadow-md hover:border-primary/50",
        props.selected && "border-primary ring-2 ring-primary/20 shadow-md"
      )}
    >
      <div className="flex justify-around mb-3 pb-3 border-b">
        {Array.from({ length: branches }).map((_, i) => (
          <Handle
            key={i}
            type="target"
            position={Position.Top}
            id={`branch-${i}`}
            className="w-2.5! h-2.5! border-2! border-background! relative! transform-none! left-auto! right-auto!"
            style={{ position: "relative", backgroundColor: "var(--chart-2)" }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-md bg-chart-2/10 text-chart-2">
          <GitBranch className="size-4 rotate-180" />
        </div>
        <div>
          <span className="text-sm font-medium">{data.label || "Merge"}</span>
          <p className="text-xs text-muted-foreground">
            {data.description || `Wait for ${data.mode === "any" ? "any" : "all"}`}
          </p>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3! h-3! bg-muted-foreground/30! border-2! border-background! hover:bg-primary!"
      />
    </div>
  )
})

// Error Handler Node
export interface ErrorHandlerNodeData {
  label?: string
  description?: string
  errorType?: string
}
export const ErrorHandlerNode = memo(function ErrorHandlerNode(props: NodeProps) {
  const data = getNodeData<ErrorHandlerNodeData>(props.data)
  return (
    <BaseNode
      selected={props.selected}
      icon={AlertTriangle}
      iconClassName="bg-destructive/10 text-destructive"
      label={data.label || "Error Handler"}
      description={data.description || data.errorType}
      badge="catch"
      badgeVariant="destructive"
      handles={{ target: Position.Top, source: Position.Bottom }}
      className="border-destructive/50"
    />
  )
})

// Retry Node
export interface RetryNodeData {
  label?: string
  description?: string
  maxRetries?: number
  backoff?: string
}
export const RetryNode = memo(function RetryNode(props: NodeProps) {
  const data = getNodeData<RetryNodeData>(props.data)
  return (
    <BaseNode
      selected={props.selected}
      icon={Loader2}
      iconClassName="bg-warning/10 text-warning"
      label={data.label || "Retry"}
      description={data.description || `${data.maxRetries || 3} attempts`}
      badge={`${data.maxRetries || 3}x`}
      handles={{ target: Position.Top, source: Position.Bottom }}
      className="border-warning/50"
    />
  )
})

// Export all node types
export const nodeTypes = {
  start: StartNode,
  end: EndNode,
  process: ProcessNode,
  decision: DecisionNode,
  input: InputNode,
  output: OutputNode,
  api: APINode,
  database: DatabaseNode,
  message: MessageNode,
  delay: DelayNode,
  subflow: SubflowNode,
  webhook: WebhookNode,
  code: CodeNode,
  transform: TransformNode,
  trigger: TriggerNode,
  file: FileNode,
  parallel: ParallelNode,
  merge: MergeNode,
  errorHandler: ErrorHandlerNode,
  retry: RetryNode,
}
