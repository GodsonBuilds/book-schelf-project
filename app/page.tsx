import { getBookshelves } from '@/lib/api';
import { BookshelfGrid } from '@/components/BookshelfGrid';
import { Pagination } from '@/components/ui/pagination';
import { Suspense } from 'react';
import Loading from './loading';
import { BookOpen, Star, Users, Bookmark } from 'lucide-react';

// Taille de la page pour les étagères
const SHELVES_PER_PAGE = 6;

export default async function Home({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParamsPromise;

  const currentPage = page ? Number(page) : 1;
  const offset = (currentPage - 1) * SHELVES_PER_PAGE;

  // Récupération des étagères avec pagination
  
  const shelves = await getBookshelves(offset, SHELVES_PER_PAGE);
  
  // Pour simplifier, nous estimons le total comme étant le double des éléments actuels
  const estimatedTotal = shelves.length === SHELVES_PER_PAGE 
    ? currentPage * SHELVES_PER_PAGE * 2 
    : offset + shelves.length;

  return (
    <div className="space-y-16">
      {/* Section Hero */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Votre Bibliothèque Numérique
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Découvrez, organisez et partagez votre collection de livres numériques.
              Accédez à des milliers de livres gratuits et payants en un seul endroit.
            </p>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Pourquoi choisir BookShelf ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Collection Illimitée
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Accédez à une vaste collection de livres numériques, gratuits et payants.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Recommandations Personnalisées
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Découvrez des livres adaptés à vos goûts grâce à notre système de recommandation.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Communauté Active
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Partagez vos lectures et découvrez les recommandations d'autres lecteurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Étagères */}
      <section className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Vos Étagères
            </h2>
            <div className="flex items-center gap-2 text-primary">
              <Bookmark className="w-5 h-5" />
              <span className="font-medium">{estimatedTotal} étagères</span>
            </div>
          </div>
          
          <Suspense fallback={<Loading />}>
            <BookshelfGrid shelves={shelves} />
          </Suspense>
          
          <Pagination
            totalItems={estimatedTotal}
            itemsPerPage={SHELVES_PER_PAGE}
            currentPage={currentPage}
          />
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Commencez votre voyage littéraire
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez notre communauté de lecteurs et découvrez un monde de livres à portée de main.
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Créer un compte
          </button>
        </div>
      </section>
    </div>
  );
}