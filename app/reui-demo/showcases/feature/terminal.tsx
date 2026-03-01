"use client"

import { useRef, useCallback } from "react"
import { Terminal as TerminalEmulator, type TerminalRef } from "@/components/features/terminal"
import { Button } from "@/components/ui/button"
import { Terminal as TerminalIcon } from "lucide-react"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function TerminalView() {
  const terminalRef = useRef<TerminalRef>(null)

  const handleData = useCallback((data: string) => {
    if (data === "\r") {
      terminalRef.current?.writeln("")
      terminalRef.current?.write("$ ")
    } else if (data === "\x7f") {
      // Backspace
    } else {
      terminalRef.current?.write(data)
    }
  }, [])

  return (
    <div>
      <PageHeader title="Terminal" description="Terminal emulator powered by xterm.js - the same engine used in VS Code." />
      <ExampleSection title="Interactive Terminal">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                terminalRef.current?.clear()
                terminalRef.current?.write("$ ")
              }}
            >
              Clear
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                terminalRef.current?.writeln("Hello from terminal! Type something and press Enter...")
              }
            >
              Write Message
            </Button>
          </div>
          <div className="h-[350px]">
            <TerminalEmulator
              ref={terminalRef}
              height="100%"
              onData={handleData}
              initialCommand="$ Welcome to Terminal! Press any key to start..."
            />
          </div>
        </div>
        <CodeBlock
          code={`import { Terminal, type TerminalRef } from "@/components/features/terminal"

const terminalRef = useRef<TerminalRef>(null)

<Terminal
  ref={terminalRef}
  height="350px"
  onData={(data) => {
    // Handle user input
  }}
  theme={{
    background: "#1e1e1e",
    foreground: "#d4d4d4",
  }}
/>

// Imperative API
terminalRef.current?.write("Hello!")
terminalRef.current?.clear()
terminalRef.current?.focus()`}
        />
      </ExampleSection>
    </div>
  )
}

// DnD View
