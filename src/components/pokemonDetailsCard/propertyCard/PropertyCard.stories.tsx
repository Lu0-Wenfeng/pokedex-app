import {
  Pokemon,
  PokemonSpecies,
  PokemonTypeData,
} from "@app-types/pokemon.types";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import PropertyCard from "./propertyCard";

// Mock Pokemon data with complete abilities
const bulbasaur: Pokemon = {
  id: 1,
  name: "bulbasaur",
  height: 7,
  weight: 69,
  base_experience: 64,
  order: 1,
  is_default: true,
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
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
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
        front_female: null,
      },
      home: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
        front_female: null,
        front_shiny: null,
        front_shiny_female: null,
      },
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        front_shiny: null,
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
    },
    {
      slot: 2,
      type: {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/",
      },
    },
  ],
  stats: [],
  abilities: [
    {
      ability: {
        name: "overgrow",
        url: "https://pokeapi.co/api/v2/ability/65/",
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: "chlorophyll",
        url: "https://pokeapi.co/api/v2/ability/34/",
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  moves: [],
  species: {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon-species/1/",
  },
  location_area_encounters: "https://pokeapi.co/api/v2/pokemon/1/encounters",
};

const charizard: Pokemon = {
  id: 6,
  name: "charizard",
  height: 17,
  weight: 905,
  base_experience: 267,
  order: 7,
  is_default: true,
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
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
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg",
        front_female: null,
      },
      home: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png",
        front_female: null,
        front_shiny: null,
        front_shiny_female: null,
      },
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
        front_shiny: null,
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: "fire",
        url: "https://pokeapi.co/api/v2/type/10/",
      },
    },
    {
      slot: 2,
      type: {
        name: "flying",
        url: "https://pokeapi.co/api/v2/type/3/",
      },
    },
  ],
  stats: [],
  abilities: [
    {
      ability: {
        name: "blaze",
        url: "https://pokeapi.co/api/v2/ability/66/",
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: "solar-power",
        url: "https://pokeapi.co/api/v2/ability/94/",
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  moves: [],
  species: {
    name: "charizard",
    url: "https://pokeapi.co/api/v2/pokemon-species/6/",
  },
  location_area_encounters: "https://pokeapi.co/api/v2/pokemon/6/encounters",
};

const pikachu: Pokemon = {
  id: 25,
  name: "pikachu",
  height: 4,
  weight: 60,
  base_experience: 112,
  order: 35,
  is_default: true,
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
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
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
        front_female: null,
      },
      home: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png",
        front_female: null,
        front_shiny: null,
        front_shiny_female: null,
      },
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        front_shiny: null,
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: "electric",
        url: "https://pokeapi.co/api/v2/type/13/",
      },
    },
  ],
  stats: [],
  abilities: [
    {
      ability: {
        name: "static",
        url: "https://pokeapi.co/api/v2/ability/9/",
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: "lightning-rod",
        url: "https://pokeapi.co/api/v2/ability/31/",
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  moves: [],
  species: {
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon-species/25/",
  },
  location_area_encounters: "https://pokeapi.co/api/v2/pokemon/25/encounters",
};

// Mock species data with egg groups
const bulbasaurSpecies: PokemonSpecies = {
  id: 1,
  name: "bulbasaur",
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
    name: "medium-slow",
    url: "https://pokeapi.co/api/v2/growth-rate/4/",
  },
  pokedex_numbers: [],
  egg_groups: [
    {
      name: "monster",
      url: "https://pokeapi.co/api/v2/egg-group/1/",
    },
    {
      name: "plant",
      url: "https://pokeapi.co/api/v2/egg-group/7/",
    },
  ],
  color: {
    name: "green",
    url: "https://pokeapi.co/api/v2/pokemon-color/5/",
  },
  shape: {
    name: "quadruped",
    url: "https://pokeapi.co/api/v2/pokemon-shape/8/",
  },
  evolves_from_species: null,
  evolution_chain: {
    url: "https://pokeapi.co/api/v2/evolution-chain/1/",
  },
  habitat: {
    name: "grassland",
    url: "https://pokeapi.co/api/v2/pokemon-habitat/3/",
  },
  generation: {
    name: "generation-i",
    url: "https://pokeapi.co/api/v2/generation/1/",
  },
  names: [],
  pal_park_encounters: [],
  flavor_text_entries: [],
  form_descriptions: [],
  genera: [],
  varieties: [],
};

// Mock type data with damage relations
const grassTypeData: PokemonTypeData = {
  id: 12,
  name: "grass",
  damage_relations: {
    no_damage_to: [],
    half_damage_to: [
      { name: "fire", url: "https://pokeapi.co/api/v2/type/10/" },
      { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
      { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" },
      { name: "flying", url: "https://pokeapi.co/api/v2/type/3/" },
      { name: "bug", url: "https://pokeapi.co/api/v2/type/7/" },
      { name: "dragon", url: "https://pokeapi.co/api/v2/type/16/" },
      { name: "steel", url: "https://pokeapi.co/api/v2/type/9/" },
    ],
    double_damage_to: [
      { name: "water", url: "https://pokeapi.co/api/v2/type/11/" },
      { name: "ground", url: "https://pokeapi.co/api/v2/type/5/" },
      { name: "rock", url: "https://pokeapi.co/api/v2/type/6/" },
    ],
    no_damage_from: [],
    half_damage_from: [
      { name: "water", url: "https://pokeapi.co/api/v2/type/11/" },
      { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" },
      { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
      { name: "ground", url: "https://pokeapi.co/api/v2/type/5/" },
    ],
    double_damage_from: [
      { name: "fire", url: "https://pokeapi.co/api/v2/type/10/" },
      { name: "ice", url: "https://pokeapi.co/api/v2/type/15/" },
      { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" },
      { name: "flying", url: "https://pokeapi.co/api/v2/type/3/" },
      { name: "bug", url: "https://pokeapi.co/api/v2/type/7/" },
    ],
  },
  past_damage_relations: [],
  game_indices: [],
  generation: {
    name: "generation-i",
    url: "https://pokeapi.co/api/v2/generation/1/",
  },
  move_damage_class: {
    name: "special",
    url: "https://pokeapi.co/api/v2/move-damage-class/3/",
  },
  names: [],
  pokemon: [],
  moves: [],
};

const meta: Meta<typeof PropertyCard> = {
  title: "Components/PropertyCard",
  component: PropertyCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Property card component that displays Pokemon physical properties, abilities, types, and type effectiveness. Shows height, weight, gender, egg groups, abilities, types, and weaknesses.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      description:
        "Pokemon data object containing basic information and abilities",
      control: { type: "object" },
    },
    speciesData: {
      description:
        "Optional Pokemon species data containing egg groups and additional details",
      control: { type: "object" },
    },
    pokemonTypeData: {
      description:
        "Optional Pokemon type data containing damage relations for weakness calculation",
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: bulbasaur,
    speciesData: bulbasaurSpecies,
    pokemonTypeData: grassTypeData,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default property card showing Bulbasaur with complete data including species and type information.",
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
      name: "charizard",
      egg_groups: [
        { name: "monster", url: "https://pokeapi.co/api/v2/egg-group/1/" },
        { name: "dragon", url: "https://pokeapi.co/api/v2/egg-group/14/" },
      ],
    },
    pokemonTypeData: {
      ...grassTypeData,
      id: 10,
      name: "fire",
      damage_relations: {
        ...grassTypeData.damage_relations,
        double_damage_from: [
          { name: "water", url: "https://pokeapi.co/api/v2/type/11/" },
          { name: "ground", url: "https://pokeapi.co/api/v2/type/5/" },
          { name: "rock", url: "https://pokeapi.co/api/v2/type/6/" },
        ],
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Property card showing Charizard with fire/flying types and different egg groups.",
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
      name: "pikachu",
      egg_groups: [
        { name: "ground", url: "https://pokeapi.co/api/v2/egg-group/5/" },
        { name: "fairy", url: "https://pokeapi.co/api/v2/egg-group/6/" },
      ],
    },
    pokemonTypeData: {
      ...grassTypeData,
      id: 13,
      name: "electric",
      damage_relations: {
        ...grassTypeData.damage_relations,
        double_damage_from: [
          { name: "ground", url: "https://pokeapi.co/api/v2/type/5/" },
        ],
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Property card showing Pikachu with electric type and single weakness.",
      },
    },
  },
};

export const WithoutSpeciesData: Story = {
  args: {
    data: bulbasaur,
    pokemonTypeData: grassTypeData,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Property card without species data - egg groups section will be empty.",
      },
    },
  },
};

export const WithoutTypeData: Story = {
  args: {
    data: bulbasaur,
    speciesData: bulbasaurSpecies,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Property card without type data - weaknesses section will be empty.",
      },
    },
  },
};

export const MinimalData: Story = {
  args: {
    data: {
      ...pikachu,
      abilities: [],
      types: [pikachu.types[0]], // Only one type
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Property card with minimal data - no abilities, single type, no additional data.",
      },
    },
  },
};

export const ManyAbilities: Story = {
  args: {
    data: {
      ...bulbasaur,
      abilities: [
        {
          ability: {
            name: "overgrow",
            url: "https://pokeapi.co/api/v2/ability/65/",
          },
          is_hidden: false,
          slot: 1,
        },
        {
          ability: {
            name: "chlorophyll",
            url: "https://pokeapi.co/api/v2/ability/34/",
          },
          is_hidden: true,
          slot: 3,
        },
        {
          ability: {
            name: "effect-spore",
            url: "https://pokeapi.co/api/v2/ability/27/",
          },
          is_hidden: false,
          slot: 2,
        },
      ],
    },
    speciesData: bulbasaurSpecies,
    pokemonTypeData: grassTypeData,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Property card showing Pokemon with multiple abilities including hidden abilities.",
      },
    },
  },
};

export const ManyEggGroups: Story = {
  args: {
    data: bulbasaur,
    speciesData: {
      ...bulbasaurSpecies,
      egg_groups: [
        { name: "monster", url: "https://pokeapi.co/api/v2/egg-group/1/" },
        { name: "plant", url: "https://pokeapi.co/api/v2/egg-group/7/" },
        { name: "ground", url: "https://pokeapi.co/api/v2/egg-group/5/" },
        { name: "fairy", url: "https://pokeapi.co/api/v2/egg-group/6/" },
      ],
    },
    pokemonTypeData: grassTypeData,
  },
  parameters: {
    docs: {
      description: {
        story: "Property card showing Pokemon with multiple egg groups.",
      },
    },
  },
};

export const ManyWeaknesses: Story = {
  args: {
    data: bulbasaur,
    speciesData: bulbasaurSpecies,
    pokemonTypeData: {
      ...grassTypeData,
      damage_relations: {
        ...grassTypeData.damage_relations,
        double_damage_from: [
          { name: "fire", url: "https://pokeapi.co/api/v2/type/10/" },
          { name: "ice", url: "https://pokeapi.co/api/v2/type/15/" },
          { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" },
          { name: "flying", url: "https://pokeapi.co/api/v2/type/3/" },
          { name: "bug", url: "https://pokeapi.co/api/v2/type/7/" },
          { name: "psychic", url: "https://pokeapi.co/api/v2/type/14/" },
          { name: "rock", url: "https://pokeapi.co/api/v2/type/6/" },
          { name: "ghost", url: "https://pokeapi.co/api/v2/type/8/" },
        ],
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Property card showing Pokemon with many type weaknesses.",
      },
    },
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        padding: "20px",
        backgroundColor: "#DEEDED",
      }}
    >
      <PropertyCard {...args} />
    </div>
  ),
  args: {
    data: charizard,
    speciesData: {
      ...bulbasaurSpecies,
      id: 6,
      name: "charizard",
      egg_groups: [
        { name: "monster", url: "https://pokeapi.co/api/v2/egg-group/1/" },
        { name: "dragon", url: "https://pokeapi.co/api/v2/egg-group/14/" },
      ],
    },
    pokemonTypeData: {
      ...grassTypeData,
      id: 10,
      name: "fire",
      damage_relations: {
        ...grassTypeData.damage_relations,
        double_damage_from: [
          { name: "water", url: "https://pokeapi.co/api/v2/type/11/" },
          { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" },
          { name: "rock", url: "https://pokeapi.co/api/v2/type/6/" },
        ],
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Property card displayed at full width showing responsive grid layout.",
      },
    },
  },
};

export const Comparison: Story = {
  render: () => (
    <div style={{ padding: "20px", backgroundColor: "#DEEDED" }}>
      <h4 style={{ marginBottom: "20px", textAlign: "center" }}>
        Pokemon Property Comparison
      </h4>

      <div style={{ marginBottom: "30px" }}>
        <h5 style={{ marginBottom: "10px" }}>Bulbasaur (Grass/Poison)</h5>
        <PropertyCard
          data={bulbasaur}
          speciesData={bulbasaurSpecies}
          pokemonTypeData={grassTypeData}
        />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h5 style={{ marginBottom: "10px" }}>Charizard (Fire/Flying)</h5>
        <PropertyCard
          data={charizard}
          speciesData={{
            ...bulbasaurSpecies,
            id: 6,
            name: "charizard",
            egg_groups: [
              {
                name: "monster",
                url: "https://pokeapi.co/api/v2/egg-group/1/",
              },
              {
                name: "dragon",
                url: "https://pokeapi.co/api/v2/egg-group/14/",
              },
            ],
          }}
          pokemonTypeData={{
            ...grassTypeData,
            id: 10,
            name: "fire",
            damage_relations: {
              ...grassTypeData.damage_relations,
              double_damage_from: [
                { name: "water", url: "https://pokeapi.co/api/v2/type/11/" },
                { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" },
                { name: "rock", url: "https://pokeapi.co/api/v2/type/6/" },
              ],
            },
          }}
        />
      </div>

      <div>
        <h5 style={{ marginBottom: "10px" }}>Pikachu (Electric)</h5>
        <PropertyCard
          data={pikachu}
          speciesData={{
            ...bulbasaurSpecies,
            id: 25,
            name: "pikachu",
            egg_groups: [
              { name: "ground", url: "https://pokeapi.co/api/v2/egg-group/5/" },
              { name: "fairy", url: "https://pokeapi.co/api/v2/egg-group/6/" },
            ],
          }}
          pokemonTypeData={{
            ...grassTypeData,
            id: 13,
            name: "electric",
            damage_relations: {
              ...grassTypeData.damage_relations,
              double_damage_from: [
                { name: "ground", url: "https://pokeapi.co/api/v2/type/5/" },
              ],
            },
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Side-by-side comparison of different Pokemon property cards showing various data combinations.",
      },
    },
  },
};
