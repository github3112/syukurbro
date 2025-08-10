"use client";
import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const prompts = [
  "Apa nih yang bikin lo senyum hari ini?",
  "Siapa orang yang lo syukuri dan kenapa?",
  "Hal sepele apa dalam hidup yang lo syukuri?",
  "Ceritain tantangan yang berhasil lo lewatin dan apa pelajarannya.",
  "Apa hal indah yang lo liat baru-baru ini?",
  "Skill apa yang lo punya dan lo syukuri?",
  "Makanan apa yang lo syukuri hari ini?",
  "Bagian mana dari rutinitas harian lo yang paling lo nikmatin?",
];

export function GratitudePrompt() {
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    // This ensures it runs only on the client
    const dayOfYear = Math.floor((new Date().valueOf() - new Date(new Date().getFullYear(), 0, 0).valueOf()) / 1000 / 60 / 60 / 24);
    setPrompt(prompts[dayOfYear % prompts.length]);
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        <Lightbulb className="w-6 h-6 text-primary" />
        <CardTitle className="font-headline">Ide Hari Ini</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground italic">
          {prompt || "Lagi ngambil inspirasi harian buat lo..."}
        </p>
      </CardContent>
    </Card>
  );
}
