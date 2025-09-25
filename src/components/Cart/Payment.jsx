import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import api from "../../api/api";
import QRCode from "react-qr-code";
import Error from "../Common/Error";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/slice/cartSlice";

function Payment({ checkout }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedMethodId, setSelectedMethodId] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [walletNumber, setWalletNumber] = useState("");

  const { user } = useSelector((state) => state.auth);

  const mobileWalletId = useMemo(
    () =>
      paymentMethods.find((method) => method.name_en === "MobileWallets")
        ?.paymentId,
    [paymentMethods]
  );

  useEffect(() => {
    const getPaymentMethods = async () => {
      try {
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

    getPaymentMethods();
  }, []);

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

    const backendUrl = `${import.meta.env.VITE_API_URL}/api/`;

    const orderPayload = {
      payment_method_id: selectedMethodId,
      cartTotal: checkout.totalPrice.toFixed(2),
      currency: "EGP",
      payLoad: { checkoutId: checkout._id },
      customer: {
        first_name: user?.firstName || "Customer",
        last_name: user?.lastName || "Name",
        email: user.email,
        phone: checkout.shippingAddress.phone,
        address: `${checkout.shippingAddress.address}, ${checkout.shippingAddress.city}, ${checkout.shippingAddress.country}, ${checkout.shippingAddress.postalCode}`,
      },
      cartItems: checkout.items.map((item) => ({
        name: item.product.name,
        price: item.price.toFixed(2),
        quantity: item.quantity,
      })),
      redirectionUrls: {
        successUrl: `${baseUrl}/order-confirmation`,
        failUrl: `${baseUrl}/payment-failed?checkoutId=${checkout._id}`,
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
      }
    } catch (err) {
      toast.error("Payment processing failed. Please try again.");
    } finally {
      dispatch(clearCart());
    }
  };

  const handlePaymentMethodChange = (method_id) => {
    if (!paymentLoading) {
      setSelectedMethodId(method_id);
    }
  };

  return (
    <div>
      {!paymentResult ? (
        <>
          <div className="payment-methods-list">
            {paymentMethods.map((method) => (
              <div
                key={method.paymentId}
                className={`payment-method-item ${
                  selectedMethodId === method.paymentId ? "selected" : ""
                }`}
                onClick={() => handlePaymentMethodChange(method.paymentId)}
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
              : `Pay EGP ${checkout.totalPrice.toFixed(2)}`}
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
  );
}

export default Payment;
