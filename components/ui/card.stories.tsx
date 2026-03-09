import type { Meta, StoryObj } from "@storybook/react"
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card"
import { Button } from "./button"
import { Badge } from "./badge"

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some information.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Badge variant="secondary">3 new</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card content with some information about notifications.</p>
      </CardContent>
      <CardFooter className="border-t">
        <Button variant="ghost" size="sm">
          Mark all as read
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card className="w-80 p-6">
      <p>A simple card with just content.</p>
    </Card>
  ),
}

export const WithBorderTop: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card className="w-80 border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle>Primary Border</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card with a primary colored top border.</p>
        </CardContent>
      </Card>
      <Card className="w-80 border-t-4 border-t-destructive">
        <CardHeader>
          <CardTitle>Destructive Border</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card with a destructive colored top border.</p>
        </CardContent>
      </Card>
    </div>
  ),
}
