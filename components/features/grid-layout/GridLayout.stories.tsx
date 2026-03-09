import type { Meta, StoryObj } from "@storybook/react"
import { GridLayoutComponent, GridItem, type GridLayoutItem } from "./GridLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const meta = {
  title: "Features/GridLayout",
  component: GridLayoutComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof GridLayoutComponent>

export default meta
type Story = StoryObj<typeof meta>

const defaultLayout: GridLayoutItem[] = [
  { i: "a", x: 0, y: 0, w: 4, h: 2 },
  { i: "b", x: 4, y: 0, w: 4, h: 2 },
  { i: "c", x: 8, y: 0, w: 4, h: 2 },
  { i: "d", x: 0, y: 2, w: 6, h: 2 },
  { i: "e", x: 6, y: 2, w: 6, h: 2 },
]

const WidgetCard = ({ title, children }: { title: string; children?: React.ReactNode }) => (
  <Card className="h-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm">{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)

export const Default: Story = {
  args: {
    layout: defaultLayout,
    cols: 12,
    rowHeight: 80,
    gap: [16, 16],
    height: 400,
    children: (
      <>
        <GridItem itemKey="a">
          <WidgetCard title="Widget A" />
        </GridItem>
        <GridItem itemKey="b">
          <WidgetCard title="Widget B" />
        </GridItem>
        <GridItem itemKey="c">
          <WidgetCard title="Widget C" />
        </GridItem>
        <GridItem itemKey="d">
          <WidgetCard title="Widget D (Wide)" />
        </GridItem>
        <GridItem itemKey="e">
          <WidgetCard title="Widget E (Wide)" />
        </GridItem>
      </>
    ),
  },
}

export const NonDraggable: Story = {
  args: {
    layout: defaultLayout.map((item) => ({ ...item, draggable: false })),
    cols: 12,
    rowHeight: 80,
    gap: [16, 16],
    height: 400,
    draggable: false,
    children: (
      <>
        <GridItem itemKey="a">
          <WidgetCard title="Fixed Widget A" />
        </GridItem>
        <GridItem itemKey="b">
          <WidgetCard title="Fixed Widget B" />
        </GridItem>
        <GridItem itemKey="c">
          <WidgetCard title="Fixed Widget C" />
        </GridItem>
        <GridItem itemKey="d">
          <WidgetCard title="Fixed Widget D" />
        </GridItem>
        <GridItem itemKey="e">
          <WidgetCard title="Fixed Widget E" />
        </GridItem>
      </>
    ),
  },
}

export const NonResizable: Story = {
  args: {
    layout: defaultLayout,
    cols: 12,
    rowHeight: 80,
    gap: [16, 16],
    height: 400,
    resizable: false,
    children: (
      <>
        <GridItem itemKey="a">
          <WidgetCard title="Non-resizable A" />
        </GridItem>
        <GridItem itemKey="b">
          <WidgetCard title="Non-resizable B" />
        </GridItem>
        <GridItem itemKey="c">
          <WidgetCard title="Non-resizable C" />
        </GridItem>
        <GridItem itemKey="d">
          <WidgetCard title="Non-resizable D" />
        </GridItem>
        <GridItem itemKey="e">
          <WidgetCard title="Non-resizable E" />
        </GridItem>
      </>
    ),
  },
}

export const HorizontalCompact: Story = {
  args: {
    layout: [
      { i: "a", x: 0, y: 0, w: 3, h: 2 },
      { i: "b", x: 3, y: 0, w: 3, h: 2 },
      { i: "c", x: 6, y: 0, w: 3, h: 2 },
    ],
    cols: 12,
    rowHeight: 80,
    gap: [16, 16],
    height: 300,
    compactType: "horizontal",
    children: (
      <>
        <GridItem itemKey="a">
          <WidgetCard title="Horizontal A" />
        </GridItem>
        <GridItem itemKey="b">
          <WidgetCard title="Horizontal B" />
        </GridItem>
        <GridItem itemKey="c">
          <WidgetCard title="Horizontal C" />
        </GridItem>
      </>
    ),
  },
}

export const NoCompact: Story = {
  args: {
    layout: defaultLayout,
    cols: 12,
    rowHeight: 80,
    gap: [16, 16],
    height: 400,
    compactType: null,
    children: (
      <>
        <GridItem itemKey="a">
          <WidgetCard title="No Compact A" />
        </GridItem>
        <GridItem itemKey="b">
          <WidgetCard title="No Compact B" />
        </GridItem>
        <GridItem itemKey="c">
          <WidgetCard title="No Compact C" />
        </GridItem>
        <GridItem itemKey="d">
          <WidgetCard title="No Compact D" />
        </GridItem>
        <GridItem itemKey="e">
          <WidgetCard title="No Compact E" />
        </GridItem>
      </>
    ),
  },
}
