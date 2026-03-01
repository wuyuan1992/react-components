"use client"

import { useCallback, useMemo } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
  type OnConnect,
  BackgroundVariant,
  MarkerType,
  ReactFlowProvider,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { nodeTypes } from "./nodes"
import { edgeTypes, ConnectionLine } from "./edges"
import { getLayoutedElements, type LayoutDirection } from "./layout"

// Re-export types
export type { Node, Edge, Connection }
export { MarkerType }
export { getLayoutedElements, type LayoutDirection, type LayoutOptions } from "./layout"

export interface FlowCanvasProps {
  nodes: Node[]
  edges: Edge[]
  onNodesChange?: (nodes: Node[]) => void
  onEdgesChange?: (edges: Edge[]) => void
  onConnect?: OnConnect
  showControls?: boolean
  showMinimap?: boolean
  showBackground?: boolean
  showLayoutButtons?: boolean
  className?: string
  editable?: boolean
  fitView?: boolean
  minZoom?: number
  maxZoom?: number
  defaultDirection?: LayoutDirection
}

function FlowCanvasInner({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange,
  onEdgesChange,
  onConnect: onConnectProp,
  showControls = true,
  showMinimap = true,
  showBackground = true,
  showLayoutButtons = true,
  className,
  editable = true,
  fitView = true,
  minZoom = 0.1,
  maxZoom = 2,
  defaultDirection = "TB",
}: FlowCanvasProps) {
  // Apply initial layout
  const layouted = useMemo(
    () => getLayoutedElements(initialNodes, initialEdges, { direction: defaultDirection }),
    [initialNodes, initialEdges, defaultDirection]
  )

  const [nodes, setNodes, onNodesChangeInternal] = useNodesState(layouted.nodes)
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState(layouted.edges)

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "default",
            markerEnd: { type: MarkerType.ArrowClosed, color: "var(--muted-foreground)" },
          },
          eds
        )
      )
      onConnectProp?.(params)
    },
    [setEdges, onConnectProp]
  )

  const handleNodesChange = useCallback(
    (changes: Parameters<typeof onNodesChangeInternal>[0]) => {
      onNodesChangeInternal(changes)
      onNodesChange?.(nodes)
    },
    [onNodesChangeInternal, onNodesChange, nodes]
  )

  const handleEdgesChange = useCallback(
    (changes: Parameters<typeof onEdgesChangeInternal>[0]) => {
      onEdgesChangeInternal(changes)
      onEdgesChange?.(edges)
    },
    [onEdgesChangeInternal, onEdgesChange, edges]
  )

  const onLayout = useCallback(
    (direction: LayoutDirection) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        { direction }
      )
      setNodes(layoutedNodes)
      setEdges(layoutedEdges)
    },
    [nodes, edges, setNodes, setEdges]
  )

  const proOptions = useMemo(() => ({ hideAttribution: true }), [])

  return (
    <div className={cn("w-full h-full rounded-lg overflow-hidden border bg-card", className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={editable ? handleNodesChange : undefined}
        onEdgesChange={editable ? handleEdgesChange : undefined}
        onConnect={editable ? onConnect : undefined}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineComponent={ConnectionLine}
        proOptions={proOptions}
        fitView={fitView}
        fitViewOptions={{ padding: 0.2 }}
        minZoom={minZoom}
        maxZoom={maxZoom}
        defaultEdgeOptions={{
          type: "default",
          markerEnd: { type: MarkerType.ArrowClosed, color: "var(--muted-foreground)" },
        }}
      >
        {showBackground && (
          <Background
            variant={BackgroundVariant.Dots}
            gap={16}
            size={1}
            color="var(--muted-foreground)"
            className="!opacity-20"
          />
        )}
        {showControls && (
          <Controls
            className="!bg-card !border !shadow-sm !rounded-lg overflow-hidden"
            showInteractive={editable}
          />
        )}
        {showMinimap && (
          <MiniMap
            className="!bg-card !border !shadow-sm !rounded-lg overflow-hidden"
            nodeColor="var(--primary)"
            maskColor="var(--muted)"
            pannable
            zoomable
          />
        )}
        {showLayoutButtons && (
          <Panel position="top-right" className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onLayout("TB")}
              className="h-7 text-xs"
            >
              Vertical
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onLayout("LR")}
              className="h-7 text-xs"
            >
              Horizontal
            </Button>
          </Panel>
        )}
      </ReactFlow>
    </div>
  )
}

export function FlowCanvas(props: FlowCanvasProps) {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner {...props} />
    </ReactFlowProvider>
  )
}

// Export node and edge types for external use
export { nodeTypes, edgeTypes }
