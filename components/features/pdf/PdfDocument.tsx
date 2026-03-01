"use client"

import { useState, useCallback } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { cn } from "@/lib/utils"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export interface PdfDocumentProps {
  /** PDF 文件 URL 或 File 对象 */
  file?: string | File | Blob
  /** 缩放比例 */
  scale?: number
  /** 高度 */
  height?: string | number
  /** 宽度 */
  width?: string | number
  /** 类名 */
  className?: string
  /** 页面类名 */
  pageClassName?: string
  /** 加载完成回调 */
  onLoadSuccess?: (pdf: { numPages: number }) => void
  /** 加载失败回调 */
  onLoadError?: (error: Error) => void
}

/** 简单的 PDF 文档渲染组件（无工具栏） */
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
    <div className={cn("overflow-auto rounded-md border border-[var(--color-border)] bg-[var(--color-background)]", className)} style={{ height, width }}>
      <Document
        file={file}
        onLoadSuccess={handleDocumentLoadSuccess}
        onLoadError={handleDocumentLoadError}
        loading={<div className="flex h-40 items-center justify-center text-[var(--color-muted-foreground)]">加载中...</div>}
        error={<div className="flex h-40 items-center justify-center text-[var(--color-destructive)]">加载 PDF 失败</div>}
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
