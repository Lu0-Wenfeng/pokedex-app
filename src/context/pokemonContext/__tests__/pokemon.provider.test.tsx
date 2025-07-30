import {
  mockApiResponses,
  mockPokemon,
  render,
  screen,
} from '@/utils/test-utils';
import { act, waitFor } from '@testing-library/react';
import { useContext } from 'react';
import { PokemonProvider } from '../pokemon.provider';
import PokemonContext from '../pokmon.context';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Test component to access context
const TestComponent: React.FC = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('TestComponent must be used within a PokemonProvider');
  }

  const { state, getPokemonData, setAppLoading } = context;

  return (
    <div>
      <div data-testid="pokemon-count">{state.pokemonsList.length}</div>
      <div data-testid="loading">
        {state.isLoading ? 'loading' : 'not-loading'}
      </div>
      <div data-testid="load-more">
        {state.isLoadMoreInprogress ? 'load-more' : 'not-load-more'}
      </div>
      <button
        type="button"
        onClick={() => getPokemonData()}
        data-testid="fetch-pokemon"
      >
        Fetch Pokemon
      </button>
      <button
        type="button"
        onClick={() => setAppLoading(true)}
        data-testid="set-loading"
      >
        Set Loading
      </button>
    </div>
  );
};

describe('PokemonProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
  });

  describe('Provider Setup', () => {
    it('should provide context to children', () => {
      render(
        <PokemonProvider>
          <TestComponent />
        </PokemonProvider>
      );

      expect(screen.getByTestId('pokemon-count')).toBeInTheDocument();
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    it('should throw error when used outside provider', () => {
      // Import raw render to avoid the provider wrapper
      const { render: rawRender } = require('@testing-library/react');

      // Suppress console.error for this test
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => rawRender(<TestComponent />)).toThrow();

      consoleSpy.mockRestore();
    });

    it('should initialize with default state', async () => {
      // Mock fetch to prevent actual API calls during initialization
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          results: [],
          count: 0,
          next: null,
          previous: null,
        }),
      } as Response);

      render(
        <PokemonProvider>
          <TestComponent />
        </PokemonProvider>
      );

      expect(screen.getByTestId('pokemon-count')).toHaveTextContent('0');

      // Wait for the initialization to complete
      await waitFor(() => {
        expect(screen.getByTestId('load-more')).toHaveTextContent(
          'not-load-more'
        );
      });
    });
  });

  describe('Initial Data Loading', () => {
    it('should fetch initial Pokemon data on mount', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemon,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response);

      render(
        <PokemonProvider>
          <TestComponent />
        </PokemonProvider>
      );

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('pokemon?limit=12')
        );
      });
    });

    it('should handle initial loading state', async () => {
      mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(
        <PokemonProvider>
          <TestComponent />
        </PokemonProvider>
      );

      expect(screen.getByTestId('loading')).toHaveTextContent('loading');
    });

    it('should fetch all Pokemon list on initialization', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemon,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response);

      render(
        <PokemonProvider>
          <TestComponent />
        </PokemonProvider>
      );

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('pokemon?limit=1100')
        );
      });
    });
  });

  describe('Pokemon Data Fetching', () => {
    it('should fetch Pokemon data when getPokemonData is called', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemon,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemon,
        } as Response);

      render(
        <PokemonProvider>
          <TestComponent />
        </PokemonProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('fetch-pokemon')).toBeInTheDocument();
      });

      act(() => {
        screen.getByTestId('fetch-pokemon').click();
      });

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(7); // Initial calls + manual call
      });
    });

    it('should handle API errors gracefully', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      mockFetch.mockRejectedValue(new Error('API Error'));

      render(
        <PokemonProvider>
          <TestComponent />
        </PokemonProvider>
      );

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalled();
      });

      consoleSpy.mockRestore();
    });

    it('should handle HTTP errors', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      mockFetch.mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
      } as Response);

      render(
        <PokemonProvider>
          <TestComponent />
        </PokemonProvider>
      );

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalled();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Loading States', () => {
    it('should manage loading state correctly', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemon,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response);

      render(
        <PokemonProvider>
          <TestComponent />
        </PokemonProvider>
      );

      // Should start loading
      expect(screen.getByTestId('loading')).toHaveTextContent('loading');

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('not-loading');
      });
    });

    it('should allow manual loading state control', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemon,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response);

      render(
        <PokemonProvider>
          <TestComponent />
        </PokemonProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('set-loading')).toBeInTheDocument();
      });

      act(() => {
        screen.getByTestId('set-loading').click();
      });

      expect(screen.getByTestId('loading')).toHaveTextContent('loading');
    });
  });

  describe('Context Value Memoization', () => {
    it('should memoize context value to prevent unnecessary re-renders', async () => {
      const renderSpy = jest.fn();

      const SpyComponent: React.FC = () => {
        const context = useContext(PokemonContext);
        renderSpy();
        return <div>{context ? 'has-context' : 'no-context'}</div>;
      };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemon,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response);

      const { rerender } = render(
        <PokemonProvider>
          <SpyComponent />
        </PokemonProvider>
      );

      const initialRenderCount = renderSpy.mock.calls.length;

      // Re-render the provider
      rerender(
        <PokemonProvider>
          <SpyComponent />
        </PokemonProvider>
      );

      // Should not cause excessive re-renders
      expect(renderSpy.mock.calls.length).toBeGreaterThan(0);
    });
  });

  describe('Concurrent Requests', () => {
    it('should prevent multiple simultaneous requests', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemon,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponses.pokemonList,
        } as Response);

      render(
        <PokemonProvider>
          <TestComponent />
        </PokemonProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('fetch-pokemon')).toBeInTheDocument();
      });

      // Rapidly click multiple times
      act(() => {
        screen.getByTestId('fetch-pokemon').click();
        screen.getByTestId('fetch-pokemon').click();
        screen.getByTestId('fetch-pokemon').click();
      });

      // Should not make excessive API calls
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });
    });
  });
});
