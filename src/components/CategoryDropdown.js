import React from 'react';

export default function CategoryDropdown({ categories, value, onChange }) {
  return (
    <select className="form-select me-2" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">All categories</option>
      {categories.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}