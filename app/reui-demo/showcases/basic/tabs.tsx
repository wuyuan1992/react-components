"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function TabsView() {
  return (
    <div>
      <PageHeader title="Tabs" description="A set of layered sections of content." />
      <ExampleSection title="Basic">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Manage your account settings.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
        <CodeBlock
          code={`<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">...</TabsContent>
</Tabs>`}
        />
      </ExampleSection>
    </div>
  )
}
