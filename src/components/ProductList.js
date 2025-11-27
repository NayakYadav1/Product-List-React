import React, { useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import SearchBox from './SearchBox';
import CategoryDropdown from './CategoryDropdown';

const products = [
    {
      id: 1,
      title: "Wireless Headphones",
      description: "High-quality sound with noise cancellation",
      price: 99.99,
      image: "https://via.placeholder.com/300x200?text=Headphones",
      category: "Electronics"
    },
    {
      id: 2,
      title: "Smart Watch",
      description: "Track your fitness and stay connected",
      price: 199.99,
      image: "https://via.placeholder.com/300x200?text=SmartWatch",
      category: "Electronics"
    },
    {
      id: 3,
      title: "USB-C Cable",
      description: "Fast charging and data transfer",
      price: 19.99,
      image: "https://via.placeholder.com/300x200?text=USB-C",
      category: "Accessories"
    },
    {
      id: 4,
      title: "Phone Case",
      description: "Durable protection for your phone",
      price: 29.99,
      image: "https://via.placeholder.com/300x200?text=PhoneCase",
      category: "Accessories"
    },
    {
      id: 5,
      title: "Portable Charger",
      description: "20000mAh power bank",
      price: 39.99,
      image: "https://via.placeholder.com/300x200?text=Charger",
      category: "Electronics"
    },
    {
      id: 6,
      title: "Screen Protector",
      description: "Tempered glass for all phones",
      price: 9.99,
      image: "https://via.placeholder.com/300x200?text=ScreenProtector",
      category: "Accessories"
    }
  ]

export default function ProductList() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return Array.from(set);
  }, []);

  const filtered = products.filter(p => {
    const matchesQuery =
      query === '' ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === '' || p.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="container my-5">
      <h1 className="mb-4">Our Products</h1>

      <div className="d-flex mb-3">
        <SearchBox value={query} onChange={setQuery} />
        <CategoryDropdown categories={categories} value={category} onChange={setCategory} />
      </div>
      
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
    </div>
  )
}