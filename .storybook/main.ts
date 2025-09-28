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
    return config;
  },
  staticDirs: ['../public'],
  typescript: {
    check: false, // Disable type checking during development for better performance
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      // Add path mapping for TypeScript to resolve aliases
      compilerOptions: {
        baseUrl: path.resolve(__dirname, '../'),
        paths: {
          '@assets/*': ['src/assets/*'],
          '@components/*': ['src/components/*'],
          '@constants/*': ['src/constants/*'],
          '@context/*': ['src/context/*'],
          '@hooks/*': ['src/hooks/*'],
          '@pages/*': ['src/pages/*'],
          '@services/*': ['src/services/*'],
          '@store/*': ['src/store/*'],
          '@styles/*': ['src/styles/*'],
          '@app-types/*': ['src/types/*'],
          '@/*': ['src/*'],
        },
      },
    },
  },
  core: {
    disableTelemetry: true,
  },
};
export default config;
