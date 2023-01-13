import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";

const Orders = () => {
  return (
    <div>
      <Layout>
        <div className="bg-white rounded min-h-max p-8 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl text-gray-800 font-light">Orders</h1>

            <Link href="/neworder">
              <a className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-400 whitespace-nowrap">
                Add New Order
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Orders;
