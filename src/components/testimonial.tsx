import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Marquee } from '@/components/ui/marquee';
import { cn } from '@/lib/utils';
import { BadgeCheck, X } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

interface TestimonialType {
  id: number;
  name: string;
  handle: string;
  role: string;
  testimonial: string;
  verified: boolean;
  date: string;
  avatar: string;
}

const testimonials: TestimonialType[] = [
  {
    id: 1,
    name: 'Alex Chen',
    handle: '@cryptoalex',
    role: 'Meme Coin Creator',
    testimonial:
      'Launched my $DOGE2.0 in literally 3 minutes. This is insane! 🚀 Already at 1000 holders. To the moon!',
    verified: true,
    date: '2h ago',
    avatar: 'AC',
  },
  {
    id: 2,
    name: 'Sarah Dev',
    handle: '@sarahbuilds',
    role: 'Blockchain Developer',
    testimonial:
      "As a developer, I'm impressed by the clean interface and robust token management. Burned 50% supply with one click.",
    verified: true,
    date: '5h ago',
    avatar: 'SD',
  },
  {
    id: 3,
    name: 'Mike Solana',
    handle: '@mikeonsolana',
    role: 'DeFi Enthusiast',
    testimonial:
      'Best Solana token platform hands down. Created, pooled, and listed in under 5 mins. GM to the moon missions! ☀️',
    verified: false,
    date: '1d ago',
    avatar: 'MS',
  },
  {
    id: 4,
    name: 'Emma Token',
    handle: '@emmaonchain',
    role: 'Crypto Trader',
    testimonial:
      'The liquidity pool integration is seamless. Saved hours compared to manual setup. Professional grade tool.',
    verified: true,
    date: '2d ago',
    avatar: 'ET',
  },
  {
    id: 5,
    name: 'Jake Meme',
    handle: '@jakethememe',
    role: 'Content Creator',
    testimonial:
      'Just minted my first meme coin! The process was so smooth even my grandma could do it 😂',
    verified: false,
    date: '3d ago',
    avatar: 'JM',
  },
  {
    id: 6,
    name: 'Olivia Web3',
    handle: '@oliviaweb3',
    role: 'Token Manager',
    testimonial:
      'Updated my token metadata instantly. No more waiting for validators. This is the future of token launches.',
    verified: true,
    date: '4d ago',
    avatar: 'OW',
  },
];

const Testimonial = React.memo(() => {
  return (
    <section
      className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32"
      aria-labelledby="testimonials-heading"
    >
      {/* Container */}
      <div className=" relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="testimonials-heading"
            className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl"
          >
            What{' '}
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-1 bg-clip-text text-transparent">
              Creators
            </span>{' '}
            Are Saying
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg lg:text-xl">
            Real feedback from meme coin creators on X
          </p>
        </div>

        {/* Testimonials Marquee */}
        <div
          className="relative mt-12 lg:mt-16"
          role="list"
          aria-label="User testimonials"
        >
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[10%] bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[10%] bg-gradient-to-l from-background to-transparent" />

          {/* First row - scrolling left to right */}
          <Marquee pauseOnHover className="[--duration:30s] [--gap:1.5rem]">
            {testimonials.slice(0, 3).map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Marquee>

          {/* Second row - scrolling right to left */}
          <Marquee
            pauseOnHover
            reverse
            className="mt-6 [--duration:30s] [--gap:1.5rem]"
          >
            {testimonials.slice(3, 6).map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Marquee>
        </div>
      </div>

      {/* Background Gradient */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"
        aria-hidden="true"
      />
    </section>
  );
});

const TestimonialCard = React.memo(
  ({ testimonial }: { testimonial: TestimonialType }) => {
    return (
      <div
        className={cn(
          'group relative flex w-[380px] flex-col rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm',
          'transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10'
        )}
        role="listitem"
      >
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        {/* Card Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="size-12 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary">
                {testimonial.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate text-base font-semibold text-foreground">
                  {testimonial.name}
                </h3>
                {testimonial.verified && (
                  <BadgeCheck
                    className="size-4 shrink-0 text-primary"
                    aria-label="Verified user"
                  />
                )}
              </div>
              <p className="truncate text-sm text-muted-foreground">
                {testimonial.handle}
              </p>
            </div>
          </div>

          {/* X Logo - Disabled Link */}
          <button
            className="cursor-not-allowed opacity-50"
            disabled
            aria-label={`Visit ${testimonial.name}'s profile (temporarily disabled)`}
            title="Profile links temporarily disabled"
          >
            <X className="size-5 text-foreground" />
          </button>
        </div>

        {/* Testimonial Text */}
        <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground lg:text-base">
          {testimonial.testimonial}
        </p>

        {/* Card Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
          <Badge variant="secondary" className="text-xs">
            {testimonial.role}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {testimonial.date}
          </span>
        </div>

        {/* Hover Glow Effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(var(--primary) / 0.1), transparent 70%)',
          }}
          aria-hidden="true"
        />
      </div>
    );
  }
);

Testimonial.displayName = 'Testimonial';
TestimonialCard.displayName = 'TestimonialCard';

export default Testimonial;
