import { useEffect, useState } from "react";
import useCartStore from "./store/cartStore";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // console.log("API URL:", import.meta.env.VITE_API_URL);
    async function fetchData() {
      const response = await axios.get(import.meta.env.VITE_API_URL);
      // console.log("API response:", response.data);
      setProducts(response.data.products);
    }
    fetchData();
  }, []);

  const cartProducts = useCartStore((state) => state.products);
  const addProduct = useCartStore((state) => state.addProduct);
  const incrementProductQuantity = useCartStore(
    (state) => state.incrementProductQuantity
  );
  const decrementProductQuantity = useCartStore(
    (state) => state.decrementProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);

  function handleClick(product) {
    addProduct({ ...product, quantity: 1 });
  }

  function deleteFromCart(productId) {
    removeProduct(productId);
  }

  function calculateTotal() {
    return cartProducts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Elektronika Do'koni</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Mahsulotlar ro'yxati */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Mahsulotlar</h2>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg text-center"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="mx-auto mb-2"
                />
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <button
                  onClick={() => handleClick(product)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                  disabled={cartProducts.find((item) => item.id === product.id)}
                >
                  Savatga qo'shish
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Savat */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Savat</h2>
          {cartProducts.length === 0 ? (
            <button className="text-gray-500" disabled={false}>
              Savat bo'sh
            </button>
          ) : (
            <>
              {cartProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <div className="flex items-center">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-16 h-16 mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => decrementProductQuantity(item.id)}
                      className="bg-gray-200 px-2 py-1 rounded-l disabled:opacity-40"
                      disabled={item.quantity === 1 ? true : false}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => incrementProductQuantity(item.id)}
                      className="bg-gray-200 px-2 py-1 rounded-r"
                    >
                      +
                    </button>
                    <button
                      onClick={() => deleteFromCart(item.id)}
                      className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
                    >
                      O'chirish
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-right">
                <h3 className="text-xl font-bold">
                  Jami: ${calculateTotal().toFixed(2)}
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;