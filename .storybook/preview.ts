import type { Preview } from "@storybook/react-webpack5";
import "rsuite/dist/rsuite.min.css";
import "../src/App.css";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      autodocs: "tag",
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#DEEDED",
        },
        {
          name: "dark",
          value: "#2E3156",
        },
      ],
    },
  },
};

export default preview;
