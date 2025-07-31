import type { Meta, StoryObj } from '@storybook/react-webpack5';
import AppTooltip from './tooltip';

const meta: Meta<typeof AppTooltip> = {
  title: 'Components/AppTooltip',
  component: AppTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "AppTooltip is a reusable tooltip component built on top of RSuite's Whisper and Popover components. It displays additional information when clicked and supports various placement options.",
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      description: 'Position of the tooltip relative to the trigger element',
      control: { type: 'select' },
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'topStart',
        'topEnd',
        'bottomStart',
        'bottomEnd',
        'leftStart',
        'leftEnd',
        'rightStart',
        'rightEnd',
      ],
    },
    data: {
      description: 'Content to display inside the tooltip',
      control: { type: 'text' },
    },
    name: {
      description: 'Text to display as the trigger element',
      control: { type: 'text' },
    },
    className: {
      description: 'CSS class for the trigger element',
      control: { type: 'text' },
    },
    tooltipClass: {
      description: 'CSS class for the tooltip popover',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placement: 'bottom',
    data: 'This is a helpful tooltip with additional information.',
    name: 'Click me',
    className: 'tooltip-trigger',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default tooltip with bottom placement and simple text content.',
      },
    },
  },
};

export const AllPlacements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        padding: '40px',
        minHeight: '300px',
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      <AppTooltip
        placement="top"
        data="Tooltip positioned at the top"
        name="Top"
        className="tooltip-demo"
      />
      <AppTooltip
        placement="topStart"
        data="Tooltip positioned at the top start"
        name="Top Start"
        className="tooltip-demo"
      />
      <AppTooltip
        placement="topEnd"
        data="Tooltip positioned at the top end"
        name="Top End"
        className="tooltip-demo"
      />
      <AppTooltip
        placement="bottom"
        data="Tooltip positioned at the bottom"
        name="Bottom"
        className="tooltip-demo"
      />
      <AppTooltip
        placement="bottomStart"
        data="Tooltip positioned at the bottom start"
        name="Bottom Start"
        className="tooltip-demo"
      />
      <AppTooltip
        placement="bottomEnd"
        data="Tooltip positioned at the bottom end"
        name="Bottom End"
        className="tooltip-demo"
      />
      <AppTooltip
        placement="left"
        data="Tooltip positioned to the left"
        name="Left"
        className="tooltip-demo"
      />
      <AppTooltip
        placement="leftStart"
        data="Tooltip positioned at the left start"
        name="Left Start"
        className="tooltip-demo"
      />
      <AppTooltip
        placement="leftEnd"
        data="Tooltip positioned at the left end"
        name="Left End"
        className="tooltip-demo"
      />
      <AppTooltip
        placement="right"
        data="Tooltip positioned to the right"
        name="Right"
        className="tooltip-demo"
      />
      <AppTooltip
        placement="rightStart"
        data="Tooltip positioned at the right start"
        name="Right Start"
        className="tooltip-demo"
      />
      <AppTooltip
        placement="rightEnd"
        data="Tooltip positioned at the right end"
        name="Right End"
        className="tooltip-demo"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates all available placement options for the tooltip. Click on any trigger to see the tooltip positioning.',
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    placement: 'bottom',
    data: 'This is a much longer tooltip content that demonstrates how the component handles extended text. It can contain multiple sentences and will wrap appropriately within the popover container. This helps users understand how the tooltip behaves with substantial amounts of information.',
    name: 'Long content tooltip',
    className: 'tooltip-trigger',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tooltip with longer content to demonstrate text wrapping and sizing.',
      },
    },
  },
};

export const WithCustomStyling: Story = {
  args: {
    placement: 'top',
    data: 'This tooltip has custom styling applied.',
    name: 'Styled tooltip',
    className: 'custom-trigger',
    tooltipClass: 'custom-tooltip',
  },
  render: args => (
    <div>
      <style>
        {`
          .custom-trigger {
            background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: transform 0.2s ease;
          }
          .custom-trigger:hover {
            transform: translateY(-2px);
          }
          .custom-tooltip {
            background: #2c3e50 !important;
            color: #ecf0f1 !important;
            border-radius: 8px !important;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
          }
          .custom-tooltip p {
            margin: 0 !important;
            font-weight: 500 !important;
          }
        `}
      </style>
      <AppTooltip {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tooltip with custom CSS styling for both the trigger element and the tooltip popover.',
      },
    },
  },
};

export const PokemonExample: Story = {
  args: {
    placement: 'bottom',
    data: 'Bulbasaur is a Grass/Poison-type Pokémon introduced in Generation I. It is the first Pokémon in the National Pokédex. Bulbasaur can be chosen as a starter Pokémon in the Kanto region.',
    name: 'read more',
    className: 'load-more',
    tooltipClass: 'tooltip-popover',
  },
  render: args => (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <strong>Bulbasaur</strong> - The Seed Pokémon
      </div>
      <div style={{ color: '#666', fontSize: '14px' }}>
        <span>
          A strange seed was planted on its back at birth. The plant sprouts and
          grows with this Pokémon...
        </span>
        <span style={{ margin: '0 5px' }}>...</span>
        <AppTooltip {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Real-world example showing how the tooltip is used in the Pokémon app to display extended descriptions.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h4 style={{ marginBottom: '20px' }}>Interactive Tooltip Demo</h4>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        Click on the buttons below to see tooltips in action:
      </p>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <AppTooltip
          placement="top"
          data="🎮 Gaming tip: Use the arrow keys to navigate!"
          name="Gaming Tip"
          className="demo-button"
        />
        <AppTooltip
          placement="right"
          data="📊 This feature shows detailed statistics and analytics."
          name="Statistics"
          className="demo-button"
        />
        <AppTooltip
          placement="left"
          data="⚙️ Access advanced settings and configuration options here."
          name="Settings"
          className="demo-button"
        />
        <AppTooltip
          placement="bottom"
          data="💡 Pro tip: Hold Shift while clicking for additional options!"
          name="Pro Tip"
          className="demo-button"
        />
      </div>
      <style>
        {`
          .demo-button {
            background: #3498db;
            color: white;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.2s ease;
          }
          .demo-button:hover {
            background: #2980b9;
          }
        `}
      </style>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demonstration with multiple tooltips showing different use cases and content types.',
      },
    },
  },
};
