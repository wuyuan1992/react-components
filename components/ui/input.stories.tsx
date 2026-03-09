import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"
import { Label } from "./label"

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Type here...",
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
}

export const FileInput: Story = {
  render: () => <Input type="file" />,
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    placeholder: "Invalid input",
    defaultValue: "Invalid value",
  },
}

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="grid gap-1.5">
        <Label>Text</Label>
        <Input type="text" placeholder="Text input" />
      </div>
      <div className="grid gap-1.5">
        <Label>Email</Label>
        <Input type="email" placeholder="Email input" />
      </div>
      <div className="grid gap-1.5">
        <Label>Password</Label>
        <Input type="password" placeholder="Password input" />
      </div>
      <div className="grid gap-1.5">
        <Label>Number</Label>
        <Input type="number" placeholder="Number input" />
      </div>
      <div className="grid gap-1.5">
        <Label>Search</Label>
        <Input type="search" placeholder="Search input" />
      </div>
    </div>
  ),
}
