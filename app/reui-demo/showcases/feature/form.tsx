"use client"

import { useState } from "react"
import { FormWrapper, TextField, TextareaField, SelectField, CheckboxField, SwitchField, DatePickerField, TagsField } from "@/components/features/form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function FormView() {
  const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    bio: z.string().max(200).optional(),
    role: z.string().min(1, "Please select a role"),
    notifications: z.boolean().default(false),
    public: z.boolean().default(true),
    birthDate: z.string().optional(),
    tags: z.array(z.string()).optional(),
  })

  type UserForm = z.infer<typeof userSchema>

  return (
    <div>
      <PageHeader title="Form" description="Form components with react-hook-form + zod validation." />
      <ExampleSection title="User Form">
        <div className="max-w-md">
          <FormWrapper
            schema={userSchema}
            onSubmit={async (data: UserForm) => {
              console.log(data)
            }}
            submitText="Create User"
            defaultValues={{
              name: "",
              email: "",
              role: "",
              notifications: false,
              public: true,
            }}
          >
            <TextField name="name" label="Name" required placeholder="John Doe" />
            <TextField name="email" label="Email" type="email" required placeholder="john@example.com" />
            <TextareaField name="bio" label="Bio" placeholder="Tell us about yourself..." rows={3} />
            <SelectField
              name="role"
              label="Role"
              required
              placeholder="Select a role"
              options={[
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
                { value: "guest", label: "Guest" },
              ]}
            />
            <DatePickerField name="birthDate" label="Birth Date" />
            <TagsField name="tags" label="Tags" placeholder="Type and press Enter..." />
            <SwitchField name="notifications" label="Email Notifications" description="Receive email updates" />
            <CheckboxField name="public" label="Public Profile" description="Make your profile visible to others" />
          </FormWrapper>
        </div>
        <CodeBlock
          code={`import { FormWrapper, TextField, SelectField } from "@/components/features/form"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(1),
})

type FormData = z.infer<typeof schema>

<FormWrapper
  schema={schema}
  onSubmit={async (data) => console.log(data)}
  submitText="Submit"
>
  <TextField name="name" label="Name" required />
  <TextField name="email" label="Email" type="email" required />
  <SelectField name="role" label="Role" options={[...]} />
</FormWrapper>`}
        />
      </ExampleSection>
    </div>
  )
}

// Tree View
