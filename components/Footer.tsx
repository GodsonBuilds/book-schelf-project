import { BookOpen, Github, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-medium text-gray-900 dark:text-gray-400">BookShelf</span>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} BookShelf. All rights reserved.
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="text-gray-500 hover:text-primary transition-colors"
              aria-label="Github"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};