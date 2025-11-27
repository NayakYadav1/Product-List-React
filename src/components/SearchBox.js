import React from 'react';

export default function SearchBox({ value, onChange }) {
  return (
    <input
      type="search"
      className="form-control me-2"
      placeholder="Search products..."
      aria-label="Search products"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}