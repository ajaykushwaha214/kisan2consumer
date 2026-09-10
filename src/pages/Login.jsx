import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sprout, Mail, Lock, User, MapPin, Tractor, ShoppingBasket } from "lucide-react";

/*
  Shared Login/Signup page for both roles.
  role: "farmer" | "consumer" — decides where "Continue" sends you.
  mode: "signin" | "signup" — toggles form fields shown.
  No real auth yet (backend team will wire this) — this just demos
  the flow and captures the shape of data the backend will need.
*/

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("consumer");
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "", location: "" });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) return;
    navigate(role === "farmer" ? "/farmer" : "/consumer");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-700 to-lime-600 flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <Link to="/" className="flex items-center gap-2 justify-center mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-500 flex items-center justify-center">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-emerald-900 text-lg">Kisan2Consumer</span>
        </Link>

        {/* role toggle */}
        <div className="grid grid-cols-2 gap-2 mb-6 bg-emerald-50 p-1.5 rounded-xl">
          <button
            type="button"
            onClick={() => setRole("farmer")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-colors ${role === "farmer" ? "bg-white text-emerald-800 shadow" : "text-emerald-600/60"}`}
          >
            <Tractor className="w-4 h-4" /> Farmer
          </button>
          <button
            type="button"
            onClick={() => setRole("consumer")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-colors ${role === "consumer" ? "bg-white text-emerald-800 shadow" : "text-emerald-600/60"}`}
          >
            <ShoppingBasket className="w-4 h-4" /> Consumer
          </button>
        </div>

        <h2 className="text-xl font-extrabold text-emerald-950 mb-1">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-emerald-600/60 text-sm mb-6">
          {mode === "signin" ? `Sign in as a ${role}` : `Sign up as a ${role}`}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1.5"><User className="w-3.5 h-3.5" /> Full Name</label>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1.5"><Mail className="w-3.5 h-3.5" /> Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1.5"><Lock className="w-3.5 h-3.5" /> Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-1.5"><MapPin className="w-3.5 h-3.5" /> Location</label>
              <input
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="City, State"
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          )}

          <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-emerald-600/70 mt-6">
          {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-emerald-700 font-bold hover:underline"
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}