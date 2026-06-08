import { useState, useEffect, useRef } from 'react';

// ============================================================================
// TIMER & STOPWATCH BLUEPRINT
// ============================================================================
// This page demonstrates useEffect with intervals — the classic pattern for
// anything that needs to update over time (timers, clocks, polls, animations).
//
// CRITICAL RULE: Every setInterval must have a matching clearInterval.
// React's useEffect cleanup function exists exactly for this.
// ============================================================================

// ----------- Countdown Timer Component --------
function CountdownTimer() {
  const [minutesInput, setMinutesInput] = useState('5');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // ----------- useEffect: the ticking heart of the timer --------
  // Dependencies: [isRunning, isPaused, secondsLeft]
  // Every time one of these changes, React re-evaluates the effect.
  // If isRunning is true and not paused and time remains, we start an interval.
  useEffect(() => {
    if (!isRunning || isPaused || secondsLeft <= 0) return;

    // setInterval fires the callback every 1000ms (1 second)
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // ----------- Cleanup function --------
    // This runs when the component unmounts OR before the effect re-runs.
    // Without it, you'd leak intervals — they keep running in the background.
    return () => clearInterval(interval);
  }, [isRunning, isPaused, secondsLeft]);

  function handleStart() {
    const mins = parseInt(minutesInput, 10);
    if (isNaN(mins) || mins <= 0) return;
    setSecondsLeft(mins * 60);
    setIsRunning(true);
    setIsPaused(false);
  }

  function handlePause() {
    setIsPaused((p) => !p);  // Toggle pause state
  }

  function handleReset() {
    setIsRunning(false);
    setIsPaused(false);
    setSecondsLeft(0);
  }

  const displayMin = Math.floor(secondsLeft / 60);
  const displaySec = secondsLeft % 60;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center">
      <h3 className="text-xl font-semibold text-white mb-4">Countdown Timer</h3>

      {!isRunning && secondsLeft === 0 ? (
        <div className="flex items-center justify-center gap-3">
          <input
            type="number"
            min="1"
            value={minutesInput}
            onChange={(e) => setMinutesInput(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 w-24 text-center"
          />
          <span className="text-gray-400">minutes</span>
          <button
            onClick={handleStart}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer"
          >
            Start
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-5xl font-mono font-bold text-white">
            {String(displayMin).padStart(2, '0')}:{String(displaySec).padStart(2, '0')}
          </p>

          {secondsLeft === 0 && (
            <p className="text-emerald-400 text-xl font-bold">Time is up!</p>
          )}

          <div className="flex justify-center gap-3">
            {secondsLeft > 0 && (
              <button
                onClick={handlePause}
                className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            )}
            <button
              onClick={handleReset}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------- Stopwatch with Lap Times --------
function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);       // Total elapsed time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  // We use a ref to track the start time so we don't need it in the dependency array.
  // This avoids re-creating the interval on every tick.
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isRunning) return;

    // Record when this run started so we can calculate elapsed time accurately.
    // Date.now() returns the current timestamp in milliseconds.
    const startTime = Date.now() - elapsed;
    startTimeRef.current = startTime;

    const interval = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current);
    }, 10);  // Update every 10ms for smooth centiseconds

    return () => clearInterval(interval);
  }, [isRunning]);  // We intentionally do NOT put 'elapsed' here — that would reset the interval every 10ms!

  function handleStart() {
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setElapsed(0);
    setLaps([]);
  }

  function handleLap() {
    setLaps((prev) => [...prev, elapsed]);
  }

  // ----------- Derived display values --------
  // We compute these from elapsed milliseconds on every render.
  // No need to store them in state — they are purely derived.
  const totalSeconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((elapsed % 1000) / 10);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">Stopwatch</h3>

      <div className="text-center mb-6">
        <p className="text-5xl font-mono font-bold text-white">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}.
          {String(centiseconds).padStart(2, '0')}
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer"
          >
            Stop
          </button>
        )}

        <button
          onClick={handleLap}
          disabled={!isRunning}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer"
        >
          Lap
        </button>

        <button
          onClick={handleReset}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>

      {/* Lap times */}
      {laps.length > 0 && (
        <div className="border-t border-gray-700 pt-4">
          <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">Laps</h4>
          <ul className="space-y-1 max-h-48 overflow-y-auto">
            {laps.map((lapTime, index) => {
              const ts = Math.floor(lapTime / 1000);
              const m = Math.floor(ts / 60);
              const s = ts % 60;
              const cs = Math.floor((lapTime % 1000) / 10);
              return (
                <li key={index} className="flex justify-between text-gray-300 text-sm font-mono px-2 py-1 bg-gray-800 rounded">
                  <span>Lap {index + 1}</span>
                  <span>{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}.{String(cs).padStart(2, '0')}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================
export default function TimerBlueprint() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-400 mb-2">Timer Blueprint</h1>
          <p className="text-gray-400">useEffect, setInterval, cleanup, pause/resume, and derived time values.</p>
        </header>

        <CountdownTimer />
        <Stopwatch />
      </div>
    </div>
  );
}
