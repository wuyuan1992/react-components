"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function TableView() {
  const invoices = [
    { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
    { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  ]
  return (
    <div>
      <PageHeader title="Table" description="Displays data in a table format." />
      <ExampleSection title="Basic">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.invoice}>
                <TableCell className="font-medium">{inv.invoice}</TableCell>
                <TableCell>{inv.status}</TableCell>
                <TableCell>{inv.method}</TableCell>
                <TableCell className="text-right">{inv.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CodeBlock
          code={`<Table>
  <TableHeader>
    <TableRow><TableHead>Invoice</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>INV001</TableCell></TableRow>
  </TableBody>
</Table>`}
        />
      </ExampleSection>
    </div>
  )
}
