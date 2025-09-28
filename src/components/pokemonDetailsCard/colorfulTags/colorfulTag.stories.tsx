import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import ColorfulTag from './colorfulTag';

// All Pokemon types for comprehensive testing
const pokemonTypes = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
  'unknown',
  'shadow',
];

// Sample texts for different scenarios
const sampleTexts = [
  'Fire',
  'Water',
  'Grass',
  'Electric',
  'Psychic',
  'Ice',
  'Dragon',
  'Dark',
  'Fairy',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Bug',
  'Rock',
  'Ghost',
  'Steel',
  'Normal',
  'Unknown',
  'Shadow',
];

const meta: Meta<typeof ColorfulTag> = {
  title: 'Components/ColorfulTag',
  component: ColorfulTag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Colorful tag component that displays text with background colors based on Pokemon types. Uses the getPokcolor function to determine colors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      description: 'Text content to display in the tag',
      control: { type: 'text' },
    },
    type: {
      description: 'Pokemon type that determines the background color',
      control: {
        type: 'select',
        options: pokemonTypes,
      },
    },
    className: {
      description: 'Additional CSS class names',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Fire',
    type: 'fire',
    className: '',
  },
};

export const FireType: Story = {
  args: {
    text: 'Fire',
    type: 'fire',
  },
  parameters: {
    docs: {
      description: {
        story: 'Fire type tag with characteristic red/orange background color.',
      },
    },
  },
};

export const WaterType: Story = {
  args: {
    text: 'Water',
    type: 'water',
  },
  parameters: {
    docs: {
      description: {
        story: 'Water type tag with characteristic blue background color.',
      },
    },
  },
};

export const GrassType: Story = {
  args: {
    text: 'Grass',
    type: 'grass',
  },
  parameters: {
    docs: {
      description: {
        story: 'Grass type tag with characteristic green background color.',
      },
    },
  },
};

export const ElectricType: Story = {
  args: {
    text: 'Electric',
    type: 'electric',
  },
  parameters: {
    docs: {
      description: {
        story: 'Electric type tag with characteristic yellow background color.',
      },
    },
  },
};

export const PsychicType: Story = {
  args: {
    text: 'Psychic',
    type: 'psychic',
  },
  parameters: {
    docs: {
      description: {
        story: 'Psychic type tag with characteristic pink background color.',
      },
    },
  },
};

export const DragonType: Story = {
  args: {
    text: 'Dragon',
    type: 'dragon',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dragon type tag with characteristic purple/blue background color.',
      },
    },
  },
};

export const DarkType: Story = {
  args: {
    text: 'Dark',
    type: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dark type tag with characteristic dark background color.',
      },
    },
  },
};

export const FairyType: Story = {
  args: {
    text: 'Fairy',
    type: 'fairy',
  },
  parameters: {
    docs: {
      description: {
        story: 'Fairy type tag with characteristic pink background color.',
      },
    },
  },
};

export const UnknownType: Story = {
  args: {
    text: 'Unknown',
    type: 'unknown',
  },
  parameters: {
    docs: {
      description: {
        story: 'Unknown type tag with default background color for unrecognized types.',
      },
    },
  },
};

export const WithCustomClass: Story = {
  args: {
    text: 'Custom',
    type: 'fire',
    className: 'custom-tag-class',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag with custom CSS class for additional styling.',
      },
    },
  },
};

export const LongText: Story = {
  args: {
    text: 'Very Long Type Name',
    type: 'psychic',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag with longer text to test text wrapping and layout.',
      },
    },
  },
};

export const ShortText: Story = {
  args: {
    text: 'X',
    type: 'dragon',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag with very short text to test minimum sizing.',
      },
    },
  },
};

export const AllTypes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        maxWidth: '600px',
        padding: '20px',
      }}
    >
      {pokemonTypes.map((type, index) => (
        <ColorfulTag key={type} text={sampleTexts[index] ?? type} type={type} className="" />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available Pokemon types displayed together to show the complete color palette.',
      },
    },
  },
};

export const TypeComparison: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h4 style={{ marginBottom: '16px' }}>Primary Types</h4>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '20px',
        }}
      >
        {['fire', 'water', 'grass', 'electric'].map((type) => (
          <ColorfulTag key={type} text={type.charAt(0).toUpperCase() + type.slice(1)} type={type} />
        ))}
      </div>

      <h4 style={{ marginBottom: '16px' }}>Secondary Types</h4>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '20px',
        }}
      >
        {['psychic', 'dragon', 'dark', 'fairy'].map((type) => (
          <ColorfulTag key={type} text={type.charAt(0).toUpperCase() + type.slice(1)} type={type} />
        ))}
      </div>

      <h4 style={{ marginBottom: '16px' }}>Physical Types</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['fighting', 'rock', 'ground', 'steel'].map((type) => (
          <ColorfulTag key={type} text={type.charAt(0).toUpperCase() + type.slice(1)} type={type} />
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Organized display of Pokemon types grouped by category to show color relationships.',
      },
    },
  },
};

export const WithSpacing: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <ColorfulTag text="Fire" type="fire" className="pr-1" />
        <ColorfulTag text="Flying" type="flying" className="pr-1" />
        <span style={{ margin: '0 8px' }}>vs</span>
        <ColorfulTag text="Water" type="water" className="pr-1" />
        <ColorfulTag text="Ground" type="ground" className="pr-1" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tags with spacing classes as they appear in Pokemon type matchups.',
      },
    },
  },
};
