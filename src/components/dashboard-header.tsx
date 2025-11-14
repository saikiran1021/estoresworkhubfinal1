import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { UserNav } from './user-nav';

export default function DashboardHeader() {
  const logo = PlaceHolderImages.find((img) => img.id === 'estores-logo');

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          {logo && (
            <Image
              src={logo.imageUrl}
              alt={logo.description}
              width={150}
              height={40}
              data-ai-hint={logo.imageHint}
              className="object-contain"
            />
          )}
          <span className="sr-only">eStores WorkHub</span>
        </Link>
      </nav>
      {/* Add mobile sheet menu here if needed in future */}
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial" />
        <UserNav />
      </div>
    </header>
  );
}
