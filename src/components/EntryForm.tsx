"use client";
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface EntryFormProps {
  onAddEntry: (text: string) => void;
  isSubmitting: boolean;
}

export function EntryForm({ onAddEntry, isSubmitting }: EntryFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddEntry(text.trim());
      setText('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">New Gratitude Entry</CardTitle>
        <CardDescription>What are you grateful for today?</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Today, I am grateful for..."
            rows={5}
            required
            disabled={isSubmitting}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting || !text.trim()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Saving...' : 'Save Entry'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
