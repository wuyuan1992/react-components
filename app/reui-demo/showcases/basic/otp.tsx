"use client"

import { useState } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function InputOTPView() {
  const [otp, setOtp] = useState("")
  return (
    <div>
      <PageHeader title="Input OTP" description="A one-time password input component." />
      <ExampleSection title="Basic">
        <div className="space-y-2">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">Value: {otp || "-"}</p>
        </div>
        <CodeBlock
          code={`<InputOTP maxLength={6} value={otp} onChange={setOtp}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
  </InputOTPGroup>
</InputOTP>`}
        />
      </ExampleSection>
    </div>
  )
}

// Feature Component Views
