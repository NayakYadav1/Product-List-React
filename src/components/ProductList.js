import React, { useMemo, useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import SearchBox from './SearchBox';
import CategoryDropdown from './CategoryDropdown';


export default function ProductList() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  const filtered = products.filter(p => {
    const matchesQuery =
      query === '' ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === '' || p.category === category;
    return matchesQuery && matchesCategory;
  });

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/products?limit=24')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4">Our Products</h1>

      <div className="d-flex mb-3">
        <SearchBox value={query} onChange={setQuery} />
        <CategoryDropdown categories={categories} value={category} onChange={setCategory} />
      </div>
      
      {loading && <div className="text-center my-5"><span className="spinner-border" /> Loading products...</div>}

      {!loading && (
        <div className="row">
          {filtered.map((product) => (
            <div 
              key={product.id} 
              className="col-12 col-md-6 col-lg-3 mb-4 d-flex justify-content-center"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}