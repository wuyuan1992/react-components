import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"
import { Badge } from "./badge"

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-80">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border rounded-md">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="p-4 border rounded-md">
        Change your password here.
      </TabsContent>
    </Tabs>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="notifications">
          Notifications
          <Badge variant="info" size="xs">
            3
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="p-4 border rounded-md">
        Overview content
      </TabsContent>
      <TabsContent value="notifications" className="p-4 border rounded-md">
        You have 3 new notifications.
      </TabsContent>
      <TabsContent value="settings" className="p-4 border rounded-md">
        Settings content
      </TabsContent>
    </Tabs>
  ),
}

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-full max-w-lg">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        <TabsTrigger value="tab4">Tab 4</TabsTrigger>
        <TabsTrigger value="tab5">Tab 5</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4 border rounded-md">
        Content for Tab 1
      </TabsContent>
      <TabsContent value="tab2" className="p-4 border rounded-md">
        Content for Tab 2
      </TabsContent>
      <TabsContent value="tab3" className="p-4 border rounded-md">
        Content for Tab 3
      </TabsContent>
      <TabsContent value="tab4" className="p-4 border rounded-md">
        Content for Tab 4
      </TabsContent>
      <TabsContent value="tab5" className="p-4 border rounded-md">
        Content for Tab 5
      </TabsContent>
    </Tabs>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="enabled" className="w-80">
      <TabsList>
        <TabsTrigger value="enabled">Enabled</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="enabled" className="p-4 border rounded-md">
        This tab is enabled.
      </TabsContent>
    </Tabs>
  ),
}
