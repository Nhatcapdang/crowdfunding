import { Explore } from '@/components';
import { Metadata } from 'next';
type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata(_props: Props): Promise<Metadata> {
  return {
    title: 'Explore',
    description: 'Explore',
    keywords: 'Explore',
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Explore',
      description: 'Explore',
      type: 'website',
      url: '/explore',
      images: [{ url: '/favicon.svg' }],
    },
    authors: [{ name: 'Nhat Cap Dang', url: 'https://nhatcapdang.com' }],
    twitter: {
      card: 'summary_large_image',
      title: 'Explore',
      description: 'Explore',
      images: [{ url: '/favicon.svg' }],
    },
  };
}

export default function ExplorePage() {
  return <Explore />;
}
