"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function CardView() {
  return (
    <div>
      <PageHeader title="Card" description="Displays a card with header, content, and footer." />
      <ExampleSection title="Basic">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one click.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input placeholder="Project name" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
        <CodeBlock
          code={`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>`}
        />
      </ExampleSection>
    </div>
  )
}
