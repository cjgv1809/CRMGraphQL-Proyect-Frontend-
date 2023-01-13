import React, { useContext } from "react";
import OrderContext from "../../context/orders/OrderContext";
import ProductSummary from "./ProductSummary";

const OrderSummary = () => {
  // context of orders
  const orderContext = useContext(OrderContext);

  const { products } = orderContext;

  return (
    <>
      <p className="bg-gray-200 rounded border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        3. Adjust the quantities of the products
      </p>

      {products?.length > 0 ? (
        <>
          {products?.map((product) => (
            <ProductSummary key={product.id} product={product} />
          ))}
        </>
      ) : (
        <p className="text-red-500 text-sm mt-2">
          There are no products added yet
        </p>
      )}
    </>
  );
};

export default OrderSummary;
