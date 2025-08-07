// Pokemon API service functions with TypeScript typing

import type {
  EvolutionChain,
  GenderListResponse,
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
  PokemonTypeData,
  TypeListResponse,
} from '@app-types/pokemon.types';

import { baseURL, LIMIT } from '@constants/apiUrls';

// API endpoint URLs
export const initialURL: string = `${baseURL}/pokemon?limit=${LIMIT}`;
export const allPokemonURL: string = `${baseURL}/pokemon?limit=1100`;

// Pokemon list API calls
export const getPokemonData = async (): Promise<PokemonListResponse> => {
  const response = await fetch(`${initialURL}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon data: ${response.statusText}`);
  }
  const result = await response.json();
  return result;
};

// Pokemon species API call
export const getSpeciesDataById = async (id: number): Promise<PokemonSpecies> => {
  const response = await fetch(`${baseURL}/pokemon-species/${id}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch species data for ID ${id}: ${response.statusText}`);
  }
  const result = await response.json();
  return result;
};

// Pokemon type data API call
export const getPokemonTypesById = async (id: number): Promise<PokemonTypeData> => {
  const response = await fetch(`${baseURL}/type/${id}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch type data for ID ${id}: ${response.statusText}`);
  }
  const result = await response.json();
  return result;
};

// All Pokemon types API call
export const getPokemonTypes = async (): Promise<TypeListResponse> => {
  const response = await fetch(`${baseURL}/type`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon types: ${response.statusText}`);
  }
  const result = await response.json();
  return result;
};

// Pokemon genders API call
export const getPokemonGenders = async (): Promise<GenderListResponse> => {
  const response = await fetch(`${baseURL}/gender`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon genders: ${response.statusText}`);
  }
  const result = await response.json();
  return result;
};

// Individual Pokemon data API call
export const getPokemonDataById = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${baseURL}/pokemon/${id}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon data for ID ${id}: ${response.statusText}`);
  }
  const result = await response.json();
  return result;
};

// Generic Pokemon data by URL API call
export const getPokemonDataByURL = async (url: string): Promise<Pokemon> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon data from URL ${url}: ${response.statusText}`);
  }
  const result = await response.json();
  return result;
};

// Utility function for number formatting
export const numberFormation = (number: number | string): string => {
  let numStr = String(number);
  const num = Number(number);

  if (num < 10) {
    numStr = `00${num}`;
  } else if (num >= 10 && num < 100) {
    numStr = `0${num}`;
  }

  return numStr;
};

// Types for parallel API call responses
export interface ParallelApiResponse {
  pokemon?: Array<{ pokemon: { name: string; url: string } }>;
  pokemon_species_details?: Array<{
    pokemon_species: { name: string; url: string };
  }>;
  [key: string]: unknown;
}

// Parallel API calls utility
export const getAllParallelCall = async (apiUrls: string[]): Promise<ParallelApiResponse[]> => {
  try {
    const results = await Promise.all(
      apiUrls.map(async (url: string) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
        }
        return response.json();
      }),
    );
    return results;
  } catch (error) {
    console.error('Error in parallel API calls:', error);
    throw error;
  }
};

// Remove duplicates utility function
export const removeDuplicateBy = <T>(arr: T[], prop: keyof T): T[] => {
  const map = new Map(arr.map((item: T) => [item[prop], item]));
  return Array.from(map.values());
};

// Type-safe fetch wrapper
export const fetchWithErrorHandling = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

// Batch Pokemon data fetching
export const getBatchPokemonData = async (urls: string[]): Promise<Pokemon[]> => {
  try {
    const pokemonData = await Promise.all(urls.map((url) => fetchWithErrorHandling<Pokemon>(url)));
    return pokemonData;
  } catch (error) {
    console.error('Error fetching batch Pokemon data:', error);
    throw error;
  }
};

// Search Pokemon by name or ID
export const searchPokemon = async (query: string): Promise<Pokemon | null> => {
  try {
    // Try to fetch by ID first if query is numeric
    const isNumeric = /^\d+$/.test(query);
    const searchUrl = isNumeric
      ? `${baseURL}/pokemon/${query}`
      : `${baseURL}/pokemon/${query.toLowerCase()}`;

    const pokemon = await fetchWithErrorHandling<Pokemon>(searchUrl);
    return pokemon;
  } catch {
    console.warn(`Pokemon not found for query: ${query}`);
    return null;
  }
};

// Get Pokemon evolution chain
export const getEvolutionChain = async (url: string): Promise<EvolutionChain | null> => {
  try {
    const evolutionData = await fetchWithErrorHandling<EvolutionChain>(url);
    return evolutionData;
  } catch (error) {
    console.error('Error fetching evolution chain:', error);
    throw error;
  }
};

// Validate Pokemon ID
export const isValidPokemonId = (id: number): boolean => id > 0 && id <= 1010; // Current max Pokemon ID (as of 2024)

// Format Pokemon weight (from hectograms to kg)
export const formatWeight = (weight: number): string => `${(weight / 10).toFixed(1)} kg`;

// Format Pokemon height (from decimeters to meters)
export const formatHeight = (height: number): string => `${(height / 10).toFixed(1)} m`;

// Get Pokemon type effectiveness
export const getTypeEffectiveness = (): number =>
  // This would need a comprehensive type chart implementation
  // For now, returning 1 (normal effectiveness)
  // TODO: Implement with attackingType: string, defendingTypes: string[]
  1;

// Cache management (simple in-memory cache)
const pokemonCache = new Map<string, unknown>();

export const getCachedData = <T>(key: string): T | null => {
  const cached = pokemonCache.get(key);
  return cached ? (cached as T) : null;
};

export const setCachedData = <T>(key: string, data: T): void => {
  pokemonCache.set(key, data);
};

export const clearCache = (): void => {
  pokemonCache.clear();
};
