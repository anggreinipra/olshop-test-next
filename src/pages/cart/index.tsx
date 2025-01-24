import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Cart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const router = useRouter();

  // Loading cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const groupedCart = groupById(storedCart); // grouping product based on ID
    setCart(groupedCart); // saving cart
  }, []);

  const groupById = (cart: any[]) => {
    const grouped: any[] = [];
    cart.forEach((product) => {
      const existingProductIndex = grouped.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex > -1) {
        grouped[existingProductIndex].quantity += 1;
      } else {
        grouped.push({ ...product, quantity: 1 });
      }
    });
    return grouped;
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-teal-900 mb-6">Your Cart</h1>
          <div className="text-gray-500">Your cart is empty</div>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    if (totalItems > 0) {
      localStorage.removeItem('cart');
      router.push({
        pathname: '/checkout',
        query: { cart: JSON.stringify(cart) },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-teal-900 mb-6">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cart.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-700 text-sm mb-4">
                  ${product.price} x {product.quantity} = $
                  {(product.price * product.quantity).toFixed(2)}
                </p>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right">
          <h2 className="text-lg font-semibold text-teal-900">
            Total Items: {totalItems}
          </h2>
          <h2 className="text-lg font-semibold text-teal-900">
            Total Price: ${totalPrice.toFixed(2)}
          </h2>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleCheckout}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-700 focus:outline-none"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
