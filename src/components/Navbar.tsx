import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0); // State untuk menghitung jumlah barang di cart
  const router = useRouter();

  // Mengambil jumlah produk dari cart pada localStorage dan mengecek status login pengguna
  useEffect(() => {
    // Mengecek status login pengguna dan cart hanya di sisi klien
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user); // Set status login berdasarkan data di localStorage

    // Mengambil jumlah produk di cart dari localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(storedCart.length); // Set jumlah cart
  }, [router.asPath]); // Menambahkan router.asPath agar hook rerender ketika route berubah

  const handleLogout = () => {
    // Menghapus data login dari localStorage
    localStorage.removeItem('user');

    // Menghapus jumlah produk di cart setelah logout
    localStorage.removeItem('cart');

    // Set isLoggedIn menjadi false dan mengarahkan ke halaman login setelah logout
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-teal-500 sticky top-0 z-50 shadow-lg p-3">
      <ul className="flex justify-between items-center text-lg">
        {/* Tombol Navbar lainnya yang berada di tengah */}
        <li className="flex flex-grow justify-center space-x-3">
          <Link
            href="/"
            className="text-white hover:text-yellow-300 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-white hover:text-yellow-300 transition-colors duration-300"
          >
            Product
          </Link>
          <Link
            href="/cart"
            className="relative text-white hover:text-yellow-300 transition-colors duration-300"
          >
            Cart
            {/* Menampilkan jumlah produk pada cart */}
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </li>

        {/* Tombol Login atau Logout di sebelah kanan */}
        <li className="flex items-center space-x-3 ml-auto">
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="text-white hover:text-yellow-300 transition-colors duration-300 text-base"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-teal-900 text-white py-2 px-4 rounded-md text-base hover:bg-teal-700 transition-colors duration-300"
              aria-label="Logout"
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
