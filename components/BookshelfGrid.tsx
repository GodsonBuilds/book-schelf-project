import { Bookshelf } from '@/types';
import { BookshelfCard } from './BookshelfCard';

interface BookshelfGridProps {
  shelves: Bookshelf[];
}

export const BookshelfGrid = ({ shelves }: BookshelfGridProps) => {
  if (shelves.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="text-xl font-medium text-gray-700">Aucune étagère trouvée</h3>
        <p className="mt-2 text-gray-500">Réessayez plus tard ou vérifiez votre connexion.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {shelves.map((shelf) => (
        <BookshelfCard key={shelf.id} shelf={shelf} />
      ))}
    </div>
  );
};