import AuthCard from '@/components/auth-card';
import SignupForm from '@/components/signup-form';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <AuthCard>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl lg:text-3xl text-primary">Create an Account</CardTitle>
        <CardDescription>Join the eStores WorkHub</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter>
        <div className="text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline font-medium">
            Sign in here
          </Link>
        </div>
      </CardFooter>
    </AuthCard>
  );
}
