"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function PopoverView() {
  return (
    <div>
      <PageHeader title="Popover" description="Displays content in a floating panel." />
      <ExampleSection title="Basic">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">Set the dimensions.</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <CodeBlock
          code={`<Popover>
  <PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>`}
        />
      </ExampleSection>
    </div>
  )
}
