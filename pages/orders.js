import React from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import Order from "../components/Order";

const GET_ORDERS = gql`
  query GetOrdersBySeller {
    getOrdersBySeller {
      id
      client {
        id
        name
        lastName
        email
        phone
      }
      order {
        id
        quantity
        price
        name
      }
      seller
      status
      total
      createdAt
    }
  }
`;

const Orders = () => {
  // query the orders
  const { data, loading, error } = useQuery(GET_ORDERS);

  if (loading) return "Loading...";

  const { getOrdersBySeller } = data;

  return (
    <div>
      <Layout>
        <div className="bg-white rounded min-h-max p-4 shadow-md">
          <div className="sm:flex sm:justify-between items-center mb-4">
            <h1 className="text-2xl text-gray-800 font-light mb-5 sm:mb-0">
              Orders
            </h1>

            <Link href="/neworder">
              <a className="bg-blue-500 text-white text-center px-4 py-2 w-full inline-block sm:block sm:w-auto rounded font-semibold hover:bg-blue-400 whitespace-nowrap">
                Add New Order
              </a>
            </Link>
          </div>

          {getOrdersBySeller.length === 0 ? (
            <p className="text-center text-2xl">No orders yet</p>
          ) : (
            getOrdersBySeller.map((order) => (
              <Order key={order.id} order={order} />
            ))
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Orders;
