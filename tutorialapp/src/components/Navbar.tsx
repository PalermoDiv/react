import { Link, useLocation } from 'react-router-dom';

const links = [
  { path: '/', label: 'Home' },
  { path: '/blueprints', label: 'Blueprints' },
  { path: '/forms', label: 'Forms' },
  { path: '/timer', label: 'Timer' },
  { path: '/cards', label: 'Cards' },
  { path: '/state', label: 'State' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-400 tracking-wide hover:text-indigo-300 transition-colors">
          React Blueprints
        </Link>

        <ul className="flex gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
