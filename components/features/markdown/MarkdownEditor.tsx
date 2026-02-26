"use client"

import { useMemo } from "react"
import type { ReactElement } from "react"
import { Editor } from "@bytemd/react"
import type { BytemdPlugin } from "bytemd"
import gfm from "@bytemd/plugin-gfm"
import highlight from "@bytemd/plugin-highlight"
import breaks from "@bytemd/plugin-breaks"
import gemoji from "@bytemd/plugin-gemoji"
import { cn } from "@/lib/utils"
import "bytemd/dist/index.css"
import "highlight.js/styles/github.css"
import "./markdown.css"

export interface MarkdownEditorProps {
  /** Current markdown content */
  value: string
  /** Called on every keystroke with the updated value */
  onChange: (value: string) => void
  /** Placeholder shown in empty editor */
  placeholder?: string
  /**
   * Layout mode:
   * - `split`  editor + preview side by side
   * - `tab`    editor and preview on separate tabs
   * - `auto`   switches based on container width (default)
   */
  mode?: "split" | "tab" | "auto"
  /**
   * Editor height. Pass a number for px or a CSS string (e.g. `"calc(100vh - 4rem)"`).
   * @default 500
   */
  height?: number | string
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
   * <MarkdownEditor plugins={plugins} ... />
   * ```
   */
  plugins?: BytemdPlugin[]
  /**
   * Custom image upload handler.
   * Return array of `{ title, url, alt? }` objects to be inserted.
   */
  uploadImages?: (
    files: File[],
  ) => Promise<{ title: string; url: string; alt?: string }[]>
  /** Maximum character count */
  maxLength?: number
  /** When true, makes the editor read-only and visually dimmed */
  disabled?: boolean
  className?: string
}

const DEFAULT_PLUGINS: BytemdPlugin[] = [
  gfm(),
  highlight(),
  breaks(),
  gemoji(),
]

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  mode = "auto",
  height = 500,
  plugins,
  uploadImages,
  maxLength,
  disabled = false,
  className,
}: MarkdownEditorProps): ReactElement {
  const resolvedHeight =
    typeof height === "number" ? `${height}px` : height

  const activePlugins = useMemo(
    () => plugins ?? DEFAULT_PLUGINS,
    [plugins],
  )

  return (
    <div
      className={cn(
        disabled && "pointer-events-none opacity-60",
        className,
      )}
      style={
        { "--md-editor-height": resolvedHeight } as React.CSSProperties
      }
    >
      <Editor
        value={value}
        onChange={onChange}
        plugins={activePlugins}
        mode={mode}
        placeholder={placeholder}
        uploadImages={uploadImages}
        maxLength={maxLength}
        editorConfig={{ readOnly: disabled }}
      />
    </div>
  )
}
