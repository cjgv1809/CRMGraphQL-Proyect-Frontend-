import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import OrderContext from "../../context/orders/OrderContext";

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      stock
      price
    }
  }
`;

const AssignProducts = () => {
  const [products, setProducts] = useState([]);

  // query of apollo
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  // context of orders
  const orderContext = useContext(OrderContext);

  const { addProducts } = orderContext;

  useEffect(() => {
    addProducts(products);
  }, [products]);

  const selectProducts = (products) => {
    setProducts(products);
  };

  if (loading) return null;

  const { getProducts } = data;

  return (
    <>
      <p className="bg-gray-200 rounded border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2. Search or select the products
      </p>
      <Select
        className="mt-4"
        isMulti={true}
        options={getProducts}
        onChange={(option) => selectProducts(option)}
        getOptionValue={(options) => options.id}
        getOptionLabel={(options) =>
          `${options.name} - ${options.stock} available`
        }
        placeholder="Select or search products"
        noOptionsMessage={() => "No results"}
      />
    </>
  );
};

export default AssignProducts;
