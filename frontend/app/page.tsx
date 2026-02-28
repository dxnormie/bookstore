'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  genre?: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('/api/inventory')
      .then((r) => r.json())
      .then((data) => setBooks(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => setBooks([]));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-32 px-6 text-center">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">Find Your Next Book</h1>
        <p className="text-xl mb-10 opacity-90 max-w-xl mx-auto">
          Discover thousands of books across all genres. Fast delivery, secure checkout.
        </p>
        <Link
          href="/books"
          className="inline-block bg-white text-blue-600 font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
        >
          Browse Books →
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { icon: '📖', title: 'Wide Selection', desc: 'Thousands of titles across all genres' },
          { icon: '🚀', title: 'Fast Delivery', desc: 'Get your books delivered quickly' },
          { icon: '🔒', title: 'Secure', desc: 'Safe and secure checkout' },
        ].map((f) => (
          <div key={f.title} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">{f.icon}</div>
            <h3 className="text-lg font-bold mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Featured Books */}
      <section className="max-w-6xl mx-auto pb-20 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Books</h2>
        {books.length === 0 ? (
          <p className="text-center text-gray-400">Loading books...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {books.map((book) => (
              <Link href="/books" key={book.id}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer h-full flex flex-col justify-between">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg h-28 flex items-center justify-center text-4xl mb-3">
                    📚
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">{book.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">{book.author}</p>
                  <span className="text-blue-600 font-bold text-sm">${book.price}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link
            href="/books"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition"
          >
            View All Books →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-400 text-sm">
        © 2026 BookStore. All rights reserved.
      </footer>

    </main>
  );
}
