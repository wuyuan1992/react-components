"use client"

import { useState } from "react"
import { MarkdownEditor } from "@/components/features/markdown/MarkdownEditor"
import { MarkdownPreview } from "@/components/features/markdown/MarkdownPreview"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function MarkdownView() {
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
