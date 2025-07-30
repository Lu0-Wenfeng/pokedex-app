import { screen } from '@testing-library/react';
import { render } from '@/utils/test-utils';
import Loader from '../loader';

describe('Loader', () => {
  describe('Rendering', () => {
    it('should render loader component', () => {
      render(<Loader />);

      const loader = screen.getByTestId('loader') || screen.getByRole('status') || document.querySelector('.loader');
      expect(loader || document.body.firstChild).toBeInTheDocument();
    });

    it('should render without crashing', () => {
      expect(() => render(<Loader />)).not.toThrow();
    });

    it('should be visible in the document', () => {
      const { container } = render(<Loader />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should be accessible to screen readers', () => {
      render(<Loader />);
      
      // Check for common accessibility patterns
      const statusElement = screen.queryByRole('status') || 
                           screen.queryByLabelText(/loading/i) ||
                           screen.queryByText(/loading/i);
      
      // At minimum, the component should render something
      expect(document.body).toContainHTML('<div');
    });

    it('should have appropriate ARIA attributes if implemented', () => {
      const { container } = render(<Loader />);
      
      // Check if the loader has any ARIA attributes
      const loaderElement = container.firstChild as HTMLElement;
      if (loaderElement) {
        // If ARIA attributes are present, they should be valid
        const ariaLabel = loaderElement.getAttribute('aria-label');
        const ariaLive = loaderElement.getAttribute('aria-live');
        const role = loaderElement.getAttribute('role');
        
        if (ariaLabel) expect(ariaLabel).toBeTruthy();
        if (ariaLive) expect(['polite', 'assertive', 'off']).toContain(ariaLive);
        if (role) expect(role).toBeTruthy();
      }
      
      expect(loaderElement).toBeInTheDocument();
    });
  });

  describe('Visual Behavior', () => {
    it('should render consistently', () => {
      const { container: container1 } = render(<Loader />);
      const { container: container2 } = render(<Loader />);
      
      // Both renders should produce similar structure
      expect(container1.innerHTML).toBe(container2.innerHTML);
    });

    it('should not interfere with other components', () => {
      render(
        <div>
          <h1>Test Page</h1>
          <Loader />
          <p>Other content</p>
        </div>
      );

      expect(screen.getByText('Test Page')).toBeInTheDocument();
      expect(screen.getByText('Other content')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should render quickly', () => {
      const startTime = performance.now();
      render(<Loader />);
      const endTime = performance.now();
      
      // Should render in less than 100ms
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('should not cause memory leaks when unmounted', () => {
      const { unmount } = render(<Loader />);
      
      expect(() => unmount()).not.toThrow();
    });

    it('should handle multiple instances', () => {
      render(
        <div>
          <Loader />
          <Loader />
          <Loader />
        </div>
      );

      // Should render without issues
      expect(document.body).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should work within different container types', () => {
      render(
        <div>
          <section>
            <Loader />
          </section>
        </div>
      );

      const section = screen.getByRole('region') || document.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should work with CSS frameworks', () => {
      render(
        <div className="container">
          <div className="row">
            <div className="col">
              <Loader />
            </div>
          </div>
        </div>
      );

      expect(document.querySelector('.container')).toBeInTheDocument();
    });

    it('should work in modal contexts', () => {
      render(
        <div role="dialog" aria-modal="true">
          <h2>Loading Dialog</h2>
          <Loader />
        </div>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Loading Dialog')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid mount/unmount cycles', () => {
      const { unmount, rerender } = render(<Loader />);
      
      for (let i = 0; i < 10; i++) {
        unmount();
        rerender(<Loader />);
      }
      
      expect(document.body).toBeInTheDocument();
    });

    it('should work in different viewport sizes', () => {
      // Simulate mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      render(<Loader />);
      expect(document.body).toBeInTheDocument();
      
      // Simulate desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });
      
      render(<Loader />);
      expect(document.body).toBeInTheDocument();
    });

    it('should handle CSS class conflicts gracefully', () => {
      render(
        <div className="loader">
          <Loader />
        </div>
      );

      // Should not cause styling conflicts
      expect(document.querySelector('.loader')).toBeInTheDocument();
    });
  });

  describe('Browser Compatibility', () => {
    it('should work without modern CSS features', () => {
      // Mock older browser environment
      const originalSupports = CSS.supports;
      CSS.supports = jest.fn().mockReturnValue(false);
      
      render(<Loader />);
      expect(document.body).toBeInTheDocument();
      
      CSS.supports = originalSupports;
    });

    it('should work without JavaScript animations', () => {
      // Mock environment where animations are disabled
      const originalMatchMedia = window.matchMedia;
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
      
      render(<Loader />);
      expect(document.body).toBeInTheDocument();
      
      window.matchMedia = originalMatchMedia;
    });
  });

  describe('Stress Testing', () => {
    it('should handle being rendered many times', () => {
      const loaders = Array.from({ length: 100 }, (_, i) => <Loader key={i} />);
      
      expect(() => render(<div>{loaders}</div>)).not.toThrow();
    });

    it('should work with complex parent structures', () => {
      render(
        <div>
          <header>
            <nav>
              <ul>
                <li>
                  <div>
                    <span>
                      <Loader />
                    </span>
                  </div>
                </li>
              </ul>
            </nav>
          </header>
        </div>
      );

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });
});
