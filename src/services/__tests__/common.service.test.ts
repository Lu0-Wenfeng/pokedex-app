import {
  clearCache,
  fetchWithErrorHandling,
  formatHeight,
  formatWeight,
  getCachedData,
  getPokemonData,
  getPokemonDataById,
  getSpeciesDataById,
  getTypeEffectiveness,
  isValidPokemonId,
  numberFormation,
  searchPokemon,
  setCachedData,
} from '../common.service';

// Import additional functions for comprehensive testing
import {
  getAllParallelCall,
  getBatchPokemonData,
  getEvolutionChain,
  getPokemonGenders,
  getPokemonTypes,
  getPokemonTypesById,
  removeDuplicateBy,
} from '../common.service';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Common Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
    clearCache(); // Clear cache before each test
  });

  describe('numberFormation', () => {
    it('should format single digit numbers', () => {
      expect(numberFormation(1)).toBe('001');
      expect(numberFormation(5)).toBe('005');
      expect(numberFormation(9)).toBe('009');
    });

    it('should format double digit numbers', () => {
      expect(numberFormation(10)).toBe('010');
      expect(numberFormation(25)).toBe('025');
      expect(numberFormation(99)).toBe('099');
    });

    it('should format triple digit numbers', () => {
      expect(numberFormation(100)).toBe('100');
      expect(numberFormation(150)).toBe('150');
      expect(numberFormation(999)).toBe('999');
    });

    it('should handle numbers greater than 999', () => {
      expect(numberFormation(1000)).toBe('1000');
      expect(numberFormation(1500)).toBe('1500');
    });

    it('should handle zero', () => {
      expect(numberFormation(0)).toBe('000');
    });

    it('should handle string numbers', () => {
      expect(numberFormation('5')).toBe('005');
      expect(numberFormation('25')).toBe('025');
      expect(numberFormation('100')).toBe('100');
    });

    it('should handle negative numbers', () => {
      expect(numberFormation(-1)).toBe('00-1');
      expect(numberFormation(-10)).toBe('00-10');
    });
  });

  describe('getPokemonData', () => {
    const mockPokemonListResponse = {
      count: 1302,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    };

    it('should fetch Pokemon data successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonListResponse,
      } as Response);

      const result = await getPokemonData();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('pokemon?limit=12')
      );
      expect(result).toEqual(mockPokemonListResponse);
    });

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      } as Response);

      await expect(getPokemonData()).rejects.toThrow(
        'Failed to fetch Pokemon data: Not Found'
      );
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network Error'));

      await expect(getPokemonData()).rejects.toThrow('Network Error');
    });
  });

  describe('getPokemonDataById', () => {
    const mockPokemon = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      types: [{ type: { name: 'grass' } }],
    };

    it('should fetch Pokemon by numeric ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemon,
      } as Response);

      const result = await getPokemonDataById(1);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/1/'
      );
      expect(result).toEqual(mockPokemon);
    });

    it('should handle invalid Pokemon ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      await expect(getPokemonDataById(99999)).rejects.toThrow(
        'Failed to fetch Pokemon data for ID 99999: Not Found'
      );
    });
  });

  describe('getSpeciesDataById', () => {
    const mockSpecies = {
      id: 1,
      name: 'bulbasaur',
      color: { name: 'green' },
      habitat: { name: 'grassland' },
    };

    it('should fetch Pokemon species by ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpecies,
      } as Response);

      const result = await getSpeciesDataById(1);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon-species/1/'
      );
      expect(result).toEqual(mockSpecies);
    });

    it('should handle species not found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      await expect(getSpeciesDataById(99999)).rejects.toThrow(
        'Failed to fetch species data for ID 99999: Not Found'
      );
    });
  });

  describe('Utility Functions', () => {
    describe('isValidPokemonId', () => {
      it('should validate Pokemon IDs correctly', () => {
        expect(isValidPokemonId(1)).toBe(true);
        expect(isValidPokemonId(150)).toBe(true);
        expect(isValidPokemonId(1010)).toBe(true);
        expect(isValidPokemonId(0)).toBe(false);
        expect(isValidPokemonId(-1)).toBe(false);
        expect(isValidPokemonId(1011)).toBe(false);
      });
    });

    describe('formatWeight', () => {
      it('should format weight from hectograms to kg', () => {
        expect(formatWeight(69)).toBe('6.9 kg');
        expect(formatWeight(100)).toBe('10.0 kg');
        expect(formatWeight(5)).toBe('0.5 kg');
      });
    });

    describe('formatHeight', () => {
      it('should format height from decimeters to meters', () => {
        expect(formatHeight(7)).toBe('0.7 m');
        expect(formatHeight(15)).toBe('1.5 m');
        expect(formatHeight(100)).toBe('10.0 m');
      });
    });

    describe('getTypeEffectiveness', () => {
      it('should return default effectiveness', () => {
        expect(getTypeEffectiveness()).toBe(1);
      });
    });
  });

  describe('Cache Management', () => {
    it('should set and get cached data', () => {
      const testData = { id: 1, name: 'test' };
      setCachedData('test-key', testData);

      expect(getCachedData('test-key')).toEqual(testData);
    });

    it('should return null for non-existent cache keys', () => {
      expect(getCachedData('non-existent')).toBeNull();
    });

    it('should clear all cached data', () => {
      setCachedData('key1', 'value1');
      setCachedData('key2', 'value2');

      clearCache();

      expect(getCachedData('key1')).toBeNull();
      expect(getCachedData('key2')).toBeNull();
    });
  });

  describe('fetchWithErrorHandling', () => {
    it('should fetch data successfully', async () => {
      const mockData = { test: 'data' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await fetchWithErrorHandling('https://test.com');

      expect(result).toEqual(mockData);
    });

    it('should handle HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response);

      await expect(fetchWithErrorHandling('https://test.com')).rejects.toThrow(
        'HTTP error! status: 500'
      );
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network Error'));

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await expect(fetchWithErrorHandling('https://test.com')).rejects.toThrow(
        'Network Error'
      );
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('searchPokemon', () => {
    it('should search Pokemon by name', async () => {
      const mockPokemon = { id: 25, name: 'pikachu' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemon,
      } as Response);

      const result = await searchPokemon('pikachu');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
      expect(result).toEqual(mockPokemon);
    });

    it('should search Pokemon by ID', async () => {
      const mockPokemon = { id: 25, name: 'pikachu' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemon,
      } as Response);

      const result = await searchPokemon('25');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/25'
      );
      expect(result).toEqual(mockPokemon);
    });

    it('should return null for non-existent Pokemon', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Not found'));

      const consoleSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      const result = await searchPokemon('nonexistent');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Pokemon not found for query: nonexistent'
      );

      consoleSpy.mockRestore();
    });
  });

  describe('getPokemonTypes', () => {
    it('should fetch pokemon types successfully', async () => {
      const mockTypesResponse = {
        results: [
          { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
          { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTypesResponse,
      });

      const result = await getPokemonTypes();

      expect(result).toEqual(mockTypesResponse);
      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type');
    });

    it('should handle fetch errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getPokemonTypes()).rejects.toThrow('Network error');
    });
  });

  describe('getPokemonGenders', () => {
    it('should fetch pokemon genders successfully', async () => {
      const mockGendersResponse = {
        results: [
          { name: 'male', url: 'https://pokeapi.co/api/v2/gender/2/' },
          { name: 'female', url: 'https://pokeapi.co/api/v2/gender/1/' },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGendersResponse,
      });

      const result = await getPokemonGenders();

      expect(result).toEqual(mockGendersResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/gender'
      );
    });

    it('should handle fetch errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getPokemonGenders()).rejects.toThrow('Network error');
    });
  });

  describe('getAllParallelCall', () => {
    it('should make parallel API calls successfully', async () => {
      const urls = [
        'https://pokeapi.co/api/v2/type/10/',
        'https://pokeapi.co/api/v2/type/11/',
      ];

      const mockResponses = [
        { pokemon: [{ pokemon: { name: 'charmander' } }] },
        { pokemon: [{ pokemon: { name: 'squirtle' } }] },
      ];

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponses[0],
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponses[1],
        });

      const result = await getAllParallelCall(urls);

      expect(result).toEqual(mockResponses);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should handle empty URL array', async () => {
      const result = await getAllParallelCall([]);

      expect(result).toEqual([]);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should handle API errors in parallel calls', async () => {
      const urls = ['https://pokeapi.co/api/v2/type/10/'];

      mockFetch.mockRejectedValueOnce(new Error('API Error'));

      await expect(getAllParallelCall(urls)).rejects.toThrow('API Error');
    });
  });

  describe('removeDuplicateBy', () => {
    it('should remove duplicates by specified key', () => {
      const data = [
        { name: 'pikachu', id: 1 },
        { name: 'charmander', id: 2 },
        { name: 'pikachu', id: 3 },
        { name: 'squirtle', id: 4 },
      ];

      const result = removeDuplicateBy(data, 'name');

      expect(result).toHaveLength(3);
      expect(result.map(item => item.name)).toEqual([
        'pikachu',
        'charmander',
        'squirtle',
      ]);
    });

    it('should handle empty array', () => {
      const result = removeDuplicateBy([], 'name');

      expect(result).toEqual([]);
    });

    it('should handle array with no duplicates', () => {
      const data = [
        { name: 'pikachu', id: 1 },
        { name: 'charmander', id: 2 },
      ];

      const result = removeDuplicateBy(data, 'name');

      expect(result).toEqual(data);
    });
  });

  describe('getPokemonTypesById', () => {
    it('should fetch pokemon type data by ID successfully', async () => {
      const mockTypeResponse = {
        damage_relations: {
          double_damage_from: [{ name: 'water' }],
          double_damage_to: [{ name: 'grass' }],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTypeResponse,
      });

      const result = await getPokemonTypesById(10);

      expect(result).toEqual(mockTypeResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/type/10/'
      );
    });

    it('should handle fetch errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getPokemonTypesById(1)).rejects.toThrow('Network error');
    });
  });

  describe('getBatchPokemonData', () => {
    it('should fetch pokemon details for multiple URLs', async () => {
      const urls = [
        'https://pokeapi.co/api/v2/pokemon/1/',
        'https://pokeapi.co/api/v2/pokemon/2/',
      ];

      const mockPokemonData = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' },
      ];

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonData[0],
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemonData[1],
        });

      const result = await getBatchPokemonData(urls);

      expect(result).toEqual(mockPokemonData);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should handle empty URL list', async () => {
      const result = await getBatchPokemonData([]);

      expect(result).toEqual([]);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should handle API errors', async () => {
      const urls = ['https://pokeapi.co/api/v2/pokemon/1/'];

      mockFetch.mockRejectedValueOnce(new Error('API Error'));

      await expect(getBatchPokemonData(urls)).rejects.toThrow('API Error');
    });
  });

  describe('getEvolutionChain', () => {
    it('should fetch evolution chain data successfully', async () => {
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

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockEvolutionData,
      });

      const result = await getEvolutionChain(
        'https://pokeapi.co/api/v2/evolution-chain/1/'
      );

      expect(result).toEqual(mockEvolutionData);
    });

    it('should handle fetch errors', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getEvolutionChain('invalid-url')).rejects.toThrow(
        'Network error'
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle malformed API responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => null,
      });

      const result = await getPokemonData();

      expect(result).toBeNull();
    });

    it('should handle network timeouts', async () => {
      mockFetch.mockImplementationOnce(
        () =>
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 100)
          )
      );

      await expect(getPokemonData()).rejects.toThrow('Timeout');
    });

    it('should handle invalid JSON responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      await expect(getPokemonData()).rejects.toThrow('Invalid JSON');
    });
  });
});
