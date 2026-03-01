"use client"

import type { DiffOnMount } from "@monaco-editor/react"
import { DiffEditor } from "@monaco-editor/react"
import { cn } from "@/lib/utils"
import type { Language, EditorTheme } from "./CodeEditor"

export interface DiffCodeEditorProps {
  /** 原始内容 */
  original?: string
  /** 修改后的内容 */
  modified?: string
  /** 语言模式 */
  language?: Language
  /** 原始文件标题 */
  originalTitle?: string
  /** 修改后文件标题 */
  modifiedTitle?: string
  /** 主题 */
  theme?: EditorTheme
  /** 高度 */
  height?: string | number
  /** 宽度 */
  width?: string | number
  /** 是否只读 */
  readOnly?: boolean
  /** 是否显示 minimap */
  minimap?: boolean
  /** 字体大小 */
  fontSize?: number
  /** 类名 */
  className?: string
  /** 编辑器挂载完成回调 */
  onMount?: DiffOnMount
}

const DiffCodeEditor: React.FC<DiffCodeEditorProps> = ({
  original = "",
  modified = "",
  language = "javascript",
  originalTitle = "Original",
  modifiedTitle = "Modified",
  theme = "vs-dark",
  height = "100%",
  width = "100%",
  readOnly = true,
  minimap = false,
  fontSize = 14,
  className,
  onMount,
}) => {
  return (
    <div className={cn("overflow-hidden rounded-md border border-[var(--color-border)]", className)}>
      <DiffEditor
        height={height}
        width={width}
        language={language}
        original={original}
        modified={modified}
        theme={theme}
        onMount={onMount}
        options={{
          readOnly,
          minimap: { enabled: minimap },
          fontSize,
          fontFamily: "JetBrains Mono, Menlo, Monaco, 'Courier New', monospace",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          renderSideBySide: true,
          originalEditable: false,
        }}
      />
    </div>
  )
}

DiffCodeEditor.displayName = "DiffCodeEditor"

export { DiffCodeEditor }
