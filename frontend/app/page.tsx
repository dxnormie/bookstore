export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Find Your Next Book</h1>
        <p className="text-xl mb-8 opacity-90">Discover thousands of books across all genres</p>
        <a
          href="/books"
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Browse Books
        </a>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { icon: '📖', title: 'Wide Selection', desc: 'Thousands of titles across all genres' },
          { icon: '🚀', title: 'Fast Delivery', desc: 'Get your books delivered quickly' },
          { icon: '🔒', title: 'Secure', desc: 'Safe and secure checkout' },
        ].map((f) => (
          <div key={f.title} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
