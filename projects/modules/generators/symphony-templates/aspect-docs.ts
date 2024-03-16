import { ComponentContext } from "@teambit/generator";

export function aspectDocsFile(context: ComponentContext) {
  return {
    relativePath: `${context.name}.docs.mdx`,
    content: `---
description: 'A plugable ${context.namePascalCase} aspect. Can be used to provider a Browser and API.'
labels: ['aspect', 'composition', 'extendability']
---

A plugable ${context.namePascalCase} aspect. Used to maintain ${context.namePascalCase} across the platform.

## Get started

Compose the aspect into your Harmony platform:

\`\`\`ts
import { SymphonyPlatform } from '@bitdev/symphony.symphony-platform';

/**
 * compose the symphony platform.
 */    
export const MyPlatform = SymphonyPlatform({
  name: 'my-platform',

  aspects: [
    ${context.namePascalCase}Aspect,
  ]
});

export default MyPlatform;
\`\`\``
  };
}
