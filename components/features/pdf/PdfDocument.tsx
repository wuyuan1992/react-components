"use client"

import { useState, useCallback } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { cn } from "@/lib/utils"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export interface PdfDocumentProps {
  /** PDF file URL or File object to display */
  file?: string | File | Blob
  /** Zoom level (1 = 100%) */
  scale?: number
  /** Container height */
  height?: string | number
  /** Container width */
  width?: string | number
  /** Additional class name for the container */
  className?: string
  /** Additional class name for each page */
  pageClassName?: string
  /** Called when PDF loads successfully */
  onLoadSuccess?: (pdf: { numPages: number }) => void
  /** Called when PDF fails to load */
  onLoadError?: (error: Error) => void
}

/** Simple PDF document viewer without toolbar controls */
const PdfDocument: React.FC<PdfDocumentProps> = ({
  file,
  scale = 1,
  height = "auto",
  width = "100%",
  className,
  pageClassName,
  onLoadSuccess,
  onLoadError,
}) => {
  const [numPages, setNumPages] = useState(0)

  const handleDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages)
      onLoadSuccess?.({ numPages })
    },
    [onLoadSuccess]
  )

  const handleDocumentLoadError = useCallback(
    (error: Error) => {
      onLoadError?.(error)
    },
    [onLoadError]
  )

  return (
    <div className={cn("overflow-auto rounded-md border border-border bg-background", className)} style={{ height, width }}>
      <Document
        file={file}
        onLoadSuccess={handleDocumentLoadSuccess}
        onLoadError={handleDocumentLoadError}
        loading={<div className="flex h-40 items-center justify-center text-muted-foreground">Loading PDF...</div>}
        error={<div className="flex h-40 items-center justify-center text-destructive">Could not load PDF. Please check the file and try again.</div>}
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page
            key={`page_${i + 1}`}
            pageNumber={i + 1}
            scale={scale}
            className={cn("mx-auto mb-4", pageClassName)}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        ))}
      </Document>
    </div>
  )
}

PdfDocument.displayName = "PdfDocument"

export { PdfDocument }
