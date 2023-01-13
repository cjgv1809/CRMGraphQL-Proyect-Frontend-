import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import OrderContext from "../../context/orders/OrderContext";
import { gql, useQuery } from "@apollo/client";

const GET_CLIENTS_BY_SELLER = gql`
  query getClientsBySeller {
    getClientsBySeller {
      id
      name
      lastName
      company
      email
    }
  }
`;

const AssignClient = () => {
  const [client, setClient] = useState([]);

  // context of orders
  const orderContext = useContext(OrderContext);

  const { addClient } = orderContext;

  // query of apollo
  const { data, loading, error } = useQuery(GET_CLIENTS_BY_SELLER);

  useEffect(() => {
    addClient(client);
  }, [client]);

  const selectClient = (client) => {
    setClient(client);
  };

  if (loading) return null;

  const { getClientsBySeller } = data;

  return (
    <>
      <p className="bg-gray-200 rounded border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        1. Select a client for the order
      </p>
      <Select
        className="mt-4"
        options={getClientsBySeller}
        onChange={(option) => selectClient(option)}
        getOptionValue={(options) => options.id}
        getOptionLabel={(options) => options.name}
        placeholder="Select or search client"
        noOptionsMessage={() => "No results"}
      />
    </>
  );
};

export default AssignClient;
