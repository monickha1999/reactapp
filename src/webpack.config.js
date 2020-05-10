const webpack = require('webpack');
const _ = require('lodash');
const WebpackNotifierPlugin = require('webpack-notifier');
const WebpackShellPlugin = require('webpack-shell-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = ({ config }) => {
  config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx', '.json');
  config.module.rules.push(
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: { cacheDirectory: true }
        },
       

        {
          loader: 'ts-loader',
          options: { transpileOnly: true }
        }
      ]
    },
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: '@storybook/addon-storysource/loader',
          options: { parser: 'typescript' }
        }
      ],
      enforce: 'pre'
    }
  );
  config.node = {
    fs: 'empty',
    path: 'empty'
  };
  _.remove(config.plugins, plugin =>
    ['DefinePlugin', 'ProgressPlugin'].includes(plugin.constructor.name)
  );
  config.plugins.push(
    new webpack.ProvidePlugin({ React: 'react' }),
    new webpack.DefinePlugin({
      'process.env.LAUNCHER': JSON.stringify(process.env.LAUNCHER)
    }),
    new webpack.WatchIgnorePlugin([/\.jsx?$/, /\.d\.ts$/]),
    new FilterWarningsPlugin({
      // unable to re-export
      exclude: /export .* was not found in .*/
    }),
    new WebpackNotifierPlugin({ title: 'storybook' }),
    new WebpackShellPlugin({
      onBuildEnd: [
        'chrome.exe ' + `http://localhost:${process.env.STORYBOOK_PORT}`
      ]
    })
  );
  return config;
};
