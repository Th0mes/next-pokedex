export const Footer = () => (
  <footer className="sticky bottom-0 hidden w-full items-start justify-between px-2 pb-4 3xl:flex 4xl:px-16">
    <div className="flex space-x-4">
      <div className="h-10 w-10 rounded-full bg-neutral-800" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-2 w-12 rounded bg-red-800" />
        <div className="h-2 w-12 rounded bg-green-800" />
        <div className="col-span-2 h-12 rounded bg-green-700" />
      </div>
    </div>

    <div className="relative right-10">
      <div className="absolute h-16 w-4 rotate-90 rounded bg-neutral-900" />
      <div className="absolute h-16 w-4 rounded bg-neutral-900" />
    </div>
  </footer>
);
