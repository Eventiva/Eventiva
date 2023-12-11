import { ComponentContext } from '@teambit/generator';
import { replace } from 'lodash';

export const docsFile = (context: ComponentContext) => {
  const { name, namePascalCase: Name } = context;
  const spaced = replace(name, new RegExp('-', 'g'), ' ');

  return {
    relativePath: `${name}.docs.mdx`,
    content: `---
labels: [${name}, 'express', 'server', 'microservice']
description: '${spaced}'
---

A ${name} component. Provides a RESTful API for the platform.

## Run the server 

Import the platform and use the it in your workspace:

\`\`\`bash
bit use ${name}
\`\`\`

Run the server:
\`\`\`bash
bit run ${name}
\`\`\`

## Compose to your platform

You can compose the server to a Platform app. Use the platform application type in a Bit app \`my-platform.bit-app.ts\` and include your server:
\`\`\`ts
import { Platform } from '@bitdev/platforms.platform';

export const MyPlatform = Platform.from({
  name: 'my-platform',

  backends: {
    main: new AcmeGateway(),
    services: [
      ${Name},
    ]
  },
});
\`\`\`
`,
  };
};
