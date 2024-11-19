import { render, screen, fireEvent } from '@testing-library/react';
import Image from './Image';

describe('Image Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<Image src="image.jpg" alt="image" fill />);

    const img = screen.getByTestId('image');
    expect(img).toHaveAttribute('src', 'image.jpg');
    expect(img).toHaveAttribute('alt', 'image');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
  });

  it('renders placeholder when placeholderSrc is provided', () => {
    render(<Image src="image.jpg" alt="image" placeholderSrc="placeholder.jpg" fill />);

    const placeholder = screen.getByTestId('image placeholder');
    expect(placeholder).toHaveAttribute('src', 'placeholder.jpg');
  });

  it('applies placeholderColor when placeholderSrc is not provided', () => {
    render(<Image src="image.jpg" alt="image" placeholderColor="red" fill />);

    const container = screen.getByTestId('image').parentElement;
    expect(container).toHaveStyle({ backgroundColor: 'red' });
  });

  it('calls onLoad when image is loaded', () => {
    const mockOnLoad = jest.fn();

    render(<Image src="image.jpg" alt="image" onLoad={mockOnLoad} fill />);

    const img = screen.getByTestId('image');
    fireEvent.load(img);

    expect(mockOnLoad).toHaveBeenCalled();
  });

  it('changes state when image is loaded', () => {
    render(<Image src="image.jpg" alt="image" fill />);

    const img = screen.getByTestId('image');
    fireEvent.load(img);

    expect(img).toHaveStyle({ opacity: '1' });
  });

  it('renders with correct objectFit style', () => {
    render(<Image fill src="image.jpg" alt="image" objectFit="contain" />);

    const img = screen.getByTestId('image');
    expect(img).toHaveStyle({ objectFit: 'contain' });
  });

  it('handles fill prop correctly', () => {
    render(<Image src="image.jpg" alt="Test image" fill />);

    const container = screen.getByTestId('image').parentElement;
    expect(container).toHaveStyle({ width: '100%', height: '100%' });
  });
});
