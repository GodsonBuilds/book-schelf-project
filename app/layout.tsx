import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BookShelf - Votre Bibliothèque Numérique',
  description: 'Découvrez, organisez et partagez votre collection de livres numériques.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}