import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import { createCheckout } from "../../redux/slice/checkoutSlice";
import api from "../../api/api";
import Error from "../Common/Error";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items: cartItems,
    loading: cartLoading,
    isInitialized,
    totalPrice,
  } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);
  const { currentCheckoutLoading: checkoutLoading } = useSelector(
    (state) => state.checkout
  );

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    country: "",
    phone: "",
    postalCode: "",
  });

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethodId, setSelectedMethodId] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [walletNumber, setWalletNumber] = useState("");

  const mobileWalletId = useMemo(
    () =>
      paymentMethods.find((method) => method.name_en === "MobileWallets")
        ?.paymentId,
    [paymentMethods]
  );

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to checkout.");
      navigate(`/login?redirect=/checkout`);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (
      !checkoutId &&
      isInitialized &&
      !cartLoading &&
      cartItems.length === 0
    ) {
      toast.info("Your cart is empty.");
      navigate("/");
    }
  }, [checkoutId, isInitialized, cartLoading, cartItems, navigate]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    try {
      const createdCheckout = await dispatch(
        createCheckout(shippingAddress)
      ).unwrap();
      setCheckoutId(createdCheckout._id);
      toast.success("Shipping details saved. Please select a payment method.");

      const response = await api.get("/payment/methods");
      if (response.data.status === "success") {
        setPaymentMethods(response.data.data);
      } else {
        toast.error("Could not load payment methods.");
      }
    } catch (err) {
      toast.error(err.message || "Failed to save shipping details.");
    }
  };

  const handleProcessPayment = async () => {
    if (!selectedMethodId) {
      toast.error("Please select a payment method.");
      return;
    }
    if (selectedMethodId === mobileWalletId && !walletNumber) {
      toast.error("Please enter your wallet phone number.");
      return;
    }

    setPaymentLoading(true);

    const baseUrl = window.location.origin;

    // Edit here !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const backendUrl = `${"https://unfeared-fungal-tenisha.ngrok-free.dev/"}/api/`;

    const orderPayload = {
      payment_method_id: selectedMethodId,
      cartTotal: totalPrice.toFixed(2),
      currency: "EGP",
      payLoad:{checkoutId},
      customer: {
        first_name: user?.firstName || "Customer",
        last_name: user?.lastName || "Name",
        email: user.email,
        phone: shippingAddress.phone,
        address: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.country}, ${shippingAddress.postalCode}`,
      },
      cartItems: cartItems.map((item) => ({
        name: item.product.name,
        price: item.price.toFixed(2),
        quantity: item.quantity,
      })),
      redirectionUrls: {
        successUrl: `${baseUrl}/order-confirmation`,
        failUrl: `${baseUrl}/payment-failed?checkoutId=${checkoutId}`,
        pendingUrl: `${baseUrl}/payment-pending`,
        webhookUrl: `${backendUrl}/payment/webhook_json`,
      },
    };

    if (selectedMethodId === mobileWalletId) {
      orderPayload.mobileWalletNumber = walletNumber;
    }

    try {
      const response = await api.post("/payment/execute", orderPayload);
      const data = response.data.data;

      if (data.payment_data.redirectTo) {
        window.location.href = data.payment_data.redirectTo;
      } else {
        setPaymentResult(data.payment_data);
        dispatch(clearCart());
      }
    } catch (err) {
      toast.error("Payment processing failed. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-4 sm:px-6">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6 lg:p-8">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {!checkoutId ? (
          <form onSubmit={handleCreateCheckout}>
            <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                disabled
              />
            </div>
            <h3 className="text-lg font-semibold mb-4 mt-6">
              Delivery Address
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleAddressChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleAddressChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleAddressChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleAddressChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                disabled={checkoutLoading}
                className="w-full bg-gray-900 text-white py-3 rounded-md font-semibold hover:bg-gray-800 disabled:bg-gray-400"
              >
                {checkoutLoading ? "Saving..." : "Continue to Payment"}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Select Payment Method
            </h3>

            {!paymentResult ? (
              <>
                <div className="payment-methods-list">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.paymentId}
                      className={`payment-method-item ${
                        selectedMethodId === method.paymentId ? "selected" : ""
                      }`}
                      onClick={() => setSelectedMethodId(method.paymentId)}
                    >
                      <img
                        src={method.logo}
                        alt={method.name_en}
                        className="payment-logo"
                      />
                      <span className="payment-name">{method.name_en}</span>
                    </div>
                  ))}
                </div>

                {selectedMethodId === mobileWalletId && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Wallet Phone Number
                    </label>
                    <input
                      type="tel"
                      value={walletNumber}
                      onChange={(e) => setWalletNumber(e.target.value)}
                      placeholder="e.g., 01xxxxxxxxx"
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                )}

                <button
                  onClick={handleProcessPayment}
                  disabled={
                    paymentLoading ||
                    !selectedMethodId ||
                    (selectedMethodId === mobileWalletId && !walletNumber)
                  }
                  className="w-full mt-6 bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 disabled:bg-gray-400"
                >
                  {paymentLoading
                    ? "Processing..."
                    : `Pay EGP ${totalPrice.toFixed(2)}`}
                </button>
              </>
            ) : (
              <div className="mt-6 border border-gray-200 p-4 rounded-md text-center">
                <h4 className="font-bold text-lg mb-4">Payment Instructions</h4>

                {paymentResult.error && <Error message={paymentResult.error} />}

                {paymentResult.fawryCode && (
                  <div>
                    <p className="text-gray-700">
                      Please use this Fawry Code to pay:
                    </p>
                    <p className="text-2xl font-bold text-black my-2">
                      {paymentResult.fawryCode}
                    </p>
                  </div>
                )}

                {paymentResult.meezaQrCode && (
                  <div className="flex flex-col items-center">
                    <p className="text-gray-700 mb-2">
                      Scan the QR code with your mobile wallet app:
                    </p>
                    <div className="p-2 bg-white inline-block rounded-lg shadow-md">
                      <QRCode value={paymentResult.meezaQrCode} size={180} />
                    </div>
                    {paymentResult.meezaReference && (
                      <p className="text-gray-700 mt-4">
                        Or use this reference number:{" "}
                        <strong className="text-black">
                          {paymentResult.meezaReference}
                        </strong>
                      </p>
                    )}
                  </div>
                )}

                {paymentResult.expireDate && (
                  <p className="text-sm text-gray-500 mt-4">
                    This code expires on: {paymentResult.expireDate}
                  </p>
                )}

                <button
                  onClick={() => navigate("/")}
                  className="w-full mt-6 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
                >
                  Back to Homepage
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Section: Order Summary */}
      <div className="bg-gray-50 p-6 lg:p-8 rounded-lg h-fit sticky top-24">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Order Summary
        </h3>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={`${item.product._id}-${item.color}-${item.material}`}
              className="flex items-start justify-between py-2"
            >
              <div className="flex items-start">
                <div className="relative">
                  <img
                    src={item.product?.images?.[0] || "/placeholder-image.jpg"}
                    alt={item.product?.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-600 rounded-full">
                    {item.quantity}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-sm">{item.product?.name}</h4>
                  <p className="text-xs text-gray-500">
                    {item.color} / {item.material}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-sm">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-2 mt-2">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
