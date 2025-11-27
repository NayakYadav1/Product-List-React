import React, { useMemo, useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import SearchBox from './SearchBox';
import CategoryDropdown from './CategoryDropdown';
import {Link} from 'react-router-dom';

export default function ProductList() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

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
    const controller = new AbortController();
    const { signal } = controller;

    if (page === 0) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    const skip = page * 12;
    const limit = 12;

    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`, { signal })
      .then(res => res.json())
      .then(data => {
        if (signal.aborted) return;
        if (page === 0) {
          setProducts(data.products);
        } else {
          setProducts(prev => [...prev, ...data.products]); // append to existing
        }
        setTotal(data.total);
        setLoading(false);
        setLoadingMore(false);
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          // request was cancelled - no action needed
          return;
        }
        console.error('Fetch error:', error);
        setLoading(false);
        setLoadingMore(false);
      });

    return () => {
      controller.abort();
    };
  }, [page]);

  const sentinelRef = React.useRef(null);

React.useEffect(() => {
  const sentinel = sentinelRef.current;
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !loadingMore && !loading) {
        const nextPage = page + 1;
        const skip = nextPage * 12;
        if (total > 0 && skip < total) {
          setPage(nextPage);
        }
      }
    },
    { rootMargin: '200px', threshold: 0.1 }
  );

  observer.observe(sentinel);

  return () => observer.disconnect();
}, [page, loadingMore, loading, total]);

  return (
    <div className="container my-5">
      <h1 className="mb-4">Our Products</h1>

      <div className="d-flex mb-3">
        <SearchBox value={query} onChange={setQuery} />
        <CategoryDropdown categories={categories} value={category} onChange={setCategory} />
      </div>
      
      {loading && (
        <div className="row">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
              <div className="card" style={{ width: '18rem' }} aria-hidden="true">
                <div className="placeholder-wave">
                  <div style={{ height: '200px', backgroundColor: '#e9ecef' }} className="card-img-top placeholder" />
                </div>
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-7" />
                  </h5>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-10" />
                    <span className="placeholder col-8 mt-2 d-block" />
                  </p>
                  <Link className="btn btn-primary disabled placeholder col-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
          {loadingMore && Array.from({ length: 4 }).map((_, i) => (
            <div key={`loading-more-${i}`} className="col-12 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
              <div className="card" style={{ width: '18rem' }} aria-hidden="true">
                <div className="placeholder-wave">
                  <div style={{ height: '200px', backgroundColor: '#e9ecef' }} className="card-img-top placeholder" />
                </div>
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-7" />
                  </h5>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-10" />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sentinel element for infinite scroll */}
      <div ref={sentinelRef} className="text-center my-4">
        {loadingMore && (
          <>
            <span className="spinner-border spinner-border-sm" /> Loading more...
          </>
        )}
        {!loading && !loadingMore && filtered.length === 0 && (
          <p className="text-muted">No products found</p>
        )}
        {!loading && !loadingMore && products.length > 0 && products.length >= total && (
          <p className="text-muted">End of results</p>
        )}
      </div>
    </div>
  )
}