"use client"

import { useState, useCallback, forwardRef, useImperativeHandle, useRef } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

// 设置 PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export interface PdfViewerRef {
  /** 跳转到指定页 */
  goToPage: (page: number) => void
  /** 下一页 */
  nextPage: () => void
  /** 上一页 */
  prevPage: () => void
  /** 放大 */
  zoomIn: () => void
  /** 缩小 */
  zoomOut: () => void
  /** 重置缩放 */
  resetZoom: () => void
  /** 获取当前页码 */
  getCurrentPage: () => number
  /** 获取总页数 */
  getTotalPages: () => number
}

export interface PdfViewerProps {
  /** PDF 文件 URL 或 File 对象 */
  file?: string | File | Blob
  /** 初始页码 */
  initialPage?: number
  /** 初始缩放比例 */
  initialScale?: number
  /** 高度 */
  height?: string | number
  /** 宽度 */
  width?: string | number
  /** 是否显示工具栏 */
  showToolbar?: boolean
  /** 是否显示页码 */
  showPageNumber?: boolean
  /** 是否显示缩放控制 */
  showZoomControls?: boolean
  /** 是否显示导航按钮 */
  showNavigation?: boolean
  /** 类名 */
  className?: string
  /** 页面类名 */
  pageClassName?: string
  /** 加载完成回调 */
  onLoadSuccess?: (pdf: { numPages: number }) => void
  /** 加载失败回调 */
  onLoadError?: (error: Error) => void
  /** 页码变化回调 */
  onPageChange?: (page: number) => void
  /** 缩放变化回调 */
  onScaleChange?: (scale: number) => void
}

const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2]

const PdfViewer = forwardRef<PdfViewerRef, PdfViewerProps>(
  (
    {
      file,
      initialPage = 1,
      initialScale = 1,
      height = "100%",
      width = "100%",
      showToolbar = true,
      showPageNumber = true,
      showZoomControls = true,
      showNavigation = true,
      className,
      pageClassName,
      onLoadSuccess,
      onLoadError,
      onPageChange,
      onScaleChange,
    },
    ref
  ) => {
    const [numPages, setNumPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [scale, setScale] = useState(initialScale)
    const containerRef = useRef<HTMLDivElement>(null)

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

    const goToPage = useCallback(
      (page: number) => {
        const newPage = Math.max(1, Math.min(page, numPages))
        setCurrentPage(newPage)
        onPageChange?.(newPage)
      },
      [numPages, onPageChange]
    )

    const nextPage = useCallback(() => {
      goToPage(currentPage + 1)
    }, [currentPage, goToPage])

    const prevPage = useCallback(() => {
      goToPage(currentPage - 1)
    }, [currentPage, goToPage])

    const zoomIn = useCallback(() => {
      const currentIndex = ZOOM_LEVELS.findIndex((z) => z >= scale)
      const nextIndex = Math.min(currentIndex + 1, ZOOM_LEVELS.length - 1)
      const newScale = ZOOM_LEVELS[nextIndex] ?? scale
      setScale(newScale)
      onScaleChange?.(newScale)
    }, [scale, onScaleChange])

    const zoomOut = useCallback(() => {
      const currentIndex = ZOOM_LEVELS.findIndex((z) => z >= scale)
      const prevIndex = Math.max(currentIndex - 1, 0)
      const newScale = ZOOM_LEVELS[prevIndex] ?? scale
      setScale(newScale)
      onScaleChange?.(newScale)
    }, [scale, onScaleChange])

    const resetZoom = useCallback(() => {
      setScale(1)
      onScaleChange?.(1)
    }, [onScaleChange])

    useImperativeHandle(
      ref,
      () => ({
        goToPage,
        nextPage,
        prevPage,
        zoomIn,
        zoomOut,
        resetZoom,
        getCurrentPage: () => currentPage,
        getTotalPages: () => numPages,
      }),
      [goToPage, nextPage, prevPage, zoomIn, zoomOut, resetZoom, currentPage, numPages]
    )

    return (
      <div
        ref={containerRef}
        className={cn("flex flex-col overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-background)]", className)}
        style={{ height, width }}
      >
        {showToolbar && (
          <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] px-4 py-2">
            {showNavigation && (
              <div className="flex items-center gap-1">
                <button
                  onClick={prevPage}
                  disabled={currentPage <= 1}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
                  title="上一页"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextPage}
                  disabled={currentPage >= numPages}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
                  title="下一页"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {showPageNumber && (
              <div className="flex items-center gap-2 text-sm text-[var(--color-foreground)]">
                <input
                  type="number"
                  value={currentPage}
                  onChange={(e) => goToPage(parseInt(e.target.value, 10) || 1)}
                  min={1}
                  max={numPages}
                  className="w-14 rounded-md border border-[var(--color-border)] bg-transparent px-2 py-1 text-center text-sm"
                />
                <span>/ {numPages}</span>
              </div>
            )}

            {showZoomControls && (
              <div className="flex items-center gap-1">
                <button
                  onClick={zoomOut}
                  disabled={scale <= ZOOM_LEVELS[0]}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
                  title="缩小"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="min-w-[3rem] text-center text-sm text-[var(--color-foreground)]">{Math.round(scale * 100)}%</span>
                <button
                  onClick={zoomIn}
                  disabled={scale >= ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
                  title="放大"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={resetZoom}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-accent)]"
                  title="重置缩放"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex-1 overflow-auto p-4">
          <Document
            file={file}
            onLoadSuccess={handleDocumentLoadSuccess}
            onLoadError={handleDocumentLoadError}
            loading={
              <div className="flex h-40 items-center justify-center text-[var(--color-muted-foreground)]">加载中...</div>
            }
            error={
              <div className="flex h-40 items-center justify-center text-[var(--color-destructive)]">加载 PDF 失败</div>
            }
          >
            <Page
              pageNumber={currentPage}
              scale={scale}
              className={cn("mx-auto", pageClassName)}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
      </div>
    )
  }
)

PdfViewer.displayName = "PdfViewer"

export { PdfViewer }
