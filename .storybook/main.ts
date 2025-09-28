import type { StorybookConfig } from 'storybook-react-rsbuild';

const config: StorybookConfig = {
  framework: 'storybook-react-rsbuild',
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  webpackAddons: [],
  rsbuildFinal: (config) => {
    // Customize the final Rsbuild config here
    return config;
  },
};
export default config;
