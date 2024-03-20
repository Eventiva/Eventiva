const presets = [
  require.resolve('@babel/preset-typescript'),
  [
    require.resolve('@babel/preset-env'),
    {
      targets: {
        node: 18,
      },
      // useBuiltIns: 'usage',
      // corejs: 3,
    },
  ],
];
const plugins = [
  // [
    // require.resolve('@babel/plugin-transform-modules-commonjs'),
    // {
    //   lazy: () => true,
    // },
  // ],
  // require.resolve('@babel/plugin-transform-modules-commonjs'),
  require.resolve('babel-plugin-transform-typescript-metadata'),
  [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
  // [require.resolve('@babel/plugin-transform-runtime')],
  [require.resolve('@babel/plugin-transform-object-rest-spread')],
  [require.resolve('@babel/plugin-transform-class-properties')],
];

module.exports = {
  presets,
  plugins,
  sourceMaps: true,
};
