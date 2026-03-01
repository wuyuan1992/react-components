"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Terminal } from "lucide-react"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function AlertView() {
  return (
    <div>
      <PageHeader title="Alert" description="Displays a callout for user attention." />
      <ExampleSection title="Variants">
        <div className="space-y-3">
          <Alert>
            <Terminal className="size-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Your session has expired.</AlertDescription>
          </Alert>
        </div>
        <CodeBlock
          code={`<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components.</AlertDescription>
</Alert>
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
</Alert>`}
        />
      </ExampleSection>
    </div>
  )
}
