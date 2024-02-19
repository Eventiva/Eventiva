import { ComponentContext } from "@teambit/generator";


export function runtimeDocs(context: ComponentContext) {
  return {
    relativePath: `${context.name}.docs.mdx`,
    content: `---
labels: ['${context.name}', 'runtime', 'harmony', 'aspects', 'composable']
description: 'A ${context.namePascalCase} runtime for Harmony platforms.'
---

A ${context.namePascalCase} runtime for Harmony. Use to allow your aspects in new runtimes:

## Get started

Use the ${context.namePascalCase} Runtime in your Harmony platform:

\`\`\`ts
import { UIRuntime } from '@bitdev/harmony.runtimes.ui-runtime';

export const WayneCom = HarmonyPlatform.from({
  name: 'wayne-com',

  main: [WaynePlatformAspect],

  runtimes: [
    new UIRuntime()
  ],

  aspects: [
    PeopleAspect
  ]
});

\`\`\`

Create an aspect, or add a \`*.ui.runtime.ts\` runtime to one of your existing aspects:

\`\`\`
bit create aspect people
\`\`\`


Run your platform:

\`\`\`
bit run wayne-com
\`\`\`
            
`
  }
}
