import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Menggunakan useRouter dari Next.js

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Inisialisasi useRouter untuk navigasi

  // Mengecek apakah user sudah terdaftar/login saat komponen dipanggil
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      router.push('./products'); // Jika sudah login, arahkan langsung ke halaman produk
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validasi form
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      // Cek jika response gagal
      if (!response.ok) {
        const errorData = await response.text(); // Ambil response sebagai teks untuk debugging
        console.error('API Error:', errorData); // Log error response untuk debugging
        throw new Error(
          `Failed to register user: ${errorData || response.statusText}`
        );
      }

      // Periksa apakah response berupa JSON
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('User registered:', data);

        // Menyimpan data pengguna ke localStorage untuk menandakan bahwa pengguna sudah login
        localStorage.setItem('user', JSON.stringify(data));

        // Redirect ke halaman produk setelah registrasi berhasil
        router.push('./products'); // Arahkan ke halaman produk
      } else {
        throw new Error('Expected JSON response, but received non-JSON.');
      }
    } catch (error: any) {
      console.error('Error:', error);
      setError(`Failed to register user: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-800"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
