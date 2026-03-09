import type { Meta, StoryObj } from "@storybook/react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import { Button } from "./button"
import { ChevronDown } from "lucide-react"

const meta = {
  title: "UI/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-80">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Is this useful?</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="mt-2 rounded-md border px-4 py-3">
          <p className="text-muted-foreground text-sm">
            Yes. This is a collapsible component that can be used to show or hide content.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Collapsible>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Section 1</span>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">Toggle</Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="mt-2 p-3 border rounded-md text-sm">
            Content for section 1. This can contain any React components.
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Section 2</span>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">Toggle</Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="mt-2 p-3 border rounded-md text-sm">
            Content for section 2. Each collapsible can be opened independently.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
}
