// Comprehensive Pokemon API type definitions

// Basic Pokemon list response from /pokemon endpoint
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

// Main Pokemon data structure from /pokemon/{id} endpoint
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  is_default: boolean;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  species: {
    name: string;
    url: string;
  };
  location_area_encounters: string;
}

// Pokemon sprites structure
export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
  versions?: any; // Complex nested structure, using any for now
}

// Pokemon type information
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// Pokemon stat information
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

// Pokemon ability information
export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

// Pokemon move information
export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: PokemonMoveVersionDetail[];
}

export interface PokemonMoveVersionDetail {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}

// Pokemon species data from /pokemon-species/{id} endpoint
export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: {
    name: string;
    url: string;
  };
  pokedex_numbers: PokedexNumber[];
  egg_groups: EggGroup[];
  color: {
    name: string;
    url: string;
  };
  shape: {
    name: string;
    url: string;
  };
  evolves_from_species: {
    name: string;
    url: string;
  } | null;
  evolution_chain: {
    url: string;
  };
  habitat: {
    name: string;
    url: string;
  } | null;
  generation: {
    name: string;
    url: string;
  };
  names: Name[];
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: FormDescription[];
  genera: Genus[];
  varieties: Variety[];
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: {
    name: string;
    url: string;
  };
}

export interface EggGroup {
  name: string;
  url: string;
}

export interface Name {
  name: string;
  language: {
    name: string;
    url: string;
  };
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

export interface FormDescription {
  description: string;
  language: {
    name: string;
    url: string;
  };
}

export interface Genus {
  genus: string;
  language: {
    name: string;
    url: string;
  };
}

export interface Variety {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}

// Pokemon type data from /type/{id} endpoint
export interface PokemonTypeData {
  id: number;
  name: string;
  damage_relations: DamageRelations;
  past_damage_relations: PastDamageRelation[];
  game_indices: GameIndex[];
  generation: {
    name: string;
    url: string;
  };
  move_damage_class: {
    name: string;
    url: string;
  } | null;
  names: Name[];
  pokemon: TypePokemon[];
  moves: TypeMove[];
}

export interface DamageRelations {
  no_damage_to: TypeReference[];
  half_damage_to: TypeReference[];
  double_damage_to: TypeReference[];
  no_damage_from: TypeReference[];
  half_damage_from: TypeReference[];
  double_damage_from: TypeReference[];
}

export interface TypeReference {
  name: string;
  url: string;
}

export interface PastDamageRelation {
  generation: {
    name: string;
    url: string;
  };
  damage_relations: DamageRelations;
}

export interface GameIndex {
  game_index: number;
  generation: {
    name: string;
    url: string;
  };
}

export interface TypePokemon {
  slot: number;
  pokemon: {
    name: string;
    url: string;
  };
}

export interface TypeMove {
  name: string;
  url: string;
}

// Type list response from /type endpoint
export interface TypeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TypeListItem[];
}

export interface TypeListItem {
  name: string;
  url: string;
}

// Gender list response from /gender endpoint
export interface GenderListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GenderListItem[];
}

export interface GenderListItem {
  name: string;
  url: string;
}

// Evolution chain data (if needed in the future)
export interface EvolutionChain {
  id: number;
  baby_trigger_item: {
    name: string;
    url: string;
  } | null;
  chain: EvolutionChainLink;
}

export interface EvolutionChainLink {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[];
}

export interface EvolutionDetail {
  item: {
    name: string;
    url: string;
  } | null;
  trigger: {
    name: string;
    url: string;
  };
  gender: number | null;
  held_item: {
    name: string;
    url: string;
  } | null;
  known_move: {
    name: string;
    url: string;
  } | null;
  known_move_type: {
    name: string;
    url: string;
  } | null;
  location: {
    name: string;
    url: string;
  } | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_species: {
    name: string;
    url: string;
  } | null;
  party_type: {
    name: string;
    url: string;
  } | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: {
    name: string;
    url: string;
  } | null;
  turn_upside_down: boolean;
}

// Utility types for component props
export type PokemonId = number;
export type PokemonName = string;
export type PokemonUrl = string;
