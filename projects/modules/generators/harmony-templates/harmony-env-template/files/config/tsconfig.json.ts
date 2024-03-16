export const tsConfigFile = () => {
  return {
    relativePath: './config/tsconfig.json',
    content: `/**
    * @see https://bit.dev/reference/typescript/typescript-config
    */
   {
     "extends": "@teambit/react.react-env/config/tsconfig.json",
     "exclude": ["artifacts", "public", "dist", "node_modules", "package.json", "**/*.cjs"],
     "include": ["**/*", "**/*.json", ".mocharc.js", ".mocharc.js"]
   }
   `,
  };
};
