import { GetServerSideProps } from 'next';
import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
  };
}

const ProductsPage: React.FC<{
  products: Product[] | null;
  error?: string;
}> = ({ products, error }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Check Login User
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
    setCartCount(storedCart.length);
  }, []);

  // add to cart
  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    setCartCount(updatedCart.length);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Filter Products
  const filteredProducts = selectedCategory
    ? products?.filter((product) => product.category.name === selectedCategory)
    : products;

  const categories = [
    ...new Set(products?.map((product) => product.category.name) || []),
  ];

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-4 bg-red-100 text-red-500 rounded-lg">
          <h1 className="text-xl font-semibold">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!products) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 sm:px-12 sm:py-12">
      <div className="mb-4">
        <label htmlFor="category-select" className="sr-only">
          Filter by Category
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          aria-label="Filter products by category"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="text-right mb-4">
        <span className="text-teal-800 text-lg font-semibold">
          Cart: {cartCount} items
        </span>
      </div>

      <h1 className="text-3xl font-semibold text-center mb-6">
        Product Listing
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts?.map((product) => (
          <div
            key={product.id}
            className="relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg"
          >
            <ProductCard product={product} addToCart={addToCart} />{' '}
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/products');
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const products: Product[] = await res.json();

    return { props: { products } };
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return { props: { products: null, error: 'Failed to load products' } };
  }
};

export default ProductsPage;
