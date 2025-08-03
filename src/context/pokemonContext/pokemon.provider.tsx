import type { PokemonContextValue, PokemonProviderProps } from '@app-types/context.types';
import type { Pokemon, PokemonListItem, PokemonListResponse } from '@app-types/pokemon.types';

import React, { useCallback, useEffect, useReducer, useRef } from 'react';

import { allPokemonURL, initialURL } from '@services/common.service';
import { initialState, reducer } from '@store/reducers/reducer';

import PokemonContext from './pokmon.context';

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const batchURL = useRef<string | null>(initialURL);
  const isLoadingRef = useRef<boolean>(false);

  const setAppLoading = useCallback(
    (loading: boolean): void => {
      dispatch({
        type: 'ACTIONS.SET_API_CALL_INPROGRESS',
        payload: loading,
      });
    },
    [dispatch],
  );

  const setLoadMoreDataInprogress = useCallback(
    (loading: boolean): void => {
      dispatch({
        type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
        payload: loading,
      });
    },
    [dispatch],
  );

  const setPokemonList = useCallback(
    (pokemonsList: Pokemon[]): void => {
      dispatch({
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: pokemonsList,
      });
    },
    [dispatch],
  );

  const getPokemonDetailsListByUrl = useCallback(
    async (results: PokemonListItem[]): Promise<Pokemon[]> => {
      try {
        const pokemonsDetailsList = await Promise.all(
          results.map(async (pokemon: PokemonListItem): Promise<Pokemon> => {
            const response = await fetch(pokemon.url);

            if (!response.ok) {
              throw new Error(`Failed to fetch Pokemon details: ${response.statusText}`);
            }

            const res: Pokemon = await response.json();
            return res;
          }),
        );
        return pokemonsDetailsList;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching Pokemon details:', error);
        return [];
      }
    },
    [],
  );

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
        // eslint-disable-next-line no-console
        console.error('Error fetching Pokemon data:', error);
      } finally {
        isLoadingRef.current = false;
        setLoadMoreDataInprogress(false);
      }
    },
    [getPokemonDetailsListByUrl, setLoadMoreDataInprogress, setPokemonList],
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
        type: 'ACTIONS.SET_ALL_POKEMON_LIST',
        payload: results,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching all Pokemon data:', error);
    }
  }, []);

  useEffect(() => {
    const initializeData = async (): Promise<void> => {
      await getPokemonData();
      setAppLoading(false);
      await getAllPokemonDataList();
    };

    initializeData();
  }, [getAllPokemonDataList, getPokemonData, setAppLoading]);

  const contextValue: PokemonContextValue = React.useMemo(
    () => ({
      state,
      dispatch,
      getPokemonData,
      getPokemonDetailsListByUrl,
      setAppLoading,
    }),
    [state, dispatch, getPokemonData, getPokemonDetailsListByUrl, setAppLoading],
  );

  return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>;
};

export default PokemonProvider;
