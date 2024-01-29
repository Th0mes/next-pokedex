export const Footer = () => (
  <footer className="hidden flex-1 justify-between items-start sticky bottom-0 w-full px-2 4xl:px-16 pb-4 3xl:flex">
    <div className="flex space-x-4">
      <div className="w-10 h-10 rounded-full bg-neutral-800" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-2 w-12 bg-red-800 rounded" />
        <div className="h-2 w-12 bg-green-800 rounded" />
        <div className="h-12 col-span-2 bg-green-700 rounded" />
      </div>
    </div>

    <div className="relative right-10">
      <div className="w-4 h-16 bg-neutral-900 rounded absolute rotate-90" />
      <div className="w-4 h-16 bg-neutral-900 rounded absolute" />
    </div>
  </footer>
);
