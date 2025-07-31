import { mockPokemon } from '@/utils/test-utils';
import type { PokemonAction, PokemonState } from '@app-types/context.types';
import { reducer, initialState } from '../reducer';

describe('Pokemon Reducer', () => {
  describe('Initial State', () => {
    it('should have correct initial state', () => {
      expect(initialState).toEqual({
        pokemonsList: [],
        allPokemonsList: [],
        pokemonSelectedId: null,
        pokemonData: null,
        isLoading: true,
        isLoadMoreInprogress: false,
        pokemonsTypes: [],
        pokemonGenderList: [],
      });
    });
  });

  describe('SET_POKEMON_LIST', () => {
    it('should append new Pokemon to existing list', () => {
      const existingState: PokemonState = {
        ...initialState,
        pokemonsList: [mockPokemon],
      };

      const newPokemon = { ...mockPokemon, id: 2, name: 'ivysaur' };
      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: [newPokemon],
      };

      const newState = reducer(existingState, action);

      expect(newState.pokemonsList).toHaveLength(2);
      expect(newState.pokemonsList[0]).toEqual(mockPokemon);
      expect(newState.pokemonsList[1]).toEqual(newPokemon);
    });

    it('should add Pokemon to empty list', () => {
      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: [mockPokemon],
      };

      const newState = reducer(initialState, action);

      expect(newState.pokemonsList).toHaveLength(1);
      expect(newState.pokemonsList[0]).toEqual(mockPokemon);
    });

    it('should handle multiple Pokemon in payload', () => {
      const pokemon1 = { ...mockPokemon, id: 1, name: 'bulbasaur' };
      const pokemon2 = { ...mockPokemon, id: 2, name: 'ivysaur' };
      const pokemon3 = { ...mockPokemon, id: 3, name: 'venusaur' };

      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: [pokemon1, pokemon2, pokemon3],
      };

      const newState = reducer(initialState, action);

      expect(newState.pokemonsList).toHaveLength(3);
      expect(newState.pokemonsList).toEqual([pokemon1, pokemon2, pokemon3]);
    });
  });

  describe('SET_ALL_POKEMON_LIST', () => {
    it('should set all Pokemon list', () => {
      const allPokemonList = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ];

      const action: PokemonAction = {
        type: 'ACTIONS.SET_ALL_POKEMON_LIST',
        payload: allPokemonList,
      };

      const newState = reducer(initialState, action);

      expect(newState.allPokemonsList).toEqual(allPokemonList);
    });

    it('should replace existing all Pokemon list', () => {
      const existingList = [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ];
      const existingState: PokemonState = {
        ...initialState,
        allPokemonsList: existingList,
      };

      const newList = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ];

      const action: PokemonAction = {
        type: 'ACTIONS.SET_ALL_POKEMON_LIST',
        payload: newList,
      };

      const newState = reducer(existingState, action);

      expect(newState.allPokemonsList).toEqual(newList);
      expect(newState.allPokemonsList).not.toContain(existingList[0]);
    });
  });

  describe('SET_FILTERED_POKEMON_LIST', () => {
    it('should replace Pokemon list with filtered results', () => {
      const existingState: PokemonState = {
        ...initialState,
        pokemonsList: [mockPokemon],
      };

      const filteredPokemon = { ...mockPokemon, id: 25, name: 'pikachu' };
      const action: PokemonAction = {
        type: 'ACTIONS.SET_FILTERED_POKEMON_LIST',
        payload: [filteredPokemon],
      };

      const newState = reducer(existingState, action);

      expect(newState.pokemonsList).toHaveLength(1);
      expect(newState.pokemonsList[0]).toEqual(filteredPokemon);
    });

    it('should clear Pokemon list when empty array provided', () => {
      const existingState: PokemonState = {
        ...initialState,
        pokemonsList: [mockPokemon],
      };

      const action: PokemonAction = {
        type: 'ACTIONS.SET_FILTERED_POKEMON_LIST',
        payload: [],
      };

      const newState = reducer(existingState, action);

      expect(newState.pokemonsList).toHaveLength(0);
    });
  });

  describe('SET_POKEMON_TYPE', () => {
    it('should set Pokemon types', () => {
      const types = [
        { label: 'Fire', value: 'fire' },
        { label: 'Water', value: 'water' },
      ];

      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_TYPE',
        payload: types,
      };

      const newState = reducer(initialState, action);

      expect(newState.pokemonsTypes).toEqual(types);
    });
  });

  describe('SET_POKEMON_GENDER_LIST', () => {
    it('should set Pokemon gender list', () => {
      const genders = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ];

      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_GENDER_LIST',
        payload: genders,
      };

      const newState = reducer(initialState, action);

      expect(newState.pokemonGenderList).toEqual(genders);
    });
  });

  describe('Loading States', () => {
    describe('SET_API_CALL_INPROGRESS', () => {
      it('should set loading to true', () => {
        const action: PokemonAction = {
          type: 'ACTIONS.SET_API_CALL_INPROGRESS',
          payload: true,
        };

        const newState = reducer(initialState, action);

        expect(newState.isLoading).toBe(true);
      });

      it('should set loading to false', () => {
        const existingState: PokemonState = {
          ...initialState,
          isLoading: true,
        };

        const action: PokemonAction = {
          type: 'ACTIONS.SET_API_CALL_INPROGRESS',
          payload: false,
        };

        const newState = reducer(existingState, action);

        expect(newState.isLoading).toBe(false);
      });
    });

    describe('SET_LOAD_MORE_API_CALL_INPROGRESS', () => {
      it('should set load more progress to true', () => {
        const action: PokemonAction = {
          type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
          payload: true,
        };

        const newState = reducer(initialState, action);

        expect(newState.isLoadMoreInprogress).toBe(true);
      });

      it('should set load more progress to false', () => {
        const existingState: PokemonState = {
          ...initialState,
          isLoadMoreInprogress: true,
        };

        const action: PokemonAction = {
          type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
          payload: false,
        };

        const newState = reducer(existingState, action);

        expect(newState.isLoadMoreInprogress).toBe(false);
      });
    });
  });

  describe('Pokemon Data Management', () => {
    describe('SET_POKEMON_BY_ID', () => {
      it('should set Pokemon data', () => {
        const action: PokemonAction = {
          type: 'ACTIONS.SET_POKEMON_BY_ID',
          payload: mockPokemon,
        };

        const newState = reducer(initialState, action);

        expect(newState.pokemonData).toEqual(mockPokemon);
      });

      it('should replace existing Pokemon data', () => {
        const existingPokemon = { ...mockPokemon, id: 25, name: 'pikachu' };
        const existingState: PokemonState = {
          ...initialState,
          pokemonData: existingPokemon,
        };

        const action: PokemonAction = {
          type: 'ACTIONS.SET_POKEMON_BY_ID',
          payload: mockPokemon,
        };

        const newState = reducer(existingState, action);

        expect(newState.pokemonData).toEqual(mockPokemon);
        expect(newState.pokemonData).not.toEqual(existingPokemon);
      });
    });

    describe('RESET_POKEMON_DATA', () => {
      it('should reset Pokemon data to null', () => {
        const existingState: PokemonState = {
          ...initialState,
          pokemonData: mockPokemon,
        };

        const action: PokemonAction = {
          type: 'ACTIONS.RESET_POKEMON_DATA',
        };

        const newState = reducer(existingState, action);

        expect(newState.pokemonData).toBeNull();
      });
    });

    describe('SET_POKEMON_ID', () => {
      it('should set selected Pokemon ID', () => {
        const action: PokemonAction = {
          type: 'ACTIONS.SET_POKEMON_ID',
          payload: 25,
        };

        const newState = reducer(initialState, action);

        expect(newState.pokemonSelectedId).toBe(25);
      });

      it('should replace existing selected Pokemon ID', () => {
        const existingState: PokemonState = {
          ...initialState,
          pokemonSelectedId: 1,
        };

        const action: PokemonAction = {
          type: 'ACTIONS.SET_POKEMON_ID',
          payload: 150,
        };

        const newState = reducer(existingState, action);

        expect(newState.pokemonSelectedId).toBe(150);
      });
    });
  });

  describe('Unknown Actions', () => {
    it('should return current state for unknown actions', () => {
      const unknownAction = {
        type: 'UNKNOWN_ACTION',
        payload: 'test',
      } as any;

      const newState = reducer(initialState, unknownAction);

      expect(newState).toEqual(initialState);
    });

    it('should not mutate state for unknown actions', () => {
      const unknownAction = {
        type: 'UNKNOWN_ACTION',
        payload: 'test',
      } as any;

      const newState = reducer(initialState, unknownAction);

      expect(newState).toBe(initialState);
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state', () => {
      const originalState = { ...initialState };
      const action: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_LIST',
        payload: [mockPokemon],
      };

      const newState = reducer(initialState, action);

      expect(initialState).toEqual(originalState);
      expect(newState).not.toBe(initialState);
    });

    it('should create new state object for each action', () => {
      const action1: PokemonAction = {
        type: 'ACTIONS.SET_API_CALL_INPROGRESS',
        payload: true,
      };

      const action2: PokemonAction = {
        type: 'ACTIONS.SET_POKEMON_ID',
        payload: 1,
      };

      const state1 = reducer(initialState, action1);
      const state2 = reducer(state1, action2);

      expect(state1).not.toBe(initialState);
      expect(state2).not.toBe(state1);
      expect(state2).not.toBe(initialState);
    });
  });
});
