import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

interface ProductsProps {
  categoryId?: string;
}

export const Products: React.FC<ProductsProps> = ({ categoryId }) => {
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  
  const filteredProducts = categoryId
    ? products.filter(product => product.category === categoryId)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const categoryName = categoryId 
    ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1)
    : 'Semua Produk';

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">{categoryName}</h2>
        <div className="w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Urutkan</option>
            <option value="price-asc">Harga: Rendah ke Tinggi</option>
            <option value="price-desc">Harga: Tinggi ke Rendah</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};