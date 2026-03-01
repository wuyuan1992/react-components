"use client"

import { useState } from "react"
import { Tree, DirectoryTree, CheckboxTree, type TreeNode } from "@/components/features/tree"
import { Button } from "@/components/ui/button"
import { File, Folder, FolderOpen, ChevronRight } from "lucide-react"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function TreeView() {
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
