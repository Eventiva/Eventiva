import type { EnvHandler } from '@teambit/envs';
import { compact } from 'lodash';
import { TemplateList } from '@teambit/generator';
import { HarmonyPlatformTemplate } from './harmony-platform/harmony-platform-template';
import { HarmonyRuntimeTemplate } from './runtime/runtime-template.js';
import { HarmonyTemplatesOptions } from './harmony-templates-options.js';
import { AspectTemplate } from './aspect/aspect-template.js';
import { PlatformAspectTemplate } from './platform-aspect/platform-aspect-template';
import { HarmonyEnvTemplate } from './harmony-env-template/harmony-env-template';

/**
 * Create a list of Harmony templates.
 */
export function HarmonyTemplates(options: HarmonyTemplatesOptions = {}): EnvHandler<TemplateList> {
  const templates = options.templates || [];

  return TemplateList.from(compact([
    !options.disableHarmonyPlatform ? HarmonyPlatformTemplate.from(): undefined,
    !options.disablePlatformAspect ? PlatformAspectTemplate.from(): undefined,
    AspectTemplate.from({ options }),
    HarmonyRuntimeTemplate.from(),
    HarmonyEnvTemplate.from(),
    ...templates
  ]));
}
