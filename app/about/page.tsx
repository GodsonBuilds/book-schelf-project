export default function AProposPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">À propos de BookShelf</h1>

      <div className="prose prose-blue max-w-none">
        <p>
          BookShelf est un projet de démonstration construit avec Next.js, TypeScript et Tailwind CSS.
          Il montre comment créer une application web moderne pour consulter et gérer des livres numériques.
        </p>

        <h2>Fonctionnalités</h2>
        <ul>
          <li>Parcourir les étagères de livres et leur contenu</li>
          <li>Voir les détails d’un livre : couverture, titre, auteur et prix</li>
          <li>Rechercher un livre dans une étagère</li>
          <li>Design responsive adapté à tous les appareils</li>
          <li>Excellentes performances avec rendu côté serveur (SSR)</li>
        </ul>

        <h2>Détails techniques</h2>
        <p>Cette application est développée avec :</p>
        <ul>
          <li>Next.js 15 (App Router)</li>
          <li>TypeScript pour la sécurité de typage</li>
          <li>Tailwind CSS pour la mise en page</li>
          <li>Lucide React pour les icônes</li>
          <li>Intégration d’API pour les données de livres</li>
        </ul>

        <h2>Source des données</h2>
        <p>
          Les données des livres et des étagères proviennent de l’API Glose, qui fournit des informations
          sur les livres numériques : couverture, auteur, et détails de publication.
        </p>
      </div>
    </div>
  );
}
