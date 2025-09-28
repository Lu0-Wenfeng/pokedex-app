import type { Preview } from 'storybook-react-rsbuild';

import 'rsuite/dist/rsuite.min.css';
import '../src/App.css';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
