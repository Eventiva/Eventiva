export const eslintConfigFile = () => {
  return {
    relativePath: './config/eslintrc.js',
    content: `module.exports = {
  extends: [require.resolve('@teambit/react.react-env/config/eslintrc')],
};`,
  };
};
