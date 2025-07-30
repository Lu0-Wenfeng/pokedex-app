import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Pokemon } from "@app-types/pokemon.types";
import PokemonCard from "./pokemonCard";

// Mock Pokemon data for different types and scenarios
const bulbasaur: Pokemon = {
  id: 1,
  name: "bulbasaur",
  height: 7,
  weight: 69,
  base_experience: 64,
  order: 1,
  is_default: true,
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    front_shiny: null,
    front_female: null,
    front_shiny_female: null,
    back_default: null,
    back_shiny: null,
    back_female: null,
    back_shiny_female: null,
    other: {
      dream_world: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
        front_female: null,
      },
      home: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
        front_female: null,
        front_shiny: null,
        front_shiny_female: null,
      },
      "official-artwork": {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
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
  abilities: [],
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
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    front_shiny: null,
    front_female: null,
    front_shiny_female: null,
    back_default: null,
    back_shiny: null,
    back_female: null,
    back_shiny_female: null,
    other: {
      dream_world: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg",
        front_female: null,
      },
      home: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png",
        front_female: null,
        front_shiny: null,
        front_shiny_female: null,
      },
      "official-artwork": {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
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
  abilities: [],
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
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    front_shiny: null,
    front_female: null,
    front_shiny_female: null,
    back_default: null,
    back_shiny: null,
    back_female: null,
    back_shiny_female: null,
    other: {
      dream_world: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
        front_female: null,
      },
      home: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png",
        front_female: null,
        front_shiny: null,
        front_shiny_female: null,
      },
      "official-artwork": {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
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
  abilities: [],
  moves: [],
  species: {
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon-species/25/",
  },
  location_area_encounters: "https://pokeapi.co/api/v2/pokemon/25/encounters",
};

// Pokemon with missing image (fallback scenario)
const missingImagePokemon: Pokemon = {
  ...pikachu,
  id: 999,
  name: "missing-image",
  sprites: {
    front_default: null,
    front_shiny: null,
    front_female: null,
    front_shiny_female: null,
    back_default: null,
    back_shiny: null,
    back_female: null,
    back_shiny_female: null,
    other: {
      dream_world: {
        front_default: null,
        front_female: null,
      },
      home: {
        front_default: null,
        front_female: null,
        front_shiny: null,
        front_shiny_female: null,
      },
      "official-artwork": {
        front_default: null,
        front_shiny: null,
      },
    },
  },
};

const meta: Meta<typeof PokemonCard> = {
  title: "Components/PokemonCard",
  component: PokemonCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Pokemon card component displaying Pokemon information with type-based background colors and click interactions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "Pokemon data object containing all Pokemon information",
      control: { type: "object" },
    },
    onClick: {
      description: "Callback function triggered when the card is clicked",
      action: "clicked",
    },
    className: {
      description: "Additional CSS class names to apply to the card",
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: bulbasaur,
    onClick: () => console.log("Bulbasaur card clicked!"),
  },
};

export const FireFlying: Story = {
  args: {
    data: charizard,
    onClick: () => console.log("Charizard card clicked!"),
  },
};

export const Electric: Story = {
  args: {
    data: pikachu,
    onClick: () => console.log("Pikachu card clicked!"),
  },
};

export const WithoutClick: Story = {
  args: {
    data: bulbasaur,
  },
};

export const WithCustomClass: Story = {
  args: {
    data: pikachu,
    onClick: () => console.log("Custom class card clicked!"),
    className: "custom-pokemon-card",
  },
};

export const MissingImage: Story = {
  args: {
    data: missingImagePokemon,
    onClick: () => console.log("Missing image card clicked!"),
  },
};

export const HighId: Story = {
  args: {
    data: {
      ...pikachu,
      id: 1001,
      name: "high-id-pokemon",
    },
    onClick: () => console.log("High ID card clicked!"),
  },
};
