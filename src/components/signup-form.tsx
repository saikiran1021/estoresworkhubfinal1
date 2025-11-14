'use client';

import { useFormState } from 'react-dom';
import { signUp } from '@/lib/actions';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { roles, Role } from '@/lib/definitions';
import SubmitButton from './submit-button';
import { Alert, AlertDescription } from './ui/alert';
import { Terminal, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useCallback, useState } from 'react';
import { verifyUserEmail } from '@/ai/flows/verify-user-email';
import { useToast } from '@/hooks/use-toast';

const SignupSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    surname: z.string().min(1, 'Surname is required'),
    phone: z.string().min(10, 'Enter a valid phone number'),
    email: z.string().email('Please enter a valid email.'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    confirmPassword: z.string(),
    role: z.enum(roles, { required_error: 'Please select a role' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type EmailVerificationStatus = 'idle' | 'checking' | 'valid' | 'invalid';

export default function SignupForm() {
  const [state, formAction] = useFormState(signUp, undefined);
  const { toast } = useToast();
  const [emailStatus, setEmailStatus] = useState<EmailVerificationStatus>('idle');

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleEmailBlur = useCallback(async (email: string) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailStatus('idle');
      return;
    }
    setEmailStatus('checking');
    try {
      const result = await verifyUserEmail({ email });
      if (result.isValid) {
        setEmailStatus('valid');
      } else {
        setEmailStatus('invalid');
        toast({
          title: "Email may be invalid",
          description: result.reason,
          variant: 'default',
        });
      }
    } catch (error) {
      setEmailStatus('idle');
      console.error("Email verification failed:", error);
    }
  }, [toast]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-3">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="123-456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input type="email" placeholder="name@example.com" {...field} onBlur={() => handleEmailBlur(field.value)} />
                </FormControl>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {emailStatus === 'checking' && <Loader2 className="h-4 w-4 animate-spin" />}
                  {emailStatus === 'valid' && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {emailStatus === 'invalid' && <XCircle className="h-4 w-4 text-red-500" />}
                </div>
              </div>
              <FormDescription>We use AI to verify email addresses.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role: Role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {state?.error && (
            <Alert variant="destructive" className="bg-white border-black text-black">
                <Terminal className="h-4 w-4" color="black" />
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}

        <SubmitButton className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Sign Up
        </SubmitButton>
      </form>
    </Form>
  );
}
