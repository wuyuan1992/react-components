"use client"

import { memo } from "react"
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath,
  type EdgeProps,
  type Edge,
  type ConnectionLineComponentProps,
} from "@xyflow/react"
import { cn } from "@/lib/utils"
import { Check, X, AlertCircle, Zap } from "lucide-react"

// Helper to get edge data
function getEdgeData<T>(data: Edge["data"]): T {
  return (data || {}) as T
}

// Default Edge - Standard bezier curve
export const DefaultEdge = memo(function DefaultEdge(props: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  })

  return (
    <BaseEdge
      id={props.id}
      path={edgePath}
      style={{
        ...props.style,
        strokeWidth: 2,
        stroke: "var(--muted-foreground)",
      }}
      markerEnd={props.markerEnd}
    />
  )
})

// Animated Edge - Animated dashed line
export const AnimatedEdge = memo(function AnimatedEdge(props: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  })

  return (
    <>
      <BaseEdge
        id={props.id}
        path={edgePath}
        style={{
          ...props.style,
          strokeWidth: 2,
          stroke: "var(--primary)",
          strokeDasharray: "5 5",
          animation: "dash 0.5s linear infinite",
        }}
        markerEnd={props.markerEnd}
      />
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -10;
          }
        }
      `}</style>
    </>
  )
})

// Success Edge - Green success path
export const SuccessEdge = memo(function SuccessEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  })

  return (
    <>
      <BaseEdge
        id={props.id}
        path={edgePath}
        style={{
          ...props.style,
          strokeWidth: 2,
          stroke: "var(--success)",
        }}
        markerEnd={props.markerEnd}
      />
      {props.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className="nodrag nopan"
          >
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-success/10 text-success text-[10px] font-medium">
              <Check className="size-2.5" />
              {props.label}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
})

// Error Edge - Red error path
export const ErrorEdge = memo(function ErrorEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  })

  return (
    <>
      <BaseEdge
        id={props.id}
        path={edgePath}
        style={{
          ...props.style,
          strokeWidth: 2,
          stroke: "var(--destructive)",
        }}
        markerEnd={props.markerEnd}
      />
      {props.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className="nodrag nopan"
          >
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-destructive/10 text-destructive text-[10px] font-medium">
              <X className="size-2.5" />
              {props.label}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
})

// Warning Edge - Warning path
export const WarningEdge = memo(function WarningEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  })

  return (
    <>
      <BaseEdge
        id={props.id}
        path={edgePath}
        style={{
          ...props.style,
          strokeWidth: 2,
          stroke: "var(--warning)",
        }}
        markerEnd={props.markerEnd}
      />
      {props.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className="nodrag nopan"
          >
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-warning/10 text-warning text-[10px] font-medium">
              <AlertCircle className="size-2.5" />
              {props.label}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
})

// Dashed Edge - Dashed line style
export const DashedEdge = memo(function DashedEdge(props: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  })

  return (
    <BaseEdge
      id={props.id}
      path={edgePath}
      style={{
        ...props.style,
        strokeWidth: 2,
        stroke: "var(--muted-foreground)",
        strokeDasharray: "8 4",
      }}
      markerEnd={props.markerEnd}
    />
  )
})

// Smooth Step Edge - Smooth step path
export const SmoothStepEdge = memo(function SmoothStepEdge(props: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
    borderRadius: 16,
  })

  return (
    <BaseEdge
      id={props.id}
      path={edgePath}
      style={{
        ...props.style,
        strokeWidth: 2,
        stroke: "var(--muted-foreground)",
      }}
      markerEnd={props.markerEnd}
    />
  )
})

// Straight Edge - Straight line
export const StraightEdge = memo(function StraightEdge(props: EdgeProps) {
  const [edgePath] = getStraightPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
  })

  return (
    <BaseEdge
      id={props.id}
      path={edgePath}
      style={{
        ...props.style,
        strokeWidth: 2,
        stroke: "var(--muted-foreground)",
      }}
      markerEnd={props.markerEnd}
    />
  )
})

// Primary Edge - Uses primary color
export const PrimaryEdge = memo(function PrimaryEdge(props: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  })

  return (
    <BaseEdge
      id={props.id}
      path={edgePath}
      style={{
        ...props.style,
        strokeWidth: 2,
        stroke: "var(--primary)",
      }}
      markerEnd={props.markerEnd}
    />
  )
})

// Labeled Edge - Edge with custom label
export const LabeledEdge = memo(function LabeledEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  })

  return (
    <>
      <BaseEdge
        id={props.id}
        path={edgePath}
        style={{
          ...props.style,
          strokeWidth: 2,
          stroke: "var(--muted-foreground)",
        }}
        markerEnd={props.markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
            ...props.labelStyle,
          }}
          className="nodrag nopan"
        >
          <div className="px-2 py-1 rounded bg-card border text-xs font-medium text-foreground shadow-sm">
            {props.label}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  )
})

// Conditional Edge - Yes/No branches
interface ConditionalEdgeData {
  condition?: "yes" | "no"
}
export const ConditionalEdge = memo(function ConditionalEdge(props: EdgeProps) {
  const data = getEdgeData<ConditionalEdgeData>(props.data)
  const isYes = data.condition === "yes"
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  })

  return (
    <>
      <BaseEdge
        id={props.id}
        path={edgePath}
        style={{
          ...props.style,
          strokeWidth: 2,
          stroke: isYes ? "var(--success)" : "var(--destructive)",
        }}
        markerEnd={props.markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold",
              isYes
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {isYes ? <Check className="size-3" /> : <X className="size-3" />}
            {isYes ? "Yes" : "No"}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  )
})

// Fast Edge - Indicates quick/optimized path
export const FastEdge = memo(function FastEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  })

  return (
    <>
      <BaseEdge
        id={props.id}
        path={edgePath}
        style={{
          ...props.style,
          strokeWidth: 2,
          stroke: "var(--warning)",
          strokeDasharray: "3 3",
        }}
        markerEnd={props.markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-warning/10 text-warning text-[10px] font-medium">
            <Zap className="size-2.5" />
            Fast
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  )
})

// Connection Line - Custom connection line while dragging
export function ConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
  fromPosition,
  toPosition,
}: ConnectionLineComponentProps) {
  const [edgePath] = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  })

  return (
    <g>
      <path
        fill="none"
        stroke="var(--primary)"
        strokeWidth={2}
        strokeDasharray="4 4"
        d={edgePath}
        className="animate-pulse"
      />
      <circle cx={toX} cy={toY} r={4} fill="var(--primary)" className="animate-pulse" />
    </g>
  )
}

// Export all edge types
export const edgeTypes = {
  default: DefaultEdge,
  animated: AnimatedEdge,
  success: SuccessEdge,
  error: ErrorEdge,
  warning: WarningEdge,
  dashed: DashedEdge,
  smoothStep: SmoothStepEdge,
  straight: StraightEdge,
  primary: PrimaryEdge,
  labeled: LabeledEdge,
  conditional: ConditionalEdge,
  fast: FastEdge,
}
