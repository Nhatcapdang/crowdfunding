'use client';

import { CirclePlusIcon, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { SwitchDark } from '.';

const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Explore',
    href: '/explore',
  },
  {
    label: 'Campaigns',
    href: '/profile',
  },
  {
    label: 'Profile',
    href: '/profile',
  },
];
function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50  border-b border-gray-200 h-[72px] bg-white">
      <div className="max-w-xl mx-auto px-8 flex items-center justify-between h-full ">
        <div className="flex-center  gap-4 ">
          <div className="relative w-[136px] h-[36px]">
            <Image src="/svgs/crowdfy.svg" alt="Crowdfy" fill />
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'text-slate-400  text-base font-medium px-3 py`-2 hover:text-slate-900',
                  {
                    'text-slate-900': pathname === item.href,
                  }
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-center gap-[11px] sm:gap-3">
          <Button variant="icon" size="icon-xl">
            <CirclePlusIcon size={26} className="text-slate-500" />
          </Button>
          <Button variant="icon" size="icon-xl">
            <Image src="/images/Male-Memojis.png" alt="male-memojis" fill />
          </Button>
          <Button variant="icon" size="icon-xl">
            <SwitchDark>
              <Settings size={26} className="text-slate-500" />
            </SwitchDark>
          </Button>
        </div>
      </div>
    </header>
  );
}
export default Header;
