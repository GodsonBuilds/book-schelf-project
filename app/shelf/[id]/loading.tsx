'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <Skeleton className="h-8 w-32 mb-4" />
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-32 mt-2" />
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[2/3] w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 