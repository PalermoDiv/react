import { useState } from 'react';
import './index.css';

type Image = {
  name: string;
  urlImage: string;
  sizeImage: number;
}

// 1. Create a union type for the groups (gives you autocomplete!)
type Group = 'demigods' | 'gods' | 'roundtable' | 'npcs' | 'bosses';

// 2. Update the interface to use the Group type instead of generic string
interface Char {
  name: string;
  description: string;
  group: Group;
}

// 3. Create the array of characters
const characters: Char[] = [
  {
    name: 'Malenia, Blade of Miquella',
    description: 'The severer of limbs, undefeated in battle.',
    group: 'demigods',
  },
  {
    name: 'Radahn, General of the Stars',
    description: 'Held back the stars and fought a rot-infested fate.',
    group: 'demigods',
  },
  {
    name: 'Queen Marika the Eternal',
    description: 'The vessel of the Elden Ring and goddess of the Lands Between.',
    group: 'gods',
  },
  {
    name: 'Blaidd the Half-Wolf',
    description: 'Loyal shadow and protector of Ranni the Witch.',
    group: 'npcs',
  },
  {
    name: 'Sir Gideon Ofnir',
    description: 'The all-knowing Tarnished and leader of the Roundtable.',
    group: 'roundtable',
  },
  {
    name: 'Margit, the Fell Omen',
    description: 'The first great obstacle facing every Tarnished.',
    group: 'bosses',
  },
];

// 4. Helper to color each group differently
function getGroupColor(group: Group): string {
  switch (group) {
    case 'demigods': return 'text-yellow-400';
    case 'gods': return 'text-amber-300';
    case 'roundtable': return 'text-blue-400';
    case 'npcs': return 'text-green-400';
    case 'bosses': return 'text-red-400';
    default: return 'text-white';
  }
}
// --------- Create new type for the possible locations in the game------ 
type GamePeriod = 'early-game' | 'mid-game' | 'end-game';
// --------- Create the interface for the array ----------
interface zone {
  name: string,
  description: string,
  period: GamePeriod,
}
// ------- Make the array --------
const zones: zone[] = [
  {
    name: 'Limgrave',
    description: 'First location of the game, has the first castles and bosses',
    period: 'early-game',
  },
  {
    name: 'Leyndell',
    description: 'Biggest city in the game, works as the perfect mid-game scenario. Lots of lore undercover here',
    period: 'mid-game',
  },
  {
    name: 'Haligtree',
    description: 'End-game location. Where the hardest boss on the base game is. Only for when you feel prepared',
    period: 'end-game',
  },
];

function MyButton() {
  return (
    <button className="text-3xl bg-blue-900 text-white border rounded-lg p-4 hover:bg-blue-800 transition-colors cursor-pointer">
      A button!
    </button>
  );
}

function ShowERMap({ name, urlImage, sizeImage }: Image) {
  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-xl font-semibold">{name}</h2>
      <img className="rounded-lg shadow-lg" src={urlImage} width={sizeImage} alt={name} />
    </div>
  );
}

function FormER({ onAnswer }: { onAnswer: (answer: string) => void }) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get('elden-ring') as string;
    onAnswer(value);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-600 rounded-xl p-6 max-w-md w-full shadow-lg">
      <p className="text-lg font-medium mb-4">Do you like Elden Ring?</p>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors">
          <input
            type="radio"
            name="elden-ring"
            value="yes"
            className="w-5 h-5 accent-yellow-500 cursor-pointer"
          />
          <span className="text-white">Yes</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors">
          <input
            type="radio"
            name="elden-ring"
            value="no"
            className="w-5 h-5 accent-red-500 cursor-pointer"
          />
          <span className="text-white">No</span>
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}

// 5. The component that renders the table using .map()
function CharacterTable({ chars }: { chars: Char[] }) {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-gray-600 shadow-lg">
      <table className="w-full text-left bg-gray-800">
        <thead className="bg-gray-900 text-gray-300 uppercase text-sm">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Description</th>
            <th className="p-4">Group</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {chars.map((char, index) => (
            <tr key={index} className="hover:bg-gray-700 transition-colors">
              <td className="p-4 font-semibold text-white">{char.name}</td>
              <td className="p-4 text-gray-300">{char.description}</td>
              <td className={`p-4 font-medium capitalize ${getGroupColor(char.group)}`}>
                {char.group}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// -------- Make component to represent the location ---------
function LocationZone({ locations }: { locations: zone[] }) {
  return (
    <div className='w-full max-w-2xl overflow-hidden rounded-xl border border-gray-600 shadow-lg'>
      <table className='w-full text-left bg-gray-800'>
        <thead className="bg-gray-900 text-gray-300 uppercase text-sm">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Description</th>
            <th className="p-4">Period</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {locations.map((zone, index) => (
            <tr key={index} className="hover:bg-gray-700 transition-colors">
              <td className="p-4 font-semibold text-white">{zone.name}</td>
              <td className="p-4 font-semibold text-white">{zone.description}</td>
              <td className="p-4 font-semibold text-white">{zone.period}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// --------- Responding to events button -------
function EventsButton() {
  function handleClick() {
    alert('My email is: armando.palermoleon@gmail.com');
  }
  return (
    <button
      onClick={handleClick}
      className="bg-gray-900 border-2 border-yellow-600 text-yellow-500 font-bold py-3 px-8 rounded-lg
                 hover:bg-yellow-600 hover:text-gray-900 hover:shadow-[0_0_15px_rgba(202,138,4,0.6)]
                 active:scale-95 transition-all duration-200 cursor-pointer tracking-wide uppercase"
    >
      Contact the Tarnished
    </button>
  );
}
// ----------- Making a button for the death count ------ 
function DeathCounter() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <button className="bg-gray-900 border-2 border-yellow-500 text-red-600 font-bold px-8 py-2 rounded.lg hover:bg-yellow-600
      hover:text-red-950 transition-all duration-200 cursor-pointer uppercase" onClick={handleClick}>How many times have you died in this session? {count}</button>
  )
}
// ------- Main App ---------
export default function App() {
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-700 text-white px-3 py-4 flex flex-col items-center gap-8">
      <h1 className="font-semibold text-2xl">Hello there, this is about Elden Ring</h1>
      <MyButton />
      <ShowERMap
        name="Elden Ring Map"
        urlImage="https://cdn.segmentnextimages.com/wp-content/uploads/2023/07/elden-ring-sites-of-grace-featured.jpeg"
        sizeImage={400}
      />
      <FormER onAnswer={setAnswer} />

      {answer === 'yes' && (
        <p className="text-yellow-400 font-bold text-xl">Welcome, Tarnished.</p>
      )}
      {answer === 'no' && (
        <p className="text-red-500 font-bold text-xl">You died.</p>
      )}

      <h2 className="text-xl font-semibold mt-4">Characters</h2>
      <CharacterTable chars={characters} />
      <LocationZone locations={zones} />
      <EventsButton />
      <DeathCounter />
    </div>
  );
}
