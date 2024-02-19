export const prettierConfigFile = () => {
  return {
    relativePath: './config/prettier.config.js',
    content: `const { prettierConfig } = require('@teambit/react.react-env');

    /**
     * @see https://bit.dev/reference/prettier/prettier-config
     */
    module.exports = {
      ...prettierConfig,
    };
    `,
  };
};
