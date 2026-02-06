import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16">
          <Link href="/">
            <Image
              src="/xpress-health-logo.svg"
              alt="XPress Health"
              width={160}
              height={40}
              className="h-9 w-auto"
            />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-6xl font-extrabold text-emerald-600 mb-4">404</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Page not found
          </h1>
          <p className="text-gray-600 mb-8">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors"
            >
              Back to Home
            </Link>
            <a
              href="https://consult.xpresshealth.care/services"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-full transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} XPress Health. All rights reserved.
      </footer>
    </div>
  );
}
