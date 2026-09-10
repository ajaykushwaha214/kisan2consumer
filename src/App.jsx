import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import FarmerDashboard from "./pages/FarmerDashboard";
import ConsumerHome from "./pages/ConsumerHome";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/farmer" element={<FarmerDashboard />} />
      <Route path="/consumer" element={<ConsumerHome />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}