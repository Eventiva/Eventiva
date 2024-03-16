import { ComponentContext } from "@teambit/generator";

export function symphonyPlatformApp(context: ComponentContext) {
  return {
    relativePath: `${context.name}.bit-app.ts`,
    content: `import { HarmonyPlatform } from '@bitdev/harmony.harmony-platform';
import { NodeJSRuntime } from '@bitdev/harmony.runtimes.nodejs-runtime';
import { BrowserRuntime } from '@bitdev/harmony.runtimes.browser-runtime';
import { SymphonyPlatformAspect } from '@bitdev/symphony.symphony-platform';
import { PeopleAspect } from '@bitdev/symphony.examples.people';
import { HeaderAspect } from '@bitdev/symphony.aspects.header';

/**
  * compose the ${context.name} platform.
  */    
export const ${context.namePascalCase} = HarmonyPlatform.from({
  name: '${context.name}',
  platform: [SymphonyPlatformAspect, {
    name: '${context.namePascalCase}',
    slogan: 'Platform',
    logo: 'https://static.bit.dev/extensions-icons/wayne.svg',
  }],

  runtimes: [
    new BrowserRuntime(), 
    new NodeJSRuntime()
  ],

  aspects: [
    // you can use the symphony header aspect or fork to build your own.
    HeaderAspect,
    // example feature, replace with your own.
    PeopleAspect
  ],
});

export default ${context.namePascalCase};
`
  };
}
