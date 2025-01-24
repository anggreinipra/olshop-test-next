import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

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

const ProductPage: React.FC<{ product: Product | null; error?: string }> = ({
  product,
  error,
}) => {
  const router = useRouter();
  const [showFullDescription, setShowFullDescription] = useState(false);

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

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Membatasi panjang deskripsi untuk menampilkan "Read More"
  const truncatedDescription = product.description.slice(0, 200); // 200 karakter pertama
  const descriptionToShow = showFullDescription
    ? product.description
    : truncatedDescription;

  return (
    <div className="flex justify-center items-center py-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-11/12 sm:w-9/12 md:w-8/12 lg:w-1/2 p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">
          {product.title}
        </h1>

        {/* Gambar Produk */}
        <div className="flex justify-center mb-6">
          <img
            src={product.images[0]}
            alt={product.title}
            className="max-w-full max-h-[300px] object-contain rounded-md shadow-md"
          />
        </div>

        {/* Deskripsi Produk */}
        <p className="text-base text-gray-700 mb-4">{descriptionToShow}</p>

        {!showFullDescription && product.description.length > 200 && (
          <button
            onClick={() => setShowFullDescription(true)}
            className="text-teal-500 hover:underline"
          >
            Read more
          </button>
        )}

        {/* Price and Category */}
        <div className="flex justify-between items-center mb-6 mt-4">
          <p className="text-lg font-semibold text-teal-700">
            Price: ${product.price}
          </p>
          <p className="text-base text-gray-600">
            Category: {product.category.name}
          </p>
        </div>

        {/* Tombol untuk kembali ke halaman produk */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => router.push('/products')}
            className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

// Fetch data produk berdasarkan ID
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params || {}; // Mendapatkan ID produk dari params

  if (!id) {
    return { props: { product: null, error: 'Product not found' } };
  }

  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }

    const product: Product = await res.json();
    return { props: { product } };
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return { props: { product: null, error: 'Failed to load product' } };
  }
};

export default ProductPage;
