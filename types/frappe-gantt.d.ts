declare module "frappe-gantt" {
  export interface GanttOptions {
    view_mode?: "Quarter Day" | "Half Day" | "Day" | "Week" | "Month" | "Year"
    language?: string
    draggable?: boolean
    progress?: boolean
    clickable?: boolean
    on_click?: (task: GanttTask) => void
    on_date_change?: (task: GanttTask, start: Date, end: Date) => void
    on_progress_change?: (task: GanttTask, progress: number) => void
    on_view_change?: (mode: string) => void
    custom_popup_html?: (task: GanttTask) => string
  }

  export interface GanttTask {
    id: string
    name: string
    start: string
    end: string
    progress?: number
    dependencies?: string[]
    custom_class?: string
    color?: string
    [key: string]: unknown
  }

  export default class Gantt {
    constructor(container: HTMLElement | string, tasks: GanttTask[], options?: GanttOptions)
    change_view_mode(mode: "Quarter Day" | "Half Day" | "Day" | "Week" | "Month" | "Year"): void
    refresh(tasks: GanttTask[]): void
    scroll_to_today(): void
  }
}
