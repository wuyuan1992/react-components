import type { Meta, StoryObj } from "@storybook/react"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card"
import { Button } from "./button"

const meta = {
  title: "UI/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@shadcn</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@shadcn</h4>
            <p className="text-muted-foreground text-sm">
              The components and UI you need to build modern web apps.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const ProfileCard: Story = {
  render: () => (
    <div className="flex gap-4">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">@nextjs</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Next.js</h4>
              <p className="text-muted-foreground text-sm">
                The React Framework for Production
              </p>
              <div className="flex gap-2 pt-2">
                <Button size="sm">Follow</Button>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">@tailwindcss</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Tailwind CSS</h4>
              <p className="text-muted-foreground text-sm">
                A utility-first CSS framework for rapid UI development
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
}
