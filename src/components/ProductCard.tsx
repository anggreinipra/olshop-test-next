import React, { useState } from 'react';
import { useRouter } from 'next/router';

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

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State untuk mengontrol apakah deskripsi diperluas
  const router = useRouter(); // Menggunakan useRouter untuk navigasi ke halaman detail

  // Batasi panjang deskripsi
  const descriptionMaxLength = 100; // Panjang maksimal deskripsi yang ingin ditampilkan
  const shortDescription = product.description.slice(0, descriptionMaxLength);
  const isDescriptionLong = product.description.length > descriptionMaxLength;

  const handleReadMoreClick = () => {
    setIsExpanded((prev) => !prev); // Toggle status deskripsi (expand/collapse)
  };

  const handleViewDetailsClick = () => {
    // Navigasi ke halaman detail produk
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 relative">
      {product.images.length === 0 ? (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image available</span>
        </div>
      ) : (
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-xl font-semibold mb-2">{product.title}</h3>

          {/* Menampilkan deskripsi yang dipersingkat atau lengkap */}
          <p className="text-gray-700 text-sm mb-4">
            {isExpanded ? product.description : shortDescription}
            {isDescriptionLong && !isExpanded && '...'}
          </p>

          {/* Tampilkan tombol "Read More" jika deskripsi lebih panjang */}
          {isDescriptionLong && (
            <button
              className="text-teal-500 text-sm"
              onClick={handleReadMoreClick} // Mengubah status ketika tombol ditekan
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}

          {/* Kategori */}
          <p className="text-sm text-gray-600 mb-4">
            Category: {product.category?.name || 'Unknown Category'}
          </p>
        </div>

        {/* Harga */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold text-teal-800">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Tombol-tombol di bagian bawah */}
        <div className="flex justify-between">
          {/* Tombol Add to Cart */}
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-lg"
            onClick={() => addToCart(product)} // Fungsi Add to Cart dipindahkan ke sini
          >
            Add to Cart
          </button>

          {/* Tombol View Details */}
          <button
            className="bg-teal-700 text-white px-4 py-2 rounded-lg"
            onClick={handleViewDetailsClick} // Fungsi untuk menuju halaman detail produk
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
