import { useState, useMemo } from 'react';
import { 
  Utensils, 
  Calendar, 
  Clock, 
  Users, 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Award, 
  Wine, 
  Heart,
  Menu as MenuIcon,
  Flame,
  Coffee,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

// --- MENU DATA ---
const MENU_ITEMS = [
  {
    id: 1,
    name: "Pan-Seared Hokkaido Scallops",
    category: "starters",
    price: 36,
    description: "Sunchoke velvet puree, crispy guanciale, green apple emulsion, and kaluga hybrid caviar pearls.",
    tags: ["Gluten-Free", "Chef Recommended"],
    calories: "340 kcal",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    prepTime: "15 min"
  },
  {
    id: 2,
    name: "Wagyu A5 Carpaccio & Truffle",
    category: "starters",
    price: 42,
    description: "Miyazaki A5 beef, aged parmesan crisp, black summer truffle carpaccio, smoked Maldon sea salt.",
    tags: ["Chef Recommended"],
    calories: "410 kcal",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    prepTime: "12 min"
  },
  {
    id: 3,
    name: "Dry-Aged Prime Tomahawk",
    category: "mains",
    price: 135,
    description: "45-day Himalayan salt dry-aged beef, bone marrow jus, roasted heirloom garlic and herb butter.",
    tags: ["Gluten-Free", "Chef Recommended"],
    calories: "920 kcal",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    prepTime: "30 min"
  },
  {
    id: 4,
    name: "Chilean Sea Bass Glacier",
    category: "mains",
    price: 68,
    description: "Miso-mirin glaze, charred baby bok choy, lemongrass dashi broth, and crispy lotus root garnish.",
    tags: ["Gluten-Free", "Pescatarian"],
    calories: "520 kcal",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    prepTime: "22 min"
  },
  {
    id: 5,
    name: "Wild Morels & Chanterelle Risotto",
    category: "mains",
    price: 46,
    description: "Acquerello aged carnaroli rice, foraged forest mushrooms, aged pecorino, shaved winter truffle.",
    tags: ["Vegetarian", "Gluten-Free"],
    calories: "580 kcal",
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    prepTime: "25 min"
  },
  {
    id: 6,
    name: "Valrhona Smoked Dark Gold Dome",
    category: "desserts",
    price: 24,
    description: "70% Guanaja chocolate, smoked sea salt caramel center, hazelnut praline, 24k edible gold leaf.",
    tags: ["Vegetarian", "Chef Recommended"],
    calories: "450 kcal",
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    prepTime: "10 min"
  },
  {
    id: 7,
    name: "Meyer Lemon Yuzu Blossom",
    category: "desserts",
    price: 22,
    description: "Confit citrus curd, verbena meringue shards, raspberry snow, pistachio micro-sponge.",
    tags: ["Vegetarian", "Gluten-Free"],
    calories: "320 kcal",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    prepTime: "10 min"
  },
  {
    id: 8,
    name: "Smoked Bourbon Elixir 'The Aureate'",
    category: "cocktails",
    price: 28,
    description: "Woodford Reserve small-batch, flamed rosemary, Madagascar vanilla bitters, poured under oak smoke.",
    tags: ["Cocktail", "Signature"],
    calories: "190 kcal",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    prepTime: "5 min"
  },
  {
    id: 9,
    name: "Violet & Velvet Botanical Gin",
    category: "cocktails",
    price: 26,
    description: "Empress 1908 indigo gin, lychee liqueur, elderflower cordial, prosecco float, edible orchids.",
    tags: ["Cocktail"],
    calories: "180 kcal",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    prepTime: "5 min"
  }
];

const CATEGORIES = [
  { id: "all", label: "All Offerings" },
  { id: "starters", label: "Starters & Caviar" },
  { id: "mains", label: "Chef's Entrées" },
  { id: "desserts", label: "Sweet Confections" },
  { id: "cocktails", label: "Artisanal Libations" },
];

const TESTIMONIALS = [
  {
    quote: "A culinary spectacle. The Wagyu Carpaccio and sensory presentation redefine modern luxury gastronomy on the East Coast.",
    author: "Elena Vance",
    source: "Michelin Guide Reviewer",
    rating: 5,
    tag: "Critic's Choice 2025"
  },
  {
    quote: "Savoria delivers an ethereal experience where the service is as immaculate as their wine pairings and dry-aged cuts.",
    author: "Jonathan Drake",
    source: "Epicurean Quarterly",
    rating: 5,
    tag: "3 Stars Culinary Excellence"
  },
  {
    quote: "The ambiance alone transports you. Easily one of the top five dining destinations worldwide for milestones.",
    author: "Claire & Richard Moreau",
    source: "Private Connoisseurs Club",
    rating: 5,
    tag: "Verified Patron"
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState(null);

  // Reservation State
  const [resDate, setResDate] = useState("2026-11-15");
  const [resTime, setResTime] = useState("19:30");
  const [resGuests, setResGuests] = useState(2);
  const [resName, setResName] = useState("");
  const [resEmail, setResEmail] = useState("");
  const [resNotes, setResNotes] = useState("");
  const [resConfirmed, setResConfirmed] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return MENU_ITEMS;
    return MENU_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Cart operations
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const cartTax = cartSubtotal * 0.09;
  const cartTotal = cartSubtotal + cartTax;
  const totalItemCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleReservation = (e) => {
    e.preventDefault();
    if (!resName || !resEmail) return;
    setResConfirmed(true);
  };

  const copyAddressToClipboard = () => {
    navigator.clipboard?.writeText("482 Promenade Des Étoiles, Waterfront Quarter, New York, NY 10014");
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleCheckout = () => {
    setOrderConfirmed(true);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-stone-200 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* BACKGROUND ACCENTS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-600/5 blur-[140px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-amber-500/5 blur-[150px]" />
      </div>

      {/* STICKY LUXURY NAVIGATION */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#08080A]/85 border-b border-amber-900/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-amber-500/40 flex items-center justify-center bg-gradient-to-tr from-amber-950/60 to-black group-hover:border-amber-400 transition-colors">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <span className="text-xl tracking-[0.25em] font-serif uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500">
                Aura & Savoria
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-amber-400/70 font-light">
                Haute Gastronomie
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider uppercase text-stone-300">
            <a href="#menu" className="hover:text-amber-300 transition-colors">Curated Menu</a>
            <a href="#story" className="hover:text-amber-300 transition-colors">The Philosophy</a>
            <a href="#reserve" className="hover:text-amber-300 transition-colors">Reservations</a>
            <a href="#testimonials" className="hover:text-amber-300 transition-colors">Accolades</a>
            <a href="#location" className="hover:text-amber-300 transition-colors">Hours & Valet</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Cart trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full border border-amber-500/30 bg-amber-950/20 hover:bg-amber-900/30 text-amber-300 transition-all active:scale-95"
              aria-label="Tasting Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold flex items-center justify-center shadow-lg animate-bounce">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Quick Reserve CTA */}
            <a 
              href="#reserve" 
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950 hover:from-amber-300 hover:to-amber-500 transition-all shadow-lg shadow-amber-900/20 hover:shadow-amber-500/20 active:scale-95"
            >
              Book Table
            </a>

            {/* Mobile menu hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-400 hover:text-white"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-950/95 border-b border-amber-900/30 px-6 py-4 flex flex-col gap-4 text-sm font-medium tracking-wider uppercase">
            <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="py-2 text-stone-300 hover:text-amber-400">Curated Menu</a>
            <a href="#story" onClick={() => setMobileMenuOpen(false)} className="py-2 text-stone-300 hover:text-amber-400">The Philosophy</a>
            <a href="#reserve" onClick={() => setMobileMenuOpen(false)} className="py-2 text-stone-300 hover:text-amber-400">Reservations</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="py-2 text-stone-300 hover:text-amber-400">Accolades</a>
            <a href="#location" onClick={() => setMobileMenuOpen(false)} className="py-2 text-stone-300 hover:text-amber-400">Hours & Valet</a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Two Michelin Stars 2025 • Relais & Châteaux
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight text-stone-100 leading-[1.1]">
              Savor the art of <br />
              <span className="font-italic italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                unrivaled culinary
              </span> excellence.
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-stone-400 text-base sm:text-lg font-light leading-relaxed">
              Immerse yourself in sensory gastronomy where time-honored artisanal traditions intertwine with avant-garde technique and rare harvest botanicals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a 
                href="#reserve" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 hover:brightness-110 shadow-xl shadow-amber-900/30 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                Reserve Private Table
              </a>
              <a 
                href="#menu" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium border border-amber-500/30 text-amber-200 hover:bg-amber-950/30 transition-all hover:border-amber-400/60"
              >
                Explore Tasting Menu
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 border-t border-stone-800/80 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <p className="text-2xl font-serif text-amber-300">45-Day</p>
                <p className="text-xs text-stone-500 uppercase tracking-wider mt-0.5">Dry Salt Aged Wagyu</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-amber-300">950+</p>
                <p className="text-xs text-stone-500 uppercase tracking-wider mt-0.5">Vintage Cellar Labels</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-amber-300">100%</p>
                <p className="text-xs text-stone-500 uppercase tracking-wider mt-0.5">Organic Farm Foraged</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-600 to-amber-400/20 rounded-3xl blur-2xl opacity-40 animate-pulse"></div>

              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-stone-950/80 p-3 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80" 
                  alt="Aura Signature Dish"
                  className="w-full h-[430px] object-cover rounded-2xl brightness-95 hover:scale-105 transition-transform duration-700" 
                />

                {/* Floating highlight badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-stone-950/85 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-amber-400 font-semibold block">Tonight's Tasting Highlight</span>
                    <h4 className="text-white font-serif text-base font-medium">A5 Miyazaki Beef Carpaccio</h4>
                    <span className="text-xs text-stone-400">$42 • Shaved Black Périgord Truffle</span>
                  </div>
                  <button 
                    onClick={() => addToCart(MENU_ITEMS[1])}
                    className="p-3 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl font-medium transition-all shadow-md active:scale-95"
                    title="Quick Add"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE MENU SECTION */}
      <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-amber-950/30 bg-[#0a0a0d]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400/90 font-medium">Seasonal Tasting Experience</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-100">
              Gastronomic <span className="italic font-serif text-amber-300">Creations</span>
            </h2>
            <p className="text-stone-400 text-sm sm:text-base font-light">
              Crafted meticulously by Executive Chef Alexandre Duval with hyper-local sustainable purveyors.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-amber-500 text-stone-950 shadow-lg shadow-amber-900/30 font-semibold"
                    : "bg-stone-900/70 text-stone-400 hover:text-stone-200 border border-stone-800/80 hover:border-amber-600/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className="group rounded-2xl bg-stone-950/60 border border-stone-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-amber-950/20"
              >
                {/* Item Image */}
                <div className="relative h-60 w-full overflow-hidden bg-stone-900">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Price Tag badge */}
                  <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-stone-950/85 backdrop-blur-md border border-amber-500/40 text-amber-300 text-sm font-serif font-bold">
                    ${item.price}
                  </div>

                  {/* Rating / Cook time */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-2 text-[11px] text-amber-200/90 font-medium">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {item.rating}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-stone-300">
                      {item.prepTime}
                    </span>
                  </div>
                </div>

                {/* Item Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-amber-950/50 border border-amber-600/30 text-amber-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-serif font-medium text-stone-100 group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    
                    <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-stone-800/60 flex items-center justify-between gap-3">
                    <button 
                      onClick={() => setQuickViewItem(item)}
                      className="text-xs uppercase tracking-wider text-stone-400 hover:text-amber-300 font-medium transition-colors"
                    >
                      Quick Notes
                    </button>
                    
                    <button 
                      onClick={() => addToCart(item)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold bg-stone-900 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-black transition-all active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add to Tasting
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chef's Note callout */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-amber-950/20 via-stone-900 to-amber-950/20 border border-amber-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Wine className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-serif text-stone-200">Wine Pairing Experience Available</h4>
                <p className="text-stone-400 text-xs sm:text-sm">Sommelier curated Grand Cru vintage pairings for each individual tasting flight.</p>
              </div>
            </div>
            <a 
              href="#reserve" 
              className="px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 whitespace-nowrap transition-colors"
            >
              Inquire With Sommelier
            </a>
          </div>

        </div>
      </section>

      {/* CHEF'S STORY / PHILOSOPHY SECTION */}
      <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-[#0a0a0d] to-[#08080a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80" 
                alt="Executive Chef Alexandre Duval"
                className="w-full h-[520px] object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">Master Culinary Artist</span>
                <h3 className="text-2xl font-serif text-white">Alexandre Duval</h3>
                <p className="text-xs text-stone-400">Former Head Chef at L’Ambroisie & Le Bernardin alumnus</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400/90 font-medium">The Philosophy</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-100 leading-tight">
              Honoring Nature, <br />
              <span className="italic font-serif text-amber-300">Elevating Emotion</span>
            </h2>

            <p className="text-stone-300 font-light leading-relaxed">
              "We believe dining is not merely sustenance, but an introspective theatrical performance. Every herb is snipped at sunrise; our seafood is flown fresh within hours from artisanal divers in Hokkaido and Brittany."
            </p>

            <blockquote className="p-4 border-l-2 border-amber-400 bg-amber-950/20 rounded-r-xl italic text-amber-200/90 text-sm font-serif">
              "Every plate is designed as a sensory canvas—balancing thermal contrast, botanical aromas, and visceral textures."
            </blockquote>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/40">
                <Flame className="w-5 h-5 text-amber-400 mb-2" />
                <h5 className="font-serif text-stone-200 text-sm">Binchotan Grilling</h5>
                <p className="text-xs text-stone-400 mt-1">High-heat Kishu charcoal seals natural succulence instantly.</p>
              </div>

              <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/40">
                <Sparkles className="w-5 h-5 text-amber-400 mb-2" />
                <h5 className="font-serif text-stone-200 text-sm">Biodynamic Sourcing</h5>
                <p className="text-xs text-stone-400 mt-1">Direct contracts with regenerative micro-farms within 50 miles.</p>
              </div>
            </div>

            <div className="pt-2">
              <div className="font-serif text-2xl italic text-amber-400 tracking-wider">
                Alexandre Duval
              </div>
              <span className="text-[11px] uppercase tracking-widest text-stone-500">Executive Chef & Co-Founder</span>
            </div>
          </div>

        </div>
      </section>

      {/* TABLE RESERVATION SECTION */}
      <section id="reserve" className="py-24 px-4 sm:px-6 lg:px-8 border-y border-amber-950/40 bg-[#070709] relative">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">Secured Dining Seating</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-100">
              Table <span className="italic font-serif text-amber-300">Reservations</span>
            </h2>
            <p className="text-stone-400 text-sm max-w-lg mx-auto">
              We welcome private intimate dinners, sommelier tastings, and grand celebratory parties.
            </p>
          </div>

          <div className="rounded-3xl border border-amber-500/30 bg-stone-950/80 backdrop-blur-xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Utensils className="w-36 h-36 text-amber-400" />
            </div>

            <form onSubmit={handleReservation} className="space-y-6 relative z-10">
              
              <div className="grid sm:grid-cols-3 gap-5">
                {/* Date */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-amber-300 font-medium flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> Date
                  </label>
                  <input 
                    type="date" 
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 focus:outline-none focus:border-amber-400 text-sm"
                  />
                </div>

                {/* Time Slot */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-amber-300 font-medium flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> Seating Time
                  </label>
                  <select 
                    value={resTime} 
                    onChange={(e) => setResTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 focus:outline-none focus:border-amber-400 text-sm"
                  >
                    <option value="17:30">5:30 PM (Twilight Service)</option>
                    <option value="18:30">6:30 PM (Main Tasting)</option>
                    <option value="19:30">7:30 PM (Prime Experience)</option>
                    <option value="20:45">8:45 PM (Late Symphony)</option>
                    <option value="21:45">9:45 PM (Afterglow Dining)</option>
                  </select>
                </div>

                {/* Party Size */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-amber-300 font-medium flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" /> Guests
                  </label>
                  <div className="flex items-center border border-stone-800 rounded-xl bg-stone-900 px-3 py-1.5">
                    <button 
                      type="button" 
                      onClick={() => setResGuests(Math.max(1, resGuests - 1))}
                      className="p-1.5 text-stone-400 hover:text-amber-400 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="flex-1 text-center font-serif text-amber-300 text-base">
                      {resGuests} {resGuests === 1 ? 'Guest' : 'Guests'}
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setResGuests(Math.min(12, resGuests + 1))}
                      className="p-1.5 text-stone-400 hover:text-amber-400 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-stone-400">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Lord / Lady / Mr. John Doe"
                    required
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-400 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-stone-400">Direct Email</label>
                  <input 
                    type="email" 
                    placeholder="guest@exclusive.com"
                    required
                    value={resEmail}
                    onChange={(e) => setResEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-400 text-sm"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-stone-400">Dietary Preferences or Milestone Notes</label>
                <textarea 
                  rows={3}
                  value={resNotes}
                  onChange={(e) => setResNotes(e.target.value)}
                  placeholder="E.g., Anniversary celebration, severe shellfish allergy, preferred quiet alcove table..."
                  className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-400 text-sm resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button 
                type="submit"
                className="w-full py-4 rounded-xl text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 hover:brightness-110 shadow-lg shadow-amber-900/30 transition-all active:scale-[0.99]"
              >
                Confirm Table Reservation
              </button>

              <div className="flex items-center justify-center gap-6 text-[11px] text-stone-500 uppercase tracking-wider">
                <span>• Instant Confirmation SMS</span>
                <span>• Complimentary Valet</span>
                <span>• Smart Casual / Elegant Attire</span>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* CRITICS & TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0d]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400/90 font-medium">Critical Praise</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-100">
              Celebrated by <span className="italic font-serif text-amber-300">Connoisseurs</span>
            </h2>
            <p className="text-stone-400 text-sm font-light">
              Reflections from esteemed international food critics and distinguished patrons.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-stone-800/80 bg-stone-950/70 p-8 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 relative group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium">
                      {t.tag}
                    </span>
                    <div className="flex text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-stone-300 text-sm font-serif italic leading-relaxed pt-2">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-900 mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-800 border border-amber-500/30 flex items-center justify-center font-serif text-amber-300 font-semibold">
                    {t.author[0]}
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-stone-200">{t.author}</h5>
                    <span className="text-xs text-stone-500">{t.source}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LOCATION, VALET & HOURS */}
      <section id="location" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-stone-900 bg-[#08080a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">Find Aura</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-stone-100 font-light">
                Location & <span className="italic font-serif text-amber-300">Visiting Hours</span>
              </h2>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                Nestled along the private historical waterfront promenade, offering discreet private entrances and dedicated concierge service.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-stone-800 bg-stone-900/40">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-stone-200 font-medium text-sm">Estate Address</h4>
                  <p className="text-stone-400 text-xs mt-0.5">482 Promenade Des Étoiles, Waterfront Quarter, New York, NY 10014</p>
                  <span className="text-[11px] text-amber-400/80 mt-1 block">Private Valet Portico on West Dock</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-stone-800 bg-stone-900/40">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-stone-200 font-medium text-sm">Dining Hours</h4>
                  <p className="text-stone-400 text-xs mt-0.5">Tuesday – Thursday: 5:00 PM – 11:00 PM</p>
                  <p className="text-stone-400 text-xs">Friday – Sunday: 5:00 PM – 12:30 AM</p>
                  <p className="text-stone-500 text-xs mt-1">Monday: Closed for culinary development & foraging</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-stone-800 bg-stone-900/40">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-stone-200 font-medium text-sm">Direct Concierge</h4>
                  <p className="text-stone-400 text-xs mt-0.5">+1 (212) 555-8940 • concierge@aurasavoria.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Simulated Aesthetic Map View */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-stone-900 shadow-2xl">
              
              {/* Live Interactive Dark-styled Map Embed */}
              <div className="relative w-full h-[320px] sm:h-[360px] overflow-hidden">
                <iframe
                  title="Aura Restaurant Location"
                  className="w-full h-full filter invert-[92%] hue-rotate-180 contrast-[1.15] brightness-[0.8] opacity-80"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?q=Pier+24+Hudson+River+Park+New+York&t=&z=15&ie=UTF8&iwloc=&output=embed"
                />
                
                {/* Floating Map Overlay Badge */}
                <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md border border-amber-500/40 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-medium tracking-wide text-amber-300">Live Waterfront Coordinates</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 bg-[#0c0c10] border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h4 className="text-stone-100 font-serif text-base">Pier 24 Waterfront Pavilion</h4>
                  <p className="text-stone-400 text-xs">Private dock entrance & Valet staging</p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={copyAddressToClipboard}
                    className="px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold border border-stone-700 hover:border-amber-500/50 text-stone-300 hover:text-white transition-all bg-stone-900/60"
                  >
                    {copiedAddress ? "Copied!" : "Copy Address"}
                  </button>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Hudson+River+Park+Pier+24+New+York"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950 hover:brightness-110 shadow-lg shadow-amber-900/30 transition-all inline-flex items-center gap-1.5 active:scale-95"
                  >
                    Launch GPS Navigation
                    <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-900 bg-stone-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-serif tracking-widest text-stone-300 uppercase">Aura & Savoria Gastronomie</span>
            <span>• © 2026 Portfolio Demonstration</span>
          </div>

          <div className="flex items-center gap-6 tracking-wider uppercase text-[11px]">
            <a href="#menu" className="hover:text-amber-400 transition-colors">Menu</a>
            <a href="#reserve" className="hover:text-amber-400 transition-colors">Booking</a>
            <a href="#story" className="hover:text-amber-400 transition-colors">Philosophy</a>
            <a href="#location" className="hover:text-amber-400 transition-colors">Location</a>
          </div>
        </div>
      </footer>

      {/* FLOATING CART / TASTING ORDER DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#0d0d11] border-l border-amber-900/30 p-6 flex flex-col justify-between shadow-2xl">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h3 className="font-serif text-lg text-stone-100 font-medium">Curated Tasting Order</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-stone-400 hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 divide-y divide-stone-900">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-stone-500 py-12">
                    <Utensils className="w-12 h-12 stroke-[1.5] text-stone-600" />
                    <p className="text-sm">Your tasting tray is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="px-4 py-2 rounded-full border border-amber-500/30 text-amber-400 text-xs uppercase tracking-wider hover:bg-amber-950/20"
                    >
                      Browse Offerings
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="pt-4 flex items-center justify-between gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-stone-800"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-stone-200 truncate">{item.name}</h4>
                        <span className="text-xs text-amber-400 font-serif">${item.price} each</span>
                        <div className="flex items-center gap-3 mt-1.5">
                          <button 
                            onClick={() => updateCartQty(item.id, -1)}
                            className="p-1 rounded bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold text-stone-200">{item.qty}</span>
                          <button 
                            onClick={() => updateCartQty(item.id, 1)}
                            className="p-1 rounded bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-sm font-medium text-stone-100">
                          ${item.price * item.qty}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Summary */}
              {cart.length > 0 && (
                <div className="border-t border-stone-800 pt-4 space-y-3">
                  <div className="flex justify-between text-xs text-stone-400">
                    <span>Course Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-400">
                    <span>Culinary Tax & Gratuity (9%)</span>
                    <span>${cartTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif text-stone-100 border-t border-stone-900 pt-2 font-medium">
                    <span>Total Experience</span>
                    <span className="text-amber-400">${cartTotal.toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full mt-2 py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950 hover:brightness-110 shadow-lg shadow-amber-900/30 transition-all active:scale-[0.99]"
                  >
                    Simulate Table Order (${cartTotal.toFixed(2)})
                  </button>
                  <p className="text-[10px] text-center text-stone-500">Demo orders sent straight to the chef's expo station</p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* QUICK VIEW DISH MODAL */}
      {quickViewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-stone-950 border border-amber-500/40 p-6 sm:p-8 shadow-2xl">
            <button 
              onClick={() => setQuickViewItem(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <img 
                src={quickViewItem.image} 
                alt={quickViewItem.name} 
                className="w-full h-56 object-cover rounded-2xl border border-stone-800"
              />
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-serif text-stone-100">{quickViewItem.name}</h3>
                  <div className="flex gap-2 mt-1">
                    {quickViewItem.tags.map(t => (
                      <span key={t} className="text-[10px] uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-500/20 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-2xl font-serif text-amber-400 font-bold">${quickViewItem.price}</span>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed font-light">
                {quickViewItem.description}
              </p>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-stone-800 text-xs">
                <div>
                  <span className="text-stone-500 block uppercase">Caloric Profile</span>
                  <span className="text-stone-300 font-medium">{quickViewItem.calories}</span>
                </div>
                <div>
                  <span className="text-stone-500 block uppercase">Preparation Time</span>
                  <span className="text-stone-300 font-medium">{quickViewItem.prepTime}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => {
                    addToCart(quickViewItem);
                    setQuickViewItem(null);
                  }}
                  className="flex-1 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors"
                >
                  Add To Tasting Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESERVATION SUCCESS CONFIRMATION MODAL */}
      {resConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-stone-950 border border-amber-500/40 p-8 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 text-amber-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-serif text-stone-100">Table Confirmed</h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              Honored guest <strong className="text-amber-300">{resName}</strong>, your table for <strong className="text-amber-300">{resGuests}</strong> is reserved on <strong className="text-stone-100">{resDate}</strong> at <strong className="text-stone-100">{resTime}</strong>.
            </p>

            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-400 space-y-1">
              <p>Confirmation email delivered to: {resEmail}</p>
              <p className="text-amber-400/90 font-medium">VIP Valet Parking Included</p>
            </div>

            <button 
              onClick={() => {
                setResConfirmed(false);
                setResName("");
                setResEmail("");
                setResNotes("");
              }}
              className="w-full py-3 rounded-xl text-xs uppercase tracking-widest font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors"
            >
              Return To Experience
            </button>
          </div>
        </div>
      )}

      {/* ORDER SIMULATION SUCCESS MODAL */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-stone-950 border border-amber-500/40 p-8 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-serif text-stone-100">Order Placed to Kitchen</h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              Chef Alexandre and his brigade have received your course selection. Course pacing will sync seamlessly with your wine pairings.
            </p>

            <button 
              onClick={() => {
                setOrderConfirmed(false);
                setIsCartOpen(false);
              }}
              className="w-full py-3 rounded-xl text-xs uppercase tracking-widest font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}