import { ComponentContext } from "@teambit/generator";
import { upperFirst } from 'lodash';


export function platformDocsFile(context: ComponentContext) {
  const displayName = context.name.split('-').map((token) => upperFirst(token));
  return {
    relativePath: `${context.name}.docs.mdx`,
    content: `---
labels: ['${displayName}', 'harmony', 'platform']
description: 'A ${context.namePascalCase} Harmony platform composition.'
---

The ${displayName} platform composition. Composes the ${displayName} platform features into a unified and executable platform.

## Run the platform

Run the ${displayName} platform by running the following commands:

\`\`\`
bit use ${context.name}
\`\`\` 

Run the platform:

\`\`\`
bit run ${context.name}
\`\`\` 

Your platform is now listening to URL shown in the command output.

## Compose Aspects

You can create and compose new Aspects to the ${displayName} platform by adding them to the aspects property in \`${context.name}.bit-app.ts\`:

\`\`\`ts
import { NewsAspect } from '@pied/news.news';

export const ${context.namePascalCase} = HarmonyPlatform.from({
  name: '${context.name}',

  aspects: [
    HeaderAspect,
    // your new platform feature.
    NewsAspect,
  ],
});
\`\`\`
`
  }
}
