import { Feather } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-center gap-3 py-6 sm:py-8 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <Feather className="w-8 h-8 text-primary" />
      <h1 className="text-4xl font-headline font-bold text-foreground tracking-tight">
        GratefulMe
      </h1>
    </header>
  );
}
