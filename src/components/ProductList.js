import React from 'react'
import ProductCard from './ProductCard'

export default function ProductList() {
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

  return (
    <div className="container my-5">
      <h1 className="mb-4">Our Products</h1>
      
      <div className="row">
        {products.map((product) => (
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