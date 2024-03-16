import { ComponentContext } from "@teambit/generator";


export function platformDocsFile(context: ComponentContext) {
  return {
    relativePath: `${context.name}.docs.mdx`,
    content: `---
labels: ['${context.name}', 'harmony', 'platform']
description: 'A ${context.namePascalCase} Harmony platform.'
---

The ${context.name} platform.

## Run the platform

\`\`\`
# use the platform
bit use ${context.name}

# run the platform
bit run ${context.name}
\`\`\` 
`
  }
}
