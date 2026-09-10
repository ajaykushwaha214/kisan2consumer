import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sprout, ArrowLeft, MapPin, CreditCard, Wallet, CheckCircle2,
  Truck, Sparkles
} from "lucide-react";

/*
  Checkout Page
  -----------------
  Reads cart items passed via navigation state (from ConsumerHome).
  If someone lands here directly with no cart data, we show a friendly
  empty state instead of breaking.

  New concept: useLocation() reads data passed between pages via
  navigate(path, { state: {...} }) — this is how we'll hand the cart
  over from ConsumerHome without needing global state yet.
*/

function OrderPlaced() {
  return (
    <div className="min-h-screen bg-emerald-50/30 flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl p-10 text-center max-w-sm shadow-lg">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-extrabold text-emerald-950 mb-2">Order Placed!</h2>
        <p className="text-emerald-600/60 text-sm mb-7">
          Your order has been sent to the farmers. You'll be notified once it's confirmed.
        </p>
        <Link to="/track" className="block w-full bg-emerald-100 text-emerald-800 font-bold py-3.5 rounded-xl hover:bg-emerald-200 transition-colors mb-3">
              Track Order
               </Link>
              <Link to="/consumer" className="block w-full bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity">
                   Continue Shopping
             </Link>
      </div>
    </div>
  );
}

export default function Checkout() {
  const location = useLocation();
  const [payment, setPayment] = useState("upi");
  const [placed, setPlaced] = useState(false);
  const [address, setAddress] = useState("");

  // Mock cart for demo purposes — in the real app this comes from
  // ConsumerHome via navigate("/checkout", { state: { cart } }) and
  // useLocation().state.cart
  const cart = location.state?.cart || [];

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = 20;
  const total = subtotal + deliveryFee;

  function handlePlaceOrder(e) {
    e.preventDefault();
    if (!address.trim()) return;
    setPlaced(true);
  }

  if (placed) return <OrderPlaced />;

  return (
    <div className="min-h-screen bg-emerald-50/30">
      <header className="sticky top-0 z-40 bg-white border-b border-emerald-100">
        <div className="max-w-4xl mx-auto px-5 h-16 flex items-center gap-3">
          <Link to="/consumer" className="text-emerald-700"><ArrowLeft className="w-5 h-5" /></Link>
          <span className="font-extrabold text-emerald-950">Checkout</span>
        </div>
      </header>

      <form onSubmit={handlePlaceOrder} className="max-w-4xl mx-auto px-5 py-8 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Delivery address */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-6">
            <h3 className="font-bold text-emerald-950 flex items-center gap-2 mb-4">
              <MapPin className="w-4.5 h-4.5 text-emerald-600" /> Delivery Address
            </h3>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House no, street, city, pincode..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Order items */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-6">
            <h3 className="font-bold text-emerald-950 mb-4">Order Items</h3>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-100 to-lime-100 flex items-center justify-center">
                      <Sprout className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-950 text-sm">{item.name}</p>
                      <p className="text-xs text-emerald-500/70">{item.qty} × ₹{item.price}/{item.unit}</p>
                    </div>
                  </div>
                  <p className="font-mono font-bold text-emerald-800 text-sm">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-6">
            <h3 className="font-bold text-emerald-950 mb-4">Payment Method</h3>
            <div className="space-y-2">
              {[
                { key: "upi", label: "UPI", icon: Sparkles },
                { key: "card", label: "Credit / Debit Card", icon: CreditCard },
                { key: "cod", label: "Cash on Delivery", icon: Wallet },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.key}
                  onClick={() => setPayment(opt.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors
                    ${payment === opt.key ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-emerald-100 text-emerald-700 hover:bg-emerald-50/50"}`}
                >
                  <opt.icon className="w-4.5 h-4.5" /> {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-emerald-100 p-6 h-fit sticky top-24">
          <h3 className="font-bold text-emerald-950 mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-emerald-600/70">
              <span>Subtotal</span><span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-emerald-600/70">
              <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Delivery</span><span>₹{deliveryFee}</span>
            </div>
            <div className="border-t border-emerald-100 pt-2 mt-2 flex justify-between font-extrabold text-emerald-950">
              <span>Total</span><span className="font-mono">₹{total}</span>
            </div>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-bold py-3.5 rounded-xl mt-5 hover:opacity-90 transition-opacity">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}