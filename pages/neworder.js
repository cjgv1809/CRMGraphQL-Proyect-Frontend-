import React, { useState, useContext } from "react";
import OrderContext from "../context/orders/OrderContext";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Layout from "../components/Layout";
import AssignClient from "../components/orders/AssignClient";
import AssignProducts from "../components/orders/AssignProducts";
import OrderSummary from "../components/orders/OrderSummary";
import OrderTotal from "../components/orders/OrderTotal";
import { gql, useMutation } from "@apollo/client";

const NEW_ORDER = gql`
  mutation Mutation($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`;

const NewOrder = () => {
  // show message if there is not stock available for a product in the order
  const [message, setMessage] = useState(null);
  console.log(message);

  // routing
  const router = useRouter();

  // context of orders
  const orderContext = useContext(OrderContext);

  const { client, products, total } = orderContext;

  const validateOrder = () => {
    return !products.every((product) => product.quantity > 0) ||
      total === 0 ||
      client.length === 0
      ? " opacity-50 cursor-not-allowed "
      : "";
  };

  // Mutation to create new orders
  const [newOrder] = useMutation(NEW_ORDER);

  const createNewOrder = async () => {
    // remove the extra data from the products object
    const order = products.map(({ __typename, stock, ...product }) => product);

    try {
      const { data } = await newOrder({
        variables: {
          input: {
            client: client.id,
            total,
            order,
          },
        },
      });

      // redirect to the orders page
      router.push("/orders");

      // show alert
      Swal.fire(
        "Created",
        "The order has been created successfully",
        "success"
      );
    } catch (error) {
      setMessage(error.message.replace("GraphQL error: ", ""));

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const showMessage = () => {
    return (
      <div
        className={`py-2 px-3 w-full my-3 font-semibold max-w-lg mx-auto text-center text-white rounded ${
          message !== "Order created" ? "bg-yellow-500" : "bg-green-500"
        }`}
      >
        <p>{message}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-3xl text-gray-800 font-light text-center mb-10">
        Create New Order
      </h1>

      {message && showMessage()}

      <div className="bg-white rounded min-h-max p-8 shadow-md w-full max-w-lg mx-auto">
        <div className="flex flex-col justify-center">
          <AssignClient />
          <hr className="my-5" />
          <AssignProducts />
          <hr className="my-5" />
          <OrderSummary />
          <OrderTotal />
        </div>

        <button
          type="button"
          className={`bg-blue-500 w-full text-white px-4 py-2 mt-5 rounded font-semibold hover:bg-blue-400 whitespace-nowrap ${validateOrder()}}`}
          onClick={() => createNewOrder()}
        >
          Register Order
        </button>
      </div>
    </Layout>
  );
};

export default NewOrder;
