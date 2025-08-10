"use client";
import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const prompts = [
  "What's one thing that made you smile today?",
  "Who is someone you're grateful for and why?",
  "What is a simple pleasure in your life you are thankful for?",
  "Describe a challenge you overcame and what you learned.",
  "What is something beautiful you saw recently?",
  "What skill are you thankful to have?",
  "What's a food you're grateful for today?",
  "What part of your daily routine do you appreciate most?",
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
        <CardTitle className="font-headline">Today's Prompt</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground italic">
          {prompt || "Loading your daily inspiration..."}
        </p>
      </CardContent>
    </Card>
  );
}
