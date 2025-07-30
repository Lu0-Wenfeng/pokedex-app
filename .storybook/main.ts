import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["../public"],
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async (config) => {
    // Add path aliases support
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@assets": path.resolve(__dirname, "../src/assets"),
        "@components": path.resolve(__dirname, "../src/components"),
        "@constants": path.resolve(__dirname, "../src/constants"),
        "@context": path.resolve(__dirname, "../src/context"),
        "@hooks": path.resolve(__dirname, "../src/hooks"),
        "@pages": path.resolve(__dirname, "../src/pages"),
        "@services": path.resolve(__dirname, "../src/services"),
        "@store": path.resolve(__dirname, "../src/store"),
        "@styles": path.resolve(__dirname, "../src/styles"),
        "@app-types": path.resolve(__dirname, "../src/types"),
        "@": path.resolve(__dirname, "../src"),
      };
    }

    return config;
  },
};

export default config;
