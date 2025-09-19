import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserCheckouts } from "../redux/slice/checkoutSlice";
import Error from "../components/Common/Error";
import CheckoutSkeletonCard from "../components/Common/CheckoutSkeletonCard";

const StatusBadge = ({ status, paymentStatus }) => {
  const styles =
    paymentStatus === "pending"
      ? "bg-orange-100 text-orange-800"
      : "bg-gray-100 text-gray-800";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${styles}`}
    >
      {paymentStatus}
    </span>
  );
};

const MyCheckoutsPage = () => {
  const dispatch = useDispatch();
  const { checkouts, loading, error } = useSelector((state) => state.checkout);

  useEffect(() => {
    dispatch(fetchUserCheckouts());
  }, [dispatch]);

  if (loading) {
    return <CheckoutSkeletonCard />;
  }

  if (error) {
    return (
      <Error message={error} onRetry={() => dispatch(fetchUserCheckouts())} />
    );
  }

  const pendingCheckouts = checkouts.filter(
    (c) => c.paymentStatus === "pending"
  );

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        My Pending Checkouts
      </h1>

      {pendingCheckouts.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-700">
            No Pending Checkouts
          </h2>
          <p className="text-gray-500 mt-2">
            You have no incomplete checkouts.
          </p>
          <Link
            to="/collections"
            className="mt-4 inline-block px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold hover:bg-gray-900"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingCheckouts.map((checkout, idex) => (
            <div
              key={idex}
              className="border rounded-lg bg-white shadow-sm overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between sm:items-center border-b">
                <div>
                  <p className="text-sm text-gray-500">Created On</p>
                  <p className="font-medium text-gray-700">
                    {new Date(checkout.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 sm:text-right">
                  <p className="text-sm text-gray-500">Checkout ID</p>
                  <p className="font-mono text-xs text-gray-600">
                    #{checkout._id.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <StatusBadge
                    status={checkout.status}
                    paymentStatus={checkout.paymentStatus}
                  />
                  <p className="text-lg font-bold text-gray-800">
                    ${checkout.totalPrice.toFixed(2)}
                  </p>
                </div>

                {/* Product Images Preview */}
                <div className="flex space-x-2">
                  {checkout.items.map((item) => (
                    <img
                      key={`${item.product._id}-${item.color}-${item.material}`}
                      src={
                        item.product?.images?.[0] || "/placeholder-image.jpg"
                      }
                      alt={item.product?.name}
                      className="w-16 h-16 rounded-md object-cover border"
                    />
                  ))}
                </div>

                {/* Complete Payment Button */}
                <div className="text-right mt-4">
                  <Link
                    to={`/checkout/${checkout._id}`}
                    className="text-sm font-semibold text-green-600 hover:underline"
                  >
                    Complete Payment
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCheckoutsPage;
