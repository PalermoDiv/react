import { Link } from 'react-router-dom';

const blueprints = [
  {
    path: '/forms',
    title: 'Forms',
    description: 'Controlled inputs, validation, radio/checkbox groups, FormData, and error handling.',
  },
  {
    path: '/timer',
    title: 'Timer & Stopwatch',
    description: 'useEffect, setInterval, cleanup functions, pause/resume, and derived time display.',
  },
  {
    path: '/cards',
    title: 'Cards & Lists',
    description: 'Grid layouts, search, filter by category, sort by price/rating, and .map() rendering.',
  },
  {
    path: '/state',
    title: 'State Patterns',
    description: 'Local vs shared state, lifting state up, todo list, and computed derived values.',
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-indigo-400 mb-3">React Blueprints</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of reusable patterns and components. Each page is a self-contained reference
            for how to solve common React problems.
          </p>
        </header>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
          {blueprints.map((bp) => (
            <Link
              key={bp.path}
              to={bp.path}
              className="flex-1 md:basis-[calc(50%-0.75rem)] bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all group"
            >
              <h2 className="text-2xl font-semibold text-white group-hover:text-indigo-400 transition-colors mb-2">
                {bp.title}
              </h2>
              <p className="text-gray-400 leading-relaxed">{bp.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
