import { screen } from '@testing-library/react';
import { render } from '@/utils/test-utils';
import Header from '../header';

describe('Header', () => {
  describe('Rendering', () => {
    it('should render header with children', () => {
      render(
        <Header>
          <h1>Test Header Content</h1>
        </Header>
      );

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByText('Test Header Content')).toBeInTheDocument();
    });

    it('should render header with text content', () => {
      render(<Header>Simple text content</Header>);

      expect(screen.getByText('Simple text content')).toBeInTheDocument();
    });

    it('should render header with complex JSX children', () => {
      render(
        <Header>
          <div>
            <h1>Pokédex</h1>
            <p>Search for any Pokémon</p>
            <button type="button">Filter</button>
          </div>
        </Header>
      );

      expect(screen.getByText('Pokédex')).toBeInTheDocument();
      expect(screen.getByText('Search for any Pokémon')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Filter' })
      ).toBeInTheDocument();
    });

    it('should render empty header when no children provided', () => {
      render(<Header>{null}</Header>);

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      expect(header).toBeEmptyDOMElement();
    });

    it('should render header with multiple children', () => {
      render(
        <Header>
          <span>First child</span>
          <span>Second child</span>
          <span>Third child</span>
        </Header>
      );

      expect(screen.getByText('First child')).toBeInTheDocument();
      expect(screen.getByText('Second child')).toBeInTheDocument();
      expect(screen.getByText('Third child')).toBeInTheDocument();
    });
  });

  describe('Structure and Semantics', () => {
    it('should use semantic header element', () => {
      render(<Header>Content</Header>);

      const header = screen.getByRole('banner');
      expect(header.tagName).toBe('HEADER');
    });

    it('should have correct CSS class', () => {
      render(<Header>Content</Header>);

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('header');
    });

    it('should maintain header structure with nested elements', () => {
      render(
        <Header>
          <nav>
            <ul>
              <li>Home</li>
              <li>About</li>
            </ul>
          </nav>
        </Header>
      );

      const header = screen.getByRole('banner');
      const nav = screen.getByRole('navigation');
      const list = screen.getByRole('list');

      expect(header).toContainElement(nav);
      expect(nav).toContainElement(list);
    });
  });

  describe('Content Flexibility', () => {
    it('should render with form elements', () => {
      render(
        <Header>
          <form>
            <input type="search" placeholder="Search Pokemon" />
            <button type="submit">Search</button>
          </form>
        </Header>
      );

      expect(screen.getByPlaceholderText('Search Pokemon')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Search' })
      ).toBeInTheDocument();
    });

    it('should render with interactive elements', () => {
      render(
        <Header>
          <button type="button">Menu</button>
          <select>
            <option value="all">All Types</option>
            <option value="fire">Fire</option>
          </select>
        </Header>
      );

      expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should render with images and media', () => {
      render(
        <Header>
          <img src="/logo.png" alt="Pokemon Logo" />
          <video controls>
            <track kind="captions" />
          </video>
        </Header>
      );

      expect(screen.getByAltText('Pokemon Logo')).toBeInTheDocument();
      const video = screen
        .getByRole('img')
        .closest('header')
        ?.querySelector('video');
      expect(video).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should be accessible as a landmark', () => {
      render(<Header>Accessible content</Header>);

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('should preserve accessibility of child elements', () => {
      render(
        <Header>
          <h1>Main Title</h1>
          <button type="button" aria-label="Open menu">
            ☰
          </button>
        </Header>
      );

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    });

    it('should work with screen reader content', () => {
      render(
        <Header>
          <span className="sr-only">Skip to main content</span>
          <h1>Visible Title</h1>
        </Header>
      );

      expect(screen.getByText('Skip to main content')).toBeInTheDocument();
      expect(screen.getByText('Visible Title')).toBeInTheDocument();
    });
  });

  describe('Integration with App Layout', () => {
    it('should work as part of typical app layout', () => {
      render(
        <div>
          <Header>
            <div className="header-content">
              <h1>Pokédex App</h1>
              <nav>
                <a href="/">Home</a>
                <a href="/favorites">Favorites</a>
              </nav>
            </div>
          </Header>
          <main>
            <p>Main content</p>
          </main>
        </div>
      );

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByText('Pokédex App')).toBeInTheDocument();
      expect(screen.getByText('Main content')).toBeInTheDocument();
    });

    it('should handle responsive content', () => {
      render(
        <Header>
          <div className="desktop-nav">Desktop Navigation</div>
          <div className="mobile-nav">Mobile Navigation</div>
        </Header>
      );

      expect(screen.getByText('Desktop Navigation')).toBeInTheDocument();
      expect(screen.getByText('Mobile Navigation')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long content', () => {
      const longContent = 'A'.repeat(1000);
      render(<Header>{longContent}</Header>);

      expect(screen.getByText(longContent)).toBeInTheDocument();
    });

    it('should handle special characters in content', () => {
      render(<Header>Pokémon™ © 2024 🎮</Header>);

      expect(screen.getByText('Pokémon™ © 2024 🎮')).toBeInTheDocument();
    });

    it('should handle boolean and number children', () => {
      render(
        <Header>
          {true && <span>Conditional content</span>}
          {42}
          {false && <span>Hidden content</span>}
        </Header>
      );

      expect(screen.getByText('Conditional content')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
    });
  });
});
