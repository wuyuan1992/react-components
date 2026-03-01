"use client"

import { useState, useRef } from "react"
import { PdfViewer, type PdfViewerRef } from "@/components/features/pdf"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function PdfView() {
  const [currentPage, setCurrentPage] = useState(1)
  const viewerRef = useRef<PdfViewerRef>(null)

  // Sample PDF URL
  const samplePdf = "https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf"

  return (
    <div>
      <PageHeader title="PDF Viewer" description="PDF document viewer with navigation, zoom, and text selection." />
      <ExampleSection title="PDF Viewer with Toolbar">
        <div className="h-[500px]">
          <PdfViewer
            ref={viewerRef}
            file={samplePdf}
            height="100%"
            onPageChange={setCurrentPage}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Current page: {currentPage}</p>
        <CodeBlock
          code={`import { PdfViewer, type PdfViewerRef } from "@/components/features/pdf"

const viewerRef = useRef<PdfViewerRef>(null)

<PdfViewer
  ref={viewerRef}
  file="/path/to/document.pdf"
  height="500px"
  showToolbar={true}
  onPageChange={(page) => console.log(page)}
/>

// Imperative API
viewerRef.current?.goToPage(5)
viewerRef.current?.zoomIn()
viewerRef.current?.zoomOut()`}
        />
      </ExampleSection>
    </div>
  )
}

// Virtual List View
