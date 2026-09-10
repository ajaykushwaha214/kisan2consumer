import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sprout, Search, MapPin, Star, ShoppingCart, SlidersHorizontal,
  Bell, User, Menu, X, Plus, Minus
} from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Tomatoes", category: "Vegetables", farmer: "Raj Kumar", location: "Gorakhpur", distance: 2.4, price: 30, unit: "kg", rating: 4.6 },
  { id: 2, name: "Basmati Rice", category: "Grains", farmer: "Meena Devi", location: "Bareilly", distance: 5.1, price: 65, unit: "kg", rating: 4.8 },
  { id: 3, name: "Organic Wheat", category: "Grains", farmer: "Suresh Yadav", location: "Kanpur", distance: 3.8, price: 28, unit: "kg", rating: 4.5 },
  { id: 4, name: "Green Chillies", category: "Vegetables", farmer: "Anita Sharma", location: "Lucknow", distance: 1.9, price: 40, unit: "kg", rating: 4.3 },
  { id: 5, name: "Alphonso Mangoes", category: "Fruits", farmer: "Ramesh Patil", location: "Ratnagiri", distance: 8.2, price: 120, unit: "dozen", rating: 4.9 },
  { id: 6, name: "Toor Dal", category: "Pulses", farmer: "Vikram Singh", location: "Kanpur", distance: 4.0, price: 110, unit: "kg", rating: 4.4 },
];

const CATEGORIES = ["All", "Vegetables", "Fruits", "Grains", "Pulses", "Dairy", "Spices"];

function Header({ cartCount, onCartClick }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-emerald-100">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-500 flex items-center justify-center">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-emerald-900 text-lg tracking-tight hidden sm:block">Kisan2Consumer</span>
        </Link>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center relative">
            <Bell className="w-4.5 h-4.5 text-emerald-700" />
          </button>
          <button onClick={onCartClick} className="relative w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
            <ShoppingCart className="w-4.5 h-4.5 text-emerald-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <User className="w-4.5 h-4.5 text-emerald-700" />
          </div>
        </div>
      </div>
    </header>
  );
}

function SearchAndFilters({ search, setSearch, category, setCategory }) {
  return (
    <div className="bg-gradient-to-br from-emerald-700 to-lime-600 py-8">
      <div className="max-w-6xl mx-auto px-5">
        <h1 className="text-white font-extrabold text-2xl md:text-3xl mb-1">Fresh from local farms</h1>
        <p className="text-emerald-100 text-sm mb-5">Search or filter to find exactly what you need</p>

        <div className="bg-white rounded-2xl p-2 flex items-center gap-2 shadow-lg">
          <Search className="w-4.5 h-4.5 text-emerald-400 ml-2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for tomatoes, rice, mangoes..."
            className="flex-1 py-2 text-sm outline-none text-emerald-950"
          />
        </div>

        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-colors
                ${category === c ? "bg-amber-400 text-emerald-900" : "bg-white/15 text-white hover:bg-white/25"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-36 bg-gradient-to-br from-emerald-100 to-lime-100 flex items-center justify-center">
        <Sprout className="w-10 h-10 text-emerald-400" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-bold text-emerald-950">{product.name}</p>
            <p className="text-xs text-emerald-600/60">{product.farmer}</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {product.rating}
          </div>
        </div>
        <p className="text-xs text-emerald-500/70 flex items-center gap-1 mt-2">
          <MapPin className="w-3 h-3" /> {product.location} · {product.distance} km
        </p>
        <div className="flex items-center justify-between mt-3">
          <p className="font-mono font-extrabold text-emerald-800">₹{product.price}<span className="text-xs font-normal text-emerald-500">/{product.unit}</span></p>
          <button
            onClick={() => onAdd(product)}
            className="bg-emerald-600 text-white text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ cart, onClose, onUpdateQty, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-sm h-full flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-emerald-100">
          <h2 className="font-extrabold text-emerald-950 text-lg">Your Cart</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-emerald-700" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 && (
            <p className="text-emerald-500/60 text-sm text-center mt-10">Your cart is empty. Add some fresh produce!</p>
          )}
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-lime-100 flex items-center justify-center shrink-0">
                <Sprout className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-emerald-950 text-sm">{item.name}</p>
                <p className="text-xs text-emerald-500/70">₹{item.price}/{item.unit}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onUpdateQty(item.id, -1)} className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Minus className="w-3 h-3 text-emerald-700" />
                </button>
                <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                <button onClick={() => onUpdateQty(item.id, 1)} className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Plus className="w-3 h-3 text-emerald-700" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="p-5 border-t border-emerald-100">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-emerald-900">Total</span>
              <span className="font-mono font-extrabold text-emerald-800 text-lg">₹{total}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ConsumerHome() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const filtered = PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function updateQty(id, delta) {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function goToCheckout() {
    navigate("/checkout", { state: { cart } });
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="min-h-screen bg-emerald-50/30">
      <Header cartCount={cartCount} onCartClick={() => setShowCart(true)} />
      <SearchAndFilters search={search} setSearch={setSearch} category={category} setCategory={setCategory} />

      <div className="max-w-6xl mx-auto px-5 py-8">
        <p className="text-emerald-900/50 text-sm mb-4">{filtered.length} products found</p>
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-emerald-200 mx-auto mb-3" />
            <p className="text-emerald-600/60 text-sm">No products match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </div>

      {showCart && (
        <CartDrawer cart={cart} onClose={() => setShowCart(false)} onUpdateQty={updateQty} onCheckout={goToCheckout} />
      )}
    </div>
  );
}