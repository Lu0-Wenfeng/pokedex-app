import { Pokemon } from "@app-types/pokemon.types";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

// Simple mock Pokemon data
const simplePokemon: Pokemon = {
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

// Create a simple component wrapper to avoid SASS issues
const PokemonCardWrapper = ({
  data,
  onClick,
  className,
}: {
  data: Pokemon;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        width: "200px",
        textAlign: "center",
        cursor: onClick ? "pointer" : "default",
        backgroundColor: "#f5f5f5",
      }}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      className={className}
    >
      <img
        src={
          data.sprites.other?.["official-artwork"]?.front_default ||
          data.sprites.front_default ||
          ""
        }
        alt={data.name}
        style={{ width: "100px", height: "100px" }}
      />
      <h3 style={{ margin: "8px 0", textTransform: "capitalize" }}>
        {data.name}
      </h3>
      <p style={{ margin: "4px 0", color: "#666" }}>
        #{data.id.toString().padStart(3, "0")}
      </p>
      <div
        style={{
          display: "flex",
          gap: "4px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {data.types.map((type) => (
          <span
            key={type.type.name}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              textTransform: "capitalize",
            }}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const meta: Meta<typeof PokemonCardWrapper> = {
  title: "Components/PokemonCard (Simple)",
  component: PokemonCardWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A simplified Pokemon card component for testing Storybook setup.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "Pokemon data object",
      control: { type: "object" },
    },
    onClick: {
      description: "Click handler",
    },
    className: {
      description: "CSS class name",
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: simplePokemon,
    onClick: () => console.log("Pokemon card clicked!"),
  },
};

export const WithoutClick: Story = {
  args: {
    data: simplePokemon,
  },
};

export const WithCustomClass: Story = {
  args: {
    data: simplePokemon,
    onClick: () => console.log("Pokemon card clicked!"),
    className: "custom-card",
  },
};
