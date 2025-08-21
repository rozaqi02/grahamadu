import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#f5deb3" }}>
      <h2>GRAHA MADU</h2>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li><Link to="/">Beranda</Link></li>
        <li><Link to="/produk">Produk</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/tentang">Tentang</Link></li>
        <li><Link to="/kontak">Kontak</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
