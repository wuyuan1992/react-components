"use client"

import { useMemo } from "react"
import type { ReactElement } from "react"
import { Viewer } from "@bytemd/react"
import type { BytemdPlugin } from "bytemd"
import gfm from "@bytemd/plugin-gfm"
import highlight from "@bytemd/plugin-highlight"
import breaks from "@bytemd/plugin-breaks"
import gemoji from "@bytemd/plugin-gemoji"
import { cn } from "@/lib/utils"
import "bytemd/dist/index.css"
import "highlight.js/styles/github.css"
import "./markdown.css"

export interface MarkdownPreviewProps {
  /** Markdown content to render */
  value: string
  /**
   * Override the default plugin set.
   *
   * Default plugins: gfm · highlight · breaks · gemoji
   *
   * To add mermaid or math support install the optional plugins first:
   * ```
   * pnpm add @bytemd/plugin-mermaid @bytemd/plugin-math
   * ```
   * Then pass them in:
   * ```tsx
   * import mermaid from "@bytemd/plugin-mermaid"
   * import math from "@bytemd/plugin-math"
   *
   * const plugins = useMemo(() => [...defaultPlugins, mermaid(), math()], [])
   * <MarkdownPreview plugins={plugins} ... />
   * ```
   */
  plugins?: BytemdPlugin[]
  className?: string
}

const DEFAULT_PLUGINS: BytemdPlugin[] = [
  gfm(),
  highlight(),
  breaks(),
  gemoji(),
]

export function MarkdownPreview({
  value,
  plugins,
  className,
}: MarkdownPreviewProps): ReactElement {
  const activePlugins = useMemo(
    () => plugins ?? DEFAULT_PLUGINS,
    [plugins],
  )

  return (
    <div className={cn("bytemd-viewer", className)}>
      <Viewer value={value} plugins={activePlugins} />
    </div>
  )
}
