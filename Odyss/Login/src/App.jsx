import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/login';


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Router>
         <Routes>
           <Route path="/"element={<Login />}/>
          
         </Routes>
      </Router>
      </header>
    </div>
  )
}

export default App
 