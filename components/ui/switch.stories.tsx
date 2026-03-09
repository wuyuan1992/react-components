import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "./switch"
import { Label } from "./label"

const meta = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch disabled />
        <Label>Disabled (unchecked)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch disabled defaultChecked />
        <Label>Disabled (checked)</Label>
      </div>
    </div>
  ),
}

export const MultipleSwitches: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch id="notifications" defaultChecked />
        <Label htmlFor="notifications">Notifications</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="marketing" />
        <Label htmlFor="marketing">Marketing emails</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="security" defaultChecked />
        <Label htmlFor="security">Security alerts</Label>
      </div>
    </div>
  ),
}
