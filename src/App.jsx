import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import FarmerDashboard from "./pages/FarmerDashboard";
import ConsumerHome from "./pages/ConsumerHome";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import FarmersMap from "./pages/FarmersMap";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/farmer" element={<FarmerDashboard />} />
      <Route path="/consumer" element={<ConsumerHome />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/track" element={<OrderTracking />} />
      <Route path="/map" element={<FarmersMap />} />
    </Routes>
  );
}