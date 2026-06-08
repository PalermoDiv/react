import { useState } from 'react';

// ============================================================================
// STATE PATTERNS BLUEPRINT
// ============================================================================
// This page demonstrates the most important state management patterns in React:
// 1. Local component state (useState inside the component that needs it)
// 2. Lifting state up (moving shared state to a common parent)
// 3. Derived state (computing values instead of storing them)
// 4. Arrays in state (add, toggle, delete — all immutably!)
// ============================================================================

// ==========================================
// SECTION 1: Local vs Shared Counter
// ==========================================

// ----------- A simple counter with its OWN state --------
function LocalCounter({ label }: { label: string }) {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
      <h4 className="text-gray-400 text-sm mb-2">{label}</h4>
      <p className="text-3xl font-bold text-white mb-3">{count}</p>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-colors cursor-pointer"
        >
          -
        </button>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded transition-colors cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}

// ----------- A button that RECEIVES count and onClick from a PARENT --------
// This is the "lifting state up" pattern. The button doesn't own the state.
// The parent owns it, passes the value down, and receives updates back.
function SharedCounterButton({
  label,
  count,
  onIncrement,
}: {
  label: string;
  count: number;
  onIncrement: () => void;
}) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
      <h4 className="text-gray-400 text-sm mb-2">{label}</h4>
      <p className="text-3xl font-bold text-white mb-3">{count}</p>
      <button
        onClick={onIncrement}
        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1 rounded transition-colors cursor-pointer"
      >
        Increment
      </button>
    </div>
  );
}

// ----------- Parent component that holds the SHARED state --------
function SharedCounterDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Shared State (Lifted Up)</h3>
      <p className="text-gray-400 text-sm mb-4">
        Both counters below share the same state because it lives in their parent.
        Clicking either one updates both.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SharedCounterButton
          label="Counter A"
          count={count}
          onIncrement={() => setCount((c) => c + 1)}
        />
        <SharedCounterButton
          label="Counter B"
          count={count}
          onIncrement={() => setCount((c) => c + 1)}
        />
      </div>
    </div>
  );
}

// ==========================================
// SECTION 2: Todo List (Arrays in State)
// ==========================================

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoListDemo() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React state patterns', completed: true },
    { id: 2, text: 'Build a marketplace page', completed: false },
    { id: 3, text: 'Master TypeScript generics', completed: false },
  ]);
  const [input, setInput] = useState('');

  // ----------- Add a new todo --------
  // We create a NEW array with the new item at the end.
  // NEVER do todos.push(newTodo) — that mutates the existing array!
  function addTodo() {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),  // Simple unique ID for demo purposes
      text: input.trim(),
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInput('');
  }

  // ----------- Toggle completed status --------
  // We map over the array and create a NEW array with the updated item.
  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // ----------- Delete a todo --------
  // We filter OUT the item with the matching ID.
  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  // ----------- DERIVED: count completed and remaining --------
  // These are computed from the todos array — no need for separate state!
  const completedCount = todos.filter((t) => t.completed).length;
  const remainingCount = todos.length - completedCount;

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Todo List (Arrays in State)</h3>
      <p className="text-gray-400 text-sm mb-4">
        Demonstrates adding, toggling, and deleting items from an array immutably.
        Also shows derived state: completed and remaining counts.
      </p>

      {/* Add new todo */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          onClick={addTodo}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Add
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm text-gray-400 mb-4">
        <span>{todos.length} total</span>
        <span>{completedCount} done</span>
        <span>{remainingCount} remaining</span>
      </div>

      {/* List */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center gap-3 bg-gray-900 border rounded-lg px-4 py-3 transition-all ${
              todo.completed ? 'border-gray-800 opacity-60' : 'border-gray-700'
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-5 h-5 accent-indigo-500 cursor-pointer"
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-400 hover:text-red-300 text-sm transition-colors cursor-pointer"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p className="text-gray-500 text-center py-6">No tasks left!</p>}
    </div>
  );
}

// ==========================================
// SECTION 3: Derived State Demo
// ==========================================

function DerivedStateDemo() {
  const [items, setItems] = useState<string[]>(['Apple', 'Banana', 'Cherry', 'Date']);
  const [newItem, setNewItem] = useState('');

  // ----------- ALL of these are DERIVED. They are not useState values. -----------
  const uppercased = items.map((i) => i.toUpperCase());
  const totalLetters = items.reduce((sum, i) => sum + i.length, 0);
  const averageLength = items.length > 0 ? (totalLetters / items.length).toFixed(1) : '0';
  const longestItem = items.reduce((longest, current) =>
    current.length > longest.length ? current : longest
  , items[0] || '');

  function addItem() {
    if (!newItem.trim()) return;
    setItems((prev) => [...prev, newItem.trim()]);
    setNewItem('');
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Derived State</h3>
      <p className="text-gray-400 text-sm mb-4">
        We only store the raw array. Uppercase list, letter count, average length,
        and longest word are all computed on every render. No extra useState needed!
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
          className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          onClick={addItem}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Add Fruit
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Original</p>
          <p className="text-white font-mono">{items.join(', ')}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Uppercased (derived)</p>
          <p className="text-white font-mono">{uppercased.join(', ')}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Letters</p>
          <p className="text-2xl font-bold text-indigo-400">{totalLetters}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Avg Length</p>
          <p className="text-2xl font-bold text-emerald-400">{averageLength}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Longest</p>
          <p className="text-xl font-bold text-yellow-400">{longestItem}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================
export default function StateBlueprint() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-400 mb-2">State Patterns Blueprint</h1>
          <p className="text-gray-400">Local state, lifting state up, arrays in state, and derived values.</p>
        </header>

        {/* Local counters */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Local State (Independent)</h3>
          <p className="text-gray-400 text-sm mb-4">
            Each counter below has its own useState. They update independently.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <LocalCounter label="Counter 1" />
            <LocalCounter label="Counter 2" />
            <LocalCounter label="Counter 3" />
            <LocalCounter label="Counter 4" />
          </div>
        </div>

        <SharedCounterDemo />
        <TodoListDemo />
        <DerivedStateDemo />
      </div>
    </div>
  );
}
