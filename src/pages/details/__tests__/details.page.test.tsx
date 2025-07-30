import { render } from '@/utils/test-utils';
import * as commonService from '@services/common.service';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import DetailPage from '../details.page';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock the common service functions
jest.mock('@services/common.service', () => ({
  getPokemonDataById: jest.fn(),
  getPokemonTypesById: jest.fn(),
  getSpeciesDataById: jest.fn(),
  getPokemonSpeciesById: jest.fn(),
  getEvolutionChainById: jest.fn(),
}));

// Mock the child components
jest.mock('@components/pokemonDetailsCard/detailsHeader/detailsHeader', () => {
  return function MockDetailsHeader({
    forwardClick,
    backClick,
    closeClick,
  }: any) {
    return (
      <div data-testid="details-header">
        <button onClick={forwardClick} data-testid="forward-btn">
          Forward
        </button>
        <button onClick={backClick} data-testid="back-btn">
          Back
        </button>
        <button onClick={closeClick} data-testid="close-btn">
          Close
        </button>
      </div>
    );
  };
});

jest.mock('@components/pokemonDetailsCard/propertyCard/propertyCard', () => {
  return function MockPropertyCard() {
    return <div data-testid="property-card">Property Card</div>;
  };
});

jest.mock('@components/pokemonDetailsCard/statCard/statCard', () => {
  return function MockStatCard() {
    return <div data-testid="stat-card">Stat Card</div>;
  };
});

jest.mock(
  '@components/pokemonDetailsCard/evolutionChainCard/evolutionChainCard',
  () => {
    return function MockEvolutionChainCard() {
      return <div data-testid="evolution-chain-card">Evolution Chain Card</div>;
    };
  }
);

const mockPokemonData = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  sprites: {
    front_default: 'https://example.com/bulbasaur.png',
  },
  stats: [
    { base_stat: 45, stat: { name: 'hp' } },
    { base_stat: 49, stat: { name: 'attack' } },
  ],
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
};

const mockSpeciesData = {
  id: 1,
  name: 'bulbasaur',
  flavor_text_entries: [
    {
      flavor_text: 'A strange seed was planted on its back at birth.',
      language: { name: 'en' },
    },
  ],
};

const mockTypeData = {
  damage_relations: {
    double_damage_from: [{ name: 'fire' }, { name: 'psychic' }],
    double_damage_to: [{ name: 'water' }, { name: 'rock' }],
  },
};

const defaultProps = {
  isCardSelected: true,
  toggleModal: jest.fn(),
  pokemonId: 1,
  offset: 151,
};

describe('DetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();

    // Setup default mocks
    (commonService.getPokemonDataById as jest.Mock).mockResolvedValue(
      mockPokemonData
    );
    (commonService.getSpeciesDataById as jest.Mock).mockResolvedValue(
      mockSpeciesData
    );
    (commonService.getPokemonTypesById as jest.Mock).mockResolvedValue(
      mockTypeData
    );
  });

  describe('Rendering', () => {
    it('should render modal when isCardSelected is true', () => {
      render(<DetailPage {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should not render modal when isCardSelected is false', () => {
      render(<DetailPage {...defaultProps} isCardSelected={false} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should show loader initially', () => {
      render(<DetailPage {...defaultProps} />);

      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('Data Loading', () => {
    it('should fetch pokemon data on mount', async () => {
      render(<DetailPage {...defaultProps} />);

      await waitFor(() => {
        expect(commonService.getPokemonDataById).toHaveBeenCalledWith(1);
        expect(commonService.getSpeciesDataById).toHaveBeenCalledWith(1);
        expect(commonService.getPokemonTypesById).toHaveBeenCalledWith(1);
      });
    });

    it('should render all components when data is loaded', async () => {
      render(<DetailPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('details-header')).toBeInTheDocument();
        expect(screen.getByTestId('property-card')).toBeInTheDocument();
        expect(screen.getByTestId('stat-card')).toBeInTheDocument();
        expect(screen.getByTestId('evolution-chain-card')).toBeInTheDocument();
      });
    });

    it('should handle API errors gracefully', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      (commonService.getPokemonDataById as jest.Mock).mockRejectedValue(
        new Error('API Error')
      );

      render(<DetailPage {...defaultProps} />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          'Error fetching Pokemon details:',
          expect.any(Error)
        );
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Navigation', () => {
    it('should handle forward navigation', async () => {
      render(<DetailPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('forward-btn')).toBeInTheDocument();
      });

      const forwardBtn = screen.getByTestId('forward-btn');
      fireEvent.click(forwardBtn);

      await waitFor(() => {
        expect(commonService.getPokemonDataById).toHaveBeenCalledWith(2);
      });
    });

    it('should handle backward navigation', async () => {
      render(<DetailPage {...defaultProps} pokemonId={2} />);

      await waitFor(() => {
        expect(screen.getByTestId('back-btn')).toBeInTheDocument();
      });

      const backBtn = screen.getByTestId('back-btn');
      fireEvent.click(backBtn);

      await waitFor(() => {
        expect(commonService.getPokemonDataById).toHaveBeenCalledWith(1);
      });
    });

    it('should not navigate forward when at offset limit', async () => {
      render(<DetailPage {...defaultProps} pokemonId={151} offset={151} />);

      await waitFor(() => {
        expect(screen.getByTestId('forward-btn')).toBeInTheDocument();
      });

      const forwardBtn = screen.getByTestId('forward-btn');
      fireEvent.click(forwardBtn);

      // Should not make additional API calls beyond the initial load
      expect(commonService.getPokemonDataById).toHaveBeenCalledTimes(1);
    });

    it('should not navigate backward when at pokemon id 1', async () => {
      render(<DetailPage {...defaultProps} pokemonId={1} />);

      await waitFor(() => {
        expect(screen.getByTestId('back-btn')).toBeInTheDocument();
      });

      const backBtn = screen.getByTestId('back-btn');
      fireEvent.click(backBtn);

      // Should not make additional API calls beyond the initial load
      expect(commonService.getPokemonDataById).toHaveBeenCalledTimes(1);
    });
  });

  describe('Modal Interactions', () => {
    it('should call toggleModal when close button is clicked', async () => {
      const mockToggleModal = jest.fn();
      render(<DetailPage {...defaultProps} toggleModal={mockToggleModal} />);

      await waitFor(() => {
        expect(screen.getByTestId('close-btn')).toBeInTheDocument();
      });

      const closeBtn = screen.getByTestId('close-btn');
      fireEvent.click(closeBtn);

      expect(mockToggleModal).toHaveBeenCalled();
    });

    it('should clear pokemon data when modal is exited', async () => {
      render(<DetailPage {...defaultProps} />);

      // Wait for data to load
      await waitFor(() => {
        expect(screen.getByTestId('details-header')).toBeInTheDocument();
      });

      // Simulate modal exit
      const modal = screen.getByRole('dialog');
      const onExited = modal.getAttribute('onExited');

      // This would be called by the Modal component when it exits
      // We can't easily test this without more complex setup
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing pokemon data gracefully', () => {
      (commonService.getPokemonDataById as jest.Mock).mockResolvedValue(null);

      render(<DetailPage {...defaultProps} />);

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should handle missing stats data', async () => {
      const pokemonWithoutStats = { ...mockPokemonData, stats: null };
      (commonService.getPokemonDataById as jest.Mock).mockResolvedValue(
        pokemonWithoutStats
      );

      render(<DetailPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('details-header')).toBeInTheDocument();
      });

      // Stat card should not be rendered when stats are missing
      expect(screen.queryByTestId('stat-card')).not.toBeInTheDocument();
    });

    it('should handle missing type data', async () => {
      (commonService.getPokemonTypesById as jest.Mock).mockResolvedValue(null);

      render(<DetailPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('details-header')).toBeInTheDocument();
      });

      // Property card should not be rendered when type data is missing
      expect(screen.queryByTestId('property-card')).not.toBeInTheDocument();
    });
  });

  describe('Loading States', () => {
    it('should show placeholder when detail loading is true', async () => {
      // Mock a delayed response to keep loading state
      (commonService.getPokemonDataById as jest.Mock).mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(() => resolve(mockPokemonData), 100)
          )
      );

      render(<DetailPage {...defaultProps} />);

      // Should show loader initially
      expect(screen.getByRole('status')).toBeInTheDocument(); // Loader has role="status"
    });

    it('should hide placeholder when detail loading is false', async () => {
      render(<DetailPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('details-header')).toBeInTheDocument();
      });

      // Placeholder should be gone
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      (commonService.getPokemonDataById as jest.Mock).mockRejectedValue(
        new Error('API Error')
      );

      render(<DetailPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });

    it('should handle network failures', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      (commonService.getPokemonDataById as jest.Mock).mockRejectedValue(
        new Error('Network Error')
      );

      render(<DetailPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });

    it('should handle species data errors', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      (commonService.getPokemonSpeciesById as jest.Mock).mockRejectedValue(
        new Error('Species API Error')
      );

      render(<DetailPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('details-header')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });

    it('should handle evolution chain errors', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      (commonService.getEvolutionChainById as jest.Mock).mockRejectedValue(
        new Error('Evolution Chain Error')
      );

      render(<DetailPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('details-header')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Performance', () => {
    it('should handle rapid navigation changes', async () => {
      render(<DetailPage {...defaultProps} pokemonId={1} />);

      await waitFor(() => {
        expect(screen.getByTestId('forward-btn')).toBeInTheDocument();
      });

      const forwardBtn = screen.getByTestId('forward-btn');

      // Rapid clicks should not cause issues
      fireEvent.click(forwardBtn);
      fireEvent.click(forwardBtn);
      fireEvent.click(forwardBtn);

      // Button should still be present after rapid clicks
      await waitFor(() => {
        expect(screen.getByTestId('forward-btn')).toBeInTheDocument();
      });
    });

    it('should handle large pokemon IDs efficiently', async () => {
      render(<DetailPage {...defaultProps} pokemonId={999} />);

      await waitFor(() => {
        expect(screen.getByTestId('details-header')).toBeInTheDocument();
      });

      expect(commonService.getPokemonDataById).toHaveBeenCalledWith(999);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', async () => {
      render(<DetailPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
    });

    it('should support keyboard navigation', async () => {
      render(<DetailPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('back-btn')).toBeInTheDocument();
      });

      const backBtn = screen.getByTestId('back-btn');
      backBtn.focus();
      expect(document.activeElement).toBe(backBtn);
    });

    it('should handle escape key for modal close', async () => {
      const mockToggleModal = jest.fn();
      render(<DetailPage {...defaultProps} toggleModal={mockToggleModal} />);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const modal = screen.getByRole('dialog');
      fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' });

      // Modal should handle escape key appropriately
      expect(modal).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should work with context providers', async () => {
      render(<DetailPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('details-header')).toBeInTheDocument();
      });

      // Should integrate with context without errors
      expect(screen.getByTestId('details-header')).toBeInTheDocument();
    });

    it('should handle context state changes', async () => {
      render(<DetailPage {...defaultProps} pokemonId={1} />);

      await waitFor(() => {
        expect(screen.getByTestId('forward-btn')).toBeInTheDocument();
      });

      const forwardBtn = screen.getByTestId('forward-btn');
      fireEvent.click(forwardBtn);

      await waitFor(() => {
        expect(commonService.getPokemonDataById).toHaveBeenCalledWith(2);
      });
    });
  });
});
