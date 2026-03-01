"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div>
      <PageHeader title="Calendar" description="A date picker component." />
      <ExampleSection title="Basic">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <CodeBlock code={`<Calendar mode="single" selected={date} onSelect={setDate} />`} />
      </ExampleSection>
    </div>
  )
}
