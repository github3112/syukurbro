"use client";

import { useState, useMemo, useTransition } from 'react';
import { Search } from 'lucide-react';
import type { GratitudeEntry } from '@/lib/types';
import { Header } from '@/components/Header';
import { GratitudePrompt } from '@/components/GratitudePrompt';
import { EntryForm } from '@/components/EntryForm';
import { SummaryGenerator } from '@/components/SummaryGenerator';
import { EntryList } from '@/components/EntryList';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Dummy data for initial state
const initialEntries: GratitudeEntry[] = [
  {
    id: '3',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    text: "I'm grateful for the warm cup of coffee that started my day. It's the little things that bring so much comfort.",
  },
  {
    id: '2',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    text: 'A friend called me out of the blue today, and it was so nice to catch up. I feel very thankful for my friendships.',
  },
  {
    id: '1',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    text: 'Finished a challenging project at work. I am grateful for my perseverance and the support of my team.',
  },
];

export default function Home() {
  const [entries, setEntries] = useState<GratitudeEntry[]>(initialEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAddEntry = (text: string) => {
    startTransition(() => {
      const newEntry: GratitudeEntry = {
        id: new Date().toISOString(),
        date: new Date(),
        text: text,
      };
      setEntries([newEntry, ...entries]);
      toast({
        title: "Entry Saved!",
        description: "Your moment of gratitude has been recorded.",
      });
    });
  };

  const filteredEntries = useMemo(() => {
    if (!searchTerm) {
      return entries;
    }
    return entries.filter(entry =>
      entry.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [entries, searchTerm]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            <EntryForm onAddEntry={handleAddEntry} isSubmitting={isPending} />
            <GratitudePrompt />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            <SummaryGenerator entries={entries} />
            <div>
              <h2 className="text-3xl font-bold font-headline mb-4">Past Reflections</h2>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search entries..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <EntryList entries={filteredEntries} />
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm border-t">
        <p>Crafted with gratitude. © {new Date().getFullYear()} GratefulMe.</p>
      </footer>
    </div>
  );
}
