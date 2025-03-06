import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/loginpage';   // Assure-toi que ce fichier existe
import Success from './Pages/successpage'; // Assure-toi que ce fichier existe

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to React Router</h1>
        </header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
