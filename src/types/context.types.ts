// Context and state management type definitions

import React from 'react';
import { Pokemon, PokemonListItem } from './pokemon.types';

// Pokemon application state interface
export interface PokemonState {
  pokemonsList: Pokemon[];
  allPokemonsList: PokemonListItem[];
  pokemonSelectedId: number | null;
  pokemonData: Pokemon | null;
  isLoading: boolean;
  isLoadMoreInprogress: boolean;
  pokemonsTypes: TypeOption[];
  pokemonGenderList: GenderOption[];
}

// Action types for the reducer
export type PokemonAction =
  | { type: 'ACTIONS.SET_POKEMON_LIST'; payload: Pokemon[] }
  | { type: 'ACTIONS.SET_ALL_POKEMON_LIST'; payload: PokemonListItem[] }
  | { type: 'ACTIONS.SET_FILTERED_POKEMON_LIST'; payload: Pokemon[] }
  | { type: 'ACTIONS.SET_POKEMON_TYPE'; payload: TypeOption[] }
  | { type: 'ACTIONS.SET_POKEMON_GENDER_LIST'; payload: GenderOption[] }
  | { type: 'ACTIONS.SET_API_CALL_INPROGRESS'; payload: boolean }
  | { type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS'; payload: boolean }
  | { type: 'ACTIONS.SET_POKEMON_BY_ID'; payload: Pokemon }
  | { type: 'ACTIONS.RESET_POKEMON_DATA' }
  | { type: 'ACTIONS.SET_POKEMON_ID'; payload: number };

// Context value interface
export interface PokemonContextValue {
  state: PokemonState;
  dispatch: React.Dispatch<PokemonAction>;
  getPokemonData: (isReset?: boolean) => Promise<void>;
  getPokemonDetailsListByUrl: (results: PokemonListItem[]) => Promise<Pokemon[]>;
  setAppLoading: (loading: boolean) => void;
}

// Dropdown option interfaces
export interface TypeOption {
  label: string;
  value: string;
}

export interface GenderOption {
  label: string;
  value: string;
}

// Provider props interface
export interface PokemonProviderProps {
  children: React.ReactNode;
}

// Reducer function type
export type PokemonReducer = (state: PokemonState, action: PokemonAction) => PokemonState;

// Action creators type definitions
export interface PokemonActionCreators {
  setPokemonList: (pokemon: Pokemon[]) => PokemonAction;
  setAllPokemonList: (pokemon: PokemonListItem[]) => PokemonAction;
  setFilteredPokemonList: (pokemon: Pokemon[]) => PokemonAction;
  setPokemonTypes: (types: TypeOption[]) => PokemonAction;
  setPokemonGenderList: (genders: GenderOption[]) => PokemonAction;
  setApiCallInProgress: (loading: boolean) => PokemonAction;
  setLoadMoreApiCallInProgress: (loading: boolean) => PokemonAction;
  setPokemonById: (pokemon: Pokemon) => PokemonAction;
  resetPokemonData: () => PokemonAction;
  setPokemonId: (id: number) => PokemonAction;
}

// Hook return types
export interface UsePokemonContext {
  state: PokemonState;
  dispatch: React.Dispatch<PokemonAction>;
  actions: {
    getPokemonData: (isReset?: boolean) => Promise<void>;
    getPokemonDetailsListByUrl: (results: PokemonListItem[]) => Promise<Pokemon[]>;
    setAppLoading: (loading: boolean) => void;
  };
}

// Filter state interface
export interface FilterState {
  selectedTypes: string[];
  selectedGenders: string[];
  searchQuery: string;
  isFilterActive: boolean;
}

// Filter actions
export type FilterAction =
  | { type: 'SET_SELECTED_TYPES'; payload: string[] }
  | { type: 'SET_SELECTED_GENDERS'; payload: string[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTER_ACTIVE'; payload: boolean }
  | { type: 'CLEAR_FILTERS' };

// Loading states
export interface LoadingState {
  isLoading: boolean;
  isLoadMoreInProgress: boolean;
  isDetailLoading: boolean;
  error: string | null;
}

// API call states
export interface ApiState {
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

// Pagination state
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextUrl: string | null;
  previousUrl: string | null;
}

// Search state
export interface SearchState {
  query: string;
  results: Pokemon[];
  isSearching: boolean;
  hasSearched: boolean;
}

// Modal state
export interface ModalState {
  isOpen: boolean;
  selectedPokemonId: number | null;
  modalType: 'details' | 'filter' | null;
}

// Application state (if we need a global state in the future)
export interface AppState {
  pokemon: PokemonState;
  filter: FilterState;
  loading: LoadingState;
  pagination: PaginationState;
  search: SearchState;
  modal: ModalState;
}

// Context hook types
export type UsePokemonState = () => PokemonState;
export type UsePokemonDispatch = () => React.Dispatch<PokemonAction>;
export type UsePokemonActions = () => PokemonContextValue['getPokemonData'] & PokemonContextValue['getPokemonDetailsListByUrl'] & PokemonContextValue['setAppLoading'];
