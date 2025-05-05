import { getBookFormIds, getBookForms, getBookshelves } from '@/lib/api';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Suspense } from 'react';
import Loading from './loading';
import { ShelfContent } from './ShelfContent';

// Taille de page pour les livres dans une étagère
const BOOKS_PER_PAGE = 20;

// Cette fonction est requise pour la génération statique du site
// export async function generateStaticParams() {
//   const shelves = await getBookshelves();
//   return shelves.map((shelf) => ({
//     id: shelf.id,
//   }));
// }

export default async function ShelfPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  const { id } = resolvedParams;
  const { page } = resolvedSearchParams;
  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * BOOKS_PER_PAGE;
  
  // Récupère à la fois les infos de l'étagère et les IDs des livres
  const [shelfList, bookFormIds] = await Promise.all([
    getBookshelves(),
    getBookFormIds(id, offset, BOOKS_PER_PAGE),
  ]);
  
  // Trouve les détails de l'étagère actuelle
  const currentShelf = shelfList.find(shelf => shelf.id === id);
  
  // Récupère les détails de chaque livre
  const books = await getBookForms(bookFormIds);
  
  // Ajoute une note simulée pour chaque livre
  const booksWithRatings = books.map(book => ({
    ...book,
    rating: Math.floor(Math.random() * 5) + 1 + Math.random()  // Note aléatoire entre 1.0 et 5.0
  }));
  
  // Pour simplifier, on estime le total des livres comme 2x les résultats si on a une page complète
  const estimatedTotal = bookFormIds.length === BOOKS_PER_PAGE 
    ? currentPage * BOOKS_PER_PAGE * 2 
    : offset + bookFormIds.length;

  if (!currentShelf) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Bibliothèque introuvable</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">La bibliothèque que vous recherchez n'existe pas ou a été supprimée.</p>
        <Link 
          href="/"
          className="inline-flex items-center text-primary hover:text-primary/80 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Retour aux étagères
        </Link>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <ShelfContent 
        currentShelf={currentShelf}
        booksWithRatings={booksWithRatings}
        estimatedTotal={estimatedTotal}
        currentPage={currentPage}
        BOOKS_PER_PAGE={BOOKS_PER_PAGE}
      />
    </Suspense>
  );
}
