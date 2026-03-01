"use client"

import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react"
import { Terminal as XTerm } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import { WebLinksAddon } from "@xterm/addon-web-links"
import { cn } from "@/lib/utils"
import "@xterm/xterm/css/xterm.css"
import "./terminal.css"

export interface TerminalRef {
  /** 写入数据 */
  write: (data: string) => void
  /** 写入数据并换行 */
  writeln: (data: string) => void
  /** 清空终端 */
  clear: () => void
  /** 重置终端 */
  reset: () => void
  /** 聚焦终端 */
  focus: () => void
  /** 调整终端大小以适应容器 */
  fit: () => void
  /** 获取终端实例 */
  getTerminal: () => XTerm | null
}

export interface TerminalTheme {
  /** 前景色 */
  foreground?: string
  /** 背景色 */
  background?: string
  /** 光标颜色 */
  cursor?: string
  /** 光标高亮颜色 */
  cursorAccent?: string
  /** 选中背景色 */
  selectionBackground?: string
  /** 黑色 */
  black?: string
  /** 红色 */
  red?: string
  /** 绿色 */
  green?: string
  /** 黄色 */
  yellow?: string
  /** 蓝色 */
  blue?: string
  /** 品红 */
  magenta?: string
  /** 青色 */
  cyan?: string
  /** 白色 */
  white?: string
  /** 亮黑 */
  brightBlack?: string
  /** 亮红 */
  brightRed?: string
  /** 亮绿 */
  brightGreen?: string
  /** 亮黄 */
  brightYellow?: string
  /** 亮蓝 */
  brightBlue?: string
  /** 亮品红 */
  brightMagenta?: string
  /** 亮青 */
  brightCyan?: string
  /** 亮白 */
  brightWhite?: string
}

export interface TerminalProps {
  /** 终端高度 */
  height?: string | number
  /** 终端宽度 */
  width?: string | number
  /** 字体大小 */
  fontSize?: number
  /** 字体 */
  fontFamily?: string
  /** 行高 */
  lineHeight?: number
  /** 光标样式 */
  cursorStyle?: "block" | "underline" | "bar"
  /** 光标闪烁 */
  cursorBlink?: boolean
  /** 是否启用 WebGL 渲染 */
  enableWebGL?: boolean
  /** 是否启用网页链接 */
  enableWebLinks?: boolean
  /** 主题 */
  theme?: TerminalTheme
  /** 类名 */
  className?: string
  /** 数据输入回调 */
  onData?: (data: string) => void
  /** 二进制数据回调 */
  onBinary?: (data: string) => void
  /** 按键回调 */
  onKey?: (event: { key: string; domEvent: KeyboardEvent }) => void
  /** 焦点变化回调 */
  onFocus?: () => void
  /** 失焦回调 */
  onBlur?: () => void
  /** 终端大小变化回调 */
  onResize?: (cols: number, rows: number) => void
  /** 滚动回调 */
  onScroll?: (position: number) => void
  /** 初始命令 */
  initialCommand?: string
}

const DEFAULT_THEME: TerminalTheme = {
  foreground: "var(--color-foreground)",
  background: "var(--color-background)",
  cursor: "var(--color-primary)",
  cursorAccent: "var(--color-background)",
  selectionBackground: "rgba(255, 255, 255, 0.3)",
  black: "#000000",
  red: "#cd3131",
  green: "#0dbc79",
  yellow: "#e5e510",
  blue: "#2472c8",
  magenta: "#bc3fbc",
  cyan: "#11a8cd",
  white: "#e5e5e5",
  brightBlack: "#666666",
  brightRed: "#f14c4c",
  brightGreen: "#23d18b",
  brightYellow: "#f5f543",
  brightBlue: "#3b8eea",
  brightMagenta: "#d670d6",
  brightCyan: "#29b8db",
  brightWhite: "#e5e5e5",
}

const Terminal = forwardRef<TerminalRef, TerminalProps>(
  (
    {
      height = 300,
      width = "100%",
      fontSize = 14,
      fontFamily = "JetBrains Mono, Menlo, Monaco, 'Courier New', monospace",
      lineHeight = 1.2,
      cursorStyle = "block",
      cursorBlink = true,
      enableWebGL = true,
      enableWebLinks = true,
      theme = DEFAULT_THEME,
      className,
      onData,
      onBinary,
      onKey,
      onFocus,
      onBlur,
      onResize,
      onScroll,
      initialCommand,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const terminalRef = useRef<XTerm | null>(null)
    const fitAddonRef = useRef<FitAddon | null>(null)

    const fit = useCallback(() => {
      if (fitAddonRef.current && terminalRef.current) {
        fitAddonRef.current.fit()
      }
    }, [])

    useImperativeHandle(
      ref,
      () => ({
        write: (data: string) => terminalRef.current?.write(data),
        writeln: (data: string) => terminalRef.current?.writeln(data),
        clear: () => terminalRef.current?.clear(),
        reset: () => terminalRef.current?.reset(),
        focus: () => terminalRef.current?.focus(),
        fit,
        getTerminal: () => terminalRef.current,
      }),
      [fit]
    )

    useEffect(() => {
      if (!containerRef.current) return

      const terminal = new XTerm({
        fontSize,
        fontFamily,
        lineHeight,
        cursorStyle,
        cursorBlink,
        theme: {
          ...DEFAULT_THEME,
          ...theme,
        },
        convertEol: true,
        allowTransparency: true,
        scrollback: 10000,
      })

      const fitAddon = new FitAddon()
      fitAddonRef.current = fitAddon
      terminal.loadAddon(fitAddon)

      if (enableWebLinks) {
        const webLinksAddon = new WebLinksAddon()
        terminal.loadAddon(webLinksAddon)
      }

      // 动态加载 WebGL 渲染器
      if (enableWebGL) {
        import("@xterm/addon-webgl").then((module) => {
          const WebglAddon = module.WebglAddon
          const webglAddon = new WebglAddon()
          webglAddon.onContextLoss(() => {
            webglAddon.dispose()
          })
          try {
            terminal.loadAddon(webglAddon)
          } catch {
            // WebGL 不可用时回退到 Canvas
          }
        }).catch(() => {
          // WebGL addon 加载失败，忽略
        })
      }

      terminal.open(containerRef.current)
      fitAddon.fit()

      terminalRef.current = terminal

      // 绑定事件
      if (onData) terminal.onData(onData)
      if (onBinary) terminal.onBinary(onBinary)
      if (onKey) terminal.onKey(onKey)
      if (onFocus) {
        // xterm v6 使用 element 上的事件
        terminal.element?.addEventListener("focus", onFocus)
      }
      if (onBlur) {
        terminal.element?.addEventListener("blur", onBlur)
      }
      if (onResize) terminal.onResize(({ cols, rows }) => onResize(cols, rows))
      if (onScroll) terminal.onScroll(onScroll)

      // 执行初始命令
      if (initialCommand) {
        terminal.writeln(initialCommand)
      }

      // 窗口大小变化时调整
      const handleResize = () => {
        fitAddon.fit()
      }
      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
        terminal.dispose()
        terminalRef.current = null
      }
    }, [
      fontSize,
      fontFamily,
      lineHeight,
      cursorStyle,
      cursorBlink,
      enableWebGL,
      enableWebLinks,
      theme,
      onData,
      onBinary,
      onKey,
      onFocus,
      onBlur,
      onResize,
      onScroll,
      initialCommand,
    ])

    // 独立处理 fit
    useEffect(() => {
      fit()
    }, [height, width, fit])

    return (
      <div
        className={cn("overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-background)]", className)}
        style={{ height, width }}
      >
        <div ref={containerRef} className="h-full w-full p-2" />
      </div>
    )
  }
)

Terminal.displayName = "Terminal"

export { Terminal }
