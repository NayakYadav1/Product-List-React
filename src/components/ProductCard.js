import React from 'react'
import {Link} from 'react-router-dom';

export default function ProductCard ({ product}) {
  // Use thumbnail if image doesn't exist (DummyJSON uses 'thumbnail')
  const imageUrl = product.image || product.thumbnail || 'https://via.placeholder.com/300x200?text=No+Image';
  
  return (
    <div className="card" style={{width: '18rem'}}>
        <img 
          src={imageUrl} 
          className="card-img-top" 
          alt={product.title}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
        />
        <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text text-muted">{product.category}</p>
            <p className="card-text">
                <strong>${product.price}</strong>
            </p>
            <Link to="#" className="btn btn-primary">View</Link>
        </div>
    </div>
  )
}
