'use server';

/**
 * @fileOverview A flow to verify a user's email address using GenAI.
 *
 * - verifyUserEmail - A function that verifies the email address.
 * - VerifyUserEmailInput - The input type for the verifyUserEmail function.
 * - VerifyUserEmailOutput - The return type for the verifyUserEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyUserEmailInputSchema = z.object({
  email: z.string().email().describe('The email address to verify.'),
});
export type VerifyUserEmailInput = z.infer<typeof VerifyUserEmailInputSchema>;

const VerifyUserEmailOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the email is valid or not.'),
  reason: z.string().optional().describe('Reason why the email is invalid, if applicable.'),
});
export type VerifyUserEmailOutput = z.infer<typeof VerifyUserEmailOutputSchema>;

export async function verifyUserEmail(input: VerifyUserEmailInput): Promise<VerifyUserEmailOutput> {
  return verifyUserEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyUserEmailPrompt',
  input: {schema: VerifyUserEmailInputSchema},
  output: {schema: VerifyUserEmailOutputSchema},
  prompt: `You are an email verification expert.  You will determine if the provided email is a valid and real email.  If it is, return isValid as true.  If it is not, return isValid as false and provide a reason.

Email: {{{email}}}`,
});

const verifyUserEmailFlow = ai.defineFlow(
  {
    name: 'verifyUserEmailFlow',
    inputSchema: VerifyUserEmailInputSchema,
    outputSchema: VerifyUserEmailOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
