import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '@/components/ui/search';
import '@testing-library/jest-dom';

describe('Search component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default placeholder', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Rechercher des livres...')).toBeInTheDocument();
  });

  it('renders with custom placeholder when provided', () => {
    render(<Search onSearch={mockOnSearch} placeholder="Find a book" />);
    
    expect(screen.getByPlaceholderText('Find a book')).toBeInTheDocument();
  });

  it('updates input value when user types', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Rechercher des livres...');
    fireEvent.change(input, { target: { value: 'Test query' } });
    
    expect(input).toHaveValue('Test query');
  });

  it('calls onSearch when user types', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Rechercher des livres...');
    fireEvent.change(input, { target: { value: 'Test query' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('Test query');
  });

  it('trims the search query before calling onSearch', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Rechercher des livres...');
    fireEvent.change(input, { target: { value: '  Test query  ' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('Test query');
  });

  it('clears the search when clear button is clicked', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Rechercher des livres...');
    fireEvent.change(input, { target: { value: 'Test query' } });
    
    const clearButton = screen.getByRole('button', { name: 'Effacer la recherche' });
    fireEvent.click(clearButton);
    
    expect(input).toHaveValue('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});