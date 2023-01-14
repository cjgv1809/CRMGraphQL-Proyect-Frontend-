import React from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import Product from "../components/Product";

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      price
      stock
    }
  }
`;

const Products = () => {
  // query to get the products
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;

  const { getProducts } = data;

  return (
    <div>
      <Layout>
        <div className="bg-white rounded min-h-max p-4 shadow-md">
          <div className="sm:flex sm:justify-between items-center mb-4">
            <h1 className="text-2xl text-gray-800 font-light mb-5 sm:mb-0">
              Products
            </h1>

            <Link href="/newproduct">
              <a className="bg-blue-500 text-white text-center px-4 py-2 w-full inline-block sm:block sm:w-auto rounded font-semibold hover:bg-blue-400 whitespace-nowrap">
                Add New Product
              </a>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto shadow-md w-full max-w-7xl">
              <thead className="bg-gray-800 border-b">
                <tr className="text-gray-200 text-left">
                  <th scope="col" className="px-4 py-2 font-bold">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-2 font-bold">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-2 font-bold">
                    Stock
                  </th>
                  <th scope="col" colSpan={2} className="px-4 py-2 font-bold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.getProducts.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Products;
