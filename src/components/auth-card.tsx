import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card } from './ui/card';

export default function AuthCard({ children }: { children: React.ReactNode }) {
  const logo = PlaceHolderImages.find((img) => img.id === 'estores-logo');

  return (
    <Card className="w-full max-w-md shadow-lg">
      <div className="p-6">
        {logo && (
          <div className="flex justify-center mb-6">
            <Image
              src={logo.imageUrl}
              alt={logo.description}
              width={200}
              height={50}
              className="object-contain"
              data-ai-hint={logo.imageHint}
              priority
            />
          </div>
        )}
      </div>
      {children}
    </Card>
  );
}
