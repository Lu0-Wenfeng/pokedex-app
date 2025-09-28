import type { Pokemon, PokemonSpecies } from '@app-types/pokemon.types';
import React from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import DetailsHeader from './detailsHeader';

// Mock Pokemon data (reusing from PokemonCard stories)
const bulbasaur: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  order: 1,
  is_default: true,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    front_shiny: null,
    front_female: null,
    front_shiny_female: null,
    back_default: null,
    back_shiny: null,
    back_female: null,
    back_shiny_female: null,
    other: {
      dream_world: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
        front_female: null,
      },
      home: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png',
        front_female: null,
        front_shiny: null,
        front_shiny_female: null,
      },
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        front_shiny: null,
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
    {
      slot: 2,
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/',
      },
    },
  ],
  stats: [],
  abilities: [],
  moves: [],
  species: {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  },
  location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/1/encounters',
};

const charizard: Pokemon = {
  id: 6,
  name: 'charizard',
  height: 17,
  weight: 905,
  base_experience: 267,
  order: 7,
  is_default: true,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    front_shiny: null,
    front_female: null,
    front_shiny_female: null,
    back_default: null,
    back_shiny: null,
    back_female: null,
    back_shiny_female: null,
    other: {
      dream_world: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg',
        front_female: null,
      },
      home: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png',
        front_female: null,
        front_shiny: null,
        front_shiny_female: null,
      },
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
        front_shiny: null,
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'fire',
        url: 'https://pokeapi.co/api/v2/type/10/',
      },
    },
    {
      slot: 2,
      type: {
        name: 'flying',
        url: 'https://pokeapi.co/api/v2/type/3/',
      },
    },
  ],
  stats: [],
  abilities: [],
  moves: [],
  species: {
    name: 'charizard',
    url: 'https://pokeapi.co/api/v2/pokemon-species/6/',
  },
  location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/6/encounters',
};

const pikachu: Pokemon = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  base_experience: 112,
  order: 35,
  is_default: true,
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    front_shiny: null,
    front_female: null,
    front_shiny_female: null,
    back_default: null,
    back_shiny: null,
    back_female: null,
    back_shiny_female: null,
    other: {
      dream_world: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
        front_female: null,
      },
      home: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png',
        front_female: null,
        front_shiny: null,
        front_shiny_female: null,
      },
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        front_shiny: null,
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
  stats: [],
  abilities: [],
  moves: [],
  species: {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
  },
  location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/25/encounters',
};

// Mock species data with descriptions
const bulbasaurSpecies: PokemonSpecies = {
  id: 1,
  name: 'bulbasaur',
  order: 1,
  gender_rate: 1,
  capture_rate: 45,
  base_happiness: 50,
  is_baby: false,
  is_legendary: false,
  is_mythical: false,
  hatch_counter: 20,
  has_gender_differences: false,
  forms_switchable: false,
  growth_rate: {
    name: 'medium-slow',
    url: 'https://pokeapi.co/api/v2/growth-rate/4/',
  },
  pokedex_numbers: [],
  egg_groups: [],
  color: {
    name: 'green',
    url: 'https://pokeapi.co/api/v2/pokemon-color/5/',
  },
  shape: {
    name: 'quadruped',
    url: 'https://pokeapi.co/api/v2/pokemon-shape/8/',
  },
  evolves_from_species: null,
  evolution_chain: {
    url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
  },
  habitat: {
    name: 'grassland',
    url: 'https://pokeapi.co/api/v2/pokemon-habitat/3/',
  },
  generation: {
    name: 'generation-i',
    url: 'https://pokeapi.co/api/v2/generation/1/',
  },
  names: [],
  flavor_text_entries: [
    {
      flavor_text:
        'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
      version: {
        name: 'red',
        url: 'https://pokeapi.co/api/v2/version/1/',
      },
    },
    {
      flavor_text:
        'It can go for days without eating a single morsel. In the bulb on its back, it stores energy.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
      version: {
        name: 'blue',
        url: 'https://pokeapi.co/api/v2/version/2/',
      },
    },
  ],
  form_descriptions: [],
  genera: [],
  varieties: [],
};

const longDescriptionSpecies: PokemonSpecies = {
  ...bulbasaurSpecies,
  flavor_text_entries: [
    {
      flavor_text:
        "This is a very long description that exceeds the 363 character limit to test the tooltip functionality. It contains detailed information about the Pokemon's behavior, habitat, abilities, and evolutionary characteristics. The description continues with more details about its unique features, battle capabilities, and relationship with trainers. This extended text should trigger the 'read more' tooltip when displayed in the component, allowing users to see the full description by hovering over the read more link.",
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
      version: {
        name: 'red',
        url: 'https://pokeapi.co/api/v2/version/1/',
      },
    },
  ],
};

const meta: Meta<typeof DetailsHeader> = {
  title: 'Components/DetailsHeader',
  component: DetailsHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Pokemon details header component that displays Pokemon card, name, ID, navigation controls, and description with tooltip for long text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Pokemon data object containing basic information',
      control: { type: 'object' },
    },
    speciesData: {
      description: 'Optional Pokemon species data containing descriptions and additional details',
      control: { type: 'object' },
    },
    backClick: {
      description: 'Callback function for back navigation button',
      action: 'back-clicked',
    },
    closeClick: {
      description: 'Callback function for close button',
      action: 'close-clicked',
    },
    forwardClick: {
      description: 'Callback function for forward navigation button',
      action: 'forward-clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: bulbasaur,
    speciesData: bulbasaurSpecies,
    backClick: () => console.log('Back clicked'),
    closeClick: () => console.log('Close clicked'),
    forwardClick: () => console.log('Forward clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default details header with Bulbasaur data and species information.',
      },
    },
  },
};

export const Charizard: Story = {
  args: {
    data: charizard,
    speciesData: {
      ...bulbasaurSpecies,
      id: 6,
      name: 'charizard',
      flavor_text_entries: [
        {
          flavor_text:
            'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.',
          language: {
            name: 'en',
            url: 'https://pokeapi.co/api/v2/language/9/',
          },
          version: { name: 'red', url: 'https://pokeapi.co/api/v2/version/1/' },
        },
      ],
    },
    backClick: () => console.log('Charizard back clicked'),
    closeClick: () => console.log('Charizard close clicked'),
    forwardClick: () => console.log('Charizard forward clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Details header showing Charizard with fire-type description.',
      },
    },
  },
};

export const Pikachu: Story = {
  args: {
    data: pikachu,
    speciesData: {
      ...bulbasaurSpecies,
      id: 25,
      name: 'pikachu',
      flavor_text_entries: [
        {
          flavor_text:
            'When several of these Pokémon gather, their electricity could build and cause lightning storms.',
          language: {
            name: 'en',
            url: 'https://pokeapi.co/api/v2/language/9/',
          },
          version: { name: 'red', url: 'https://pokeapi.co/api/v2/version/1/' },
        },
      ],
    },
    backClick: () => console.log('Pikachu back clicked'),
    closeClick: () => console.log('Pikachu close clicked'),
    forwardClick: () => console.log('Pikachu forward clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Details header showing Pikachu with electric-type description.',
      },
    },
  },
};

export const WithoutSpeciesData: Story = {
  args: {
    data: bulbasaur,
    backClick: () => console.log('Back clicked - no species'),
    closeClick: () => console.log('Close clicked - no species'),
    forwardClick: () => console.log('Forward clicked - no species'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Details header without species data - no description will be shown.',
      },
    },
  },
};

export const WithLongDescription: Story = {
  args: {
    data: bulbasaur,
    speciesData: longDescriptionSpecies,
    backClick: () => console.log('Back clicked - long desc'),
    closeClick: () => console.log('Close clicked - long desc'),
    forwardClick: () => console.log('Forward clicked - long desc'),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Details header with long description that triggers the 'read more' tooltip functionality.",
      },
    },
  },
};

export const WithoutNavigation: Story = {
  args: {
    data: pikachu,
    speciesData: {
      ...bulbasaurSpecies,
      id: 25,
      name: 'pikachu',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Details header without navigation callbacks - buttons will not respond to clicks.',
      },
    },
  },
};

export const HighIdPokemon: Story = {
  args: {
    data: {
      ...pikachu,
      id: 1001,
      name: 'future-pokemon',
    },
    speciesData: {
      ...bulbasaurSpecies,
      id: 1001,
      name: 'future-pokemon',
      flavor_text_entries: [
        {
          flavor_text:
            'A mysterious Pokémon from the future with unknown abilities and characteristics.',
          language: {
            name: 'en',
            url: 'https://pokeapi.co/api/v2/language/9/',
          },
          version: { name: 'red', url: 'https://pokeapi.co/api/v2/version/1/' },
        },
      ],
    },
    backClick: () => console.log('High ID back clicked'),
    closeClick: () => console.log('High ID close clicked'),
    forwardClick: () => console.log('High ID forward clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Details header with high ID Pokemon to test number formatting.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [currentPokemon, setCurrentPokemon] = React.useState(bulbasaur);
    const [currentSpecies, setCurrentSpecies] = React.useState(bulbasaurSpecies);

    const pokemonList = [
      { pokemon: bulbasaur, species: bulbasaurSpecies },
      {
        pokemon: charizard,
        species: { ...bulbasaurSpecies, id: 6, name: 'charizard' },
      },
      {
        pokemon: pikachu,
        species: { ...bulbasaurSpecies, id: 25, name: 'pikachu' },
      },
    ];

    const currentIndex = pokemonList.findIndex((p) => p.pokemon.id === currentPokemon.id);

    const handleBack = () => {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : pokemonList.length - 1;
      const prevItem = pokemonList[prevIndex];
      if (prevItem) {
        setCurrentPokemon(prevItem.pokemon);
        setCurrentSpecies(prevItem.species);
        console.log('Navigated back to:', prevItem.pokemon.name);
      }
    };

    const handleForward = () => {
      const nextIndex = currentIndex < pokemonList.length - 1 ? currentIndex + 1 : 0;
      const nextItem = pokemonList[nextIndex];
      if (nextItem) {
        setCurrentPokemon(nextItem.pokemon);
        setCurrentSpecies(nextItem.species);
        console.log('Navigated forward to:', nextItem.pokemon.name);
      }
    };

    const handleClose = () => {
      console.log('Close clicked for:', currentPokemon.name);
      // eslint-disable-next-line no-alert
      alert(`Closing ${currentPokemon.name} details`);
    };

    return (
      <div
        style={{
          backgroundColor: '#DEEDED',
          padding: '20px',
          minHeight: '400px',
        }}
      >
        <DetailsHeader
          data={currentPokemon}
          speciesData={currentSpecies}
          backClick={handleBack}
          closeClick={handleClose}
          forwardClick={handleForward}
        />
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <strong>Current Pokemon:</strong> {currentPokemon.name} (#
          {currentPokemon.id})
          <br />
          <small>Use navigation buttons to switch between Bulbasaur, Charizard, and Pikachu</small>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive details header with working navigation between different Pokemon.',
      },
    },
  },
};
