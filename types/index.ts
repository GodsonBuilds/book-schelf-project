export interface User {
  id: string;
  name: string;
  username: string;
  cover: string | null;
  image: string;
}

export interface Bookshelf {
  id: string;
  slug: string;
  last_modified: number;
  title: string;
  user: User;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
}

export interface Book {
  id: string;
  slug: string;
}

export interface BookExtents {
  gl_pages: number;
}

export interface BookForm {
  id: string;
  authors: Author[];
  book: Book;
  can: {
    print: boolean;
    access: boolean;
  };
  form: string;
  language: string;
  short_title: string;
  title: string;
  description: string;
  extents: BookExtents;
  isbn: string;
  publisher: string;
  tags: string[];
  image: string;
  adult: boolean;
  is_free: boolean;
  // Optional fields
  price?: number;
  rating?: number;
}

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}