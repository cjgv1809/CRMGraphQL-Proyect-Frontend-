import React, { useContext } from "react";
import OrderContext from "../../context/orders/OrderContext";

const OrderTotal = () => {
  // context of orders
  const orderContext = useContext(OrderContext);

  const { total, products } = orderContext;

  return (
    <div className="flex items-center mt-5 rounded justify-between bg-gray-200 p-3 border-solid border-2 border-gray-500">
      <h2 className="text-gray-800 text-lg font-medium">Total to pay:</h2>
      <p className="text-gray-800 mt-0 text-xl font-bold">
        $ {total && products.length > 0 ? total.toFixed(2) : 0}
      </p>
    </div>
  );
};

export default OrderTotal;
