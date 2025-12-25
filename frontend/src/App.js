import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import AddPerfume from "./pages/AddPerfume";
import Collection from "./pages/Collection";
import LearnMore from "./pages/LearnMore";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/add-perfume" element={<AddPerfume />} />
        <Route path="/admin/perfumes" element={<Collection />} />

        <Route path="/collection" element={<Collection />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
