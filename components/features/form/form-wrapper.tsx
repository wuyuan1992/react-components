"use client"

import type { ReactNode } from "react"
import type { ZodType } from "zod"
import type { FieldValues, SubmitHandler, DefaultValues } from "react-hook-form"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export interface FormWrapperProps<T extends FieldValues> {
  /** Zod schema for validation */
  schema: ZodType<T>
  /** Default form values */
  defaultValues?: DefaultValues<T>
  /** Form submit handler */
  onSubmit: SubmitHandler<T>
  /** Form content - typically form fields */
  children: ReactNode
  /** Optional className for the form */
  className?: string
  /** Submit button text - if provided, renders a submit button */
  submitText?: string
  /** Show loading state */
  isLoading?: boolean
  /** Reset form after successful submit */
  resetOnSuccess?: boolean
  /** Called when form submission succeeds */
  onSuccess?: () => void
  /** Called when form submission fails */
  onError?: (error: unknown) => void
}

export function FormWrapper<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
  submitText,
  isLoading,
  resetOnSuccess,
  onSuccess,
  onError,
}: FormWrapperProps<T>) {
  const form = useForm<T>({
    // @ts-expect-error - zodResolver generic type inference issue
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const handleSubmit = async (data: T) => {
    try {
      await onSubmit(data)
      if (resetOnSuccess) {
        form.reset()
      }
      onSuccess?.()
    } catch (error) {
      onError?.(error)
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit as never)}
        className={cn("space-y-6", className)}
      >
        {children}
        {submitText && (
          <Button
            type="submit"
            disabled={isLoading || !form.formState.isValid}
            className="w-full"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitText}
          </Button>
        )}
      </form>
    </FormProvider>
  )
}
