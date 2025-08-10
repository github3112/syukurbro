'use server';

/**
 * @fileOverview Provides weekly and monthly summaries of gratitude entries,
 * using sentiment analysis to highlight recurring themes and positive trends.
 *
 * - summarizeGratitude - A function to generate gratitude summaries.
 * - SummarizeGratitudeInput - The input type for summarizeGratitude function.
 * - SummarizeGratitudeOutput - The return type for summarizeGratitude function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeGratitudeInputSchema = z.object({
  entries: z.array(
    z.object({
      date: z.string().describe('Date of the gratitude entry.'),
      text: z.string().describe('Text content of the gratitude entry.'),
    })
  ).describe('Array of gratitude entries to summarize.'),
  period: z.enum(['weekly', 'monthly']).describe('The period for the summary (weekly or monthly).'),
});
export type SummarizeGratitudeInput = z.infer<typeof SummarizeGratitudeInputSchema>;

const SummarizeGratitudeOutputSchema = z.object({
  summary: z.string().describe('A summary of gratitude entries, highlighting recurring themes and positive trends.'),
});
export type SummarizeGratitudeOutput = z.infer<typeof SummarizeGratitudeOutputSchema>;

export async function summarizeGratitude(input: SummarizeGratitudeInput): Promise<SummarizeGratitudeOutput> {
  return summarizeGratitudeFlow(input);
}

const summarizeGratitudePrompt = ai.definePrompt({
  name: 'summarizeGratitudePrompt',
  input: {schema: SummarizeGratitudeInputSchema},
  output: {schema: SummarizeGratitudeOutputSchema},
  prompt: `Lo itu asisten jurnal rasa syukur yang santai. Tugas lo ngerangkum catatan rasa syukur user selama periode ({{period}}), tunjukin tema yang sering muncul sama tren positifnya. Pake analisis sentimen buat nentuin mood secara umum dan topik utama di catetannya. Rangkumannya harus ngasih tau apa aja yang paling disyukuri sama user dan gimana perasaan syukurnya berkembang.\n\nCatatan Rasa Syukur:\n{{#each entries}}\nTanggal: {{date}}\nCatetan: {{text}}\n{{/each}}`,
});

const summarizeGratitudeFlow = ai.defineFlow(
  {
    name: 'summarizeGratitudeFlow',
    inputSchema: SummarizeGratitudeInputSchema,
    outputSchema: SummarizeGratitudeOutputSchema,
  },
  async input => {
    const {output} = await summarizeGratitudePrompt(input);
    return output!;
  }
);
