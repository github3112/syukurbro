'use server';

import { summarizeGratitude, type SummarizeGratitudeInput } from '@/ai/flows/summarize-gratitude';

export async function generateSummaryAction(input: SummarizeGratitudeInput) {
  try {
    const output = await summarizeGratitude(input);
    if (!output.summary) {
        return { summary: null, error: 'Failed to generate summary. Please try again.' };
    }
    return { summary: output.summary, error: null };
  } catch (e: any) {
    console.error('Error generating summary:', e);
    return { summary: null, error: e.message || 'An unexpected error occurred while generating the summary.' };
  }
}
