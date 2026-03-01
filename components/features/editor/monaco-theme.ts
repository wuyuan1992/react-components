/**
 * Monaco Editor 主题配置
 * 简化方案：使用 Monaco 内置主题，移除自定义以避免各种错误
 */

export const MONACO_THEMES = {
  light: "vs-light",
  dark: "vs-dark",
  hc: "hc-black",
} as const

export type MonacoTheme = keyof typeof MONACO_THEMES
