import {
  createMockResponse,
  mockApiResponses,
  mockPokemon,
  mockPokemonSpecies,
} from '@utils/test-utils';
import {
  clearCache,
  fetchWithErrorHandling,
  formatHeight,
  formatWeight,
  getAllParallelCall,
  getBatchPokemonData,
  getCachedData,
  getEvolutionChain,
  getPokemonData,
  getPokemonDataById,
  getPokemonDataByURL,
  getPokemonGenders,
  getPokemonTypes,
  getPokemonTypesById,
  getSpeciesDataById,
  getTypeEffectiveness,
  isValidPokemonId,
  numberFormation,
  removeDuplicateBy,
  searchPokemon,
  setCachedData,
} from '../common.service';

describe('Common Service', () => {
  beforeEach(() => {
    clearCache(); // Clear cache before each test
  });

  describe('numberFormation', () => {
    test('should format single digit numbers', () => {
      expect(numberFormation(1)).toBe('001');
      expect(numberFormation(5)).toBe('005');
      expect(numberFormation(9)).toBe('009');
    });

    test('should format double digit numbers', () => {
      expect(numberFormation(10)).toBe('010');
      expect(numberFormation(25)).toBe('025');
      expect(numberFormation(99)).toBe('099');
    });

    test('should format triple digit numbers', () => {
      expect(numberFormation(100)).toBe('100');
      expect(numberFormation(150)).toBe('150');
      expect(numberFormation(999)).toBe('999');
    });

    test('should handle numbers greater than 999', () => {
      expect(numberFormation(1000)).toBe('1000');
      expect(numberFormation(1500)).toBe('1500');
    });

    test('should handle zero', () => {
      expect(numberFormation(0)).toBe('000');
    });

    test('should handle string numbers', () => {
      expect(numberFormation('5')).toBe('005');
      expect(numberFormation('25')).toBe('025');
      expect(numberFormation('100')).toBe('100');
    });

    test('should handle negative numbers', () => {
      expect(numberFormation(-1)).toBe('00-1');
      expect(numberFormation(-10)).toBe('00-10');
    });
  });

  describe('Utility Functions', () => {
    describe('isValidPokemonId', () => {
      test('should validate Pokemon IDs correctly', () => {
        expect(isValidPokemonId(1)).toBe(true);
        expect(isValidPokemonId(150)).toBe(true);
        expect(isValidPokemonId(1010)).toBe(true);
        expect(isValidPokemonId(0)).toBe(false);
        expect(isValidPokemonId(-1)).toBe(false);
        expect(isValidPokemonId(1011)).toBe(false);
      });
    });

    describe('formatWeight', () => {
      test('should format weight from hectograms to kg', () => {
        expect(formatWeight(69)).toBe('6.9 kg');
        expect(formatWeight(100)).toBe('10.0 kg');
        expect(formatWeight(5)).toBe('0.5 kg');
        expect(formatWeight(0)).toBe('0.0 kg');
      });
    });

    describe('formatHeight', () => {
      test('should format height from decimeters to meters', () => {
        expect(formatHeight(7)).toBe('0.7 m');
        expect(formatHeight(15)).toBe('1.5 m');
        expect(formatHeight(100)).toBe('10.0 m');
        expect(formatHeight(0)).toBe('0.0 m');
      });
    });

    describe('getTypeEffectiveness', () => {
      test('should return default effectiveness', () => {
        expect(getTypeEffectiveness()).toBe(1);
      });
    });
  });

  describe('Cache Management', () => {
    test('should set and get cached data', () => {
      const testData = { id: 1, name: 'test' };
      setCachedData('test-key', testData);

      expect(getCachedData('test-key')).toEqual(testData);
    });

    test('should return null for non-existent cache keys', () => {
      expect(getCachedData('non-existent')).toBeNull();
    });

    test('should clear all cached data', () => {
      setCachedData('key1', 'value1');
      setCachedData('key2', 'value2');

      clearCache();

      expect(getCachedData('key1')).toBeNull();
      expect(getCachedData('key2')).toBeNull();
    });

    test('should handle different data types in cache', () => {
      const stringData = 'test string';
      const numberData = 42;
      const objectData = { test: true };
      const arrayData = [1, 2, 3];

      setCachedData('string', stringData);
      setCachedData('number', numberData);
      setCachedData('object', objectData);
      setCachedData('array', arrayData);

      expect(getCachedData('string')).toBe(stringData);
      expect(getCachedData('number')).toBe(numberData);
      expect(getCachedData('object')).toEqual(objectData);
      expect(getCachedData('array')).toEqual(arrayData);
    });
  });

  describe('removeDuplicateBy', () => {
    test('should remove duplicates by specified key', () => {
      const data = [
        { name: 'pikachu', id: 1 },
        { name: 'charmander', id: 2 },
        { name: 'pikachu', id: 3 },
        { name: 'squirtle', id: 4 },
      ];

      const result = removeDuplicateBy(data, 'name');

      expect(result).toHaveLength(3);
      expect(result.map((item) => item.name)).toEqual(['pikachu', 'charmander', 'squirtle']);
    });

    test('should handle empty array', () => {
      const result = removeDuplicateBy([], 'name');

      expect(result).toEqual([]);
    });

    test('should handle array with no duplicates', () => {
      const data = [
        { name: 'pikachu', id: 1 },
        { name: 'charmander', id: 2 },
      ];

      const result = removeDuplicateBy(data, 'name');

      expect(result).toEqual(data);
    });

    test('should work with different property types', () => {
      const data = [
        { id: 1, active: true },
        { id: 2, active: false },
        { id: 3, active: true },
        { id: 4, active: false },
      ];

      const result = removeDuplicateBy(data, 'active');

      expect(result).toHaveLength(2);
      expect(result.map((item) => item.active)).toEqual([true, false]);
    });
  });
});

describe('Common Service', () => {
  beforeEach(() => {
    clearCache(); // Clear cache before each test
  });

  describe('numberFormation', () => {
    test('should format single digit numbers', () => {
      expect(numberFormation(1)).toBe('001');
      expect(numberFormation(5)).toBe('005');
      expect(numberFormation(9)).toBe('009');
    });

    test('should format double digit numbers', () => {
      expect(numberFormation(10)).toBe('010');
      expect(numberFormation(25)).toBe('025');
      expect(numberFormation(99)).toBe('099');
    });

    test('should format triple digit numbers', () => {
      expect(numberFormation(100)).toBe('100');
      expect(numberFormation(150)).toBe('150');
      expect(numberFormation(999)).toBe('999');
    });

    test('should handle numbers greater than 999', () => {
      expect(numberFormation(1000)).toBe('1000');
      expect(numberFormation(1500)).toBe('1500');
    });

    test('should handle zero', () => {
      expect(numberFormation(0)).toBe('000');
    });

    test('should handle string numbers', () => {
      expect(numberFormation('5')).toBe('005');
      expect(numberFormation('25')).toBe('025');
      expect(numberFormation('100')).toBe('100');
    });

    test('should handle negative numbers', () => {
      expect(numberFormation(-1)).toBe('00-1');
      expect(numberFormation(-10)).toBe('0-10');
    });
  });

  describe('getPokemonData', () => {
    test('should fetch Pokemon data successfully', async () => {
      globalThis.fetch = rstest
        .fn()
        .mockResolvedValue(createMockResponse(mockApiResponses.pokemonList));

      const result = await getPokemonData();

      expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining('pokemon?limit=12'));
      expect(result).toEqual(mockApiResponses.pokemonList);
    });

    test('should handle API errors', async () => {
      globalThis.fetch = rstest
        .fn()
        .mockResolvedValue(createMockResponse(null, { ok: false, status: 404 }));

      await expect(getPokemonData()).rejects.toThrow('Failed to fetch Pokemon data:');
    });

    test('should handle network errors', async () => {
      globalThis.fetch = rstest.fn().mockRejectedValue(new Error('Network Error'));

      await expect(getPokemonData()).rejects.toThrow('Network Error');
    });
  });

  describe('getPokemonDataById', () => {
    test('should fetch Pokemon by numeric ID', async () => {
      globalThis.fetch = rstest.fn().mockResolvedValue(createMockResponse(mockPokemon));

      const result = await getPokemonDataById(1);

      expect(globalThis.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1/');
      expect(result).toEqual(mockPokemon);
    });

    test('should handle invalid Pokemon ID', async () => {
      globalThis.fetch = rstest
        .fn()
        .mockResolvedValue(createMockResponse(null, { ok: false, status: 404 }));

      await expect(getPokemonDataById(99999)).rejects.toThrow(
        'Failed to fetch Pokemon data for ID 99999:',
      );
    });
  });

  describe('getPokemonDataByURL', () => {
    test('should fetch Pokemon by URL', async () => {
      const testUrl = 'https://pokeapi.co/api/v2/pokemon/1/';
      globalThis.fetch = rstest.fn().mockResolvedValue(createMockResponse(mockPokemon));

      const result = await getPokemonDataByURL(testUrl);

      expect(globalThis.fetch).toHaveBeenCalledWith(testUrl);
      expect(result).toEqual(mockPokemon);
    });

    test('should handle invalid URL', async () => {
      const testUrl = 'https://pokeapi.co/api/v2/pokemon/invalid/';
      globalThis.fetch = rstest
        .fn()
        .mockResolvedValue(createMockResponse(null, { ok: false, status: 404 }));

      await expect(getPokemonDataByURL(testUrl)).rejects.toThrow(
        'Failed to fetch Pokemon data from URL',
      );
    });
  });

  describe('getSpeciesDataById', () => {
    test('should fetch Pokemon species by ID', async () => {
      globalThis.fetch = rstest.fn().mockResolvedValue(createMockResponse(mockPokemonSpecies));

      const result = await getSpeciesDataById(1);

      expect(globalThis.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/1/');
      expect(result).toEqual(mockPokemonSpecies);
    });

    test('should handle species not found', async () => {
      globalThis.fetch = rstest
        .fn()
        .mockResolvedValue(createMockResponse(null, { ok: false, status: 404 }));

      await expect(getSpeciesDataById(99999)).rejects.toThrow(
        'Failed to fetch species data for ID 99999:',
      );
    });
  });

  describe('Utility Functions', () => {
    describe('isValidPokemonId', () => {
      test('should validate Pokemon IDs correctly', () => {
        expect(isValidPokemonId(1)).toBe(true);
        expect(isValidPokemonId(150)).toBe(true);
        expect(isValidPokemonId(1010)).toBe(true);
        expect(isValidPokemonId(0)).toBe(false);
        expect(isValidPokemonId(-1)).toBe(false);
        expect(isValidPokemonId(1011)).toBe(false);
      });
    });

    describe('formatWeight', () => {
      test('should format weight from hectograms to kg', () => {
        expect(formatWeight(69)).toBe('6.9 kg');
        expect(formatWeight(100)).toBe('10.0 kg');
        expect(formatWeight(5)).toBe('0.5 kg');
        expect(formatWeight(0)).toBe('0.0 kg');
      });
    });

    describe('formatHeight', () => {
      test('should format height from decimeters to meters', () => {
        expect(formatHeight(7)).toBe('0.7 m');
        expect(formatHeight(15)).toBe('1.5 m');
        expect(formatHeight(100)).toBe('10.0 m');
        expect(formatHeight(0)).toBe('0.0 m');
      });
    });

    describe('getTypeEffectiveness', () => {
      test('should return default effectiveness', () => {
        expect(getTypeEffectiveness()).toBe(1);
      });
    });
  });

  describe('Cache Management', () => {
    test('should set and get cached data', () => {
      const testData = { id: 1, name: 'test' };
      setCachedData('test-key', testData);

      expect(getCachedData('test-key')).toEqual(testData);
    });

    test('should return null for non-existent cache keys', () => {
      expect(getCachedData('non-existent')).toBeNull();
    });

    test('should clear all cached data', () => {
      setCachedData('key1', 'value1');
      setCachedData('key2', 'value2');

      clearCache();

      expect(getCachedData('key1')).toBeNull();
      expect(getCachedData('key2')).toBeNull();
    });

    test('should handle different data types in cache', () => {
      const stringData = 'test string';
      const numberData = 42;
      const objectData = { test: true };
      const arrayData = [1, 2, 3];

      setCachedData('string', stringData);
      setCachedData('number', numberData);
      setCachedData('object', objectData);
      setCachedData('array', arrayData);

      expect(getCachedData('string')).toBe(stringData);
      expect(getCachedData('number')).toBe(numberData);
      expect(getCachedData('object')).toEqual(objectData);
      expect(getCachedData('array')).toEqual(arrayData);
    });
  });

  describe('fetchWithErrorHandling', () => {
    test('should fetch data successfully', async () => {
      const mockData = { test: 'data' };
      globalThis.fetch = rstest.fn().mockResolvedValue(createMockResponse(mockData));

      const result = await fetchWithErrorHandling('https://test.com');

      expect(result).toEqual(mockData);
    });

    test('should handle HTTP errors', async () => {
      globalThis.fetch = rstest
        .fn()
        .mockResolvedValue(createMockResponse(null, { ok: false, status: 500 }));

      await expect(fetchWithErrorHandling('https://test.com')).rejects.toThrow(
        'HTTP error! status: 500',
      );
    });

    test('should handle network errors', async () => {
      const consoleSpy = rstest.spyOn(console, 'error').mockImplementation(() => {});
      globalThis.fetch = rstest.fn().mockRejectedValue(new Error('Network Error'));

      await expect(fetchWithErrorHandling('https://test.com')).rejects.toThrow('Network Error');
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('searchPokemon', () => {
    test('should search Pokemon by name', async () => {
      globalThis.fetch = rstest.fn().mockResolvedValue(createMockResponse(mockPokemon));

      const result = await searchPokemon('bulbasaur');

      expect(globalThis.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/bulbasaur');
      expect(result).toEqual(mockPokemon);
    });

    test('should search Pokemon by ID', async () => {
      globalThis.fetch = rstest.fn().mockResolvedValue(createMockResponse(mockPokemon));

      const result = await searchPokemon('1');

      expect(globalThis.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1');
      expect(result).toEqual(mockPokemon);
    });

    test('should return null for non-existent Pokemon', async () => {
      const consoleSpy = rstest.spyOn(console, 'warn').mockImplementation(() => {});
      globalThis.fetch = rstest.fn().mockRejectedValue(new Error('Not found'));

      const result = await searchPokemon('nonexistent');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Pokemon not found for query: nonexistent');

      consoleSpy.mockRestore();
    });
  });

  describe('getPokemonTypes', () => {
    test('should fetch pokemon types successfully', async () => {
      globalThis.fetch = rstest
        .fn()
        .mockResolvedValue(createMockResponse(mockApiResponses.pokemonTypes));

      const result = await getPokemonTypes();

      expect(result).toEqual(mockApiResponses.pokemonTypes);
      expect(globalThis.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type');
    });

    test('should handle fetch errors', async () => {
      globalThis.fetch = rstest.fn().mockRejectedValue(new Error('Network error'));

      await expect(getPokemonTypes()).rejects.toThrow('Network error');
    });
  });

  describe('getPokemonGenders', () => {
    test('should fetch pokemon genders successfully', async () => {
      globalThis.fetch = rstest
        .fn()
        .mockResolvedValue(createMockResponse(mockApiResponses.pokemonGenders));

      const result = await getPokemonGenders();

      expect(result).toEqual(mockApiResponses.pokemonGenders);
      expect(globalThis.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/gender');
    });

    test('should handle fetch errors', async () => {
      globalThis.fetch = rstest.fn().mockRejectedValue(new Error('Network error'));

      await expect(getPokemonGenders()).rejects.toThrow('Network error');
    });
  });

  describe('getPokemonTypesById', () => {
    test('should fetch pokemon type data by ID successfully', async () => {
      const mockTypeResponse = {
        damage_relations: {
          double_damage_from: [{ name: 'water' }],
          double_damage_to: [{ name: 'grass' }],
        },
      };

      globalThis.fetch = rstest.fn().mockResolvedValue(createMockResponse(mockTypeResponse));

      const result = await getPokemonTypesById(10);

      expect(result).toEqual(mockTypeResponse);
      expect(globalThis.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type/10/');
    });

    test('should handle fetch errors', async () => {
      globalThis.fetch = rstest.fn().mockRejectedValue(new Error('Network error'));

      await expect(getPokemonTypesById(1)).rejects.toThrow('Network error');
    });
  });

  describe('getAllParallelCall', () => {
    test('should make parallel API calls successfully', async () => {
      const urls = ['https://pokeapi.co/api/v2/type/10/', 'https://pokeapi.co/api/v2/type/11/'];

      const mockResponses = [
        { pokemon: [{ pokemon: { name: 'charmander' } }] },
        { pokemon: [{ pokemon: { name: 'squirtle' } }] },
      ];

      globalThis.fetch = rstest
        .fn()
        .mockResolvedValueOnce(createMockResponse(mockResponses[0]))
        .mockResolvedValueOnce(createMockResponse(mockResponses[1]));

      const result = await getAllParallelCall(urls);

      expect(result).toEqual(mockResponses);
      expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    });

    test('should handle empty URL array', async () => {
      const result = await getAllParallelCall([]);

      expect(result).toEqual([]);
    });

    test('should handle API errors in parallel calls', async () => {
      const urls = ['https://pokeapi.co/api/v2/type/10/'];
      const consoleSpy = rstest.spyOn(console, 'error').mockImplementation(() => {});

      globalThis.fetch = rstest.fn().mockRejectedValue(new Error('API Error'));

      await expect(getAllParallelCall(urls)).rejects.toThrow('API Error');
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('removeDuplicateBy', () => {
    test('should remove duplicates by specified key', () => {
      const data = [
        { name: 'pikachu', id: 1 },
        { name: 'charmander', id: 2 },
        { name: 'pikachu', id: 3 },
        { name: 'squirtle', id: 4 },
      ];

      const result = removeDuplicateBy(data, 'name');

      expect(result).toHaveLength(3);
      expect(result.map((item) => item.name)).toEqual(['pikachu', 'charmander', 'squirtle']);
    });

    test('should handle empty array', () => {
      const result = removeDuplicateBy([], 'name');

      expect(result).toEqual([]);
    });

    test('should handle array with no duplicates', () => {
      const data = [
        { name: 'pikachu', id: 1 },
        { name: 'charmander', id: 2 },
      ];

      const result = removeDuplicateBy(data, 'name');

      expect(result).toEqual(data);
    });

    test('should work with different property types', () => {
      const data = [
        { id: 1, active: true },
        { id: 2, active: false },
        { id: 3, active: true },
        { id: 4, active: false },
      ];

      const result = removeDuplicateBy(data, 'active');

      expect(result).toHaveLength(2);
      expect(result.map((item) => item.active)).toEqual([true, false]);
    });
  });

  describe('getBatchPokemonData', () => {
    test('should fetch pokemon details for multiple URLs', async () => {
      const urls = ['https://pokeapi.co/api/v2/pokemon/1/', 'https://pokeapi.co/api/v2/pokemon/2/'];

      const mockPokemonData = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' },
      ];

      globalThis.fetch = rstest
        .fn()
        .mockResolvedValueOnce(createMockResponse(mockPokemonData[0]))
        .mockResolvedValueOnce(createMockResponse(mockPokemonData[1]));

      const result = await getBatchPokemonData(urls);

      expect(result).toEqual(mockPokemonData);
      expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    });

    test('should handle empty URL list', async () => {
      const result = await getBatchPokemonData([]);

      expect(result).toEqual([]);
    });

    test('should handle API errors', async () => {
      const urls = ['https://pokeapi.co/api/v2/pokemon/1/'];
      const consoleSpy = rstest.spyOn(console, 'error').mockImplementation(() => {});

      globalThis.fetch = rstest.fn().mockRejectedValue(new Error('API Error'));

      await expect(getBatchPokemonData(urls)).rejects.toThrow('API Error');
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('getEvolutionChain', () => {
    test('should fetch evolution chain data successfully', async () => {
      const mockEvolutionData = {
        chain: {
          species: { name: 'bulbasaur' },
          evolves_to: [
            {
              species: { name: 'ivysaur' },
              evolves_to: [{ species: { name: 'venusaur' } }],
            },
          ],
        },
      };

      globalThis.fetch = rstest.fn().mockResolvedValue(createMockResponse(mockEvolutionData));

      const result = await getEvolutionChain('https://pokeapi.co/api/v2/evolution-chain/1/');

      expect(result).toEqual(mockEvolutionData);
    });

    test('should handle fetch errors', async () => {
      const consoleSpy = rstest.spyOn(console, 'error').mockImplementation(() => {});
      globalThis.fetch = rstest.fn().mockRejectedValue(new Error('Network error'));

      await expect(getEvolutionChain('invalid-url')).rejects.toThrow('Network error');

      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle malformed API responses', async () => {
      globalThis.fetch = rstest.fn().mockResolvedValue(createMockResponse(null));

      const result = await getPokemonData();

      expect(result).toBeNull();
    });

    test('should handle network timeouts', async () => {
      globalThis.fetch = rstest
        .fn()
        .mockImplementation(
          () => new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 100)),
        );

      await expect(getPokemonData()).rejects.toThrow('Timeout');
    });

    test('should handle invalid JSON responses', async () => {
      globalThis.fetch = rstest.fn().mockResolvedValue({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      } as unknown as Response);

      await expect(getPokemonData()).rejects.toThrow('Invalid JSON');
    });
  });
});
