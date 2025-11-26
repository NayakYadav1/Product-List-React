import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router} from 'react-router-dom';
import ProductCard from './components/ProductCard';
import ProductList from './components/ProductList';

function App() {
  return (
    <Router>
      <Navbar />
      <ProductList />
    </Router>
  );
}

export default App;
