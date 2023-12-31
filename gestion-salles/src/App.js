import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Reservations from "./pages/Reservations";
import Salles from "./pages/Salles";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/salles" element={<Salles />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
