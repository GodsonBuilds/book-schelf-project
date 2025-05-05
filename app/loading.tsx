export default function Loading() {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }