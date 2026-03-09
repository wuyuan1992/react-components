import type { Meta, StoryObj } from "@storybook/react"
import { Calendar } from "./calendar"

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: "rounded-md border",
  },
}

export const WithSelectedDate: Story = {
  args: {
    mode: "single",
    selected: new Date(2026, 2, 15),
    className: "rounded-md border",
  },
}

export const DateRange: Story = {
  args: {
    mode: "range",
    defaultMonth: new Date(2026, 2, 1),
    selected: {
      from: new Date(2026, 2, 5),
      to: new Date(2026, 2, 20),
    },
    className: "rounded-md border",
  },
}

export const MultipleMonths: Story = {
  args: {
    numberOfMonths: 2,
    className: "rounded-md border",
  },
}

export const DisabledDates: Story = {
  args: {
    mode: "single",
    disabled: [{ before: new Date(2026, 2, 10) }, { after: new Date(2026, 2, 20) }],
    className: "rounded-md border",
  },
}
