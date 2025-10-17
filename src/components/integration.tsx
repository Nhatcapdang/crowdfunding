import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Marquee } from '@/components/ui/marquee';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ExternalLink, Rocket } from 'lucide-react';

/**
 * Platform data interface for exchange and tracking platforms
 */
interface Platform {
  title: string;
  href: string;
  image: string;
}

/**
 * Props for the Integration component
 */
interface IntegrationProps {
  /**
   * Optional contract address to be appended to platform URLs
   */
  contractAddress?: string;
}

/**
 * Integration component showcasing platforms where tokens will be listed
 * Features a 4-column responsive grid with vertical animated marquees
 * Optimized with React.memo to prevent unnecessary re-renders
 */
const Integration = React.memo(({ contractAddress }: IntegrationProps) => {
  const platforms: Platform[] = [
    {
      title: 'Birdeye',
      href: `https://birdeye.so/solana/token${
        contractAddress ? `/${contractAddress}` : ''
      }`,
      image:
        'https://pbs.twimg.com/profile_images/1932357963232243712/FGfvDMUT_400x400.png',
    },
    {
      title: 'Dexscreener',
      href: `https://dexscreener.com/solana${
        contractAddress ? `/${contractAddress}` : ''
      }`,
      image: 'https://labubu.org/images/dexscreener.png',
    },
    {
      title: 'Dextools',
      href: `https://www.dextools.io/app/en/solana/pair-explorer${
        contractAddress ? `/${contractAddress}` : ''
      }`,
      image: 'https://www.dextools.io/app/assets/img/logo/dext-large.png',
    },
    {
      title: 'Photon',
      href: `https://photon-sol.tinyastro.io/en/lp${
        contractAddress ? `/${contractAddress}` : ''
      }`,
      image:
        'https://basetradingbots.com/wp-content/uploads/2024/04/photon-trading-bot-logo.png',
    },
    {
      title: 'BubbleMap',
      href: `https://app.bubblemaps.io/sol/token${
        contractAddress ? `/${contractAddress}` : ''
      }`,
      image: 'https://img.cryptorank.io/coins/bubblemaps1695042766511.png',
    },
    {
      title: 'RugCheck',
      href: `https://rugcheck.xyz/tokens${
        contractAddress ? `/${contractAddress}` : ''
      }`,
      image:
        'https://pbs.twimg.com/profile_images/1659290984293756928/VeEo1KYz_200x200.jpg',
    },
    {
      title: 'OKX',
      href: `https://web3.okx.com/token/solana${
        contractAddress ? `/${contractAddress}` : ''
      }`,
      image:
        'https://99bitcoins.com/de/wp-content/uploads/sites/3/2025/06/OKX-Logo-300x300.png',
    },
    {
      title: 'Raydium',
      href: `https://raydium.io/swap/?inputMint${
        contractAddress ? `=${contractAddress}` : ''
      }`,
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/8526.png',
    },
    {
      title: 'Orca',
      href: `https://www.orca.so/?tokenIn=So11111111111111111111111111111111111111112&tokenOut${
        contractAddress ? `=${contractAddress}` : ''
      }`,
      image:
        'https://files.swissborg.com/product/wealth-app/assets/ic_crypto_orca.png',
    },
    {
      title: 'Jupiter',
      href: 'https://jup.ag/',
      image:
        'https://static1.tokenterminal.com//jupiter/products/jupiterdca/logo.png',
    },
  ];

  // Split platforms into 4 columns for the grid
  const column1 = platforms.slice(0, 3);
  const column2 = platforms.slice(3, 5);
  const column3 = platforms.slice(5, 8);
  const column4 = platforms.slice(8);

  return (
    <section
      className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32"
      aria-labelledby="integration-heading"
    >
      {/* Container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two Column Layout */}
        <div className="grid min-h-[600px] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Content Section */}
          <div className="flex flex-col items-start space-y-6 md:space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <Rocket className="size-4" />
              <span>THE BRANDS WE WORK WITH</span>
            </div>

            {/* Main Heading */}
            <h2
              id="integration-heading"
              className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl xl:text-6xl"
            >
              Building strong partnerships with the{' '}
              <span className="text-linear-gradient">
                world&apos;s most influential companies.
              </span>
            </h2>

            {/* Description */}
            <p className="text-base text-muted-foreground md:text-lg lg:text-xl">
              Collaborating with enterprises and startups alike to push
              boundaries, disrupt markets, and achieve groundbreaking results.
            </p>

            {/* CTA Button */}
            <Button asChild size="lg" className="mt-4 text-base md:text-lg">
              <Link
                href="/dashboard"
                aria-label="Create your own token and get started"
              >
                <Rocket className="mr-2 size-5" />
                Create Your Own Token Now
              </Link>
            </Button>
          </div>

          {/* Right Platform Grid Section */}
          <div
            className="relative rounded-lg overflow-hidden"
            role="list"
            aria-label="Supported platforms"
          >
            {/* 4-Column Grid - All Screen Sizes */}
            <div className="grid grid-cols-4  gap-2 sm:gap-3 md:gap-4">
              {/* Column 1 */}
              <div className="flex flex-col">
                <Marquee
                  vertical
                  pauseOnHover
                  speed={10}
                  className="h-[400px] md:h-[500px] lg:h-[600px] [--gap:1rem]"
                >
                  {column1.map(platform => (
                    <PlatformCard key={platform.title} platform={platform} />
                  ))}
                </Marquee>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col">
                <Marquee
                  vertical
                  reverse
                  pauseOnHover
                  speed={10}
                  className="h-[400px] md:h-[500px] lg:h-[600px] [--gap:1rem]"
                >
                  {column2.map(platform => (
                    <PlatformCard key={platform.title} platform={platform} />
                  ))}
                </Marquee>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col">
                <Marquee
                  vertical
                  pauseOnHover
                  speed={10}
                  className="h-[400px] md:h-[500px] lg:h-[600px] [--gap:1rem]"
                >
                  {column3.map(platform => (
                    <PlatformCard key={platform.title} platform={platform} />
                  ))}
                </Marquee>
              </div>

              {/* Column 4 */}
              <div className="flex flex-col">
                <Marquee
                  vertical
                  reverse
                  pauseOnHover
                  speed={10}
                  className="h-[400px] md:h-[500px] lg:h-[600px] [--gap:1rem]"
                >
                  {column4.map(platform => (
                    <PlatformCard key={platform.title} platform={platform} />
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
          {/* End Right Platform Grid Section */}
        </div>
        {/* End Two Column Layout */}
      </div>

      {/* Background Gradient */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"
        aria-hidden="true"
      />
    </section>
  );
});

/**
 * Individual platform card component
 * Displays platform logo and name with hover effects
 */
const PlatformCard = React.memo(({ platform }: { platform: Platform }) => {
  return (
    <a
      href={platform.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative flex flex-col items-center justify-center gap-2 rounded-lg border border-border/50 bg-card/50 p-2 backdrop-blur-sm sm:gap-3 sm:rounded-2xl sm:p-3 md:p-4 lg:p-3 xl:p-5',
        'transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/20',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      )}
      role="listitem"
      aria-label={`Visit ${platform.title}`}
    >
      {/* Platform Logo */}
      <div className="relative size-10 overflow-hidden rounded-lg  p-1 sm:size-14 md:size-16 lg:size-14 xl:size-20">
        <Image
          src={platform.image}
          alt={`${platform.title} logo`}
          fill
          className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-110 sm:p-1"
          sizes="(max-width: 640px) 40px, (max-width: 768px) 56px, (max-width: 1024px) 64px, (max-width: 1280px) 56px, 80px"
        />
      </div>

      {/* Platform Name */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        <h3 className="truncate text-center text-[10px] font-semibold text-foreground sm:text-xs md:text-sm lg:text-xs xl:text-sm">
          {platform.title}
        </h3>
        <ExternalLink
          className="hidden size-2.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary sm:block sm:size-3 lg:size-2.5 xl:size-3"
          aria-hidden="true"
        />
      </div>

      {/* Hover Glow Effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:rounded-2xl"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(var(--primary) / 0.15), transparent 70%)',
        }}
        aria-hidden="true"
      />
    </a>
  );
});

Integration.displayName = 'Integration';
PlatformCard.displayName = 'PlatformCard';

export { Integration };
export default Integration;
