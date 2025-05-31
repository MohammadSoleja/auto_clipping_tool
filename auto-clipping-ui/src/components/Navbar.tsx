'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-background text-foreground shadow-md">
      <div className="text-xl font-bold">
        <Link href="/">AutoClip</Link>
      </div>
      <div className="space-x-4 text-sm">
        <Link href="#features" className="hover:underline">Features</Link>
        <Link href="#how" className="hover:underline">How it works</Link>
        <Link href="#about" className="hover:underline">About</Link>
        <Link href="#try" className="bg-white text-black px-4 py-1 rounded hover:bg-gray-100 transition">Try it</Link>
      </div>
    </nav>
  );
}
