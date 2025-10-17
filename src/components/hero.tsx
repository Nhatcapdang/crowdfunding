import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Coins, Flame, RefreshCw, XCircle, Waves } from 'lucide-react';
import Orb from '@/components/Orb';

/**
 * Hero section component for Solana meme coin platform
 * Features a split layout with content on the left and animated gradient orb on the right
 * Optimized with React.memo to prevent unnecessary re-renders
 */
const Hero = React.memo(() => {
  const features = [
    {
      icon: Coins,
      title: 'Create Token',
      description: 'Launch your meme coin in seconds',
    },
    {
      icon: Flame,
      title: 'Burn Token',
      description: 'Deflationary mechanics made easy',
    },
    {
      icon: RefreshCw,
      title: 'Update Token',
      description: 'Modify metadata on the fly',
    },
    {
      icon: XCircle,
      title: 'Close Account',
      description: 'Reclaim SOL from token accounts',
    },
    {
      icon: Waves,
      title: 'Liquidity Pool',
      description: 'Instant trading for your token',
    },
  ];

  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      {/* Container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 items-center gap-8 py-12 md:py-16 lg:grid-cols-2 lg:gap-12 lg:py-24 xl:py-32">
          {/* Left Content */}
          <div className="flex flex-col items-start space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="text-muted-foreground">Powered by</span>
              <a
                href="https://www.metaplex.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                aria-label="Visit Metaplex"
              >
                <Image
                  src="/svgs/metaplex-logo.svg"
                  alt="Metaplex"
                  width={24}
                  height={24}
                  className="size-6"
                />
              </a>
              <span className="text-muted-foreground">&</span>
              <a
                href="https://solana.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                aria-label="Visit Solana"
              >
                <Image
                  src="/svgs/solana-logo.svg"
                  alt="Solana"
                  width={24}
                  height={24}
                  className="size-6"
                />
              </a>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl xl:text-7xl"
            >
              Launch Your{' '}
              <span className="text-linear-gradient">Meme Coin</span> on Solana
            </h1>

            {/* Subheading */}
            <div className="space-y-2">
              <p className="text-xl font-semibold text-foreground md:text-2xl lg:text-3xl">
                From zero to moon 🚀 in minutes
              </p>
              <p className="text-base text-muted-foreground md:text-lg lg:text-xl">
                Enterprise-grade token management platform
              </p>
            </div>

            {/* Feature List */}
            <div
              className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4"
              role="list"
              aria-label="Platform features"
            >
              {features.map(feature => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/50 p-3 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80 lg:p-4"
                    role="listitem"
                  >
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10"
                      aria-hidden="true"
                    >
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-foreground lg:text-base">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-muted-foreground lg:text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Button asChild size="lg" className="mt-2 text-base md:text-lg">
              <Link
                href="/dashboard"
                aria-label="Get started with token creation"
              >
                Get Started
              </Link>
            </Button>
          </div>

          {/* Right Visual - Orb Background */}
          <div className="relative flex items-center justify-center lg:min-h-[600px]">
            {/* Orb Container */}
            <div className="relative aspect-square w-full max-w-lg">
              {/* Main Orb */}
              <div className="absolute inset-0 opacity-90">
                <Orb
                  hue={280}
                  hoverIntensity={0.3}
                  rotateOnHover={true}
                  forceHoverState={false}
                />
              </div>

              {/* Floating Feature Badges with Glassmorphism */}
              <div
                className="absolute left-[10%] top-[15%] rounded-xl border border-white/20 bg-background/60 px-4 py-2 shadow-lg backdrop-blur-md transition-transform hover:scale-105 sm:px-5 sm:py-3"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2">
                  <Coins className="size-5 text-primary sm:size-6" />
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    Create
                  </span>
                </div>
              </div>

              <div
                className="absolute right-[10%] top-[25%] rounded-xl border border-white/20 bg-background/60 px-4 py-2 shadow-lg backdrop-blur-md transition-transform hover:scale-105 sm:px-5 sm:py-3"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2">
                  <Flame className="size-5 text-destructive sm:size-6" />
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    Burn
                  </span>
                </div>
              </div>

              <div
                className="absolute bottom-[20%] left-[15%] rounded-xl border border-white/20 bg-background/60 px-4 py-2 shadow-lg backdrop-blur-md transition-transform hover:scale-105 sm:px-5 sm:py-3"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2">
                  <Waves className="size-5 text-chart-2 sm:size-6" />
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    Pool
                  </span>
                </div>
              </div>

              <div
                className="absolute bottom-[15%] right-[12%] rounded-xl border border-white/20 bg-background/60 px-4 py-2 shadow-lg backdrop-blur-md transition-transform hover:scale-105 sm:px-5 sm:py-3"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2">
                  <RefreshCw className="size-5 text-accent-foreground sm:size-6" />
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    Update
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"
        aria-hidden="true"
      />
    </section>
  );
});

Hero.displayName = 'Hero';

export { Hero };
export default Hero;
