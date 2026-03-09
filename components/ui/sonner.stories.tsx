import type { Meta, StoryObj } from "@storybook/react"
import { Toaster } from "./sonner"
import { Button } from "./button"
import { toast } from "sonner"

const meta = {
  title: "UI/Sonner",
  component: Toaster,
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => toast("A simple toast")}>
          Show Toast
        </Button>
        <Button variant="outline" onClick={() => toast.success("Success!")}>
          Success
        </Button>
        <Button variant="outline" onClick={() => toast.error("An error occurred")}>
          Error
        </Button>
      </div>
    </div>
  ),
}

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.info("This is info")}>Info</Button>
        <Button onClick={() => toast.warning("This is a warning")}>Warning</Button>
        <Button onClick={() => toast.success("Operation successful!")}>Success</Button>
        <Button onClick={() => toast.error("Something went wrong")}>Error</Button>
      </div>
    </div>
  ),
}

export const WithAction: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toaster />
      <Button
        variant="outline"
        onClick={() => {
          toast("File has been deleted", {
            action: {
              label: "Undo",
              onClick: () => toast.success("File restored"),
            },
          })
        }}
      >
        Delete File
      </Button>
    </div>
  ),
}
