import type { Meta, StoryObj } from "@storybook/react"
import { MarkdownEditor } from "./MarkdownEditor"
import { useState } from "react"

const meta = {
  title: "Features/Markdown/MarkdownEditor",
  component: MarkdownEditor,
  tags: ["autodocs"],
} satisfies Meta<typeof MarkdownEditor>

export default meta
type Story = StoryObj<typeof meta>

const defaultContent = `# Welcome to Markdown Editor

This is a **markdown** editor with _formatting_ support.

## Features

- GFM (GitHub Flavored Markdown)
- Syntax highlighting
- Emoji support :smile:
- Auto breaks

### Code Block

\`\`\`typescript
const greeting = "Hello, World!"
console.log(greeting)
\`\`\`

### Lists

1. First item
2. Second item
3. Third item

> This is a blockquote

[Link to GitHub](https://github.com)
`

function EditorWrapper(props: { initialValue?: string; mode?: "split" | "tab" | "auto"; height?: number; disabled?: boolean }) {
  const [value, setValue] = useState(props.initialValue ?? defaultContent)
  return (
    <MarkdownEditor
      value={value}
      onChange={setValue}
      mode={props.mode}
      height={props.height}
      disabled={props.disabled}
    />
  )
}

export const Default: Story = {
  render: () => <EditorWrapper />,
}

export const SplitMode: Story = {
  render: () => <EditorWrapper mode="split" />,
}

export const TabMode: Story = {
  render: () => <EditorWrapper mode="tab" />,
}

export const CompactHeight: Story = {
  render: () => <EditorWrapper height={300} />,
}

export const Disabled: Story = {
  render: () => <EditorWrapper disabled />,
}

export const EmptyPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <MarkdownEditor
        value={value}
        onChange={setValue}
        placeholder="Start typing your markdown here..."
        height={400}
      />
    )
  },
}
