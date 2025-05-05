import Link from 'next/link';
import { BookX } from 'lucide-react';

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <BookX className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Page non trouvée</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
      La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link 
        href="/"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
       Allez à l'accueil
      </Link>
    </div>
  );
}