import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProductList from './components/ProductList';
import About from './components/About';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="mt-4">
        <Routes>
          <Route path='/' element = {<ProductList />} />
          <Route path='/about' element = {<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
