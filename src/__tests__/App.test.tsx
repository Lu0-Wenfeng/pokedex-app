import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockApiResponses, mockPokemon } from '@/utils/test-utils';
import App from '../App';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('App Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIntersectionObserver.mockClear();

    // Set up fetch mock for each test
    global.fetch = jest.fn((url: string) => {
      // Pokemon list endpoints
      if (url.includes('/pokemon?limit=')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockApiResponses.pokemonList),
        } as Response);
      }

      // Individual Pokemon endpoints
      if (url.includes('/pokemon/1/') || url.includes('/pokemon/1')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({ ...mockPokemon, id: 1, name: 'bulbasaur' }),
        } as Response);
      }

      if (url.includes('/pokemon/2/') || url.includes('/pokemon/2')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({ ...mockPokemon, id: 2, name: 'ivysaur' }),
        } as Response);
      }

      if (url.includes('/pokemon/3/') || url.includes('/pokemon/3')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({ ...mockPokemon, id: 3, name: 'venusaur' }),
        } as Response);
      }

      // Pokemon types endpoint
      if (url.includes('/type')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockApiResponses.pokemonTypes),
        } as Response);
      }

      // Pokemon genders endpoint
      if (url.includes('/gender')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockApiResponses.pokemonGenders),
        } as Response);
      }

      // Default fallback
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response);
    });
  });

  describe('App Initialization', () => {
    it('should render the app without crashing', () => {
      render(<App />);
      expect(document.body).toBeInTheDocument();
    });

    it('should display the header and search interface', async () => {
      render(<App />);

      // Wait for the app to load
      await waitFor(() => {
        expect(screen.getByText('Pokédex')).toBeInTheDocument();
      });

      // Check that the search input is rendered
      expect(screen.getByPlaceholderText('Name or Number')).toBeInTheDocument();
    });

    it('should load and display Pokemon data', async () => {
      render(<App />);

      // Wait for Pokemon data to load and display
      await waitFor(
        () => {
          expect(screen.getByText('bulbasaur')).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    });

    it('should handle search functionality', async () => {
      render(<App />);

      // Wait for the app to load
      await waitFor(() => {
        expect(
          screen.getByPlaceholderText('Name or Number')
        ).toBeInTheDocument();
      });

      // Test search input
      const searchInput = screen.getByPlaceholderText('Name or Number');
      fireEvent.change(searchInput, { target: { value: 'pikachu' } });
      expect(searchInput).toHaveValue('pikachu');
    });
  });
});
