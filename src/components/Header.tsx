"use client";

import { Feather, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between gap-3 py-4 px-4 sm:py-6 sm:px-8 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="flex items-center gap-3">
        <Feather className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-headline font-bold text-foreground tracking-tight">
          SyukurBro
        </h1>
      </div>
      {user && (
        <Button variant="ghost" size="icon" onClick={logout} aria-label="Logout">
          <LogOut className="w-6 h-6" />
        </Button>
      )}
    </header>
  );
}
