import AuthCard from '@/components/auth-card';
import LoginForm from '@/components/login-form';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <AuthCard>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl lg:text-3xl text-primary">eStores WorkHub</CardTitle>
        <CardDescription>Sign in to access your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <div className="text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline font-medium">
            Sign up here
          </Link>
        </div>
        <div className="w-full rounded-md border border-dashed border-black/50 p-4 text-sm text-center bg-white">
            <h4 className="font-bold mb-2">Demo Credentials</h4>
            <ul className="space-y-1 text-left">
                <li><b>Admin:</b> admin@estores.com / admin123</li>
                <li><b>Employee:</b> employee@estores.com / password123</li>
                <li><b>College:</b> college@estores.com / password123</li>
                <li><b>Industry:</b> industry@estores.com / password123</li>
            </ul>
        </div>
      </CardFooter>
    </AuthCard>
  );
}
