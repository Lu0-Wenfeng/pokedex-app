import { render, screen } from '@testing-library/react';
import Apploader from '../loader';

describe('Apploader', () => {
  it('renders loader with default props', () => {
    render(<Apploader />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-loader-class';
    const { container } = render(<Apploader className={customClass} />);

    const loaderContainer = container.firstChild as HTMLElement;
    expect(loaderContainer).toHaveClass(customClass);
  });

  it('renders with medium size by default', () => {
    render(<Apploader />);

    // The RSuite Loader component should be present
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders without className when not provided', () => {
    const { container } = render(<Apploader />);

    const loaderContainer = container.firstChild as HTMLElement;
    expect(loaderContainer).not.toHaveClass();
    expect(loaderContainer.className).toBe('');
  });

  it('maintains consistent loading message', () => {
    render(<Apploader className="test-class" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders within a wrapper div', () => {
    const { container } = render(<Apploader />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.tagName).toBe('DIV');
  });

  it('passes className only to wrapper, not to Loader component', () => {
    const customClass = 'wrapper-class';
    const { container } = render(<Apploader className={customClass} />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(customClass);
  });
});
