import React, { useState } from "react";
import {
  Sprout, Upload, MapPin, Package, IndianRupee, Tag, FileText,
  Plus, Pencil, Trash2, Eye, EyeOff, LayoutGrid, ShoppingBag,
  BarChart3, LogOut, Bell, Menu, X
} from "lucide-react";

const CATEGORIES = ["Vegetables", "Fruits", "Grains", "Pulses", "Dairy", "Spices"];

function Sidebar({ active, setActive }) {
  const [open, setOpen] = useState(false);
  const items = [
    { key: "add", label: "Add Product", icon: Plus },
    { key: "products", label: "My Products", icon: LayoutGrid },
    { key: "orders", label: "Orders", icon: ShoppingBag },
    { key: "earnings", label: "Earnings", icon: BarChart3 },
  ];
  return (
    <>
      <div className="lg:hidden flex items-center justify-between bg-emerald-800 text-white px-5 h-16">
        <div className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-lime-300" />
          <span className="font-extrabold">Kisan2Consumer</span>
        </div>
        <button onClick={() => setOpen(!open)}>{open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
      </div>
      <aside className={`${open ? "block" : "hidden"} lg:block bg-emerald-900 text-emerald-100 w-full lg:w-64 lg:min-h-screen shrink-0`}>
        <div className="hidden lg:flex items-center gap-2 px-6 h-16 border-b border-emerald-800">
          <Sprout className="w-6 h-6 text-lime-300" />
          <span className="font-extrabold text-white text-lg">Kisan2Consumer</span>
        </div>
        <div className="px-4 py-5 border-b border-emerald-800">
          <p className="text-xs text-emerald-400 uppercase font-bold tracking-wide">Logged in as</p>
          <p className="font-bold text-white mt-1">Raj Kumar</p>
          <p className="text-xs text-emerald-300">Farmer · Gorakhpur</p>
        </div>
        <nav className="p-3 space-y-1">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => { setActive(it.key); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors
                ${active === it.key ? "bg-emerald-700 text-white" : "text-emerald-200 hover:bg-emerald-800"}`}
            >
              <it.icon className="w-4 h-4" /> {it.label}
            </button>
          ))}
        </nav>
        <div className="p-3 mt-auto border-t border-emerald-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-emerald-300 hover:bg-emerald-800">
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </aside>
    </>
  );
}

function TopBar({ title }) {
  return (
    <div className="hidden lg:flex items-center justify-between h-16 px-8 border-b border-emerald-100 bg-white">
      <h1 className="font-extrabold text-emerald-950 text-lg">{title}</h1>
      <button className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center relative">
        <Bell className="w-4.5 h-4.5 text-emerald-700" />
        <span className="absolute top-2 right-2.5 w-2 h-2 bg-amber-500 rounded-full" />
      </button>
    </div>
  );
}

function AddProductForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "", category: CATEGORIES[0], quantity: "", unit: "kg",
    price: "", location: "", description: "",
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price || !form.quantity) return;
    onAdd(form);
    setForm({ name: "", category: CATEGORIES[0], quantity: "", unit: "kg", price: "", location: "", description: "" });
  }

  return (
    <div className="p-5 md:p-8 max-w-2xl">
      <p className="text-emerald-900/50 text-sm mb-6">List a new product for consumers to discover and order.</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-emerald-100 p-6 space-y-5">
        <div className="border-2 border-dashed border-emerald-200 rounded-xl p-8 text-center bg-emerald-50/40 cursor-pointer hover:bg-emerald-50 transition-colors">
          <Upload className="w-7 h-7 text-emerald-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-emerald-700">Upload product photo</p>
          <p className="text-xs text-emerald-500/60 mt-1">PNG or JPG, up to 5MB</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1.5"><Tag className="w-3.5 h-3.5" /> Product Name</label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Tomatoes"
              className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1.5"><Package className="w-3.5 h-3.5" /> Category</label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-emerald-800 mb-1.5 block">Quantity</label>
            <input
              value={form.quantity}
              onChange={(e) => update("quantity", e.target.value)}
              placeholder="100"
              type="number"
              className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-emerald-800 mb-1.5 block">Unit</label>
            <select
              value={form.unit}
              onChange={(e) => update("unit", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
            >
              {["kg", "quintal", "dozen", "litre"].map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1.5"><IndianRupee className="w-3.5 h-3.5" /> Price/Unit</label>
            <input
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              placeholder="30"
              type="number"
              className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1.5"><MapPin className="w-3.5 h-3.5" /> Location</label>
          <input
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="e.g. Gorakhpur, UP"
            className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1.5"><FileText className="w-3.5 h-3.5" /> Description (optional)</label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Freshly harvested, pesticide-free..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity">
          Publish Product
        </button>
      </form>
    </div>
  );
}

function MyProducts({ products, onToggle, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="p-5 md:p-8">
        <div className="bg-emerald-50/60 border-2 border-dashed border-emerald-200 rounded-2xl p-14 text-center">
          <Package className="w-10 h-10 text-emerald-300 mx-auto mb-3" />
          <p className="font-bold text-emerald-800">No products listed yet</p>
          <p className="text-emerald-600/60 text-sm mt-1">Add your first product to start selling.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8">
      <p className="text-emerald-900/50 text-sm mb-6">{products.length} product{products.length > 1 ? "s" : ""} listed</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p, i) => (
          <div key={i} className="bg-white rounded-2xl border border-emerald-100 overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-emerald-100 to-lime-100 flex items-center justify-center">
              <Sprout className="w-9 h-9 text-emerald-400" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-emerald-950">{p.name}</p>
                  <p className="text-xs text-emerald-600/60">{p.category}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${p.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                  {p.active ? "Active" : "Hidden"}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="font-mono font-extrabold text-emerald-800">₹{p.price}/{p.unit}</p>
                <p className="text-xs text-emerald-500/70">{p.quantity} {p.unit} left</p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button onClick={() => onToggle(i)} className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 py-2 rounded-lg hover:bg-emerald-100 transition-colors">
                  {p.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />} {p.active ? "Hide" : "Show"}
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => onDelete(i)} className="text-rose-500 bg-rose-50 p-2 rounded-lg hover:bg-rose-100 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FarmerDashboard() {
  const [active, setActive] = useState("add");
  const [products, setProducts] = useState([
    { name: "Tomatoes", category: "Vegetables", quantity: 100, unit: "kg", price: 30, active: true },
    { name: "Basmati Rice", category: "Grains", quantity: 250, unit: "kg", price: 65, active: true },
  ]);

  function addProduct(form) {
    setProducts((prev) => [...prev, { ...form, active: true }]);
    setActive("products");
  }

  function toggleActive(index) {
    setProducts((prev) => prev.map((p, i) => (i === index ? { ...p, active: !p.active } : p)));
  }

  function deleteProduct(index) {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  }

  const titles = { add: "Add Product", products: "My Products", orders: "Orders", earnings: "Earnings" };

  return (
    <div className="min-h-screen bg-emerald-50/30 flex flex-col lg:flex-row">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1">
        <TopBar title={titles[active]} />
        {active === "add" && <AddProductForm onAdd={addProduct} />}
        {active === "products" && <MyProducts products={products} onToggle={toggleActive} onDelete={deleteProduct} />}
        {active === "orders" && (
          <div className="p-8 text-center text-emerald-600/50 text-sm">Orders will appear here once consumers start placing them (connects to backend).</div>
        )}
        {active === "earnings" && (
          <div className="p-8 text-center text-emerald-600/50 text-sm">Earnings summary will appear here once orders are completed (connects to backend).</div>
        )}
      </div>
    </div>
  );
}