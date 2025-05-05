import { render, screen } from '@testing-library/react';
import { BookCard } from '@/components/BookCard';
import '@testing-library/jest-dom';

// Mock Next/Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={props.src} alt={props.alt} />;
  },
}));

describe('BookCard', () => {
  const mockBook = {
    id: '1',
    title: 'Test Book',
    authors: [{ id: 'a1', name: 'Test Author', slug: 'test-author' }],
    book: { id: 'b1', slug: 'test-book' },
    can: { print: true, access: true },
    form: 'epub',
    language: 'en',
    short_title: 'Test',
    description: 'A test book',
    extents: { gl_pages: 100 },
    isbn: '1234567890',
    publisher: 'Test Publisher',
    tags: ['test'],
    image: 'https://example.com/image.jpg',
    adult: false,
    is_free: true,
    rating: 4.5,
  };

  it('renders the book title', () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText('Test Book')).toBeInTheDocument();
  });

  it('renders the author name', () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('renders the publisher', () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText('Test Publisher')).toBeInTheDocument();
  });

  it('shows a "Free" badge when book is free', () => {
    render(<BookCard book={mockBook} />);
    const freeBadge = screen.getByText('Gratuit', { selector: 'span' });
    expect(freeBadge).toBeInTheDocument();
  });

  it('shows the rating when present', () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });
});