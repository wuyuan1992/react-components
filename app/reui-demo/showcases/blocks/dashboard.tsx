"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Plus, Search, Settings, User, ArrowUpRight, TrendingUp, Users, DollarSign } from "lucide-react"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function DashboardView() {
  return (
    <div>
      <PageHeader title="Dashboard Block" description="Pre-built dashboard layout example." />
      <ExampleSection title="Stats Cards">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-3xl">$45,231</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Subscriptions</CardDescription>
              <CardTitle className="text-3xl">+2,350</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Sales</CardDescription>
              <CardTitle className="text-3xl">+12,234</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
        </div>
      </ExampleSection>
      <ExampleSection title="Recent Transactions">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell><Badge>Paid</Badge></TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV002</TableCell>
              <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
              <TableCell className="text-right">$150.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV003</TableCell>
              <TableCell><Badge variant="destructive">Unpaid</Badge></TableCell>
              <TableCell className="text-right">$350.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ExampleSection>
    </div>
  )
}

// DataTable View
