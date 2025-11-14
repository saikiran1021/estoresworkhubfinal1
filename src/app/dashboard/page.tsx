import { getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const { role } = session;

  switch (role) {
    case 'Admin':
      redirect('/admin');
    case 'Employee':
      redirect('/employee');
    case 'College':
      redirect('/college');
    case 'Industry':
      redirect('/industry');
    default:
      // Fallback in case of an unexpected role
      redirect('/login');
  }
}
