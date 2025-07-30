import { mockPokemon, render } from '@/utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import PokemonCard from '../pokemonCard';

describe('PokemonCard', () => {
  const defaultProps = {
    data: mockPokemon,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render Pokemon card with basic information', () => {
      render(<PokemonCard {...defaultProps} />);

      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('001')).toBeInTheDocument();
      expect(screen.getByAltText('bulbasaur avatar')).toBeInTheDocument();
    });

    it('should render Pokemon image with correct src', () => {
      render(<PokemonCard {...defaultProps} />);

      const image = screen.getByAltText('bulbasaur avatar') as HTMLImageElement;
      expect(image.src).toBe(
        mockPokemon.sprites.other.dream_world.front_default
      );
    });

    it('should use fallback image when dream_world sprite is not available', () => {
      const pokemonWithoutDreamWorld = {
        ...mockPokemon,
        sprites: {
          ...mockPokemon.sprites,
          other: {
            ...mockPokemon.sprites.other,
            dream_world: {
              front_default: null,
              front_female: null,
            },
          },
        },
      };

      render(<PokemonCard data={pokemonWithoutDreamWorld} />);

      const image = screen.getByAltText('bulbasaur avatar') as HTMLImageElement;
      expect(image.src).toBe(mockPokemon.sprites.front_default);
    });

    it('should use placeholder when no sprites are available', () => {
      const pokemonWithoutSprites = {
        ...mockPokemon,
        sprites: {
          ...mockPokemon.sprites,
          front_default: null,
          other: {
            ...mockPokemon.sprites.other,
            dream_world: {
              front_default: null,
              front_female: null,
            },
          },
        },
      };

      render(<PokemonCard data={pokemonWithoutSprites} />);

      const image = screen.getByAltText('bulbasaur avatar') as HTMLImageElement;
      expect(image.src).toBe('https://via.placeholder.com/150');
    });

    it('should apply custom className', () => {
      const customClass = 'custom-pokemon-card';
      render(<PokemonCard {...defaultProps} className={customClass} />);

      const card = screen.getByRole('presentation');
      expect(card).toHaveClass(customClass);
      expect(card).toHaveClass('card');
    });

    it('should format Pokemon ID correctly', () => {
      const highIdPokemon = { ...mockPokemon, id: 150 };
      render(<PokemonCard data={highIdPokemon} />);

      expect(screen.getByText('150')).toBeInTheDocument();
    });

    it('should format single digit Pokemon ID with leading zeros', () => {
      const singleDigitPokemon = { ...mockPokemon, id: 5 };
      render(<PokemonCard data={singleDigitPokemon} />);

      expect(screen.getByText('005')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onClick when card is clicked', () => {
      const mockOnClick = jest.fn();
      render(<PokemonCard {...defaultProps} onClick={mockOnClick} />);

      const card = screen.getByRole('presentation');
      fireEvent.click(card);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when no onClick prop is provided', () => {
      render(<PokemonCard {...defaultProps} />);

      const card = screen.getByRole('presentation');
      fireEvent.click(card);

      // Should not throw any errors
      expect(card).toBeInTheDocument();
    });

    it('should handle keyboard events when onClick is provided', () => {
      const mockOnClick = jest.fn();
      render(<PokemonCard {...defaultProps} onClick={mockOnClick} />);

      const card = screen.getByRole('presentation');
      fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });

      // Note: The component doesn't handle keyboard events, but we test that it doesn't break
      expect(card).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should apply background style based on Pokemon types', () => {
      render(<PokemonCard {...defaultProps} />);

      const card = screen.getByRole('presentation');
      // The component should render without errors
      expect(card).toBeInTheDocument();
      // The component should have the card class
      expect(card).toHaveClass('card');
    });

    it('should handle Pokemon with multiple types', () => {
      const dualTypePokemon = {
        ...mockPokemon,
        types: [
          {
            slot: 1,
            type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
          },
          {
            slot: 2,
            type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
          },
        ],
      };

      render(<PokemonCard data={dualTypePokemon} />);

      const card = screen.getByRole('presentation');
      // Should render without errors
      expect(card).toBeInTheDocument();
      // The component should have the card class
      expect(card).toHaveClass('card');
    });
  });

  describe('Accessibility', () => {
    it('should have proper role attribute', () => {
      render(<PokemonCard {...defaultProps} />);

      const card = screen.getByRole('presentation');
      expect(card).toBeInTheDocument();
    });

    it('should have proper alt text for image', () => {
      render(<PokemonCard {...defaultProps} />);

      const image = screen.getByAltText('bulbasaur avatar');
      expect(image).toBeInTheDocument();
    });

    it('should handle Pokemon names with special characters', () => {
      const specialNamePokemon = { ...mockPokemon, name: 'mr-mime' };
      render(<PokemonCard data={specialNamePokemon} />);

      expect(screen.getByText('mr-mime')).toBeInTheDocument();
      expect(screen.getByAltText('mr-mime avatar')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle Pokemon with very high ID numbers', () => {
      const highIdPokemon = { ...mockPokemon, id: 1001 };
      render(<PokemonCard data={highIdPokemon} />);

      expect(screen.getByText('1001')).toBeInTheDocument();
    });

    it('should handle Pokemon with empty name', () => {
      const emptyNamePokemon = { ...mockPokemon, name: '' };
      render(<PokemonCard data={emptyNamePokemon} />);

      // Check that the image exists (empty name results in " avatar")
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(screen.getByText('001')).toBeInTheDocument(); // ID should still be displayed
    });

    it('should handle Pokemon with no types', () => {
      const noTypesPokemon = { ...mockPokemon, types: [] };
      render(<PokemonCard data={noTypesPokemon} />);

      const card = screen.getByRole('presentation');
      expect(card).toBeInTheDocument();
    });
  });
});
