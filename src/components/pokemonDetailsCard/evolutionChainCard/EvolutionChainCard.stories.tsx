import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Pokemon } from "@app-types/pokemon.types";
import React from "react";
import EvolutionChainCard from "./evolutionChainCard";

// Mock Pokemon data for evolution chains
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

// Pokemon with missing image for testing
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

const meta: Meta<typeof EvolutionChainCard> = {
  title: "Components/EvolutionChainCard",
  component: EvolutionChainCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Evolution chain card component that displays Pokemon evolution stages with navigation arrows. Currently shows placeholder evolution stages using the same Pokemon data.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "Pokemon data object used to display evolution stages",
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: bulbasaur,
  },
  parameters: {
    docs: {
      description: {
        story: "Default evolution chain showing Bulbasaur in three evolution stages with navigation arrows.",
      },
    },
  },
};

export const Charizard: Story = {
  args: {
    data: charizard,
  },
  parameters: {
    docs: {
      description: {
        story: "Evolution chain displaying Charizard with fire/flying type background colors.",
      },
    },
  },
};

export const Pikachu: Story = {
  args: {
    data: pikachu,
  },
  parameters: {
    docs: {
      description: {
        story: "Evolution chain showing Pikachu with electric type background color.",
      },
    },
  },
};

export const MissingImage: Story = {
  args: {
    data: missingImagePokemon,
  },
  parameters: {
    docs: {
      description: {
        story: "Evolution chain with Pokemon that has missing images - shows placeholder fallback.",
      },
    },
  },
};

export const HighIdPokemon: Story = {
  args: {
    data: {
      ...pikachu,
      id: 1001,
      name: "future-pokemon",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Evolution chain with high ID Pokemon to test number formatting in cards.",
      },
    },
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px", padding: "20px", backgroundColor: "#DEEDED" }}>
      <EvolutionChainCard {...args} />
      <div style={{ 
        marginTop: "16px", 
        padding: "8px", 
        backgroundColor: "#f5f5f5", 
        borderRadius: "4px",
        fontSize: "14px" 
      }}>
        <strong>Note:</strong> This component currently shows placeholder evolution stages. 
        In a real implementation, this would display actual evolution chain data from the Pokemon API.
      </div>
    </div>
  ),
  args: {
    data: bulbasaur,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Evolution chain displayed at full width with explanatory note about placeholder data.",
      },
    },
  },
};

export const MultipleTypes: Story = {
  render: () => (
    <div style={{ padding: "20px", backgroundColor: "#DEEDED" }}>
      <h4 style={{ marginBottom: "20px", textAlign: "center" }}>Evolution Chains by Type</h4>
      
      <div style={{ marginBottom: "30px" }}>
        <h5 style={{ marginBottom: "10px" }}>Grass/Poison Type</h5>
        <EvolutionChainCard data={bulbasaur} />
      </div>
      
      <div style={{ marginBottom: "30px" }}>
        <h5 style={{ marginBottom: "10px" }}>Fire/Flying Type</h5>
        <EvolutionChainCard data={charizard} />
      </div>
      
      <div style={{ marginBottom: "30px" }}>
        <h5 style={{ marginBottom: "10px" }}>Electric Type</h5>
        <EvolutionChainCard data={pikachu} />
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Multiple evolution chains showing different Pokemon types and their characteristic colors.",
      },
    },
  },
};

export const Responsive: Story = {
  render: (args) => (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h5>Desktop View (800px)</h5>
        <div style={{ width: "800px", border: "1px dashed #ccc", padding: "10px" }}>
          <EvolutionChainCard {...args} />
        </div>
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <h5>Tablet View (600px)</h5>
        <div style={{ width: "600px", border: "1px dashed #ccc", padding: "10px" }}>
          <EvolutionChainCard {...args} />
        </div>
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <h5>Mobile View (400px)</h5>
        <div style={{ width: "400px", border: "1px dashed #ccc", padding: "10px" }}>
          <EvolutionChainCard {...args} />
        </div>
      </div>
    </div>
  ),
  args: {
    data: charizard,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Evolution chain component shown at different viewport widths to test responsive behavior.",
      },
    },
  },
};
