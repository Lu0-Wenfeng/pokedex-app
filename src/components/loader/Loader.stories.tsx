import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Apploader from './loader';

const meta: Meta<typeof Apploader> = {
  title: 'Components/Loader',
  component: Apploader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "Loading component using RSuite's Loader. Used throughout the app to indicate loading states.",
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      description:
        'Additional CSS class names to apply to the loader container',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomClass: Story = {
  args: {
    className: 'custom-loader',
  },
};

export const AppLoaderWrapper: Story = {
  args: {
    className: 'app-loader-wrapper',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader with app-loader-wrapper class for full-screen loading (70vh height, centered).',
      },
    },
  },
};

export const LoadMoreLoader: Story = {
  args: {
    className: 'loadmore-loader',
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loader used for 'Load More' functionality when fetching additional Pokemon data.",
      },
    },
  },
};

export const InContainer: Story = {
  render: args => (
    <div
      style={{
        width: '400px',
        height: '200px',
        border: '2px dashed #ccc',
        position: 'relative',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div style={{ padding: '20px' }}>
        <h4>Container with Loader</h4>
        <p>This shows how the loader appears within a container.</p>
        <Apploader {...args} />
      </div>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Loader displayed within a container to show relative positioning.',
      },
    },
  },
};

export const CenteredInCard: Story = {
  render: args => (
    <div
      style={{
        width: '300px',
        height: '200px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Apploader {...args} />
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Loader centered within a card-like container, typical for loading states in cards.',
      },
    },
  },
};

export const WithBackgroundColor: Story = {
  render: args => (
    <div
      style={{
        width: '250px',
        height: '150px',
        backgroundColor: '#2E3156',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Apploader {...args} />
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Loader on dark background (using app's primary color #2E3156).",
      },
    },
  },
};

export const MultipleLoaders: Story = {
  render: args => (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h5>Default</h5>
        <Apploader {...args} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h5>With Custom Class</h5>
        <Apploader {...args} className="custom-loader" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h5>Load More</h5>
        <Apploader {...args} className="loadmore-loader" />
      </div>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Multiple loader instances showing different variations side by side.',
      },
    },
  },
};

export const FullScreenLoader: Story = {
  render: args => (
    <div
      style={{
        width: '100vw',
        height: '70vh',
        position: 'relative',
        backgroundColor: '#DEEDED',
        border: '2px dashed #ccc',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          fontSize: '14px',
          color: '#666',
        }}
      >
        Simulated full-screen loader (70vh height)
      </div>
      <Apploader {...args} className="app-loader-wrapper" />
    </div>
  ),
  args: {},
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Full-screen loader simulation showing how it appears during app loading states.',
      },
    },
  },
};
