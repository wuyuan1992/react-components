import type { Meta, StoryObj } from "@storybook/react"
import { CodeEditor } from "./CodeEditor"
import { useState } from "react"

const meta = {
  title: "Features/Editor/CodeEditor",
  component: CodeEditor,
  tags: ["autodocs"],
} satisfies Meta<typeof CodeEditor>

export default meta
type Story = StoryObj<typeof meta>

const defaultCode = `// Welcome to the Code Editor
function greet(name: string): string {
  return \`Hello, \${name}!\`
}

// Example usage
const message = greet("World")
console.log(message)

// Interface example
interface User {
  id: number
  name: string
  email: string
}

// Async function
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`)
  return response.json()
}
`

function EditorWithState({ initialValue, ...props }: React.ComponentProps<typeof CodeEditor>) {
  const [value, setValue] = useState(initialValue ?? defaultCode)
  return <CodeEditor value={value} onChange={setValue} {...props} />
}

export const Default: Story = {
  render: () => <EditorWithState height={400} />,
}

export const TypeScript: Story = {
  render: () => <EditorWithState language="typescript" height={400} />,
}

export const JavaScript: Story = {
  render: () => (
    <EditorWithState
      language="javascript"
      initialValue={`// JavaScript Example
const numbers = [1, 2, 3, 4, 5]

const doubled = numbers.map(n => n * 2)
const sum = numbers.reduce((a, b) => a + b, 0)

console.log({ doubled, sum })
`}
      height={300}
    />
  ),
}

export const Python: Story = {
  render: () => (
    <EditorWithState
      language="python"
      initialValue={`# Python Example
def fibonacci(n: int) -> int:
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Generate first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
`}
      height={350}
    />
  ),
}

export const Json: Story = {
  render: () => (
    <EditorWithState
      language="json"
      initialValue={`{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^5.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "vitest"
  }
}`}
      height={300}
    />
  ),
}

export const ReadOnly: Story = {
  render: () => (
    <EditorWithState
      readOnly
      initialValue={`// This editor is read-only
// You cannot modify this content

export const CONFIG = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
}`}
      height={250}
    />
  ),
}

export const NoMinimap: Story = {
  render: () => (
    <EditorWithState
      minimap={false}
      initialValue={`// Editor without minimap
// More screen space for code

function compact() {
  return "Clean view"
}`}
      height={250}
    />
  ),
}

export const LargeFont: Story = {
  render: () => (
    <EditorWithState
      fontSize={20}
      initialValue={`// Large font size
// Better for presentations
const hello = "world"`}
      height={200}
    />
  ),
}

export const NoLineNumbers: Story = {
  render: () => (
    <EditorWithState
      lineNumbers="off"
      initialValue={`// No line numbers
// Clean minimal look
const minimal = true`}
      height={200}
    />
  ),
}
