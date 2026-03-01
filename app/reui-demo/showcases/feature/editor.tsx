"use client"

import { useState } from "react"
import { CodeEditor, DiffCodeEditor } from "@/components/features/editor"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function EditorView() {
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
      <ExampleSection title="Theme Options">
        <p className="text-sm text-muted-foreground mb-4">
          Monaco Editor uses Monaco's built-in themes. Available themes:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">vs-dark</CardTitle>
              <CardDescription className="text-xs">Monaco's dark theme</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">vs-light</CardTitle>
              <CardDescription className="text-xs">Monaco's light theme</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">hc-black</CardTitle>
              <CardDescription className="text-xs">High contrast black theme</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </ExampleSection>
      <PropTable
        props={[
          { name: "theme", type: "\"vs-dark\" | \"vs-light\" | \"hc-black\"", default: "\"vs-dark\"", description: "Monaco's built-in theme" },
          { name: "language", type: "Language enum", default: "\"javascript\"", description: "Programming language for syntax highlighting" },
          { name: "height", type: "string | number", default: "\"100%\"", description: "Editor height in px or %" },
          { name: "minimap", type: "boolean", default: "true", description: "Show code minimap" },
          { name: "fontSize", type: "number", default: "14", description: "Font size in pixels" },
          { name: "readOnly", type: "boolean", default: "false", description: "Make editor read-only" },
          { name: "wordWrap", type: "\"on\" | \"off\"", default: "\"on\"", description: "Enable word wrapping" },
        ]}
      />
    </div>
  )
}
