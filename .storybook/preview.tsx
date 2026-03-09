import type { Preview } from "@storybook/react"
import "../app/globals.css"
import { withThemeByClassName } from "@storybook/addon-themes"

const withBackground = (Story: React.ComponentType) => (
  <div className="bg-background text-foreground min-h-screen w-full p-4">
    <Story />
  </div>
)

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    backgrounds: {
      disable: true,
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        Light: "",
        Dark: "dark",
        "Light (Vega)": "style-vega",
        "Dark (Vega)": "style-vega dark",
        "Light (Nova)": "style-nova",
        "Dark (Nova)": "style-nova dark",
        "Light (Lyra)": "style-lyra",
        "Dark (Lyra)": "style-lyra dark",
        "Light (Maia)": "style-maia",
        "Dark (Maia)": "style-maia dark",
        "Light (Mira)": "style-mira",
        "Dark (Mira)": "style-mira dark",
      },
      defaultTheme: "Light",
    }),
    withBackground,
  ],
}

export default preview
