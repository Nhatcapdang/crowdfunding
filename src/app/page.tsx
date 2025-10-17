import Navbar04Page from '@/components/navbar-04/navbar-04';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-laptop mx-auto">
      <Navbar04Page />
      <Link href="/explore">
        <h1>Go to explore</h1>
      </Link>
    </div>
  );
}
