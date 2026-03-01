import { ButtonView } from "./basic/button"
import { BadgeView } from "./basic/badge"
import { AvatarView } from "./basic/avatar"
import { InputView } from "./basic/input"
import { TextareaView } from "./basic/textarea"
import { SelectView } from "./basic/select"
import { CheckboxView } from "./basic/checkbox"
import { RadioGroupView } from "./basic/radio"
import { SwitchView } from "./basic/switch"
import { SliderView } from "./basic/slider"
import { ProgressView } from "./basic/progress"
import { TabsView } from "./basic/tabs"
import { AccordionView } from "./basic/accordion"
import { AlertView } from "./basic/alert"
import { DialogView } from "./basic/dialog"
import { AlertDialogView } from "./basic/alert-dialog"
import { SheetView } from "./basic/sheet"
import { PopoverView } from "./basic/popover"
import { TooltipView } from "./basic/tooltip"
import { HoverCardView } from "./basic/hover-card"
import { CardView } from "./basic/card"
import { TableView } from "./basic/table"
import { SeparatorView } from "./basic/separator"
import { SkeletonView } from "./basic/skeleton"
import { SpinnerView } from "./basic/spinner"
import { ToggleView } from "./basic/toggle"
import { KbdView } from "./basic/kbd"
import { EmptyView } from "./basic/empty"
import { CalendarView } from "./basic/calendar"
import { DropdownMenuView } from "./basic/dropdown"
import { CollapsibleView } from "./basic/collapsible"
import { InputOTPView } from "./basic/otp"
import { ThemeView } from "./feature/theme"
import { ChartsView } from "./feature/charts"
import { MarkdownView } from "./feature/markdown"
import { FlowView } from "./feature/flow"
import { DashboardView } from "./blocks/dashboard"
import { DataTableView } from "./feature/data-table"
import { FormView } from "./feature/form"
import { TreeView } from "./feature/tree"
import { EditorView } from "./feature/editor"
import { PdfView } from "./feature/pdf"
import { VirtualListView } from "./feature/virtual-list"
import { GanttView } from "./feature/gantt"
import { FlameGraphDemo } from "./feature/flame-graph"
import { TerminalView } from "./feature/terminal"
import { DnDView } from "./feature/dnd"

export const VIEWS: Record<string, () => JSX.Element> = {
  button: ButtonView,
  badge: BadgeView,
  avatar: AvatarView,
  input: InputView,
  textarea: TextareaView,
  select: SelectView,
  checkbox: CheckboxView,
  radio: RadioGroupView,
  switch: SwitchView,
  slider: SliderView,
  progress: ProgressView,
  tabs: TabsView,
  accordion: AccordionView,
  alert: AlertView,
  dialog: DialogView,
  "alert-dialog": AlertDialogView,
  sheet: SheetView,
  popover: PopoverView,
  tooltip: TooltipView,
  "hover-card": HoverCardView,
  card: CardView,
  table: TableView,
  separator: SeparatorView,
  skeleton: SkeletonView,
  spinner: SpinnerView,
  toggle: ToggleView,
  kbd: KbdView,
  empty: EmptyView,
  calendar: CalendarView,
  dropdown: DropdownMenuView,
  collapsible: CollapsibleView,
  otp: InputOTPView,
  theme: ThemeView,
  charts: ChartsView,
  markdown: MarkdownView,
  flow: FlowView,
  dashboard: DashboardView,
  "data-table": DataTableView,
  form: FormView,
  tree: TreeView,
  editor: EditorView,
  pdf: PdfView,
  "virtual-list": VirtualListView,
  gantt: GanttView,
  "flame-graph": FlameGraphDemo,
  terminal: TerminalView,
  dnd: DnDView,
}
