"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function AvatarView() {
  return (
    <div>
      <PageHeader title="Avatar" description="Displays a user avatar with fallback." />
      <ExampleSection title="Sizes">
        <div className="flex items-center gap-4">
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <CodeBlock
          code={`<Avatar className="size-8">
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}
        />
      </ExampleSection>
      <PropTable
        props={[
          { name: "src", type: "string", description: "Image source URL" },
          { name: "fallback", type: "ReactNode", description: "Fallback content when image fails" },
        ]}
      />
    </div>
  )
}
