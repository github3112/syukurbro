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
        title: "Catetan kurang banyak",
        description: `Bro, tambahin dulu minimal satu catetan dalam ${period === 'weekly' ? '7' : '30'} hari terakhir.`,
      });
      setIsLoading(false);
      return;
    }

    const result = await generateSummaryAction({ entries: entriesToSummarize, period });

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Gagal Bikin Rangkuman",
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
            <CardTitle className="font-headline">Rangkuman Pake AI</CardTitle>
        </div>
        <CardDescription>
          Biar AI yang analisis pola syukur lo dan bikinin rangkumannya.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-center flex-wrap">
            <Select value={period} onValueChange={(value: 'weekly' | 'monthly') => setPeriod(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih periode" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="weekly">Mingguan</SelectItem>
                    <SelectItem value="monthly">Bulanan</SelectItem>
                </SelectContent>
            </Select>
            <Button onClick={handleGenerateSummary} disabled={isLoading}>
                {isLoading ? 'Lagi dibikin...' : 'Bikin Rangkuman'}
            </Button>
        </div>
        {isLoading && <p className="text-muted-foreground animate-pulse">Lagi dianalisis nih catetan lo...</p>}
        {summary && (
          <div className="p-4 bg-background rounded-md border text-sm">
            <h4 className="font-bold mb-2">Rangkuman {period === 'weekly' ? 'mingguan' : 'bulanan'} lo:</h4>
            <p className="whitespace-pre-wrap">{summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
