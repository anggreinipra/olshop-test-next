import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  // Mengecek apakah pengguna sudah login hanya di sisi klien
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true); // Set state jika user ada di localStorage
      router.push('./products');
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validasi form
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to login: ${errorData.message || response.statusText}`
        );
      }

      const data = await response.json();
      console.log('User logged in:', data);

      // Menyimpan data pengguna ke localStorage untuk simulasi login
      localStorage.setItem('user', JSON.stringify(data));

      // Set state isLoggedIn setelah login berhasil
      setIsLoggedIn(true);

      // Redirect ke halaman produk setelah login berhasil
      router.push('./products');
    } catch (error: any) {
      console.error('Error:', error);
      setError(`Failed to login: ${error.message}`);
    }
  };

  const handleLogout = () => {
    // Menghapus data login dari localStorage
    localStorage.removeItem('user');

    // Set state isLoggedIn menjadi false setelah logout
    setIsLoggedIn(false);

    // Arahkan pengguna kembali ke halaman utama setelah logout
    router.push('/'); // Mengarahkan ke halaman utama
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="relative">
        {/* Tombol Logout di pojok kanan atas */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-800"
          >
            Logout
          </button>
        )}

        <div className="container mx-auto max-w-md bg-white p-8 rounded-lg shadow-md">
          {!isLoggedIn ? (
            <>
              <h2 className="text-2xl font-bold mb-4">
                Please Login before Continue!
              </h2>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-800">
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
                  <label className="block text-sm font-medium text-gray-800">
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
                  Login
                </button>
              </form>
              <p className="mt-4 text-center text-sm">
                Do not have an account?{' '}
                <a
                  href="/register"
                  className="text-teal-500 hover:text-teal-800"
                >
                  Register here
                </a>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
              <p className="text-center mb-4">You are already logged in.</p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-800"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
