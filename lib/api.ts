import { Bookshelf, BookForm } from '@/types';

const API_URL = 'https://api.glose.com';
const USER_ID = '5a8411b53ed02c04187ff02a';

const MAX_RETRIES = 3;
const INITIAL_BACKOFF = 1000; // 1 second

async function fetchWithRetry(url: string, retries = MAX_RETRIES, backoff = INITIAL_BACKOFF): Promise<Response> {
  try {
    // Check for network connectivity
    if (typeof window !== 'undefined' && !window.navigator.onLine) {
      throw new Error('No internet connection');
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    if (retries === 0) {
      // Return a mock response with ok: false for the last retry
      return {
        ok: false,
        status: 500,
        json: async () => [],
      } as Response;
    }
    
    // Wait for the backoff period
    await new Promise(resolve => setTimeout(resolve, backoff));
    
    // Retry with exponential backoff
    return fetchWithRetry(url, retries - 1, backoff * 2);
  }
}

/**
 * Fetches all bookshelves for a user
 */
export async function getBookshelves(offset = 0, limit = 10): Promise<Bookshelf[]> {
  try {
    const response = await fetchWithRetry(
      `${API_URL}/users/${USER_ID}/shelves?offset=${offset}&limit=${limit}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching bookshelves:', error);
    return [];
  }
}

/**
 * Fetches book form IDs from a specific bookshelf
 */
export async function getBookFormIds(shelfId: string, offset = 0, limit = 10): Promise<string[]> {
  try {
    const response = await fetchWithRetry(
      `${API_URL}/shelves/${shelfId}/forms?offset=${offset}&limit=${limit}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching book form IDs:', error);
    return [];
  }
}

/**
 * Fetches detailed information about a specific book form
 */
export async function getBookForm(formId: string): Promise<BookForm | null> {
  try {
    const response = await fetchWithRetry(`${API_URL}/forms/${formId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching book form:', error);
    return null;
  }
}

/**
 * Batch fetch multiple book forms at once
 */
export async function getBookForms(formIds: string[]): Promise<BookForm[]> {
  try {
    const promises = formIds.map(id => getBookForm(id));
    const results = await Promise.all(promises);
    return results.filter(book => book !== null) as BookForm[];
  } catch (error) {
    console.error('Error batch fetching book forms:', error);
    return [];
  }
}