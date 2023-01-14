import React, { useEffect } from "react";
import Layout from "../components/Layout";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { gql, useQuery } from "@apollo/client";

const BEST_SELLERS = gql`
  query getBestSellers {
    getBestSellers {
      seller {
        name
        lastName
        email
      }
      total
    }
  }
`;

const BestSellers = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(BEST_SELLERS);

  // query the API every second to get the best sellers data in real time
  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return "Loading...";

  const { getBestSellers } = data;

  // flatten the array to get the name and total of the best sellers and sort them by total
  const sellersChart = [];

  getBestSellers.map((seller, index) => {
    sellersChart[index] = {
      ...seller.seller[0],
      total: seller.total,
    };
  });

  return (
    <Layout>
      <div className="bg-white rounded min-h-max max-w-xl mx-auto p-4 shadow-md">
        <h1 className="text-2xl text-center text-gray-800 font-light">
          Best Sellers
        </h1>

        <ResponsiveContainer width={"99%"} height={550}>
          <BarChart
            className="mt-10"
            width={300}
            height={400}
            data={sellersChart}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#1F2937" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
};

export default BestSellers;
