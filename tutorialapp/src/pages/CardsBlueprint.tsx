import { useState } from 'react';

// ============================================================================
// CARDS & LISTS BLUEPRINT
// ============================================================================
// This page demonstrates how to render lists, filter, sort, and search.
// The key idea: store the RAW DATA and the USER'S CHOICES in state,
// then DERIVE the visible list by combining them (don't store filteredItems!).
// ============================================================================

// ----------- Item type --------
type Category = 'fiction' | 'non-fiction' | 'sci-fi' | 'fantasy' | 'history';

interface Book {
  id: number;
  title: string;
  author: string;
  category: Category;
  price: number;
  rating: number;  // 1 to 5
  year: number;
}

// ----------- Mock data --------
const books: Book[] = [
  { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'fantasy', price: 12.99, rating: 5, year: 1937 },
  { id: 2, title: 'Dune', author: 'Frank Herbert', category: 'sci-fi', price: 14.50, rating: 5, year: 1965 },
  { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', category: 'history', price: 18.00, rating: 4, year: 2011 },
  { id: 4, title: 'Project Hail Mary', author: 'Andy Weir', category: 'sci-fi', price: 16.99, rating: 5, year: 2021 },
  { id: 5, title: 'Atomic Habits', author: 'James Clear', category: 'non-fiction', price: 11.99, rating: 5, year: 2018 },
  { id: 6, title: 'The Name of the Wind', author: 'Patrick Rothfuss', category: 'fantasy', price: 13.99, rating: 5, year: 2007 },
  { id: 7, title: '1984', author: 'George Orwell', category: 'fiction', price: 9.99, rating: 5, year: 1949 },
  { id: 8, title: 'Guns, Germs, and Steel', author: 'Jared Diamond', category: 'history', price: 15.50, rating: 4, year: 1997 },
  { id: 9, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'non-fiction', price: 12.00, rating: 4, year: 2011 },
  { id: 10, title: 'Foundation', author: 'Isaac Asimov', category: 'sci-fi', price: 10.99, rating: 4, year: 1951 },
  { id: 11, title: 'Brave New World', author: 'Aldous Huxley', category: 'fiction', price: 9.50, rating: 4, year: 1932 },
  { id: 12, title: 'Mistborn', author: 'Brandon Sanderson', category: 'fantasy', price: 11.50, rating: 5, year: 2006 },
];

// ----------- Helper: render stars from a 1-5 rating --------
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-600'}>
          ★
        </span>
      ))}
    </div>
  );
}

// ============================================================================
// Main Cards Page
// ============================================================================
export default function CardsBlueprint() {
  // ----------- State: what the user is typing in the search box --------
  const [search, setSearch] = useState('');

  // ----------- State: which category is selected ('all' means every category) --------
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');

  // ----------- State: sort order --------
  type SortKey = 'title' | 'price-low' | 'price-high' | 'rating' | 'year';
  const [sortBy, setSortBy] = useState<SortKey>('title');

  // ----------- DERIVED: filteredBooks is computed, not stored in state --------
  // We start with ALL books, then apply search, then category, then sorting.
  const filteredBooks = books
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':       return a.title.localeCompare(b.title);
        case 'price-low':   return a.price - b.price;
        case 'price-high':  return b.price - a.price;
        case 'rating':      return b.rating - a.rating;
        case 'year':        return b.year - a.year;
        default:            return 0;
      }
    });

  const categories: (Category | 'all')[] = ['all', 'fiction', 'non-fiction', 'sci-fi', 'fantasy', 'history'];

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-400 mb-2">Cards & Lists Blueprint</h1>
          <p className="text-gray-400">Search, filter by category, and sort a list of items.</p>
        </header>

        {/* ----------- Controls bar: search + filters + sort -------- */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 transition-colors"
          />

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors capitalize cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="title">Sort: Title</option>
            <option value="price-low">Sort: Price (Low to High)</option>
            <option value="price-high">Sort: Price (High to Low)</option>
            <option value="rating">Sort: Rating</option>
            <option value="year">Sort: Year (Newest)</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-gray-500 text-sm mb-4">
          Showing {filteredBooks.length} of {books.length} books
        </p>

        {/* ----------- Grid of cards -------- */}
        {filteredBooks.length === 0 ? (
          <p className="text-center text-gray-400 text-lg py-12">No books match your search.</p>
        ) : (
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="flex-1 sm:flex-none sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-0.75rem)] xl:w-[calc(25%-0.75rem)] bg-gray-900 border border-gray-700 rounded-xl p-5 flex flex-col gap-3 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded">
                    {book.category}
                  </span>
                  <span className="text-yellow-400 font-bold">${book.price.toFixed(2)}</span>
                </div>

                <h3 className="text-lg font-bold text-white leading-tight">{book.title}</h3>
                <p className="text-gray-400 text-sm">{book.author}</p>

                <div className="flex items-center gap-2 mt-auto">
                  <StarRating rating={book.rating} />
                  <span className="text-gray-500 text-xs">({book.year})</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
