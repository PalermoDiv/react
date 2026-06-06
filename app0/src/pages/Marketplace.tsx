import { useState } from 'react';

interface Item {
  id: number;
  name: string;
  type: string;
  price: number;
  rarity: 'common' | 'rare' | 'legendary';
  imageUrl: string;
}

const marketplaceItems: Item[] = [
  {
    id: 1,
    name: 'Moonveil',
    type: 'Katana',
    price: 50000,
    rarity: 'legendary',
    imageUrl: 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/moonveil_katana_weapon_elden_ring_wiki_guide_200px.png',
  },
  {
    id: 2,
    name: 'Erdtree Greatshield',
    type: 'Greatshield',
    price: 35000,
    rarity: 'rare',
    imageUrl: 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/erdtree_greatshield_elden_ring_wiki_guide_200px.png',
  },
  {
    id: 3,
    name: 'Rivers of Blood',
    type: 'Katana',
    price: 75000,
    rarity: 'legendary',
    imageUrl: 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/rivers_of_blood_katana_weapon_elden_ring_wiki_guide_200px.png',
  },
  {
    id: 4,
    name: 'Crimson Amber Medallion',
    type: 'Talisman',
    price: 12000,
    rarity: 'common',
    imageUrl: 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/crimson_amber_medallion_talisman_elden_ring_wiki_guide_200px.png',
  },
  {
    id: 5,
    name: 'Blasphemous Blade',
    type: 'Greatsword',
    price: 60000,
    rarity: 'legendary',
    imageUrl: 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/blasphemous_blade_weapon_elden_ring_wiki_guide_200px.png',
  },
  {
    id: 6,
    name: 'Golden Rune [1]',
    type: 'Consumable',
    price: 500,
    rarity: 'common',
    imageUrl: 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/golden_rune_1_consumable_elden_ring_wiki_guide_200px.png',
  },
];

function getRarityColor(rarity: Item['rarity']): string {
  switch (rarity) {
    case 'legendary': return 'text-yellow-400 border-yellow-500';
    case 'rare': return 'text-blue-400 border-blue-500';
    case 'common': return 'text-gray-300 border-gray-500';
    default: return 'text-white border-gray-500';
  }
}

function getRarityBg(rarity: Item['rarity']): string {
  switch (rarity) {
    case 'legendary': return 'bg-yellow-900/30';
    case 'rare': return 'bg-blue-900/30';
    case 'common': return 'bg-gray-800';
    default: return 'bg-gray-800';
  }
}

export default function Marketplace() {
  const [cart, setCart] = useState<Item[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const filteredItems = filter === 'all'
    ? marketplaceItems
    : marketplaceItems.filter(item => item.rarity === filter);

  function addToCart(item: Item) {
    setCart([...cart, item]);
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-yellow-500 mb-2">Roundtable Hold Marketplace</h1>
          <p className="text-gray-400">Trade goods with fellow Tarnished</p>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-2">
            {(['all', 'common', 'rare', 'legendary'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={`px-4 py-2 rounded-lg border transition-colors cursor-pointer capitalize ${
                  filter === r
                    ? 'bg-yellow-600 border-yellow-500 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="bg-gray-800 border border-gray-600 rounded-xl px-6 py-3">
            <span className="text-gray-300">Cart: </span>
            <span className="font-bold text-yellow-400">{cart.length} items</span>
            <span className="text-gray-300 mx-2">|</span>
            <span className="text-gray-300">Total: </span>
            <span className="font-bold text-yellow-400">{total.toLocaleString()} Runes</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border p-4 flex flex-col items-center gap-4 transition-all hover:shadow-lg hover:scale-[1.02] ${getRarityBg(item.rarity)} ${getRarityColor(item.rarity)}`}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-32 h-32 object-contain drop-shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128x128?text=Item';
                }}
              />
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                <p className="text-gray-400 text-sm">{item.type}</p>
                <p className={`font-semibold capitalize mt-1 ${getRarityColor(item.rarity).split(' ')[0]}`}>
                  {item.rarity}
                </p>
                <p className="text-yellow-400 font-bold mt-2 text-lg">{item.price.toLocaleString()} Runes</p>
              </div>
              <button
                onClick={() => addToCart(item)}
                className="w-full bg-yellow-700 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
