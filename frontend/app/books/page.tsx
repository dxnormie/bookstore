'use client';
import { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  genre: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Book[]>([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('http://localhost:4002/books')
      .then(r => r.json())
      .then(data => { setBooks(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const addToCart = (book: Book) => {
    setCart([...cart, book]);
    setMsg(`✅ "${book.title}" added to cart!`);
    setTimeout(() => setMsg(''), 2000);
  };

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-2">📚 Our Books</h1>
      <p className="text-gray-500 mb-8">Browse our collection</p>

      {msg && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {msg}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading books...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 h-40 flex items-center justify-center text-5xl">
                📖
              </div>
              <div className="p-4">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{book.genre}</span>
                <h3 className="font-semibold mt-2 mb-1 text-gray-800">{book.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{book.author}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">${book.price}</span>
                  <button
                    onClick={() => addToCart(book)}
                    className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-10 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">🛒 Cart ({cart.length})</h2>
          {cart.map((b, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-gray-50 text-sm">
              <span>{b.title}</span>
              <span className="font-medium">${b.price}</span>
            </div>
          ))}
          <div className="flex justify-between mt-4 font-bold text-lg">
            <span>Total</span>
            <span className="text-blue-600">${cart.reduce((s, b) => s + Number(b.price), 0).toFixed(2)}</span>
          </div>
          <button
            onClick={async () => {
              await fetch('http://localhost:4003/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: '1', books: cart, total: cart.reduce((s, b) => s + Number(b.price), 0) }),
              });
              setMsg('🎉 Order placed successfully!');
              setCart([]);
            }}
            className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Checkout
          </button>
        </div>
      )}
    </main>
  );
}
