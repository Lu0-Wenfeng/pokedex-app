import {
  PokemonContextValue,
  PokemonProviderProps,
} from "@app-types/context.types";
import {
  Pokemon,
  PokemonListItem,
  PokemonListResponse,
} from "@app-types/pokemon.types";
import { allPokemonURL, initialURL } from "@services/common.service";
import { initialState, reducer } from "@store/reducers/reducer";
import React, { useCallback, useEffect, useReducer, useRef } from "react";
import PokemonContext from "./pokmon.context";

export const PokemonProvider: React.FC<PokemonProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const batchURL = useRef<string | null>(initialURL);
  const isLoadingRef = useRef<boolean>(false);

  const setAppLoading = (loading: boolean): void => {
    dispatch({
      type: "ACTIONS.SET_API_CALL_INPROGRESS",
      payload: loading,
    });
  };

  const setLoadMoreDataInprogress = (loading: boolean): void => {
    dispatch({
      type: "ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS",
      payload: loading,
    });
  };

  const getPokemonData = useCallback(
    async (isReset: boolean = false): Promise<void> => {
      if (isLoadingRef.current) return; // Prevent multiple simultaneous calls

      if (isReset) {
        batchURL.current = initialURL;
      }
      if (!batchURL.current) return;

      try {
        isLoadingRef.current = true;
        setLoadMoreDataInprogress(true);
        const resp = await fetch(batchURL.current);

        if (!resp.ok) {
          throw new Error(`Failed to fetch Pokemon data: ${resp.statusText}`);
        }

        const data: PokemonListResponse = await resp.json();
        const { next, results } = data;

        batchURL.current = next;
        const pokemonsList = await getPokemonDetailsListByUrl(results);
        setPokemonList(pokemonsList);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        isLoadingRef.current = false;
        setLoadMoreDataInprogress(false);
      }
    },
    []
  );

  const getPokemonDetailsListByUrl = useCallback(
    async (results: PokemonListItem[]): Promise<Pokemon[]> => {
      try {
        const pokemonsDetailsList = await Promise.all(
          results.map(async (pokemon: PokemonListItem): Promise<Pokemon> => {
            const response = await fetch(pokemon.url);

            if (!response.ok) {
              throw new Error(
                `Failed to fetch Pokemon details: ${response.statusText}`
              );
            }

            const res: Pokemon = await response.json();
            return res;
          })
        );
        return pokemonsDetailsList;
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
        return [];
      }
    },
    []
  );

  const getAllPokemonDataList = useCallback(async (): Promise<void> => {
    try {
      const resp = await fetch(allPokemonURL);

      if (!resp.ok) {
        throw new Error(`Failed to fetch all Pokemon data: ${resp.statusText}`);
      }

      const data: PokemonListResponse = await resp.json();
      const { results } = data;

      dispatch({
        type: "ACTIONS.SET_ALL_POKEMON_LIST",
        payload: results,
      });
    } catch (error) {
      console.error("Error fetching all Pokemon data:", error);
    }
  }, []);

  const setPokemonList = (pokemonsList: Pokemon[]): void => {
    dispatch({
      type: "ACTIONS.SET_POKEMON_LIST",
      payload: pokemonsList,
    });
  };

  useEffect(() => {
    const initializeData = async (): Promise<void> => {
      await getPokemonData();
      setAppLoading(false);
      await getAllPokemonDataList();
    };

    initializeData();
  }, []);

  const contextValue: PokemonContextValue = {
    state,
    dispatch,
    getPokemonData,
    getPokemonDetailsListByUrl,
    setAppLoading,
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};
