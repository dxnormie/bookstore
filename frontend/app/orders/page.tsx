'use client';
import { useEffect, useState } from 'react';

interface Order {
  id: number;
  userId: string;
  books: { title: string; price: number }[];
  total: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4003/orders')
      .then(r => r.json())
      .then(data => { setOrders(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-2">📦 Orders</h1>
      <p className="text-gray-500 mb-8">Your order history</p>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">📭</div>
          <p>No orders yet. <a href="/books" className="text-blue-600 hover:underline">Browse books</a></p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-gray-700">Order #{order.id}</span>
                <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
                  {order.status}
                </span>
              </div>
              {order.books.map((b, i) => (
                <div key={i} className="flex justify-between text-sm text-gray-600 py-1 border-b border-gray-50">
                  <span>{b.title}</span>
                  <span>${b.price}</span>
                </div>
              ))}
              <div className="flex justify-between mt-3 font-bold">
                <span>Total</span>
                <span className="text-blue-600">${order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
