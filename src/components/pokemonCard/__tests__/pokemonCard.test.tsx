import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockPokemon, mockPokemonWithoutImage } from '@utils/test-utils';
import PokemonCard from '../pokemonCard';

describe('PokemonCard', () => {
  const mockOnClick = rstest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });
  it('renders pokemon card with correct data', () => {
    render(<PokemonCard data={mockPokemon} onClick={mockOnClick} />);

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('#0025')).toBeInTheDocument();
    expect(screen.getByAltText('pikachu avatar')).toBeInTheDocument();
  });

  it('displays pokemon image from dream world sprites when available', () => {
    render(<PokemonCard data={mockPokemon} />);

    const image = screen.getByAltText('pikachu avatar') as HTMLImageElement;
    expect(image.src).toBe(mockPokemon.sprites.other.dream_world.front_default);
  });

  it('falls back to front_default sprite when dream world is not available', () => {
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

    const image = screen.getByAltText('pikachu avatar') as HTMLImageElement;
    expect(image.src).toBe(mockPokemon.sprites.front_default);
  });

  it('uses placeholder image when no sprites are available', () => {
    render(<PokemonCard data={mockPokemonWithoutImage} />);

    const image = screen.getByAltText('test-pokemon avatar') as HTMLImageElement;
    expect(image.src).toBe('https://via.placeholder.com/150');
  });

  it('calls onClick handler when card is clicked', async () => {
    const user = userEvent.setup();
    render(<PokemonCard data={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    await user.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard interaction', async () => {
    const user = userEvent.setup();
    render(<PokemonCard data={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard('{Enter}');

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className when provided', () => {
    render(<PokemonCard data={mockPokemon} className="custom-class" />);

    const card = screen.getByRole('button');
    expect(card).toHaveClass('custom-class');
    expect(card).toHaveClass('card');
  });

  it('applies background style based on pokemon types', () => {
    render(<PokemonCard data={mockPokemon} />);

    const card = screen.getByRole('button');
    expect(card).toHaveStyle('background: linear-gradient(135deg, #f1c232 0%, #f1c232 100%)');
  });

  it('handles pokemon with multiple types', () => {
    const multiTypePokemon = {
      ...mockPokemon,
      types: [
        { slot: 1, type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' } },
        { slot: 2, type: { name: 'steel', url: 'https://pokeapi.co/api/v2/type/9/' } },
      ],
    };

    render(<PokemonCard data={multiTypePokemon} />);

    const card = screen.getByRole('button');
    // The background should reflect the multiple type styling
    expect(card).toHaveStyle('background: linear-gradient(135deg, #f1c232 0%, #5a5a5a 100%)');
  });

  it('formats pokemon ID correctly with padding', () => {
    const pokemonWith3DigitId = {
      ...mockPokemon,
      id: 150,
    };

    render(<PokemonCard data={pokemonWith3DigitId} />);

    expect(screen.getByText('#0150')).toBeInTheDocument();
  });

  it('renders without onClick handler', () => {
    render(<PokemonCard data={mockPokemon} />);

    const card = screen.getByRole('button');
    expect(card).toBeInTheDocument();

    // Should not throw error when clicked without handler
    fireEvent.click(card);
  });

  it('has proper accessibility attributes', () => {
    render(<PokemonCard data={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('type', 'button');

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'pikachu avatar');
  });

  it('handles long pokemon names gracefully', () => {
    const longNamePokemon = {
      ...mockPokemon,
      name: 'very-long-pokemon-name-that-might-overflow',
    };

    render(<PokemonCard data={longNamePokemon} />);

    expect(screen.getByText('very-long-pokemon-name-that-might-overflow')).toBeInTheDocument();
  });

  it('handles edge case with ID 0', () => {
    const zeroIdPokemon = {
      ...mockPokemon,
      id: 0,
    };

    render(<PokemonCard data={zeroIdPokemon} />);

    expect(screen.getByText('#0000')).toBeInTheDocument();
  });

  it('handles very high ID numbers', () => {
    const highIdPokemon = {
      ...mockPokemon,
      id: 9999,
    };

    render(<PokemonCard data={highIdPokemon} />);

    expect(screen.getByText('#9999')).toBeInTheDocument();
  });
});
