import { useState, useEffect } from 'react';

function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer">
      I'm a button
    </button>
  );
}

function DelayedButton() {
  async function handleClick() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert('Appeared after 2 seconds!');
  }

  return (
    <button onClick={handleClick} className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer">
      Click me (wait 2s)
    </button>
  );
}

type ProfileProps = {
  name: string;
  urlImage: string;
  imageSize: number;
  isAdmin: boolean;
  isOnline: boolean;
};
type Product = {
  title: string;
  isFruit: boolean;
  id: number;
};

function ShowProfile({ name, urlImage, imageSize, isAdmin, isOnline }: ProfileProps): JSX.Element {
  // 1. if statement — return completely different UI
  if (isAdmin) {
    return (
      <div className="p-4 border border-red-500 rounded">
        <h1 className="text-2xl text-red-400 font-bold">Admin: {name}</h1>
        <img className="rounded" src={urlImage} alt={`Photo of ${name}`} width={imageSize} />
        <p className="text-sm text-red-300">Full system access granted</p>
      </div>
    );
  }

  // 2. ternary ? : — choose between two options inline
  const statusColor = isOnline ? 'text-green-400' : 'text-gray-400';

  return (
    <div className="p-4 border border-zinc-700 rounded">
      <h1 className="text-2xl text-white">{name}</h1>

      {/* Ternary for badge text */}
      <span className={`text-sm ${statusColor}`}>
        {isOnline ? '🟢 Online' : '⚫ Offline'}
      </span>

      <img className="rounded mt-2" src={urlImage} alt={`Photo of ${name}`} width={imageSize} />

      {/* 3. logical && — show something OR nothing */}
      {isOnline && <p className="text-sm text-blue-300 mt-2">Available for messages</p>}
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button
      onClick={handleClick}
      className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer"
    >
      Clicked {count} times
    </button>
  );
}

function CountdownTimer() {
  const [minutes, setMinutes] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  function handleStart() {
    const mins = parseInt(minutes, 10);
    if (isNaN(mins) || mins <= 0) return;
    setSecondsLeft(mins * 60);
    setIsRunning(true);
  }

  function handleReset() {
    setIsRunning(false);
    setSecondsLeft(0);
    setMinutes('');
  }

  const displayMinutes = Math.floor(secondsLeft / 60);
  const displaySeconds = secondsLeft % 60;

  return (
    <div className="p-4 border border-zinc-700 rounded space-y-4">
      <h2 className="text-xl font-semibold">Countdown Timer</h2>

      {!isRunning && secondsLeft === 0 ? (
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="bg-zinc-800 text-white px-3 py-2 rounded border border-zinc-600 w-32"
          />
          <button
            onClick={handleStart}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer"
          >
            Start
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-3xl font-mono font-bold">
            {String(displayMinutes).padStart(2, '0')}:{String(displaySeconds).padStart(2, '0')}
          </p>
          <button
            onClick={handleReset}
            className="bg-zinc-600 hover:bg-zinc-500 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      )}

      {secondsLeft === 0 && !isRunning && minutes === '' && (
        <p className="text-sm text-gray-400">Enter minutes and click Start.</p>
      )}

      {secondsLeft === 0 && !isRunning && minutes !== '' && (
        <p className="text-lg text-green-400 font-bold">Time is up!</p>
      )}
    </div>
  );
}

// ------- Managing List ------ 
function ManagingList(): JSX.Element {
  const products: Product[] = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
  ];

  const tableRows = products.map((product) => (
    <tr
      key={product.id}
      className="border-b border-zinc-800 hover:bg-zinc-800/50"
    >
      <td className="p-3">{product.id}</td>
      <td className={product.isFruit ? 'p-3 text-purple-400' : 'p-3 text-zinc-300'}>
        {product.title}
      </td>
      <td className="p-3">{product.isFruit ? 'Yes' : 'No'}</td>
    </tr>
  ));

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Products</h2>
      <table className="w-full text-left border border-zinc-700">
        <thead>
          <tr className="bg-zinc-800">
            <th className="p-3 border-b border-zinc-700">ID</th>
            <th className="p-3 border-b border-zinc-700">Title</th>
            <th className="p-3 border-b border-zinc-700">Fruit?</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Clean slate</h1>
      <div className="flex gap-4">
        <MyButton />
        <DelayedButton />
      </div>

      <div className="flex gap-4">
        <Counter />
        <Counter />
      </div>

      <CountdownTimer />

      <ShowProfile
        name="Anomander Rake"
        urlImage="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhblIFKBkcGfPdGL-kLUwvoIvgLlXdpDoiSH_doqX2339iguQxMK8uSNPRdfPVhrfkc0qsBi6RAJdZVleMXkkg3KQVMzOkbSlYOw5PXOBN2pSgc7GaGNCl1GJE-vI4KS38Rs93q6FkgIBYF/s640/Anomander+Rake+2.0.jpg"
        imageSize={290}
        isAdmin={false}
        isOnline={true}
      />

      <ShowProfile
        name="Caladan Brood"
        urlImage="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhblIFKBkcGfPdGL-kLUwvoIvgLlXdpDoiSH_doqX2339iguQxMK8uSNPRdfPVhrfkc0qsBi6RAJdZVleMXkkg3KQVMzOkbSlYOw5PXOBN2pSgc7GaGNCl1GJE-vI4KS38Rs93q6FkgIBYF/s640/Anomander+Rake+2.0.jpg"
        imageSize={120}
        isAdmin={true}
        isOnline={false}
      />

      <ManagingList />
    </div>
  )
}
