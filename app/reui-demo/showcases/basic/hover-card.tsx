"use client"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function HoverCardView() {
  return (
    <div>
      <PageHeader title="Hover Card" description="A card that appears on hover." />
      <ExampleSection title="Basic">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-64">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">The React Framework.</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <CodeBlock
          code={`<HoverCard>
  <HoverCardTrigger asChild><Button variant="link">@nextjs</Button></HoverCardTrigger>
  <HoverCardContent>...</HoverCardContent>
</HoverCard>`}
        />
      </ExampleSection>
    </div>
  )
}
