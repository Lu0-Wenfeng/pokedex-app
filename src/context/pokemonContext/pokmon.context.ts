import { createContext } from 'react';

import type { PokemonContextValue } from '@app-types/context.types';

// Create context with undefined as default value
// This will be properly initialized in the provider
const PokemonContext = createContext<PokemonContextValue | undefined>(undefined);

export default PokemonContext;
