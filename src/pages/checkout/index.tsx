import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Checkout = () => {
  const router = useRouter();
  const [Cart, setCart] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // cart localStorage
  useEffect(() => {
    // Check status login in local storage
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      setIsLoggedIn(true);
    }

    const cartData = router.query.cart
      ? JSON.parse(router.query.cart as string)
      : JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartData);
  }, [router.query.cart, router]);

  // redirect to product
  const handleContinueShopping = () => {
    router.push('./products');
  };

  // if not login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-teal-900 mb-6">
          Your Order will be Proceed! <br />
          Thank you for Shopping with Us.
        </h1>

        <div className="mt-8">
          <button
            onClick={handleContinueShopping}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-700 focus:outline-none"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
