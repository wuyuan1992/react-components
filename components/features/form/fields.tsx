"use client"

import { forwardRef } from "react"
import type { FieldPath, FieldValues } from "react-hook-form"
import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"

// Base field props
interface BaseFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>
  label?: string
  description?: string
  className?: string
  required?: boolean
}

// Text Input Field
interface TextFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  placeholder?: string
  type?: "text" | "email" | "password" | "number" | "tel" | "url"
  disabled?: boolean
}

export const TextField = forwardRef(function TextField<TFieldValues extends FieldValues>(
  { name, label, description, className, required, placeholder, type = "text", disabled }: TextFieldProps<TFieldValues>,
  _ref: React.Ref<HTMLInputElement>
) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>}
          <FormControl>
            <Input {...field} placeholder={placeholder} type={type} disabled={disabled} value={field.value ?? ""} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

// Textarea Field
interface TextareaFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  placeholder?: string
  rows?: number
  disabled?: boolean
  maxLength?: number
}

export const TextareaField = forwardRef(function TextareaField<TFieldValues extends FieldValues>(
  { name, label, description, className, required, placeholder, rows = 3, disabled, maxLength }: TextareaFieldProps<TFieldValues>,
  _ref: React.Ref<HTMLTextAreaElement>
) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>}
          <FormControl>
            <Textarea {...field} placeholder={placeholder} rows={rows} disabled={disabled} maxLength={maxLength} value={field.value ?? ""} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

// Select Field
interface SelectFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  options: { value: string; label: string; disabled?: boolean }[]
  placeholder?: string
  disabled?: boolean
}

export const SelectField = forwardRef(function SelectField<TFieldValues extends FieldValues>(
  { name, label, description, className, required, options, placeholder, disabled }: SelectFieldProps<TFieldValues>,
  _ref: React.Ref<HTMLButtonElement>
) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value} disabled={disabled}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

// Combobox Field (Searchable Select)
interface ComboboxFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  options: { value: string; label: string }[]
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
}

export const ComboboxField = forwardRef(function ComboboxField<TFieldValues extends FieldValues>(
  { name, label, description, className, required, options, placeholder = "Select option...", searchPlaceholder = "Search...", emptyText = "No results.", disabled }: ComboboxFieldProps<TFieldValues>,
  _ref: React.Ref<HTMLButtonElement>
) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant="outline" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")} disabled={disabled}>
                  {field.value ? options.find((opt) => opt.value === field.value)?.label : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder={searchPlaceholder} />
                <CommandList>
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          field.onChange(option.value)
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")} />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

// Checkbox Field
interface CheckboxFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  disabled?: boolean
}

export const CheckboxField = forwardRef(function CheckboxField<TFieldValues extends FieldValues>(
  { name, label, description, className, required, disabled }: CheckboxFieldProps<TFieldValues>,
  _ref: React.Ref<HTMLButtonElement>
) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-row items-start space-x-3 space-y-0", className)}>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

// Switch Field
interface SwitchFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  disabled?: boolean
}

export const SwitchField = forwardRef(function SwitchField<TFieldValues extends FieldValues>(
  { name, label, description, className, required, disabled }: SwitchFieldProps<TFieldValues>,
  _ref: React.Ref<HTMLButtonElement>
) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-row items-center justify-between rounded-lg border p-4", className)}>
          <div className="space-y-0.5">
            {label && <FormLabel className="text-base">{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
          </FormControl>
        </FormItem>
      )}
    />
  )
})

// Radio Group Field
interface RadioGroupFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  options: { value: string; label: string; disabled?: boolean }[]
  disabled?: boolean
  orientation?: "horizontal" | "vertical"
}

export const RadioGroupField = forwardRef(function RadioGroupField<TFieldValues extends FieldValues>(
  { name, label, description, className, required, options, disabled, orientation = "vertical" }: RadioGroupFieldProps<TFieldValues>,
  _ref: React.Ref<HTMLDivElement>
) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>}
          <FormControl>
            <RadioGroup onValueChange={field.onChange} value={field.value} disabled={disabled} className={cn("flex", orientation === "vertical" ? "flex-col" : "flex-row gap-4")}>
              {options.map((option) => (
                <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={option.value} disabled={option.disabled} />
                  </FormControl>
                  <Label className="font-normal">{option.label}</Label>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

// Slider Field
interface SliderFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  showValue?: boolean
}

export const SliderField = forwardRef(function SliderField<TFieldValues extends FieldValues>(
  { name, label, description, className, required, min = 0, max = 100, step = 1, disabled, showValue = true }: SliderFieldProps<TFieldValues>,
  _ref: React.Ref<HTMLSpanElement>
) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <div className="flex items-center justify-between">
              <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>
              {showValue && <span className="text-sm text-muted-foreground">{field.value}</span>}
            </div>
          )}
          <FormControl>
            <Slider min={min} max={max} step={step} value={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} disabled={disabled} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

// Date Picker Field
interface DatePickerFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  placeholder?: string
  disabled?: boolean
  formatStr?: string
}

export const DatePickerField = forwardRef(function DatePickerField<TFieldValues extends FieldValues>(
  { name, label, description, className, required, placeholder = "Pick a date", disabled, formatStr = "PPP" }: DatePickerFieldProps<TFieldValues>,
  _ref: React.Ref<HTMLButtonElement>
) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant="outline" className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")} disabled={disabled}>
                  {field.value ? format(new Date(field.value), formatStr) : <span>{placeholder}</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={field.value ? new Date(field.value) : undefined} onSelect={(date) => field.onChange(date?.toISOString())} disabled={disabled} />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

// Number Field
interface NumberFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  placeholder?: string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

export const NumberField = forwardRef(function NumberField<TFieldValues extends FieldValues>(
  { name, label, description, className, required, placeholder, min, max, step = 1, disabled }: NumberFieldProps<TFieldValues>,
  _ref: React.Ref<HTMLInputElement>
) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder={placeholder}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.valueAsNumber || undefined)}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

// Tags/Multi-select Field
interface TagsFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  placeholder?: string
  disabled?: boolean
}

export const TagsField = forwardRef(function TagsField<TFieldValues extends FieldValues>(
  { name, label, description, className, required, placeholder = "Add tags...", disabled }: TagsFieldProps<TFieldValues>,
  _ref: React.Ref<HTMLInputElement>
) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>}
          <FormControl>
            <div className="flex flex-wrap gap-2 rounded-md border border-input bg-transparent px-3 py-2">
              {(field.value as string[] || []).map((tag: string, idx: number) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-xs">
                  {tag}
                  <button
                    type="button"
                    className="hover:text-destructive"
                    onClick={() => {
                      const newTags = [...(field.value as string[] || [])]
                      newTags.splice(idx, 1)
                      field.onChange(newTags)
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                placeholder={placeholder}
                disabled={disabled}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    e.preventDefault()
                    const newTag = e.currentTarget.value.trim()
                    if (newTag && !(field.value as string[] || []).includes(newTag)) {
                      field.onChange([...(field.value as string[] || []), newTag])
                    }
                    e.currentTarget.value = ""
                  }
                }}
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
})
