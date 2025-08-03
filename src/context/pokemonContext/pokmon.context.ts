import type { PokemonContextValue } from '@app-types/context.types';

import { createContext } from 'react';

// Create context with undefined as default value
// This will be properly initialized in the provider
const PokemonContext = createContext<PokemonContextValue | undefined>(undefined);

export default PokemonContext;
