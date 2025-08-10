"use client";

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateSummaryAction } from '@/lib/actions';
import type { GratitudeEntry } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

interface SummaryGeneratorProps {
  entries: GratitudeEntry[];
}

export function SummaryGenerator({ entries }: SummaryGeneratorProps) {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setSummary(null);

    const entriesToSummarize = entries
      .filter(entry => {
        const now = new Date();
        const entryDate = new Date(entry.date);
        const days = period === 'weekly' ? 7 : 30;
        const diffTime = Math.abs(now.getTime() - entryDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= days;
      })
      .map(entry => ({
        date: entry.date.toISOString().split('T')[0],
        text: entry.text,
      }));

    if (entriesToSummarize.length < 1) {
      toast({
        variant: "destructive",
        title: "Not enough entries",
        description: `Please add at least one entry in the last ${period === 'weekly' ? '7' : '30'} days.`,
      });
      setIsLoading(false);
      return;
    }

    const result = await generateSummaryAction({ entries: entriesToSummarize, period });

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error Generating Summary",
        description: result.error,
      });
    } else {
      setSummary(result.summary);
    }
    setIsLoading(false);
  };

  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">AI-Powered Summary</CardTitle>
        </div>
        <CardDescription>
          Let AI analyze your gratitude patterns and provide a summary of your reflections.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-center flex-wrap">
            <Select value={period} onValueChange={(value: 'weekly' | 'monthly') => setPeriod(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
            </Select>
            <Button onClick={handleGenerateSummary} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Summary'}
            </Button>
        </div>
        {isLoading && <p className="text-muted-foreground animate-pulse">Analyzing your entries...</p>}
        {summary && (
          <div className="p-4 bg-background rounded-md border text-sm">
            <h4 className="font-bold mb-2">Your {period} summary:</h4>
            <p className="whitespace-pre-wrap">{summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
