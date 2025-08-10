import { BookOpen, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { GratitudeEntry } from '@/lib/types';

interface EntryListProps {
  entries: GratitudeEntry[];
}

export function EntryList({ entries }: EntryListProps) {
  return (
    <div className="space-y-4">
      {entries.length > 0 ? (
        entries.map((entry) => (
          <Card key={entry.id} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(entry.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90">{entry.text}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="text-center py-10">
          <CardContent className="space-y-2">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-semibold font-headline">No entries found</h3>
            <p className="text-muted-foreground">
              Start by adding a new gratitude entry or adjust your search term.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
