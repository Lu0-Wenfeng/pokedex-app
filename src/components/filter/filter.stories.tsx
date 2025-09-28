import React from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { PokemonProvider } from '../../context/pokemonContext/pokemon.provider';
import AppFilter from './filter';

// Mock context wrapper for Storybook
const FilterWrapper = ({
  isFilterEnable,
  ...props
}: {
  isFilterEnable?: (isEnable: boolean) => void;
}) => {
  const handleFilterEnable = (isEnable: boolean) => {
    console.log('Filter enabled:', isEnable);
    if (isFilterEnable) {
      isFilterEnable(isEnable);
    }
  };

  return (
    <PokemonProvider>
      <div style={{ width: '100%', padding: '20px', backgroundColor: '#DEEDED' }}>
        <AppFilter isFilterEnable={handleFilterEnable} {...props} />
        <div
          style={{
            marginTop: '16px',
            padding: '8px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          <strong>Note:</strong> This component requires Pokemon context. Filter actions will be
          logged to console.
        </div>
      </div>
    </PokemonProvider>
  );
};

const meta: Meta<typeof AppFilter> = {
  title: 'Components/AppFilter',
  component: AppFilter,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main filter component that combines search, type filter, and gender filter. Requires PokemonContext to function properly.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isFilterEnable: {
      description: 'Callback function triggered when filter state changes',
      action: 'filter-enabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <FilterWrapper {...args} />,
  args: {
    isFilterEnable: (isEnable: boolean) => console.log('Default filter enabled:', isEnable),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default filter component with search, type, and gender filters.',
      },
    },
  },
};

export const WithCallback: Story = {
  render: (args) => <FilterWrapper {...args} />,
  args: {
    isFilterEnable: (isEnable: boolean) => {
      console.log('Filter state changed:', isEnable);
      // eslint-disable-next-line no-alert
      alert(`Filter ${isEnable ? 'enabled' : 'disabled'}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter component with custom callback that shows alerts when filter state changes.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [filterState, setFilterState] = React.useState(false);

    const handleFilterEnable = (isEnable: boolean) => {
      setFilterState(isEnable);
      console.log('Interactive filter enabled:', isEnable);
      if (args.isFilterEnable) {
        args.isFilterEnable(isEnable);
      }
    };

    return (
      <PokemonProvider>
        <div style={{ width: '100%', padding: '20px', backgroundColor: '#DEEDED' }}>
          <AppFilter isFilterEnable={handleFilterEnable} />
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: filterState ? '#d4edda' : '#f8d7da',
              borderRadius: '4px',
              border: `1px solid ${filterState ? '#c3e6cb' : '#f5c6cb'}`,
            }}
          >
            <strong>Filter Status:</strong> {filterState ? 'Active' : 'Inactive'}
            <br />
            <small>
              Try searching for Pokemon or selecting types/genders to see the status change.
            </small>
          </div>
        </div>
      </PokemonProvider>
    );
  },
  args: {
    isFilterEnable: (isEnable: boolean) => console.log('Interactive callback:', isEnable),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive filter component that shows real-time filter status changes.',
      },
    },
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <div style={{ width: '100vw', backgroundColor: '#DEEDED', minHeight: '200px' }}>
      <FilterWrapper {...args} />
    </div>
  ),
  args: {
    isFilterEnable: (isEnable: boolean) => console.log('Full width filter enabled:', isEnable),
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Filter component displayed at full viewport width, as it appears in the main application.',
      },
    },
  },
};

export const WithoutCallback: Story = {
  render: () => (
    <PokemonProvider>
      <div style={{ width: '100%', padding: '20px', backgroundColor: '#DEEDED' }}>
        <AppFilter isFilterEnable={() => {}} />
        <div
          style={{
            marginTop: '16px',
            padding: '8px',
            backgroundColor: '#fff3cd',
            borderRadius: '4px',
            border: '1px solid #ffeaa7',
          }}
        >
          <strong>Warning:</strong> No callback provided - filter actions will have no effect.
        </div>
      </div>
    </PokemonProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Filter component with empty callback function - useful for testing UI without side effects.',
      },
    },
  },
};
