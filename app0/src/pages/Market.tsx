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
    case "common": {
      return 'text-gray-300 border-gray-500';
    }
    case "rare": {
      return 'text-blue-400 border-blue-400 ';
    }
    case "legendary": {
      return 'text-yellow-400 border-yellow-400';
    }
    default: {
      return 'text-white-500 border-gray-500';
    }
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
// ------- Do filter type for the search -------------
type FilterValue = 'all' | 'common' | 'rare' | 'legendary';

// ---------- Start the marketplace function -------
export default function Market() {
  const [cart, setCart] = useState<Item[]>([]); // cart is the array, setCart how we update the array 
  // Start with the array in zeros by doing <Item[]>([]);
  const [filter, setFilter] = useState<FilterValue>('all'); // do the same for the filter, start with 'all'
  const [searchQuery, setSearchQuery] = useState(''); // another hook, this time for the query.
  // we have know to compute the visible items
  // This will be compute in every render 
  const filteredItems = marketplaceItems.filter((item) => {
    // Check if item matches the selected rarity filter 
    // If filter is 'all', every item passes this check 
    const matchFilter = filter === 'all' || item.rarity === filter;
    // For the next, check if item name includes the search text 
    // Convert it to the item name 
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    // the item only stays in the list if both conditions are true 
    return matchFilter && matchesSearch
  });
  // ------ Function addToCart recieves the parameter 'item' of type Item ------- 
  // The user clicks addToCart, what happens? 
  // Creates a new array that contains all existing cart items PLUS the new item. 
  // Do NOT do cart.push(item) that mutates state directly and React won't detect the change
  function addToCart(item: Item) {
    setCart([...cart, item]);
  }
  // ------- Derived value: total price of everything in the cart -----
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    // -------- outer wrapper: the full screen with the horizontal padding ------
    <div className='min-h-screen bg-gray-900 text-white px-4 py-8'>
      {/* ------- Inner wrapper: constrains max withd and centers content ------*/}
      <div className='mx-auto max-w-6xl'>
        {/*------ Page Header: title and subtitle -------*/}
        <header className='mb-8 text-center'>
          <h1 className='text-4xl font-bold text-yellow-500 mb-2'>Roundtable Hold Marketplace</h1>
          <p className='text-gray-400'>Trade goods with fellow Tarnished</p>
        </header>
        {/* ----- Top Bar: filter buttons + search input + cart summary ---*/}
        {/* flex-col on mobile, flex-row on medium screens */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
          {/* ----- Seach input+ filter button ------*/}
          <div className='flex flex-col sm:flex-row gap-2 w-full md:w-auto'>
            <input type='text' placeholder='Search items...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className='bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors w-full sm:w-64' />
            {/* ----- Filter buttons: map over an array of filter values ------*/}
            {/* We use 'as const' to tell TypeScript this is a readonly tuple, not just string[]. */}
            {/* This lets TypeScript infer that 'r' inside .map() is a FilterValue. */}
            {/* When clicked, it calls setFilter(r) which updates the filter state. */}
            {/* The className uses a TEMPLATE LITERAL (backticks) with a TERNARY inside: */}
            {/*   if filter === r  →  yellow active style  */}
            {/*   else             →  gray inactive style  */}
            <div className='flex gap-2'>
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
          </div>
          {/* ----- Cart summary badge: shows item count + total price ------*/}
          <div className="bg-gray-800 border border-gray-600 rounded-xl px-6 py-3 whitespace-nowrap">
            <span className="text-gray-300">Cart: </span>
            <span className="font-bold text-yellow-400">{cart.length} items</span>
            <span className="text-gray-300 mx-2">|</span>
            <span className="text-gray-300">Total: </span>
            <span className="font-bold text-yellow-400">{total.toLocaleString()} Runes</span>
          </div>
        </div>

        {/* ----- Conditional message: shown when search/filter returns nothing ------*/}
        {filteredItems.length === 0 && (
          <p className="text-center text-gray-400 text-lg py-12">No items match your search.</p>
        )}

        {/* ----- Item grid: responsive CSS Grid layout ------*/}
        {/* grid-cols-1 = 1 column on small screens */}
        {/* sm:grid-cols-2 = 2 columns on small+ screens */}
        {/* lg:grid-cols-3 = 3 columns on large screens */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* ----- Map over filteredItems to render one card per item ------*/}
          {/* .map() transforms an array of data into an array of JSX elements. */}
          {/* key={item.id} is CRITICAL — React uses this to track which element is which. */}
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
