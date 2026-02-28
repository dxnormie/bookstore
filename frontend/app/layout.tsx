import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BookStore',
  description: 'Your online bookstore',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        {/* Navbar */}
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <a href="/" className="text-2xl font-bold text-blue-600">📚 BookStore</a>
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            <a href="/" className="hover:text-blue-600 transition">Home</a>
            <a href="/books" className="hover:text-blue-600 transition">Books</a>
            <a href="/orders" className="hover:text-blue-600 transition">Orders</a>
            <a href="/auth/login" className="hover:text-blue-600 transition">Login</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
