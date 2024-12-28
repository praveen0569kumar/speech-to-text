import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Dictaphone from './Dictaphone';
import Readonly from './components/Readonly';

function App() {
  return (
    <div className="App">
      <nav>
        {/* Navigation Links */}
        <Link to="/">Home</Link> | <Link to="/dictaphone">Dictaphone</Link> |{' '}
        <Link to="/readonly">Readonly</Link>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
        <Route path="/dictaphone" element={<Dictaphone />} />
        <Route path="/readonly" element={<Readonly />} />
      </Routes>
    </div>
  );
}

export default App;
