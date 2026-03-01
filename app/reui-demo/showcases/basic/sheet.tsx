"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function SheetView() {
  return (
    <div>
      <PageHeader title="Sheet" description="Extends the Dialog component to slide in." />
      <ExampleSection title="Basic">
        <Sheet>
          <SheetTrigger asChild>
            <Button>Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>Make changes to your profile.</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <Input placeholder="Name" />
            </div>
          </SheetContent>
        </Sheet>
        <CodeBlock
          code={`<Sheet>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent side="right">...</SheetContent>
</Sheet>`}
        />
      </ExampleSection>
    </div>
  )
}
