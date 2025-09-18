import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { X, Plus, Minus, AlertCircle } from "lucide-react";
import {
  updateCartItemQuantity,
  removeItemFromCart,
} from "../../redux/slice/cartSlice";
import CartItemSkeleton from "./CartItemSkeleton";

const CartDrawer = ({ closeCart }) => {
  const dispatch = useDispatch();
  const { items, totalPrice, error, loading } = useSelector(
    (state) => state.cart
  );

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(
        updateCartItemQuantity({
          productId: item.product._id,
          material: item.material,
          color: item.color,
          quantity: newQuantity,
        })
      );
    } else {
      handleRemoveItem(item);
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(
      removeItemFromCart({
        productId: item.product._id,
        material: item.material,
        color: item.color,
      })
    );
  };

  const renderContent = () => {
    if (loading && items.length === 0) {
      return (
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <CartItemSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link
            to="/collections"
            onClick={closeCart}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold hover:bg-gray-900"
          >
            Start Shopping
          </Link>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={`${item.product._id}-${item.color}-${item.material}`}
            className="flex gap-4"
          >
            <img
              src={item.product?.images?.[0] || "/placeholder-image.jpg"}
              alt={item.product?.name}
              className="w-24 h-24 rounded-md object-cover"
            />
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {item.product?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.color} / {item.material}
                </p>
                <p className="text-md font-semibold mt-1">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() =>
                      handleQuantityChange(item, item.quantity - 1)
                    }
                    className="px-2 py-1 text-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    disabled={loading}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3 text-md font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item, item.quantity + 1)
                    }
                    className="px-2 py-1 text-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    disabled={loading}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="text-xs text-red-500 hover:underline disabled:opacity-50"
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Shopping Cart</h2>
        <button
          onClick={closeCart}
          className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {error ? (
        <div className="p-4 m-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto p-6">{renderContent()}</div>
      )}


      {/* Footer */}
      {items.length > 0 && (
        <div className="p-6 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-800">
              Subtotal
            </span>
            <span className="text-lg font-semibold text-gray-800">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <Link
            to="/checkout"
            onClick={closeCart}
            className={`w-full block text-center bg-gray-900 text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-800 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Proceed to Checkout"}
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
