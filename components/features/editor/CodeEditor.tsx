"use client"

import { useCallback, useState } from "react"
import type { OnMount, OnChange, BeforeMount } from "@monaco-editor/react"
import Editor from "@monaco-editor/react"
import { useThemeStore } from "@/stores/theme-store"
import { cn } from "@/lib/utils"

export type Language =
  | "javascript"
  | "typescript"
  | "javascriptreact" // 内部映射为 javascript + .jsx 路径
  | "typescriptreact" // 内部映射为 typescript + .tsx 路径
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

export type EditorTheme = "light" | "vs-dark" | "hc-black" | "hc-light"

export interface CodeEditorProps {
  /** 编辑器内容 */
  value?: string
  /** 默认内容 */
  defaultValue?: string
  /** 语言模式 */
  language?: Language
  /** 主题，不传时自动跟随系统 light/dark */
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

// Monaco 没有 typescriptreact / javascriptreact 语言 ID，
// 通过 path 的文件扩展名让 Monaco TypeScript worker 识别 JSX/TSX
function resolveMonacoLang(language: Language): { monacoLang: string; path?: string } {
  if (language === "typescriptreact") return { monacoLang: "typescript", path: "model.tsx" }
  if (language === "javascriptreact") return { monacoLang: "javascript", path: "model.jsx" }
  return { monacoLang: language }
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  defaultValue = "",
  language = "javascript",
  theme,
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
  const mode = useThemeStore((s) => s.mode)
  const resolvedEditorTheme: EditorTheme = theme ?? (mode === "dark" ? "vs-dark" : "light")

  const { monacoLang, path } = resolveMonacoLang(language)
  const [isReady, setIsReady] = useState(false)

  const handleChange = useCallback<OnChange>(
    (value) => {
      onChange?.(value ?? "")
    },
    [onChange]
  )

  const handleBeforeMount: BeforeMount = (monaco) => {
    // 仅做展示渲染，关闭语义检查（类型错误、import 报错等），保留语法检查
    const diagnosticsOptions = { noSemanticValidation: true, noSyntaxValidation: false }
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(diagnosticsOptions)
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(diagnosticsOptions)
  }

  const handleMount: OnMount = (editor, monaco) => {
    setIsReady(true)
    onMount?.(editor, monaco)
  }

  return (
    <div className={cn("overflow-hidden rounded-md border border-[var(--color-border)]", className)} style={{ height, width }}>
      {!isReady && (
        <div
          className="flex items-center justify-center bg-background text-[var(--color-muted-foreground)]"
          style={{ height, width }}
        >
          {loading ?? "Loading editor..."}
        </div>
      )}
      <div style={{ display: isReady ? "block" : "none", height, width }}>
        <Editor
          height={height}
          width={width}
          language={monacoLang}
          path={path}
          value={value}
          defaultValue={defaultValue}
          theme={resolvedEditorTheme}
          loading={null}
          beforeMount={handleBeforeMount}
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
          }}
        />
      </div>
    </div>
  )
}

CodeEditor.displayName = "CodeEditor"

export { CodeEditor }
