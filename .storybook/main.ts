import path from 'path';
import type { StorybookConfig } from 'storybook-react-rsbuild';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  framework: 'storybook-react-rsbuild',
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  webpackAddons: [],
  rsbuildFinal: async (config) => {
    // Customize the final Rsbuild config here
    if (config.server) {
      config.server = {
        ...config.server,
        host: 'localhost',
        port: 6006,
        open: true,
      };
    }

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@assets': path.resolve(__dirname, '../src/assets'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@constants': path.resolve(__dirname, '../src/constants'),
        '@context': path.resolve(__dirname, '../src/context'),
        '@hooks': path.resolve(__dirname, '../src/hooks'),
        '@pages': path.resolve(__dirname, '../src/pages'),
        '@services': path.resolve(__dirname, '../src/services'),
        '@store': path.resolve(__dirname, '../src/store'),
        '@styles': path.resolve(__dirname, '../src/styles'),
        '@app-types': path.resolve(__dirname, '../src/types'),
        '@': path.resolve(__dirname, '../src'),
      };
    }
    return config;
  },
  staticDirs: ['../public'],
  typescript: {
    check: false, // Disable type checking during development for better performance
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  core: {
    disableTelemetry: true,
  },
};
export default config;
