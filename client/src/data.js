export const categories = ['All', 'Fan favourites', 'Small plates', 'Mains', 'Pizza', 'Desserts', 'Drinks']
export const dishes = [
  { id:'burrata', name:'Burrata & heirloom tomato', category:'Small plates', price:420, tag:'A little special', desc:'Creamy burrata, sweet tomatoes, basil oil & grilled sourdough.', image:'photo-1608039829572-78524f79c4c7' },
  { id:'tikka', name:'Charred paneer tikka', category:'Fan favourites', price:360, tag:'Bestseller', desc:'Smoky tandoor paneer, mint chutney & pickled onions.', image:'photo-1567188040759-fb8a883dc6d8' },
  { id:'pasta', name:'Wild mushroom tagliatelle', category:'Mains', price:540, tag:'Vegetarian', desc:'Silky ribbons, forest mushrooms, parmesan & a hint of truffle.', image:'photo-1473093295043-cdd812d0e601' },
  { id:'pizza', name:'Hot honey margherita', category:'Pizza', price:480, tag:'A crowd pleaser', desc:'Slow tomato, fior di latte, garden basil & chilli honey.', image:'photo-1574071318508-1cdbab80d002' },
  { id:'salad', name:'Green goddess bowl', category:'Fan favourites', price:390, tag:'Fresh & bright', desc:'Avocado, crisp greens, herbed grains & lemon tahini.', image:'photo-1512621776951-a57141f2eefd' },
  { id:'chicken', name:'Butter chicken, our way', category:'Mains', price:520, tag:'House classic', desc:'Slow-cooked tomato gravy, cream & a warm tandoori roti.', image:'photo-1603894584373-5ac82b2ae398' },
  { id:'cake', name:'Dark chocolate fondant', category:'Desserts', price:280, tag:'Save room', desc:'Warm cocoa centre, vanilla bean cream & flaky salt.', image:'photo-1606313564200-e75d5e30476c' },
  { id:'lemonade', name:'House ginger lemonade', category:'Drinks', price:160, tag:'Made in-house', desc:'Freshly squeezed lemon, ginger, mint & a little sparkle.', image:'photo-1513558161293-cdaf765edfd7' },
]
export const imageUrl = (id, width=900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
