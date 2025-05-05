'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <AlertCircle className="h-16 w-16 text-destructive mb-4" />
      <h2 className="text-xl font-semibold mb-4">Quelque chose s'est mal passé !</h2>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
      Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement ou contacter l'assistance si le problème persiste.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
      Essayer à nouveau
      </button>
    </div>
  );
}