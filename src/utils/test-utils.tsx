import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import type { Pokemon, PokemonSpecies } from '@app-types/pokemon.types';
import { PokemonProvider } from '@context/pokemonContext/pokemon.provider';

// Mock data for testing
export const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  order: 1,
  is_default: true,
  location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/1/encounters',
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    front_shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
    front_female: null,
    front_shiny_female: null,
    back_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
    back_shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
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
        front_shiny:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png',
        front_shiny_female: null,
      },
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        front_shiny:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png',
      },
    },
    versions: {},
  },
  abilities: [
    {
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/',
      },
      is_hidden: false,
      slot: 1,
    },
  ],
  moves: [
    {
      move: {
        name: 'razor-wind',
        url: 'https://pokeapi.co/api/v2/move/13/',
      },
      version_group_details: [
        {
          level_learned_at: 0,
          move_learn_method: {
            name: 'egg',
            url: 'https://pokeapi.co/api/v2/move-learn-method/2/',
          },
          version_group: {
            name: 'red-blue',
            url: 'https://pokeapi.co/api/v2/version-group/1/',
          },
        },
      ],
    },
  ],
  species: {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  },
  stats: [
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
  ],
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
};

export const mockPokemonSpecies: PokemonSpecies = {
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
  pokedex_numbers: [
    {
      entry_number: 1,
      pokedex: {
        name: 'national',
        url: 'https://pokeapi.co/api/v2/pokedex/1/',
      },
    },
  ],
  egg_groups: [
    {
      name: 'monster',
      url: 'https://pokeapi.co/api/v2/egg-group/1/',
    },
    {
      name: 'plant',
      url: 'https://pokeapi.co/api/v2/egg-group/7/',
    },
  ],
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
  names: [
    {
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
      name: 'Bulbasaur',
    },
  ],
  flavor_text_entries: [
    {
      flavor_text:
        'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.',
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
  form_descriptions: [],
  genera: [
    {
      genus: 'Seed Pokémon',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
    },
  ],
  varieties: [
    {
      is_default: true,
      pokemon: {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
    },
  ],
};

// Custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
}

const AllTheProviders: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <BrowserRouter>
    <PokemonProvider>{children}</PokemonProvider>
  </BrowserRouter>
);

// Provider without router for testing components that already have a router (like App)
const ProvidersWithoutRouter: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => <PokemonProvider>{children}</PokemonProvider>;

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const { initialEntries: initialEntriesUnused, ...renderOptions } =
    options ?? {};

  return render(ui, {
    wrapper: ({ children }) => <AllTheProviders>{children}</AllTheProviders>,
    ...renderOptions,
  });
};

// Custom render for App component that already has a router
const renderApp = (ui: ReactElement, options?: CustomRenderOptions) => {
  const { initialEntries: initialEntriesUnused, ...renderOptions } =
    options ?? {};

  return render(ui, {
    wrapper: ({ children }) => (
      <ProvidersWithoutRouter>{children}</ProvidersWithoutRouter>
    ),
    ...renderOptions,
  });
};

// Mock API responses
export const mockApiResponses = {
  pokemonList: {
    count: 1154,
    next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    ],
  },
  pokemonTypes: {
    count: 20,
    next: null,
    previous: null,
    results: [
      { name: 'normal', url: 'https://pokeapi.co/api/v2/type/1/' },
      { name: 'fighting', url: 'https://pokeapi.co/api/v2/type/2/' },
      { name: 'flying', url: 'https://pokeapi.co/api/v2/type/3/' },
      { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
      { name: 'ground', url: 'https://pokeapi.co/api/v2/type/5/' },
    ],
  },
  pokemonGenders: {
    count: 3,
    next: null,
    previous: null,
    results: [
      { name: 'female', url: 'https://pokeapi.co/api/v2/gender/1/' },
      { name: 'male', url: 'https://pokeapi.co/api/v2/gender/2/' },
      { name: 'genderless', url: 'https://pokeapi.co/api/v2/gender/3/' },
    ],
  },
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render, renderApp };
