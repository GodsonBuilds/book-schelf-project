import { getBookshelves, getBookFormIds, getBookForm } from '@/lib/api';

// Mock fetch
global.fetch = jest.fn();

describe('API functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBookshelves', () => {
    it('fetches bookshelves successfully', async () => {
      const mockBookshelves = [
        { id: '1', title: 'Shelf 1' },
        { id: '2', title: 'Shelf 2' },
      ];
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockBookshelves,
      });
      
      const result = await getBookshelves();
      
      expect(result).toEqual(mockBookshelves);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.glose.com/users/5a8411b53ed02c04187ff02a/shelves?offset=0&limit=10'
      );
    });
    
    it('handles errors gracefully', async () => {
      (fetch as jest.Mock).mockImplementationOnce(() => {
        return Promise.reject(new Error('Network error'));
      });
      
      const result = await getBookshelves();
      
      expect(result).toEqual([]);
      expect(fetch).toHaveBeenCalled();
    }, 10000);
  });

  describe('getBookFormIds', () => {
    it('fetches book form IDs successfully', async () => {
      const mockFormIds = ['form1', 'form2', 'form3'];
      const shelfId = 'shelf1';
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockFormIds,
      });
      
      const result = await getBookFormIds(shelfId);
      
      expect(result).toEqual(mockFormIds);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.glose.com/shelves/shelf1/forms?offset=0&limit=10'
      );
    });
  });

  describe('getBookForm', () => {
    it('fetches book form details successfully', async () => {
      const mockBook = {
        id: 'form1',
        title: 'Test Book',
        authors: [{ name: 'Test Author' }],
      };
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockBook,
      });
      
      const result = await getBookForm('form1');
      
      expect(result).toEqual(mockBook);
      expect(fetch).toHaveBeenCalledWith('https://api.glose.com/forms/form1');
    });
  });
});