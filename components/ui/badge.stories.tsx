import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./badge"
import { Check, X, AlertCircle, Info } from "lucide-react"

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "success", "warning", "info"],
    },
    size: {
      control: "select",
      options: ["default", "xs"],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Badge",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge size="xs">Extra Small</Badge>
      <Badge size="default">Default</Badge>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="success">
        <Check /> Active
      </Badge>
      <Badge variant="destructive">
        <X /> Inactive
      </Badge>
      <Badge variant="warning">
        <AlertCircle /> Pending
      </Badge>
      <Badge variant="info">
        <Info /> Info
      </Badge>
    </div>
  ),
}

export const CompactBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge size="xs" variant="success">
        <Check /> Done
      </Badge>
      <Badge size="xs" variant="warning">
        <AlertCircle /> Review
      </Badge>
      <Badge size="xs" variant="destructive">
        <X /> Failed
      </Badge>
      <Badge size="xs" variant="info">
        <Info /> New
      </Badge>
    </div>
  ),
}
