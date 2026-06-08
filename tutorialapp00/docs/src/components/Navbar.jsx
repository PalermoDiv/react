import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          Learn React
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar