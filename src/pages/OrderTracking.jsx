import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sprout, ArrowLeft, CheckCircle2, Package, Truck, Home, Clock, PartyPopper
} from "lucide-react";

/*
  Order Tracking — pure frontend demo.
  Auto-advances through statuses every few seconds so the demo looks
  "live" during a presentation without needing real backend/GPS data.
  Real build: this reads order.status from the backend and updates
  via polling or WebSockets.
*/

const STEPS = [
  { key: "placed", label: "Order Placed", icon: CheckCircle2, desc: "Your order has been received" },
  { key: "confirmed", label: "Confirmed", icon: Sprout, desc: "Farmer has confirmed your order" },
  { key: "packed", label: "Packed", icon: Package, desc: "Your produce is being packed fresh" },
  { key: "out", label: "Out for Delivery", icon: Truck, desc: "On its way to your address" },
  { key: "delivered", label: "Delivered", icon: Home, desc: "Enjoy your fresh produce!" },
];

export default function OrderTracking() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= STEPS.length - 1) return;
    const timer = setTimeout(() => setCurrent((c) => c + 1), 3000);
    return () => clearTimeout(timer);
  }, [current]);

  const isDelivered = current === STEPS.length - 1;

  return (
    <div className="min-h-screen bg-emerald-50/30">
      <header className="sticky top-0 z-40 bg-white border-b border-emerald-100">
        <div className="max-w-2xl mx-auto px-5 h-16 flex items-center gap-3">
          <Link to="/consumer" className="text-emerald-700"><ArrowLeft className="w-5 h-5" /></Link>
          <span className="font-extrabold text-emerald-950">Track Order</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 py-8">
        <div className="bg-white rounded-2xl border border-emerald-100 p-6 mb-6">
          <p className="text-xs text-emerald-500/70 font-semibold uppercase">Order #K2C-10482</p>
          <div className="flex items-center justify-between mt-2">
            <p className="font-extrabold text-emerald-950 text-lg">
              {isDelivered ? "Delivered successfully" : STEPS[current].desc}
            </p>
            {!isDelivered && (
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5" /> Live
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-100 p-6 md:p-8">
          {STEPS.map((step, i) => {
            const done = i <= current;
            const isLast = i === STEPS.length - 1;
            return (
              <div key={step.key} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500
                      ${done ? "bg-gradient-to-br from-emerald-600 to-lime-500 text-white" : "bg-emerald-50 text-emerald-300"}`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 flex-1 min-h-[2.5rem] transition-colors duration-500 ${i < current ? "bg-emerald-500" : "bg-emerald-100"}`} />
                  )}
                </div>
                <div className={`pb-8 ${isLast ? "pb-0" : ""}`}>
                  <p className={`font-bold text-sm ${done ? "text-emerald-950" : "text-emerald-300"}`}>{step.label}</p>
                  <p className={`text-xs mt-0.5 ${done ? "text-emerald-600/60" : "text-emerald-300"}`}>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {isDelivered && (
          <div className="bg-gradient-to-br from-emerald-700 to-lime-600 rounded-2xl p-6 mt-6 text-center text-white">
            <PartyPopper className="w-8 h-8 text-amber-300 mx-auto mb-2" />
            <p className="font-bold">Thanks for shopping direct from the farm!</p>
            <Link to="/consumer" className="inline-block mt-4 bg-white text-emerald-800 font-bold text-sm px-6 py-2.5 rounded-full">
              Shop Again
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}