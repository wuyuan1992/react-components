import type { Meta, StoryObj } from "@storybook/react"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react"

const meta = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const SingleSelect: Story = {
  args: {
    type: "single",
    children: (
      <>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="size-4" />
        </ToggleGroupItem>
      </>
    ),
  },
}

export const MultipleSelect: Story = {
  args: {
    type: "multiple",
    defaultValue: ["bold", "italic"],
    children: (
      <>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="size-4" />
        </ToggleGroupItem>
      </>
    ),
  },
}

// @ts-expect-error - render function doesn't require args
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup type="single" variant="default">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" variant="outline" defaultValue="center">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
}

// @ts-expect-error - render function doesn't require args
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup type="single" size="sm">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="size-3" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="size-3" />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="default">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="size-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="size-5" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    type: "single",
    disabled: true,
    children: (
      <>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="size-4" />
        </ToggleGroupItem>
      </>
    ),
  },
}
