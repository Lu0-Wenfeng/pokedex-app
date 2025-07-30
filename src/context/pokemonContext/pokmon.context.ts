import { createContext } from "react";
import { PokemonContextValue } from "../../types/context.types";

// Create context with undefined as default value
// This will be properly initialized in the provider
const PokemonContext = createContext<PokemonContextValue | undefined>(undefined);

export default PokemonContext;
