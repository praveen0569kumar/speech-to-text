import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Dictaphone from './Dictaphone';
import Readonly from './components/Readonly';

function App() {
  return (
    <div className="App">
      <nav
  style={{
    backgroundColor: "#333", // Dark background
    padding: "10px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
  }}
>
  {/* Navigation Links */}
  
  |
  <Link
    to="/dictaphone"
    style={{
      color: "#fff",
      textDecoration: "none",
      margin: "0 10px",
      fontSize: "16px",
      fontWeight: "bold",
      padding: "8px 12px",
      borderRadius: "5px",
      transition: "background-color 0.3s ease",
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = "#555")}
    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
  >
    Dictaphone
  </Link>
  |
  <Link
    to="/readonly"
    style={{
      color: "#fff",
      textDecoration: "none",
      margin: "0 10px",
      fontSize: "16px",
      fontWeight: "bold",
      padding: "8px 12px",
      borderRadius: "5px",
      transition: "background-color 0.3s ease",
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = "#555")}
    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
  >
    Readonly
  </Link>
</nav>


      {/* Define Routes */}
      <Routes>
        <Route path="/speech-to-text" element={<Dictaphone />} />
        <Route path="/dictaphone" element={<Dictaphone />} />
        <Route path="/readonly" element={<Readonly />} />
      </Routes>
    </div>
  );
}

export default App;
