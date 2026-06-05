import { useState } from 'react';

// React: Type for the data a Square receives from its parent via props
interface SquareProps {
  value: 'X' | 'O' | null;
  onSquareClick: () => void;
}

// React Component: Square is presentational — it does NOT own state.
// It receives its value and click behavior from the parent through props.
function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button
      className="w-16 h-16 sm:w-20 sm:h-20 text-2xl sm:text-3xl font-bold border border-slate-500 bg-slate-800 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

// React: Type describing what Board receives after "lifting state up"
interface BoardProps {
  xIsNext: boolean;
  squares: ('X' | 'O' | null)[];
  onPlay: (nextSquares: ('X' | 'O' | null)[]) => void;
}

// React Component: Board no longer stores game state.
// It receives everything via props and reports clicks back to the parent via onPlay.
function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    // Guard: ignore click if someone already won or the square is occupied
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Immutability: create a copy before changing.
    // React state must never be mutated directly.
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every((s) => s !== null)) {
    status = 'Draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xl font-semibold text-white">{status}</div>
      {/* Layout trick: flex-wrap + exact width forces 3 items per row (no grid) */}
      <div className="flex flex-wrap w-48 sm:w-60">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

// React Hook: useState lets a component "remember" values between renders.
// App (the Game) owns ALL state so the Board and the history list stay in sync.
export default function App() {
  // history stores every board snapshot so players can "time travel"
  const [history, setHistory] = useState<('X' | 'O' | null)[][]>([Array(9).fill(null)]);
  // currentMove tracks which turn we are viewing
  const [currentMove, setCurrentMove] = useState<number>(0);

  // Derived state: we compute whose turn it is instead of storing a separate boolean
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Called by Board. If we time-traveled, we discard any "future" history.
  function handlePlay(nextSquares: ('X' | 'O' | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // React Event Handler: updates state to jump back (or forward) in time
  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  // React List Rendering: mapping an array to JSX.
  // Every item needs a unique "key" prop so React can track elements efficiently.
  const moves = history.map((_, move) => {
    let description: string;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    const isCurrent = move === currentMove;
    return (
      <li key={move} className="mb-1">
        {isCurrent ? (
          <span className="font-bold text-sky-400">You are at move #{move}</span>
        ) : (
          <button
            className="text-sky-400 hover:text-sky-300 hover:underline focus:outline-none"
            onClick={() => jumpTo(move)}
          >
            {description}
          </button>
        )}
      </li>
    );
  });

  function handleRestart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        {/* Left side: the board + restart */}
        <div className="flex flex-col items-center gap-4">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          <button
            className="px-4 py-2 rounded bg-slate-700 text-white font-semibold hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
            onClick={handleRestart}
          >
            Restart
          </button>
        </div>
        {/* Right side: move history (time travel) */}
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold text-white">History</div>
          <ol className="text-white list-decimal list-inside">{moves}</ol>
        </div>
      </div>
    </div>
  );
}

// Pure helper: inspects the current board and returns the winner ('X' or 'O') or null
function calculateWinner(squares: ('X' | 'O' | null)[]): 'X' | 'O' | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
