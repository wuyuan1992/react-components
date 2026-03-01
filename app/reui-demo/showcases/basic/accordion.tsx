"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function AccordionView() {
  return (
    <div>
      <PageHeader title="Accordion" description="A vertically stacked set of interactive sections." />
      <ExampleSection title="Basic">
        <Accordion type="single" collapsible className="w-full max-w-sm">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>Yes. It comes with default styles.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <CodeBlock
          code={`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        />
      </ExampleSection>
    </div>
  )
}
