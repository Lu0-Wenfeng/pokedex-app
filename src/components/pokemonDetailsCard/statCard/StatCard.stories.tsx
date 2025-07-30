import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { PokemonStat } from '@app-types/pokemon.types';
import StatCard from './statCard';

// Mock Pokemon stats data
const bulbasaurStats: PokemonStat[] = [
  {
    base_stat: 45,
    effort: 0,
    stat: {
      name: 'hp',
      url: 'https://pokeapi.co/api/v2/stat/1/',
    },
  },
  {
    base_stat: 49,
    effort: 0,
    stat: {
      name: 'attack',
      url: 'https://pokeapi.co/api/v2/stat/2/',
    },
  },
  {
    base_stat: 49,
    effort: 0,
    stat: {
      name: 'defense',
      url: 'https://pokeapi.co/api/v2/stat/3/',
    },
  },
  {
    base_stat: 65,
    effort: 1,
    stat: {
      name: 'special-attack',
      url: 'https://pokeapi.co/api/v2/stat/4/',
    },
  },
  {
    base_stat: 65,
    effort: 0,
    stat: {
      name: 'special-defense',
      url: 'https://pokeapi.co/api/v2/stat/5/',
    },
  },
  {
    base_stat: 45,
    effort: 0,
    stat: {
      name: 'speed',
      url: 'https://pokeapi.co/api/v2/stat/6/',
    },
  },
];

const charizardStats: PokemonStat[] = [
  {
    base_stat: 78,
    effort: 0,
    stat: {
      name: 'hp',
      url: 'https://pokeapi.co/api/v2/stat/1/',
    },
  },
  {
    base_stat: 84,
    effort: 0,
    stat: {
      name: 'attack',
      url: 'https://pokeapi.co/api/v2/stat/2/',
    },
  },
  {
    base_stat: 78,
    effort: 0,
    stat: {
      name: 'defense',
      url: 'https://pokeapi.co/api/v2/stat/3/',
    },
  },
  {
    base_stat: 109,
    effort: 3,
    stat: {
      name: 'special-attack',
      url: 'https://pokeapi.co/api/v2/stat/4/',
    },
  },
  {
    base_stat: 85,
    effort: 0,
    stat: {
      name: 'special-defense',
      url: 'https://pokeapi.co/api/v2/stat/5/',
    },
  },
  {
    base_stat: 100,
    effort: 0,
    stat: {
      name: 'speed',
      url: 'https://pokeapi.co/api/v2/stat/6/',
    },
  },
];

const pikachuStats: PokemonStat[] = [
  {
    base_stat: 35,
    effort: 0,
    stat: {
      name: 'hp',
      url: 'https://pokeapi.co/api/v2/stat/1/',
    },
  },
  {
    base_stat: 55,
    effort: 0,
    stat: {
      name: 'attack',
      url: 'https://pokeapi.co/api/v2/stat/2/',
    },
  },
  {
    base_stat: 40,
    effort: 0,
    stat: {
      name: 'defense',
      url: 'https://pokeapi.co/api/v2/stat/3/',
    },
  },
  {
    base_stat: 50,
    effort: 0,
    stat: {
      name: 'special-attack',
      url: 'https://pokeapi.co/api/v2/stat/4/',
    },
  },
  {
    base_stat: 50,
    effort: 0,
    stat: {
      name: 'special-defense',
      url: 'https://pokeapi.co/api/v2/stat/5/',
    },
  },
  {
    base_stat: 90,
    effort: 2,
    stat: {
      name: 'speed',
      url: 'https://pokeapi.co/api/v2/stat/6/',
    },
  },
];

// High stats for legendary Pokemon
const legendaryStats: PokemonStat[] = [
  {
    base_stat: 106,
    effort: 0,
    stat: {
      name: 'hp',
      url: 'https://pokeapi.co/api/v2/stat/1/',
    },
  },
  {
    base_stat: 110,
    effort: 0,
    stat: {
      name: 'attack',
      url: 'https://pokeapi.co/api/v2/stat/2/',
    },
  },
  {
    base_stat: 90,
    effort: 0,
    stat: {
      name: 'defense',
      url: 'https://pokeapi.co/api/v2/stat/3/',
    },
  },
  {
    base_stat: 154,
    effort: 3,
    stat: {
      name: 'special-attack',
      url: 'https://pokeapi.co/api/v2/stat/4/',
    },
  },
  {
    base_stat: 90,
    effort: 0,
    stat: {
      name: 'special-defense',
      url: 'https://pokeapi.co/api/v2/stat/5/',
    },
  },
  {
    base_stat: 130,
    effort: 0,
    stat: {
      name: 'speed',
      url: 'https://pokeapi.co/api/v2/stat/6/',
    },
  },
];

// Low stats for weak Pokemon
const weakStats: PokemonStat[] = [
  {
    base_stat: 20,
    effort: 0,
    stat: {
      name: 'hp',
      url: 'https://pokeapi.co/api/v2/stat/1/',
    },
  },
  {
    base_stat: 10,
    effort: 0,
    stat: {
      name: 'attack',
      url: 'https://pokeapi.co/api/v2/stat/2/',
    },
  },
  {
    base_stat: 55,
    effort: 1,
    stat: {
      name: 'defense',
      url: 'https://pokeapi.co/api/v2/stat/3/',
    },
  },
  {
    base_stat: 25,
    effort: 0,
    stat: {
      name: 'special-attack',
      url: 'https://pokeapi.co/api/v2/stat/4/',
    },
  },
  {
    base_stat: 25,
    effort: 0,
    stat: {
      name: 'special-defense',
      url: 'https://pokeapi.co/api/v2/stat/5/',
    },
  },
  {
    base_stat: 15,
    effort: 0,
    stat: {
      name: 'speed',
      url: 'https://pokeapi.co/api/v2/stat/6/',
    },
  },
];

// Balanced stats
const balancedStats: PokemonStat[] = [
  {
    base_stat: 80,
    effort: 0,
    stat: {
      name: 'hp',
      url: 'https://pokeapi.co/api/v2/stat/1/',
    },
  },
  {
    base_stat: 80,
    effort: 0,
    stat: {
      name: 'attack',
      url: 'https://pokeapi.co/api/v2/stat/2/',
    },
  },
  {
    base_stat: 80,
    effort: 0,
    stat: {
      name: 'defense',
      url: 'https://pokeapi.co/api/v2/stat/3/',
    },
  },
  {
    base_stat: 80,
    effort: 0,
    stat: {
      name: 'special-attack',
      url: 'https://pokeapi.co/api/v2/stat/4/',
    },
  },
  {
    base_stat: 80,
    effort: 0,
    stat: {
      name: 'special-defense',
      url: 'https://pokeapi.co/api/v2/stat/5/',
    },
  },
  {
    base_stat: 80,
    effort: 0,
    stat: {
      name: 'speed',
      url: 'https://pokeapi.co/api/v2/stat/6/',
    },
  },
];

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Stat card component that displays Pokemon base stats with progress bars. Shows HP, Attack, Defense, Special Attack, Special Defense, and Speed with visual progress indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    stats: {
      description:
        'Array of Pokemon stat objects containing base stat values and names',
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stats: bulbasaurStats,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default stat card showing Bulbasaur's balanced starter Pokemon stats.",
      },
    },
  },
};

export const Charizard: Story = {
  args: {
    stats: charizardStats,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Stat card showing Charizard's high offensive stats, particularly Special Attack.",
      },
    },
  },
};

export const Pikachu: Story = {
  args: {
    stats: pikachuStats,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Stat card showing Pikachu's speed-focused stat distribution with low HP.",
      },
    },
  },
};

export const LegendaryPokemon: Story = {
  args: {
    stats: legendaryStats,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Stat card showing legendary Pokemon with very high stats, especially Special Attack.',
      },
    },
  },
};

export const WeakPokemon: Story = {
  args: {
    stats: weakStats,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Stat card showing a weak Pokemon with low stats across the board, except for Defense.',
      },
    },
  },
};

export const BalancedStats: Story = {
  args: {
    stats: balancedStats,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Stat card showing perfectly balanced stats at 80 for all categories.',
      },
    },
  },
};

export const EmptyStats: Story = {
  args: {
    stats: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Stat card with empty stats array - shows only the header.',
      },
    },
  },
};

export const SingleStat: Story = {
  args: {
    stats: bulbasaurStats[0] ? [bulbasaurStats[0]] : [], // Only HP
  },
  parameters: {
    docs: {
      description: {
        story:
          'Stat card showing only a single stat (HP) for testing minimal data.',
      },
    },
  },
};

export const FullWidth: Story = {
  render: args => (
    <div
      style={{
        width: '100%',
        maxWidth: '500px',
        padding: '20px',
        backgroundColor: '#DEEDED',
      }}
    >
      <StatCard {...args} />
    </div>
  ),
  args: {
    stats: charizardStats,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Stat card displayed at full width showing responsive layout.',
      },
    },
  },
};

export const StatComparison: Story = {
  render: () => (
    <div style={{ padding: '20px', backgroundColor: '#DEEDED' }}>
      <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>
        Pokemon Stat Comparison
      </h4>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        <div>
          <h5 style={{ marginBottom: '10px', textAlign: 'center' }}>
            Bulbasaur (Starter)
          </h5>
          <StatCard stats={bulbasaurStats} />
        </div>

        <div>
          <h5 style={{ marginBottom: '10px', textAlign: 'center' }}>
            Charizard (Evolved)
          </h5>
          <StatCard stats={charizardStats} />
        </div>

        <div>
          <h5 style={{ marginBottom: '10px', textAlign: 'center' }}>
            Pikachu (Speed Focus)
          </h5>
          <StatCard stats={pikachuStats} />
        </div>

        <div>
          <h5 style={{ marginBottom: '10px', textAlign: 'center' }}>
            Legendary Pokemon
          </h5>
          <StatCard stats={legendaryStats} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Side-by-side comparison of different Pokemon stat distributions showing various archetypes.',
      },
    },
  },
};

export const StatTypes: Story = {
  render: () => (
    <div style={{ padding: '20px', backgroundColor: '#DEEDED' }}>
      <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>
        Stat Type Examples
      </h4>

      <div style={{ marginBottom: '30px' }}>
        <h5 style={{ marginBottom: '10px' }}>Tank (High HP & Defense)</h5>
        <StatCard
          stats={[
            { base_stat: 250, effort: 3, stat: { name: 'hp', url: '' } },
            { base_stat: 5, effort: 0, stat: { name: 'attack', url: '' } },
            { base_stat: 230, effort: 3, stat: { name: 'defense', url: '' } },
            {
              base_stat: 10,
              effort: 0,
              stat: { name: 'special-attack', url: '' },
            },
            {
              base_stat: 230,
              effort: 0,
              stat: { name: 'special-defense', url: '' },
            },
            { base_stat: 5, effort: 0, stat: { name: 'speed', url: '' } },
          ]}
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h5 style={{ marginBottom: '10px' }}>
          Glass Cannon (High Attack, Low Defense)
        </h5>
        <StatCard
          stats={[
            { base_stat: 1, effort: 0, stat: { name: 'hp', url: '' } },
            { base_stat: 165, effort: 3, stat: { name: 'attack', url: '' } },
            { base_stat: 10, effort: 0, stat: { name: 'defense', url: '' } },
            {
              base_stat: 95,
              effort: 0,
              stat: { name: 'special-attack', url: '' },
            },
            {
              base_stat: 10,
              effort: 0,
              stat: { name: 'special-defense', url: '' },
            },
            { base_stat: 150, effort: 0, stat: { name: 'speed', url: '' } },
          ]}
        />
      </div>

      <div>
        <h5 style={{ marginBottom: '10px' }}>
          Support (Balanced with High Special Defense)
        </h5>
        <StatCard
          stats={[
            { base_stat: 100, effort: 0, stat: { name: 'hp', url: '' } },
            { base_stat: 50, effort: 0, stat: { name: 'attack', url: '' } },
            { base_stat: 50, effort: 0, stat: { name: 'defense', url: '' } },
            {
              base_stat: 75,
              effort: 0,
              stat: { name: 'special-attack', url: '' },
            },
            {
              base_stat: 135,
              effort: 3,
              stat: { name: 'special-defense', url: '' },
            },
            { base_stat: 95, effort: 0, stat: { name: 'speed', url: '' } },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Examples of different Pokemon archetypes showing extreme stat distributions.',
      },
    },
  },
};

export const ProgressBarTest: Story = {
  render: () => (
    <div style={{ padding: '20px', backgroundColor: '#DEEDED' }}>
      <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>
        Progress Bar Visualization Test
      </h4>

      <div style={{ marginBottom: '20px' }}>
        <h5 style={{ marginBottom: '10px' }}>Low Values (0-25)</h5>
        <StatCard
          stats={[
            { base_stat: 1, effort: 0, stat: { name: 'hp', url: '' } },
            { base_stat: 5, effort: 0, stat: { name: 'attack', url: '' } },
            { base_stat: 10, effort: 0, stat: { name: 'defense', url: '' } },
            {
              base_stat: 15,
              effort: 0,
              stat: { name: 'special-attack', url: '' },
            },
            {
              base_stat: 20,
              effort: 0,
              stat: { name: 'special-defense', url: '' },
            },
            { base_stat: 25, effort: 0, stat: { name: 'speed', url: '' } },
          ]}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h5 style={{ marginBottom: '10px' }}>Medium Values (50-75)</h5>
        <StatCard
          stats={[
            { base_stat: 50, effort: 0, stat: { name: 'hp', url: '' } },
            { base_stat: 55, effort: 0, stat: { name: 'attack', url: '' } },
            { base_stat: 60, effort: 0, stat: { name: 'defense', url: '' } },
            {
              base_stat: 65,
              effort: 0,
              stat: { name: 'special-attack', url: '' },
            },
            {
              base_stat: 70,
              effort: 0,
              stat: { name: 'special-defense', url: '' },
            },
            { base_stat: 75, effort: 0, stat: { name: 'speed', url: '' } },
          ]}
        />
      </div>

      <div>
        <h5 style={{ marginBottom: '10px' }}>High Values (100+)</h5>
        <StatCard
          stats={[
            { base_stat: 100, effort: 0, stat: { name: 'hp', url: '' } },
            { base_stat: 120, effort: 0, stat: { name: 'attack', url: '' } },
            { base_stat: 140, effort: 0, stat: { name: 'defense', url: '' } },
            {
              base_stat: 160,
              effort: 0,
              stat: { name: 'special-attack', url: '' },
            },
            {
              base_stat: 180,
              effort: 0,
              stat: { name: 'special-defense', url: '' },
            },
            { base_stat: 200, effort: 0, stat: { name: 'speed', url: '' } },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Test of progress bar visualization at different stat value ranges.',
      },
    },
  },
};
