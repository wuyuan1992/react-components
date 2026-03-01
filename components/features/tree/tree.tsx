"use client"

import { useMemo } from "react"
import type { TreeProps as RcTreeProps } from "rc-tree"
import RcTree from "rc-tree"
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Loader2 } from "lucide-react"

// Basic tree node structure
export interface TreeNode {
  key: string
  title: React.ReactNode
  children?: TreeNode[]
  /** Is this node a leaf (no children) */
  isLeaf?: boolean
  /** Is this node disabled */
  disabled?: boolean
  /** Is this node selectable */
  selectable?: boolean
  /** Is this node checked (when checkable) */
  checked?: boolean
  /** Is this node expanded */
  expanded?: boolean
  /** Custom icon */
  icon?: React.ReactNode
  /** Node data for custom rendering */
  data?: unknown
}

export interface TreeProps {
  /** Tree data */
  treeData: TreeNode[]
  /** Show file/folder icons */
  showFileIcons?: boolean
  /** Show folder open/close icons */
  showFolderIcons?: boolean
  /** Show loading spinner for async loading */
  loading?: boolean
  /** Custom node render function */
  renderNode?: (node: TreeNode) => React.ReactNode
  /** Custom className */
  className?: string
  /** Size variant */
  size?: "sm" | "md" | "lg"
  /** Show indent guides */
  showIndentGuides?: boolean
  /** Enable selection */
  selectable?: boolean
  /** Enable checkboxes */
  checkable?: boolean
  /** Enable drag and drop */
  draggable?: boolean
  /** Expanded keys */
  expandedKeys?: React.Key[]
  /** Selected keys */
  selectedKeys?: React.Key[]
  /** Checked keys */
  checkedKeys?: React.Key[] | { checked: React.Key[]; halfChecked: React.Key[] }
  /** Expand handler */
  onExpand?: (expandedKeys: React.Key[]) => void
  /** Select handler */
  onSelect?: (selectedKeys: React.Key[], info: { selected: boolean; node: TreeNode; selectedNodes: TreeNode[] }) => void
  /** Check handler */
  onCheck?: (checkedKeys: React.Key[] | { checked: React.Key[]; halfChecked: React.Key[] }, info: { checked: boolean; node: TreeNode; checkedNodes: TreeNode[] }) => void
  /** Disabled */
  disabled?: boolean
}

// Switcher icon component
function SwitcherIcon({ expanded, isLeaf, showFileIcons, showFolderIcons }: { expanded?: boolean; isLeaf?: boolean; showFileIcons?: boolean; showFolderIcons?: boolean }) {
  if (isLeaf) {
    if (showFileIcons) {
      return <File className="size-4 text-muted-foreground" />
    }
    return null
  }

  if (showFolderIcons) {
    return expanded ? <FolderOpen className="size-4 text-warning" /> : <Folder className="size-4 text-warning" />
  }

  return expanded ? <ChevronDown className="size-4 text-muted-foreground" /> : <ChevronRight className="size-4 text-muted-foreground" />
}

export function Tree({
  treeData,
  showFileIcons = false,
  showFolderIcons = true,
  loading = false,
  renderNode,
  className,
  size = "md",
  showIndentGuides = false,
  selectable = true,
  checkable = false,
  draggable = false,
  expandedKeys,
  selectedKeys,
  checkedKeys,
  onExpand,
  onSelect,
  onCheck,
  disabled,
}: TreeProps) {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  // Default title render with optional custom renderer
  const defaultTitleRender = (node: TreeNode): React.ReactNode => {
    if (renderNode) {
      return renderNode(node)
    }
    return <span className="truncate">{node.title}</span>
  }

  return (
    <div
      className={cn(
        "tree-container",
        sizeClasses[size],
        showIndentGuides && "[&_.rc-tree-indent-unit]:border-l [&_.rc-tree-indent-unit]:border-border",
        className
      )}
    >
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <RcTree<TreeNode>
          prefixCls="rc-tree"
          treeData={treeData}
          selectable={selectable}
          checkable={checkable ? <span className="inline-flex items-center justify-center size-4" /> : false}
          draggable={draggable}
          expandedKeys={expandedKeys}
          selectedKeys={selectedKeys}
          checkedKeys={checkedKeys}
          onExpand={onExpand}
          onSelect={onSelect}
          onCheck={onCheck}
          disabled={disabled}
          titleRender={defaultTitleRender}
          switcherIcon={({ expanded, isLeaf }) => <SwitcherIcon expanded={expanded} isLeaf={isLeaf} showFileIcons={showFileIcons} showFolderIcons={showFolderIcons} />}
          icon={showFileIcons ? ({ isLeaf }) => (isLeaf ? <File className="size-4 text-muted-foreground mr-1" /> : null) : undefined}
        />
      )}
    </div>
  )
}

// Directory Tree variant with folder icons
export interface DirectoryTreeProps extends Omit<TreeProps, "showFileIcons" | "showFolderIcons"> {
  /** Show hidden files */
  showHidden?: boolean
}

export function DirectoryTree({ showHidden = false, ...props }: DirectoryTreeProps) {
  return <Tree {...props} showFileIcons={true} showFolderIcons={true} />
}

// Tree Select Component
export interface TreeSelectProps {
  /** Selected key(s) */
  value?: string | string[]
  /** Change handler */
  onChange?: (value: string | string[]) => void
  /** Tree data */
  treeData: TreeNode[]
  /** Placeholder text */
  placeholder?: string
  /** Is multiple select */
  multiple?: boolean
  /** Is disabled */
  disabled?: boolean
  /** Loading state */
  loading?: boolean
  /** Custom className */
  className?: string
}

export function TreeSelect({ value, onChange, treeData, placeholder = "Select...", multiple = false, disabled = false, loading = false, className }: TreeSelectProps) {
  const selectedKeys = useMemo(() => {
    if (!value) return []
    return Array.isArray(value) ? value : [value]
  }, [value])

  const handleSelect = (keys: React.Key[]) => {
    if (multiple) {
      onChange?.(keys as string[])
    } else {
      onChange?.(keys[0] as string)
    }
  }

  return (
    <div className={cn("relative", className)}>
      <Tree
        treeData={treeData}
        selectedKeys={selectedKeys}
        onSelect={handleSelect}
        disabled={disabled}
        loading={loading}
        size="sm"
        className="border rounded-md p-2"
      />
    </div>
  )
}

// Checkbox Tree variant
export interface CheckboxTreeProps {
  /** Tree data */
  treeData: TreeNode[]
  /** Checked keys */
  checkedKeys?: string[]
  /** Check handler */
  onCheck?: (checkedKeys: string[], info: { checked: boolean; node: TreeNode; checkedNodes: TreeNode[] }) => void
  /** Check strictly (parent and children are independent) */
  checkStrictly?: boolean
  /** Expanded keys */
  expandedKeys?: React.Key[]
  /** Expand handler */
  onExpand?: (expandedKeys: React.Key[]) => void
  /** Custom className */
  className?: string
  /** Size variant */
  size?: "sm" | "md" | "lg"
  /** Disabled */
  disabled?: boolean
}

export function CheckboxTree({ checkedKeys = [], onCheck, checkStrictly = false, treeData, expandedKeys, onExpand, className, size, disabled }: CheckboxTreeProps) {
  const handleCheck = (keys: React.Key[] | { checked: React.Key[]; halfChecked: React.Key[] }) => {
    if (checkStrictly && !Array.isArray(keys)) {
      onCheck?.(keys.checked as string[], { checked: true, node: {} as TreeNode, checkedNodes: [] })
    } else {
      onCheck?.(keys as string[], { checked: true, node: {} as TreeNode, checkedNodes: [] })
    }
  }

  return (
    <Tree
      treeData={treeData}
      checkable
      checkedKeys={checkedKeys}
      onCheck={handleCheck}
      expandedKeys={expandedKeys}
      onExpand={onExpand}
      className={className}
      size={size}
      disabled={disabled}
    />
  )
}
