import React from "react";
const cheackout = {
  _id: "1234",
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: 1,
      name: "products",
      color: "black",
      size: "M",
      price: 11,
      quantity: 1,
      image:
        "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
    },
    {
      productId: 2,
      name: "products",
      color: "black",
      size: "M",
      price: 11,
      quantity: 1,
      image:
        "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
    },
  ],
  shippingAddress: {
    address: "123 Fashion Street",
    city: "New York",
    country: "USA",
  },
};

const OrderConfirmationPage = () => {
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>
      {cheackout && (
        <div className="p-6 rounded-lg border border-gray-300">
          <div className="flex justify-between mb-20">
            {/*order id and date */}
            <div>
              <h2 className="text-xl font-semibold">
                Order ID: {cheackout._id}
              </h2>
              <p className="text-gray-500">
                Order date: {new Date(cheackout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/*estimated delivery */}
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:{" "}
                {calculateEstimatedDelivery(cheackout.createdAt)}
              </p>
            </div>
          </div>
          {/*ordered items */}
          <div className="mb-20">
            {cheackout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="tex-md">${item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {/*payment and delivery info */}
          <div className="grid grid-cols-2 gap-8">
            {/*payment info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p
                className="text-gray-600
              "
              >
                PayPal
              </p>
            </div>
            {/*delivery info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">
                {cheackout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {cheackout.shippingAddress.city},{" "}
                {cheackout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
