const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');
const { withMetroConfig } = require('react-native-monorepo-config');

const root = path.resolve(__dirname, '..');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// Ensure a single copy of react/react-native is resolved from the example app
defaultConfig.resolver = {
  ...defaultConfig.resolver,
  extraNodeModules: {
    'react': path.resolve(__dirname, 'node_modules/react'),
    'react-native': path.resolve(__dirname, 'node_modules/react-native'),
  },
};

module.exports = withMetroConfig(defaultConfig, {
  root,
  dirname: __dirname,
});
