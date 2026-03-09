import type { Meta, StoryObj } from "@storybook/react"
import { MarkdownPreview } from "./MarkdownPreview"

const meta = {
  title: "Features/Markdown/MarkdownPreview",
  component: MarkdownPreview,
  tags: ["autodocs"],
} satisfies Meta<typeof MarkdownPreview>

export default meta
type Story = StoryObj<typeof meta>

const sampleContent = `# Markdown Preview

This is a **preview** of markdown content.

## Text Formatting

- **Bold text**
- _Italic text_
- ~~Strikethrough~~
- \`inline code\`

## Code Block

\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`
}
\`\`\`

## Lists

### Unordered
- Item 1
- Item 2
  - Nested item
  - Another nested

### Ordered
1. First
2. Second
3. Third

## Blockquote

> "The best way to predict the future is to create it."
> — Peter Drucker

## Table

| Feature | Status |
|---------|--------|
| GFM     | ✅     |
| Emoji   | ✅     |
| Highlight | ✅   |

## Links and Images

[Visit GitHub](https://github.com)

Emoji support: :rocket: :sparkles: :fire:
`

export const Default: Story = {
  args: {
    value: sampleContent,
  },
}

export const Simple: Story = {
  args: {
    value: `
# Simple Example

Just some **basic** markdown with _formatting_.

- List item 1
- List item 2
`,
  },
}

export const CodeHeavy: Story = {
  args: {
    value: `
# Code Examples

\`\`\`python
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Print first 10 Fibonacci numbers
for i in range(10):
    print(fibonacci(i))
\`\`\`

\`\`\`css
.container {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
}
\`\`\`
`,
  },
}

export const TableExample: Story = {
  args: {
    value: `
# Pricing Plans

| Plan     | Price   | Features                    |
|----------|---------|----------------------------|
| Free     | $0      | Basic features, 1 project   |
| Pro      | $9/mo   | Advanced features, 10 projects |
| Enterprise | Custom | Unlimited everything        |
`,
  },
}
