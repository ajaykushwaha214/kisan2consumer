import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sprout, Users, TrendingUp, ShieldCheck, MapPin, Star, Menu, X,
  ArrowRight, ShoppingBasket, Handshake, BarChart3, Leaf
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const links = ["How it Works", "For Farmers", "For Consumers", "Impact"];
  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-emerald-100">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-500 flex items-center justify-center">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-emerald-900 text-lg tracking-tight">Kisan2Consumer</span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-emerald-800/60">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "-")}`} className="hover:text-emerald-700 transition-colors">{l}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button type="button" onClick={() => navigate("/login")} className="text-emerald-800 font-semibold text-sm px-4 py-2.5">Sign In</button>
          <button type="button" onClick={() => navigate("/login")} className="bg-gradient-to-r from-emerald-600 to-lime-500 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-shadow">
            Get Started
          </button>
        </div>
        <button className="md:hidden text-emerald-900" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-emerald-100 px-5 py-4 flex flex-col gap-4 text-emerald-800 font-semibold">
          {links.map((l) => <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "-")}`}>{l}</a>)}
          <button type="button" onClick={() => navigate("/login")} className="bg-gradient-to-r from-emerald-600 to-lime-500 text-white text-sm font-bold px-5 py-2.5 rounded-full mt-1">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-lime-600">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-lime-400/25 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl" />
      <Leaf className="absolute -right-8 bottom-0 w-[380px] h-[380px] text-white/[0.06] rotate-[-10deg] pointer-events-none hidden lg:block" strokeWidth={1} />

      <div className="relative max-w-6xl mx-auto px-5 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-white">
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full mb-6">
            <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> Direct Farmer-to-Consumer Marketplace
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            From farm gate to
            <span className="block text-amber-300">your table — directly.</span>
          </h1>
          <p className="text-emerald-100 mt-5 text-base md:text-lg leading-relaxed max-w-md">
            Kisan2Consumer connects farmers straight to buyers — fewer
            middlemen, fairer prices, and fresher produce for everyone.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <button type="button" onClick={() => navigate("/farmer")} className="bg-amber-400 text-emerald-900 font-bold px-6 py-3.5 rounded-full flex items-center gap-2 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/30">
              Sell as a Farmer <ArrowRight className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => navigate("/consumer")} className="bg-white/10 backdrop-blur-sm text-white font-bold px-6 py-3.5 rounded-full border border-white/25 hover:bg-white/20 transition-colors">
              Shop as a Consumer
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6">
          <p className="text-xs font-bold text-emerald-700/60 uppercase tracking-wide mb-4">Fresh near you</p>
          <div className="space-y-3">
            {[
              { name: "Tomatoes", farmer: "Raj Kumar · Gorakhpur", price: "₹30/kg", tag: "2.4 km" },
              { name: "Basmati Rice", farmer: "Meena Devi · Bareilly", price: "₹65/kg", tag: "5.1 km" },
              { name: "Organic Wheat", farmer: "Suresh Yadav · Kanpur", price: "₹28/kg", tag: "3.8 km" },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between bg-emerald-50/60 rounded-2xl p-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-lime-400 flex items-center justify-center">
                    <ShoppingBasket className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-900 text-sm">{p.name}</p>
                    <p className="text-emerald-700/50 text-[11px]">{p.farmer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-extrabold text-emerald-800 text-sm">{p.price}</p>
                  <p className="text-[10px] text-emerald-600/60 flex items-center gap-0.5 justify-end"><MapPin className="w-2.5 h-2.5" />{p.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "0%→", label: "Unnecessary middlemen" },
    { value: "Direct", label: "Farmer-to-consumer link" },
    { value: "Live", label: "Price transparency" },
    { value: "Local", label: "Fresh produce discovery" },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-5 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-lime-600 bg-clip-text text-transparent">
              {s.value}
            </p>
            <p className="text-xs md:text-sm text-emerald-900/50 font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Sprout, title: "Farmer lists produce", desc: "Quantity, price, quality, and location — listed in minutes." },
    { icon: Handshake, title: "Consumer discovers & orders", desc: "Search, filter by distance and price, and order directly." },
    { icon: TrendingUp, title: "Fair value, both sides", desc: "Farmers earn more, consumers pay less — no hidden margins." },
  ];
  return (
    <section id="how-it-works" className="bg-emerald-50/50">
      <div className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-emerald-700 font-bold text-sm uppercase tracking-wide">How it works</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-950 mt-2">A shorter path from farm to table</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-7 border border-emerald-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-500 flex items-center justify-center mb-5">
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-emerald-950 text-lg">{s.title}</h3>
              <p className="text-emerald-900/50 text-sm mt-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForFarmersConsumers() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-8">
        <div id="for-farmers" className="bg-gradient-to-br from-emerald-700 to-emerald-600 rounded-3xl p-8 text-white">
          <Sprout className="w-8 h-8 text-lime-300 mb-4" />
          <h3 className="text-2xl font-extrabold mb-3">For Farmers</h3>
          <p className="text-emerald-100 text-sm leading-relaxed mb-5">
            List your produce, set your own price, and reach buyers directly
            — no need to depend on layers of traders.
          </p>
          <ul className="space-y-2 text-sm">
            {["Direct market access", "Greater price transparency", "Digital order records", "Better margins"].map((f) => (
              <li key={f} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-lime-300" />{f}</li>
            ))}
          </ul>
        </div>
        <div id="for-consumers" className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-8 text-white">
          <ShoppingBasket className="w-8 h-8 text-white mb-4" />
          <h3 className="text-2xl font-extrabold mb-3">For Consumers</h3>
          <p className="text-amber-50 text-sm leading-relaxed mb-5">
            Buy fresh, local produce directly from the farmers who grow it
            — know exactly where your food comes from.
          </p>
          <ul className="space-y-2 text-sm">
            {["Competitive prices", "Nearby fresh produce", "Farmer transparency", "Order tracking"].map((f) => (
              <li key={f} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white" />{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Impact() {
  const items = [
    { icon: Users, label: "Farmers & FPOs", desc: "Direct access, no unnecessary layers" },
    { icon: BarChart3, label: "Consumers", desc: "Transparent, competitive pricing" },
    { icon: ShieldCheck, label: "Ecosystem", desc: "Data-driven, efficient supply chain" },
  ];
  return (
    <section id="impact" className="bg-emerald-50/50">
      <div className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-emerald-700 font-bold text-sm uppercase tracking-wide">Impact</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-950 mt-2">Who this helps, and how</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.label} className="bg-white rounded-2xl p-6 border border-emerald-100 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-500 flex items-center justify-center mx-auto mb-4">
                <it.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-emerald-950">{it.label}</h3>
              <p className="text-emerald-900/50 text-sm mt-1">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-br from-emerald-800 to-lime-600">
      <div className="max-w-4xl mx-auto px-5 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Join the direct marketplace</h2>
        <p className="text-emerald-100 mt-3">Whether you grow it or buy it — start today.</p>
        <div className="flex flex-wrap justify-center gap-3 mt-7">
          <button type="button" onClick={() => navigate("/farmer")} className="bg-amber-400 text-emerald-900 font-bold px-8 py-4 rounded-full hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/30">
            Sell as a Farmer
          </button>
          <button type="button" onClick={() => navigate("/consumer")} className="bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full border border-white/25 hover:bg-white/20 transition-colors">
            Shop as a Consumer
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-200/60">
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-600 to-lime-500 flex items-center justify-center">
            <Sprout className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-white text-sm">Kisan2Consumer</span>
        </div>
        <p className="text-xs">A Direct Farmer-to-Consumer Agricultural Marketplace</p>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <ForFarmersConsumers />
      <Impact />
      <CTA />
      <Footer />
    </div>
  );
}