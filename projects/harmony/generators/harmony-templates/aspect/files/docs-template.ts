import { ComponentContext } from "@teambit/generator";

export function docsFile(context: ComponentContext) {
  return {
    relativePath: `${context.name}.docs.mdx`,
    content: `---
description: 'A plugable ${context.namePascalCase} aspect. Can be used to provider a UI and API.'
labels: ['aspect', 'composition', 'extendability']
---

A plugable ${context.namePascalCase} aspect. Used to maintain ${context.namePascalCase} across the platform.

## Get started

Compose the aspect into your Harmony platform:

\`\`\`ts
import { PlatformAspect } from '@bitdev/harmony.aspects.platform-aspect';

/**
 * compose the wayne.com platform.
 */    
export const MyPlatform = HarmonyPlatform.from({
  name: 'my-platform',

  platform: PlatformAspect,

  runtimes: [
    new BrowserRuntime(),
    new NodeJSRuntime()
  ],

  aspects: [
    ${context.namePascalCase}Aspect,
  ]
});

export default MyPlatform;
\`\`\``
  };
}
