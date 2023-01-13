import React, { useState, useEffect, useContext } from "react";
import OrderContext from "../../context/orders/OrderContext";

const ProductSummary = ({ product }) => {
  // context of orders
  const orderContext = useContext(OrderContext);

  const { quantityProducts, updateTotal } = orderContext;

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    updateQuantity();
    updateTotal();
  }, [quantity]);

  const updateQuantity = () => {
    const newProducts = { ...product, quantity: Number(quantity) };

    quantityProducts(newProducts);
  };

  return (
    <div
      key={product.id}
      className="md:flex md:justify-between md:items-center mt-5"
    >
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-base text-gray-600 font-light">{product.name}</p>
        <p className="text-lg text-gray-600 font-semibold">
          $ {product.price.toFixed(2)}
        </p>
      </div>

      <input
        type="number"
        min="1"
        placeholder="Quantity"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4 md:w-1/4"
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
        value={quantity}
      />
    </div>
  );
};

export default ProductSummary;
