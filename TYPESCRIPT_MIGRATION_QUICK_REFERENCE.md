# TypeScript Migration Quick Reference Guide

## Installation Commands

### Install Required Dependencies
```bash
npm install --save-dev @types/react @types/react-dom @types/node @types/jest
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

## Configuration Files

### tsconfig.json (Initial Setup)
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "es6"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "src",
    "paths": {
      "*": ["*"]
    }
  },
  "include": [
    "src"
  ]
}
```

### Updated .eslintrc.json
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "testing-library",
    "@typescript-eslint"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "no-console": 1,
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  },
  "overrides": [
    {
      "files": ["**/*.test.js", "**/*.test.jsx", "**/*.test.ts", "**/*.test.tsx"],
      "env": {
        "jest": true
      }
    }
  ]
}
```

### Updated package.json Scripts
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src/**/*.{js,jsx,ts,tsx}",
    "lint-fix": "eslint src/**/*.{js,jsx,ts,tsx} --fix",
    "type-check": "tsc --noEmit"
  }
}
```

## Type Declaration Files

### src/types/assets.d.ts
```typescript
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.ico' {
  const value: string;
  export default value;
}

declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
```

## Core Type Definitions

### src/types/pokemon.types.ts
```typescript
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  other: {
    dream_world: {
      front_default: string | null;
    };
    'official-artwork': {
      front_default: string | null;
    };
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

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

export interface PokemonSpecies {
  id: number;
  name: string;
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: {
    url: string;
  };
  genera: Genus[];
}

export interface FlavorTextEntry {
  flavor_text: string;
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
```

### src/types/context.types.ts
```typescript
import { Pokemon, PokemonListItem } from './pokemon.types';

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

export interface PokemonContextValue {
  state: PokemonState;
  dispatch: React.Dispatch<PokemonAction>;
  getPokemonData: (isReset?: boolean) => Promise<void>;
  getPokemonDetailsListByUrl: (results: PokemonListItem[]) => Promise<Pokemon[]>;
  setAppLoading: (loading: boolean) => void;
}

export interface TypeOption {
  label: string;
  value: string;
}

export interface GenderOption {
  label: string;
  value: string;
}
```

## Common Component Prop Patterns

### Basic Component Props
```typescript
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
```

### Pokemon Card Props
```typescript
interface PokemonCardProps {
  data: Pokemon;
  onClick?: () => void;
  className?: string;
}
```

### Filter Component Props
```typescript
interface FilterProps {
  isFilterEnable: (isEnable: boolean) => void;
}
```

### Modal Component Props
```typescript
interface ModalProps {
  isCardSelected: boolean;
  toggleModal: () => void;
  pokemonId: number;
  offset: number;
}
```

## Event Handler Types

### Common Event Handlers
```typescript
type ClickHandler = () => void;
type ChangeHandler = (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;
```

## Service Function Types

### API Service Functions
```typescript
export const getPokemonData = async (): Promise<PokemonListResponse> => {
  const response = await fetch(`${initialURL}`);
  const result = await response.json();
  return result;
};

export const getPokemonDataById = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${baseURL}/pokemon/${id}/`);
  const result = await response.json();
  return result;
};
```

## Migration Checklist

### Phase 1: Foundation
- [ ] Install TypeScript dependencies
- [ ] Create tsconfig.json
- [ ] Update package.json scripts
- [ ] Configure TypeScript-ESLint
- [ ] Create type declaration files
- [ ] Convert constants files

### Phase 2: Core Types
- [ ] Define Pokemon API interfaces
- [ ] Define component prop interfaces
- [ ] Define context and reducer types
- [ ] Convert service files
- [ ] Create utility type helpers

### Phase 3: Components
- [ ] Convert simple components
- [ ] Convert Pokemon card component
- [ ] Convert filter components
- [ ] Convert detail page components
- [ ] Convert page components
- [ ] Convert context provider
- [ ] Convert hooks

### Phase 4: Integration
- [ ] Convert App component
- [ ] Convert entry point
- [ ] Update test files
- [ ] Enable stricter TypeScript settings
- [ ] Final cleanup and optimization

## Common Migration Patterns

### PropTypes to Interface
```typescript
// Before (JavaScript with PropTypes)
Component.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string
};

// After (TypeScript)
interface ComponentProps {
  data: Pokemon;
  onClick?: () => void;
  className?: string;
}

const Component: React.FC<ComponentProps> = ({ data, onClick, className }) => {
  // component implementation
};
```

### Context Provider Typing
```typescript
// Before (JavaScript)
const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // ...
};

// After (TypeScript)
interface PokemonProviderProps {
  children: React.ReactNode;
}

const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // ...
};
```

### Event Handler Typing
```typescript
// Before (JavaScript)
const handleClick = () => {
  // handler implementation
};

// After (TypeScript)
const handleClick = useCallback((): void => {
  // handler implementation
}, []);
```

## Testing TypeScript Files

### Test File Conversion
```typescript
// Before (JavaScript)
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// After (TypeScript)
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', (): void => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

## Troubleshooting Common Issues

### Module Resolution
If you encounter module resolution issues, ensure your tsconfig.json includes the correct baseUrl and paths configuration.

### Type Errors
Start with loose typing and gradually tighten. Use `any` sparingly and only as a temporary measure.

### Build Errors
Ensure all dependencies have proper type definitions. Check that file extensions are correctly updated (.js → .ts, .jsx → .tsx).

### ESLint Conflicts
Make sure TypeScript-ESLint rules don't conflict with existing ESLint rules. Update configuration as needed.

This quick reference provides the essential information needed to execute the TypeScript migration successfully.
