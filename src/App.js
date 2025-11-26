import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router} from 'react-router-dom';
import ProductCard from './components/ProductCard';

function App() {
  const testProduct = {
    id: 1,
    title: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 99.99,
    image: "https://imgs.search.brave.com/or4EF-y2KRHsxxeWkGVKdPb2lx7aW0VwbVEx2t3ffHY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMzMw/MzQzMzMvcGV4ZWxz/LXBob3RvLTMzMDM0/MzMzL2ZyZWUtcGhv/dG8tb2YtYmxhY2st/b3Zlci1lYXItd2ly/ZWxlc3MtYmx1ZXRv/b3RoLWhlYWRwaG9u/ZXMuanBlZz9hdXRv/PWNvbXByZXNzJmNz/PXRpbnlzcmdiJmRw/cj0xJnc9NTAw",
    category: "Electronics" 
  }
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <ProductCard product = {testProduct} />
      </div>
    </Router>
  );
}

export default App;
