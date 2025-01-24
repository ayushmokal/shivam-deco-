import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import GalleryPage from "./pages/Gallery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </Router>
  );
}

export default App;