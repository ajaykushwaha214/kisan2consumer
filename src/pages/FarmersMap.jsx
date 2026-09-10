import React from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { ArrowLeft, MapPin, Star } from "lucide-react";

/*
  Nearby Farmers Map — real Leaflet + OpenStreetMap (free, no API key).
  Farmer locations are mock/static coordinates for the demo. Real build:
  backend sends actual farmer lat/lng, fetched via an API call.

  Note: Leaflet's default marker icons reference image files that don't
  bundle correctly with Vite by default, so we build a simple custom
  icon using L.divIcon instead — avoids a common "broken marker" bug.
*/

const FARMERS = [
  { id: 1, name: "Raj Kumar", product: "Tomatoes", price: "₹30/kg", rating: 4.6, lat: 26.7606, lng: 83.3732 },
  { id: 2, name: "Meena Devi", product: "Basmati Rice", price: "₹65/kg", rating: 4.8, lat: 28.3670, lng: 79.4304 },
  { id: 3, name: "Suresh Yadav", product: "Organic Wheat", price: "₹28/kg", rating: 4.5, lat: 26.4499, lng: 80.3319 },
  { id: 4, name: "Anita Sharma", product: "Green Chillies", price: "₹40/kg", rating: 4.3, lat: 26.8467, lng: 80.9462 },
];

const farmerIcon = new L.DivIcon({
  html: `<div style="background:#059669;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
  className: "",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export default function FarmersMap() {
  return (
    <div className="min-h-screen bg-emerald-50/30">
      <header className="sticky top-0 z-40 bg-white border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center gap-3">
          <Link to="/consumer" className="text-emerald-700"><ArrowLeft className="w-5 h-5" /></Link>
          <span className="font-extrabold text-emerald-950">Nearby Farmers</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-emerald-100" style={{ height: "500px" }}>
          <MapContainer center={[26.8, 81.0]} zoom={7} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {FARMERS.map((f) => (
              <Marker key={f.id} position={[f.lat, f.lng]} icon={farmerIcon}>
                <Popup>
                  <p className="font-bold">{f.name}</p>
                  <p className="text-sm">{f.product} · {f.price}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="space-y-3">
          <p className="text-emerald-900/50 text-sm font-semibold">{FARMERS.length} farmers nearby</p>
          {FARMERS.map((f) => (
            <div key={f.id} className="bg-white rounded-xl border border-emerald-100 p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-emerald-950 text-sm">{f.name}</p>
                <p className="text-xs text-emerald-500/70 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> {f.product} · {f.price}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {f.rating}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}