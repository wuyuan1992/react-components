import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Label } from "./label"

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-one" id="disabled-one" />
        <Label htmlFor="disabled-one">Disabled Option One</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-two" id="disabled-two" />
        <Label htmlFor="disabled-two">Disabled Option Two</Label>
      </div>
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="small" className="flex gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="small" id="size-small" />
        <Label htmlFor="size-small">Small</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="medium" id="size-medium" />
        <Label htmlFor="size-medium">Medium</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="large" id="size-large" />
        <Label htmlFor="size-large">Large</Label>
      </div>
    </RadioGroup>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="starter" className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <RadioGroupItem value="starter" id="starter" className="mt-1" />
        <div className="grid gap-1">
          <Label htmlFor="starter" className="font-medium">
            Starter
          </Label>
          <p className="text-sm text-muted-foreground">Free forever. Perfect for side projects.</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <RadioGroupItem value="pro" id="pro" className="mt-1" />
        <div className="grid gap-1">
          <Label htmlFor="pro" className="font-medium">
            Pro
          </Label>
          <p className="text-sm text-muted-foreground">$12/month. Billed annually.</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <RadioGroupItem value="enterprise" id="enterprise" className="mt-1" />
        <div className="grid gap-1">
          <Label htmlFor="enterprise" className="font-medium">
            Enterprise
          </Label>
          <p className="text-sm text-muted-foreground">
            Custom pricing. For large organizations.
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
}
