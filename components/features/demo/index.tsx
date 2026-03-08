"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface PropDef {
  name: string
  type: string
  default?: string
  description: string
}

export function PageHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="mb-8 pb-6 border-b">
      <div className="flex items-start gap-3">
        <div className="mt-2 h-4 w-0.5 rounded-full bg-primary shrink-0" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export function ExampleSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold mb-3 text-foreground">{title}</h3>
      <div className="rounded-lg border p-4 bg-card">{children}</div>
    </div>
  )
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto mt-3 font-mono">
      <code>{code}</code>
    </pre>
  )
}

export function PropTable({ props: propsList }: { props: PropDef[] }) {
  return (
    <div className="my-6 rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Prop</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">Default</TableHead>
            <TableHead className="font-semibold">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {propsList.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="font-mono text-sm text-primary">
                {prop.name}
              </TableCell>
              <TableCell className="font-mono text-sm">{prop.type}</TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {prop.default || "-"}
              </TableCell>
              <TableCell className="text-sm">{prop.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
