import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user data exists in localStorage
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData);
    }

    // Set the background image
    if (typeof window !== 'undefined') {
      setBackgroundImage(
        "url('https://img.freepik.com/free-photo/finance-elements-frame_23-2148080960.jpg?t=st=1736503392~exp=1736506992~hmac=d54875403a16c17e10fb973f9226f3b3fb509a2c5458fc2cc97f8c2a1e46e58f&w=1800')"
      );
    }
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center p-4"
        style={backgroundImage ? { backgroundImage: backgroundImage } : {}}
      >
        <div className="container mx-auto max-w-md bg-white p-8 rounded-lg shadow-lg opacity-90">
          {user ? (
            <>
              <h2 className="text-3xl font-bold mb-4 text-center text-teal-800">
                Welcome back to Shopping Smart {user.name}!
              </h2>
              <p className="text-lg text-center mb-8">
                We are so glad to have you here. <br />
                Let's continue your journey!
                <br />
                Happy Shopping~
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => router.push('./products')}
                  className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-800"
                >
                  Explore Products
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4 text-center text-teal-800">
                Welcome to Shopping Smart!
              </h2>
              <p className="text-lg text-center mb-8">
                We're excited to have you here. <br />
                Please login or register to get started!
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleLogin}
                  className="bg-teal-800 text-white py-2 px-4 rounded-md hover:bg-teal-500"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="bg-teal-800 text-white py-2 px-4 rounded-md hover:bg-teal-500"
                >
                  Register
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
