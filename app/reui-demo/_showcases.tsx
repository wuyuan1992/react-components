// Navigation Data - exported from this file for backward compatibility
import type { NavSection } from "./showcases/shared"

export const NAV_SECTIONS: NavSection[] = [
  {
    id: "basic",
    label: "Basic Components",
    items: [
      { id: "button", label: "Button" },
      { id: "badge", label: "Badge" },
      { id: "avatar", label: "Avatar" },
      { id: "input", label: "Input" },
      { id: "textarea", label: "Textarea" },
      { id: "select", label: "Select" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio", label: "Radio Group" },
      { id: "switch", label: "Switch" },
      { id: "slider", label: "Slider" },
      { id: "progress", label: "Progress" },
      { id: "tabs", label: "Tabs" },
      { id: "accordion", label: "Accordion" },
      { id: "alert", label: "Alert" },
      { id: "dialog", label: "Dialog" },
      { id: "sheet", label: "Sheet" },
      { id: "popover", label: "Popover" },
      { id: "tooltip", label: "Tooltip" },
      { id: "card", label: "Card" },
      { id: "table", label: "Table" },
      { id: "separator", label: "Separator" },
      { id: "skeleton", label: "Skeleton" },
      { id: "spinner", label: "Spinner" },
      { id: "toggle", label: "Toggle" },
      { id: "kbd", label: "Keyboard" },
      { id: "empty", label: "Empty" },
      { id: "calendar", label: "Calendar" },
      { id: "dropdown", label: "Dropdown Menu" },
      { id: "collapsible", label: "Collapsible" },
      { id: "otp", label: "Input OTP" },
    ],
  },
  {
    id: "feature",
    label: "Feature Components",
    items: [
      { id: "theme", label: "Theme" },
      { id: "charts", label: "Charts" },
      { id: "markdown", label: "Markdown" },
      { id: "flow", label: "Flow" },
      { id: "data-table", label: "Data Table" },
      { id: "form", label: "Form" },
      { id: "tree", label: "Tree" },
      { id: "editor", label: "Code Editor" },
      { id: "pdf", label: "PDF Viewer" },
      { id: "virtual-list", label: "Virtual List" },
      { id: "gantt", label: "Gantt Chart" },
      { id: "flame-graph", label: "Flame Graph" },
      { id: "terminal", label: "Terminal" },
      { id: "dnd", label: "Drag & Drop" },
    ],
  },
  {
    id: "blocks",
    label: "Blocks",
    items: [
      { id: "dashboard", label: "Dashboard" },
    ],
  },
]

// Re-export VIEWS from the separated showcase files
export { VIEWS } from "./showcases"

// Re-export types for backward compatibility
export type { NavItem, NavSection, PropDef } from "./showcases/shared"
