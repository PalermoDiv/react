import { useState } from 'react';

// ----------- Interface Item defines the shape of each marketplace product --------
// This is a TypeScript interface — it describes what properties an object MUST have.
// Every item in our shop will be an object that matches this shape.
interface Item {
  id: number;                          // Unique identifier for React's key prop and lookups
  name: string;                        // Display name of the weapon/item
  type: string;                        // Category like 'Katana', 'Greatsword', 'Talisman'
  price: number;                       // Cost in Runes (the game's currency)
  rarity: 'common' | 'rare' | 'legendary';  // Union type: ONLY these 3 strings are allowed
  imageUrl: string;                    // Link to the item's image
}

// ----------- Predefined array of all items available in the shop --------
// This is our "database". It's a constant (const) array of Item objects.
// We use 'as const' on the rarity values inside to help TypeScript narrow types.
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

// ----------- Helper function: receives a rarity string, returns Tailwind color classes --------
// Function getRarityColor receives parameter 'rarity' which must match Item['rarity']
// Item['rarity'] is a TypeScript lookup type — it means "whatever type the 'rarity' property has"
// This returns a string containing Tailwind text color + border color classes
function getRarityColor(rarity: Item['rarity']): string {
  switch (rarity) {
    case 'legendary': return 'text-yellow-400 border-yellow-500';
    case 'rare':      return 'text-blue-400 border-blue-500';
    case 'common':    return 'text-gray-300 border-gray-500';
    default:          return 'text-white border-gray-500';
  }
}

// ----------- Helper function: receives a rarity string, returns a background color class --------
// Function getRarityBg receives parameter 'rarity' which must match Item['rarity']
// We use this to give each item card a subtle background tint based on its rarity
function getRarityBg(rarity: Item['rarity']): string {
  switch (rarity) {
    case 'legendary': return 'bg-yellow-900/30';  // /30 means 30% opacity
    case 'rare':      return 'bg-blue-900/30';
    case 'common':    return 'bg-gray-800';
    default:          return 'bg-gray-800';
  }
}

// ----------- Union type for all possible filter values --------
// 'all' means show everything. The other three match the rarity values.
// This prevents typos — TypeScript will yell if you type 'legndary' instead of 'legendary'
type FilterValue = 'all' | 'common' | 'rare' | 'legendary';

// ----------- Main Marketplace component --------
// This is a React functional component. It manages its own state and renders the shop UI.
// Export default means other files can import it as the default export.
export default function Marketplace() {
  // ----------- useState hook #1: tracks items the user has added to cart --------
  // useState is a React Hook. It lets a function component "remember" data between renders.
  // cart is the current array of items in the cart.
  // setCart is the function we call to update that array.
  // The initial value is an empty array: [].
  const [cart, setCart] = useState<Item[]>([]);

  // ----------- useState hook #2: tracks which rarity filter is currently active --------
  // filter is the currently selected filter string.
  // setFilter is the function to change it.
  // Initial value is 'all' because we want to show every item at first.
  const [filter, setFilter] = useState<FilterValue>('all');

  // ----------- useState hook #3: tracks what the user typed in the search box --------
  // searchQuery holds the text the user is typing.
  // setSearchQuery updates it.
  // Initial value is an empty string '' because the box starts empty.
  const [searchQuery, setSearchQuery] = useState('');

  // ----------- Derived state: compute the visible items from filter + search --------
  // This is NOT stored in useState! It is computed on every render.
  // We call this "derived state" because it derives from other state values.
  // If filter is 'all' and search is empty, this returns the entire marketplaceItems array.
  // Otherwise, it runs .filter() to narrow down the results.
  const filteredItems = marketplaceItems.filter((item) => {
    // Step 1: Check if the item matches the selected rarity filter
    // If filter is 'all', every item passes this check (true && anything = anything)
    const matchesFilter = filter === 'all' || item.rarity === filter;

    // Step 2: Check if the item name includes the search text (case-insensitive)
    // We convert BOTH the item name and the search query to lowercase before comparing.
    // That way searching for "moon" still finds "Moonveil".
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Step 3: The item only stays in the list if BOTH conditions are true
    return matchesFilter && matchesSearch;
  });

  // ----------- Function addToCart receives parameter 'item' of type Item --------
  // This is called when the user clicks the "Add to Cart" button on an item card.
  // It creates a NEW array containing all existing cart items PLUS the new item.
  // We use the spread operator [...cart] to copy the old array before adding.
  // NEVER do cart.push(item) — that mutates state directly and React won't detect the change!
  function addToCart(item: Item) {
    setCart([...cart, item]);
  }

  // ----------- Derived value: total price of everything in the cart --------
  // .reduce() walks through the cart array and adds up all item.price values.
  // sum is the accumulator (running total). item is the current element being processed.
  // It starts at 0.
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    // ----------- Outer wrapper: full-screen dark background with horizontal padding --------
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      {/* ----------- Inner wrapper: constrains max width and centers content -------- */}
      {/* max-w-6xl means "never wider than 1152px". mx-auto centers it horizontally. */}
      <div className="max-w-6xl mx-auto">

        {/* ----------- Page header with title and subtitle -------- */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-yellow-500 mb-2">Roundtable Hold Marketplace</h1>
          <p className="text-gray-400">Trade goods with fellow Tarnished</p>
        </header>

        {/* ----------- Top bar: filter buttons + search input + cart summary -------- */}
        {/* flex-col on mobile, flex-row on medium screens (md:flex-row) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

          {/* ----------- Search input + filter buttons grouped together -------- */}
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            {/* ----------- Search input: controlled component -------- */}
            {/* value={searchQuery} makes this a "controlled input" — React owns the value. */}
            {/* onChange fires every time the user types a character. */}
            {/* e.target.value is the text currently inside the input box. */}
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors w-full sm:w-64"
            />

            {/* ----------- Filter buttons: map over an array of filter values -------- */}
            {/* We use 'as const' to tell TypeScript this is a readonly tuple, not just string[]. */}
            {/* This lets TypeScript infer that 'r' inside .map() is a FilterValue. */}
            <div className="flex gap-2">
              {(['all', 'common', 'rare', 'legendary'] as const).map((r) => (
                <button
                  key={r}
                  // ----------- When clicked, update the filter state to this rarity --------
                  onClick={() => setFilter(r)}
                  // ----------- Dynamic className: highlighted if active, muted if not --------
                  // The backticks and ${} let us embed JavaScript inside the class string.
                  // If filter === r, the button gets yellow background (active state).
                  // Otherwise, it gets gray background with hover effect.
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

          {/* ----------- Cart summary badge: shows item count + total price -------- */}
          <div className="bg-gray-800 border border-gray-600 rounded-xl px-6 py-3 whitespace-nowrap">
            <span className="text-gray-300">Cart: </span>
            <span className="font-bold text-yellow-400">{cart.length} items</span>
            <span className="text-gray-300 mx-2">|</span>
            <span className="text-gray-300">Total: </span>
            <span className="font-bold text-yellow-400">{total.toLocaleString()} Runes</span>
          </div>
        </div>

        {/* ----------- Conditional message: shown when search/filter returns nothing -------- */}
        {/* Logical AND (&&): if the left side is true, render the right side. */}
        {/* If filteredItems.length === 0, show the "No items found" paragraph. */}
        {filteredItems.length === 0 && (
          <p className="text-center text-gray-400 text-lg py-12">No items match your search.</p>
        )}

        {/* ----------- Item grid: responsive CSS Grid layout -------- */}
        {/* grid-cols-1 = 1 column on small screens */}
        {/* sm:grid-cols-2 = 2 columns on small+ screens */}
        {/* lg:grid-cols-3 = 3 columns on large screens */}
        {/* gap-6 = 24px gap between cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ----------- Map over filteredItems to render one card per item -------- */}
          {/* .map() transforms an array of data into an array of JSX elements. */}
          {/* key={item.id} is CRITICAL — React uses this to track which element is which. */}
          {/* Never use array index as key if the list can reorder or filter! */}
          {filteredItems.map((item) => (
            <div
              key={item.id}
              // ----------- Dynamic classes based on rarity (color + background) --------
              // We call our helper functions and spread the returned strings into className.
              // hover:scale-[1.02] makes the card grow slightly when hovered.
              className={`rounded-xl border p-4 flex flex-col items-center gap-4 transition-all hover:shadow-lg hover:scale-[1.02] ${getRarityBg(item.rarity)} ${getRarityColor(item.rarity)}`}
            >
              {/* ----------- Item image with fallback on error -------- */}
              {/* onError is a native DOM event. If the wiki image fails to load, */}
              {/* we replace it with a placeholder so the UI doesn't break. */}
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-32 h-32 object-contain drop-shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128x128?text=Item';
                }}
              />

              {/* ----------- Item text info (name, type, rarity, price) -------- */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                <p className="text-gray-400 text-sm">{item.type}</p>
                {/* ----------- Split the returned color string to get only the text color class -------- */}
                {/* getRarityColor returns 'text-yellow-400 border-yellow-500' */}
                {/* .split(' ')[0] grabs just the 'text-yellow-400' part for the rarity label. */}
                <p className={`font-semibold capitalize mt-1 ${getRarityColor(item.rarity).split(' ')[0]}`}>
                  {item.rarity}
                </p>
                <p className="text-yellow-400 font-bold mt-2 text-lg">{item.price.toLocaleString()} Runes</p>
              </div>

              {/* ----------- Add to Cart button -------- */}
              {/* onClick={() => addToCart(item)} passes THIS specific item into the function. */}
              {/* We use an arrow function here because we need to pass 'item' as an argument. */}
              {/* If we wrote onClick={addToCart}, the event object would be passed instead! */}
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
