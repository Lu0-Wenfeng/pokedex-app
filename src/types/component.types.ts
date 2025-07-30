// Component prop interfaces for TypeScript conversion

import React from "react";
import {
  Pokemon,
  PokemonSpecies,
  PokemonStat,
  PokemonTypeData,
} from "./pokemon.types";

// Common component props
export interface BaseComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// Header component props
export interface HeaderProps extends BaseComponentProps {
  children: React.ReactNode;
}

// Loader component props
export interface LoaderProps {
  className?: string;
}

// Pokemon Card component props
export interface PokemonCardProps {
  data: Pokemon;
  onClick?: () => void;
  className?: string;
}

// Details Header component props
export interface DetailsHeaderProps {
  data: Pokemon;
  speciesData?: PokemonSpecies;
  backClick?: () => void;
  closeClick?: () => void;
  forwordClick?: () => void;
}

// Property Card component props
export interface PropertyCardProps {
  speciesData?: PokemonSpecies;
  data: Pokemon;
  pokemonTypeData?: PokemonTypeData;
}

// Stat Card component props
export interface StatCardProps {
  stats: PokemonStat[];
}

// Evolution Chain Card component props
export interface EvolutionChainCardProps {
  data: Pokemon;
}

// Colorful Tag component props
export interface ColorfulTagProps {
  text: string;
  className?: string;
  type: string;
}

// Tooltip component props
export interface TooltipProps {
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topStart"
    | "topEnd"
    | "bottomStart"
    | "bottomEnd"
    | "leftStart"
    | "leftEnd"
    | "rightStart"
    | "rightEnd";
  data: any;
  className?: string;
  name?: string;
  tooltipClass?: string;
}

export interface DefaultPopoverProps {
  content: any;
  className?: string;
}

// Filter component props
export interface FilterProps {
  isFilterEnable: (isEnable: boolean) => void;
}

// Search Filter component props
export interface SearchFilterProps {
  placeholder?: string;
  inputClass?: string;
  onChangeHandler: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  label?: string;
}

// Multi Select Dropdown component props
export interface MultiSelectDropdownProps {
  label?: string;
  onChangeHandler: (value: any, event?: any) => void;
  data: DropdownOption[];
  placeholder?: string;
  isOpen?: boolean;
  onOpenHandler?: () => void;
  onCloseHandler?: () => void;
  onCleanHandler?: (event?: any) => void;
}

export interface DropdownOption {
  label: string;
  value: string;
}

// Page component props
export interface HomePageProps {
  // No specific props for HomePage
}

export interface DetailPageProps {
  isCardSelected: boolean;
  toggleModal: () => void;
  pokemonId: number;
  offset: number;
}

// Event handler types
export type ClickHandler = () => void;
export type ChangeHandler = (
  value: string,
  event: React.ChangeEvent<HTMLInputElement>
) => void;
export type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;
export type KeyDownHandler = (event: React.KeyboardEvent) => void;

// Common prop patterns
export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children?: React.ReactNode;
}

export interface WithOnClick {
  onClick?: ClickHandler;
}

// Form-related props
export interface InputProps {
  value?: string;
  onChange?: ChangeHandler;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

// Modal-related props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

// Loading state props
export interface LoadingProps {
  isLoading: boolean;
  loadingText?: string;
}

// Error state props
export interface ErrorProps {
  error?: string | null;
  onRetry?: () => void;
}

// Pagination props
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Filter state props
export interface FilterStateProps {
  selectedTypes: string[];
  selectedGenders: string[];
  searchQuery: string;
  onTypeChange: (types: string[]) => void;
  onGenderChange: (genders: string[]) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}
