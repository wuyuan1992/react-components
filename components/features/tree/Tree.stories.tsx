import type { Meta, StoryObj } from "@storybook/react"
import { Tree, DirectoryTree, CheckboxTree, FileTree } from "./tree"
import { useState } from "react"
import type { TreeNode } from "./tree"

const meta = {
  title: "Features/Tree/Tree",
  component: Tree,
  tags: ["autodocs"],
} satisfies Meta<typeof Tree>

export default meta
type Story = StoryObj<typeof meta>

const sampleTreeData: TreeNode[] = [
  {
    key: "src",
    title: "src",
    children: [
      {
        key: "components",
        title: "components",
        children: [
          { key: "Button.tsx", title: "Button.tsx", isLeaf: true },
          { key: "Input.tsx", title: "Input.tsx", isLeaf: true },
          {
            key: "ui",
            title: "ui",
            children: [
              { key: "card.tsx", title: "card.tsx", isLeaf: true },
              { key: "dialog.tsx", title: "dialog.tsx", isLeaf: true },
            ],
          },
        ],
      },
      {
        key: "hooks",
        title: "hooks",
        children: [
          { key: "useAuth.ts", title: "useAuth.ts", isLeaf: true },
          { key: "useTheme.ts", title: "useTheme.ts", isLeaf: true },
        ],
      },
      { key: "App.tsx", title: "App.tsx", isLeaf: true },
      { key: "main.tsx", title: "main.tsx", isLeaf: true },
    ],
  },
  {
    key: "public",
    title: "public",
    children: [
      { key: "index.html", title: "index.html", isLeaf: true },
      { key: "favicon.ico", title: "favicon.ico", isLeaf: true },
    ],
  },
  { key: "package.json", title: "package.json", isLeaf: true },
  { key: "README.md", title: "README.md", isLeaf: true },
]

function TreeWithState({ treeData, checkable = false }: { treeData: TreeNode[]; checkable?: boolean }) {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(["src", "components"])
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])

  return (
    <Tree
      treeData={treeData}
      expandedKeys={expandedKeys}
      selectedKeys={selectedKeys}
      checkedKeys={checkedKeys}
      onExpand={setExpandedKeys}
      onSelect={setSelectedKeys}
      onCheck={setCheckedKeys}
      checkable={checkable}
      className="w-80"
    />
  )
}

export const Default: Story = {
  render: () => <TreeWithState treeData={sampleTreeData} />,
}

export const WithFileIcons: Story = {
  render: () => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(["src"])
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])

    return (
      <Tree
        treeData={sampleTreeData}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onExpand={setExpandedKeys}
        onSelect={setSelectedKeys}
        showFileIcons
        showFolderIcons
        className="w-80"
      />
    )
  },
}

export const DirectoryTreeView: Story = {
  render: () => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(["src", "components"])
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])

    return (
      <DirectoryTree
        treeData={sampleTreeData}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onExpand={setExpandedKeys}
        onSelect={setSelectedKeys}
        className="w-80 border rounded-lg"
      />
    )
  },
}

export const FileTreeSidebar: Story = {
  render: () => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(["src", "components"])
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])

    return (
      <FileTree
        treeData={sampleTreeData}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onExpand={setExpandedKeys}
        onSelect={setSelectedKeys}
        className="h-96"
      />
    )
  },
}

export const CheckboxTreeView: Story = {
  render: () => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(["src"])
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(["Button.tsx"])

    return (
      <CheckboxTree
        treeData={sampleTreeData}
        expandedKeys={expandedKeys}
        checkedKeys={checkedKeys}
        onExpand={setExpandedKeys}
        onCheck={(keys) => setCheckedKeys(Array.isArray(keys) ? keys : keys.checked)}
        className="w-80"
      />
    )
  },
}

export const CompactLayout: Story = {
  render: () => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(["src"])

    return (
      <Tree
        treeData={sampleTreeData}
        expandedKeys={expandedKeys}
        onExpand={setExpandedKeys}
        layout="compact"
        size="sm"
        className="w-64"
      />
    )
  },
}

export const PanelLayout: Story = {
  render: () => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(["src", "components"])
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])

    return (
      <Tree
        treeData={sampleTreeData}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onExpand={setExpandedKeys}
        onSelect={setSelectedKeys}
        layout="panel"
        className="w-80"
      />
    )
  },
}
