import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/marketplace', label: 'Marketplace' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-yellow-500 tracking-wide hover:text-yellow-400 transition-colors">
          Elden Ring Wiki
        </Link>

        <ul className="flex gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-yellow-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
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
