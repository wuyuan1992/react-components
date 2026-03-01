"use client"

import { useCallback } from "react"
import type { OnMount, OnChange } from "@monaco-editor/react"
import Editor from "@monaco-editor/react"
import { cn } from "@/lib/utils"

export type Language =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "cpp"
  | "c"
  | "csharp"
  | "go"
  | "rust"
  | "php"
  | "ruby"
  | "swift"
  | "kotlin"
  | "sql"
  | "html"
  | "css"
  | "scss"
  | "less"
  | "json"
  | "xml"
  | "yaml"
  | "markdown"
  | "dockerfile"
  | "shell"
  | "bat"

/** 主题类型 - 支持 Monaco 内置主题 */
export type EditorTheme = "vs-dark" | "vs-light" | "hc-black"

export interface CodeEditorProps {
  /** 编辑器内容 */
  value?: string
  /** 默认内容 */
  defaultValue?: string
  /** 语言模式 */
  language?: Language
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
  /** 字体 */
  fontFamily?: string
  /** 行号显示 */
  lineNumbers?: "on" | "off" | "relative"
  /** 自动换行 */
  wordWrap?: "on" | "off" | "bounded"
  /** Tab 大小 */
  tabSize?: number
  /** 是否启用代码提示 */
  suggestOnTriggerCharacters?: boolean
  /** 是否启用快速建议 */
  quickSuggestions?: boolean
  /** 是否显示行号区域 */
  glyphMargin?: boolean
  /** 是否启用折叠 */
  folding?: boolean
  /** 是否显示代码镜头 */
  codeLens?: boolean
  /** 类名 */
  className?: string
  /** 加载中显示的内容 */
  loading?: React.ReactNode
  /** 内容变化回调 */
  onChange?: (value: string) => void
  /** 编辑器挂载完成回调 */
  onMount?: OnMount
  /** 验证错误回调 */
  onValidate?: (markers: Array<{ message: string; startLineNumber: number; startColumn: number; endLineNumber: number; endColumn: number }>) => void
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  defaultValue = "",
  language = "javascript",
  theme: themeProp = "vs-dark",
  height = "100%",
  width = "100%",
  readOnly = false,
  minimap = true,
  fontSize = 14,
  fontFamily = "JetBrains Mono, Menlo, Monaco, 'Courier New', monospace",
  lineNumbers = "on",
  wordWrap = "on",
  tabSize = 2,
  suggestOnTriggerCharacters = true,
  quickSuggestions = true,
  glyphMargin = true,
  folding = true,
  codeLens = false,
  className,
  loading,
  onChange,
  onMount,
  onValidate,
}) => {
  const handleChange = useCallback((value: string | undefined) => {
    onChange?.(value ?? "")
  }, [onChange])

  const handleMount = useCallback<OnMount>(
    (editor, monaco) => {
      onMount?.(editor, monaco)
    },
    [onMount]
  )

  return (
    <div className={cn("overflow-hidden rounded-md border border-border h-full", className)}>
      <Editor
        height={height}
        width={width}
        language={language}
        value={value}
        defaultValue={defaultValue}
        theme={themeProp}
        loading={loading}
        onChange={handleChange}
        onMount={handleMount}
        onValidate={onValidate}
        options={{
          readOnly,
          minimap: { enabled: minimap },
          fontSize,
          fontFamily,
          lineNumbers,
          wordWrap,
          tabSize,
          suggestOnTriggerCharacters,
          quickSuggestions,
          glyphMargin,
          folding,
          codeLens,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          renderWhitespace: "selection",
          bracketPairColorization: { enabled: true },
          contextmenu: true,
          mouseWheelZoom: true,
        }}
      />
    </div>
  )
}

CodeEditor.displayName = "CodeEditor"

export { CodeEditor }
