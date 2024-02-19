import { HarmonyTemplates } from '@bitdev/harmony.generators.harmony-templates';
import { browserRuntimeProvider } from './browser-runtime/browser-provider';
import { generateImports, getDummyMethod, nodeRuntimeProvider } from './node-runtime/node-runtime-provider';
import { graphQLServerFile } from './node-runtime/graphql-server';
import { aspectDocsFile } from './aspect-docs';
import { SymphonyTemplatesOptions } from './symphony-templates-options';
import { SymphonyPlatformTemplate } from './symphony-platform/symphony-platform-template';

export function SymphonyTemplates(options: SymphonyTemplatesOptions = {}) {
  return HarmonyTemplates({
    ...options, // include the options to ensure they are always applied then override with the below

    platformName: options.platformName ?? 'symphony-platform2',

    docsFile: options.docsFile ?? aspectDocsFile,

    disableHarmonyPlatform: options.disableHarmonyPlatform ?? true,

    templates: [
      ...(options.templates ?? []), // include the options templates if any
      SymphonyPlatformTemplate.from()
    ],

    runtimes: [
      ...(options.runtimes ?? []), // include the options runtimes if any
      {
        name: 'browser',
        provider: browserRuntimeProvider,
        dependencies: [
          'bitdev.symphony/symphony-platform'
        ],
        extension: 'tsx'
      },
      {
        name: 'node',
        provider: nodeRuntimeProvider,
        dependencies: [
          'bitdev.symphony/symphony-platform'
        ],
        imports: generateImports,
        files: (context) => [
          graphQLServerFile(context)
        ],
        methods: getDummyMethod,
      },
    ]
  });
}
