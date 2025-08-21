import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Beranda from "./pages/Beranda";
import Produk from "./pages/Produk";
import FAQ from "./pages/FAQ";
import Tentang from "./pages/Tentang";
import Kontak from "./pages/Kontak";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/kontak" element={<Kontak />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
