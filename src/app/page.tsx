import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/explore">
        <h1>Go to explore</h1>
      </Link>
    </div>
  );
}
