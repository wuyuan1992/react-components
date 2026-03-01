import dagre from "@dagrejs/dagre"
import { Position, type Node, type Edge } from "@xyflow/react"

export type LayoutDirection = "TB" | "LR" | "BT" | "RL"

export interface LayoutOptions {
  direction?: LayoutDirection
  nodeWidth?: number
  nodeHeight?: number
  spacing?: number
}

const defaultNodeSize = { width: 180, height: 80 }

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  options: LayoutOptions = {}
): { nodes: Node[]; edges: Edge[] } {
  const {
    direction = "TB",
    nodeWidth = defaultNodeSize.width,
    nodeHeight = defaultNodeSize.height,
    spacing = 50,
  } = options

  const isHorizontal = direction === "LR" || direction === "RL"
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: spacing,
    ranksep: spacing * 1.5,
    edgesep: spacing / 2,
  })

  // Add nodes to dagre graph
  nodes.forEach((node) => {
    // Use custom dimensions if provided in node data
    const width = node.measured?.width ?? nodeWidth
    const height = node.measured?.height ?? nodeHeight
    dagreGraph.setNode(node.id, { width, height })
  })

  // Add edges to dagre graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  // Run layout
  dagre.layout(dagreGraph)

  // Map dagre positions back to nodes
  const layoutedNodes = nodes.map((node) => {
    const dagreNode = dagreGraph.node(node.id)
    if (!dagreNode) return node

    const width = node.measured?.width ?? nodeWidth
    const height = node.measured?.height ?? nodeHeight

    // Shift position to account for node center vs top-left anchor
    const position = {
      x: dagreNode.x - width / 2,
      y: dagreNode.y - height / 2,
    }

    // Set handle positions based on layout direction
    const targetPosition: Position = isHorizontal ? Position.Left : Position.Top
    const sourcePosition: Position = isHorizontal ? Position.Right : Position.Bottom

    return {
      ...node,
      position,
      targetPosition: node.targetPosition ?? targetPosition,
      sourcePosition: node.sourcePosition ?? sourcePosition,
    }
  })

  return { nodes: layoutedNodes, edges }
}

// Auto-layout hook helper
export function useAutoLayout(
  nodes: Node[],
  edges: Edge[],
  options?: LayoutOptions
) {
  return getLayoutedElements(nodes, edges, options)
}
