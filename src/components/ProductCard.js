import React from 'react'
import {Link} from 'react-router-dom';

export default function ProductCard ({ product}) {
  return (
    <div className="card" style={{width: '18rem'}}>
        <img src={product.image} className="card-img-top" alt={product.title} />
        <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text text-muted">{product.category}</p>
            <p className="card-text">
                <strong>${product.price}</strong>
            </p>
            <Link to="#" className="btn btn-primary">Go somewhere</Link>
        </div>
    </div>
  )
}
