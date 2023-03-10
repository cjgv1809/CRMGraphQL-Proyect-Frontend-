import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";
import Router from "next/router";

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`;

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

const Client = ({ client: { id, name, lastName, email, company } }) => {
  // mutation to delete a client from the database.
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache) {
      // get the object from the cache
      const { getClientsBySeller } = cache.readQuery({
        query: GET_CLIENTS_BY_SELLER,
      });
      // rewrites the cache with the new client list
      cache.writeQuery({
        query: GET_CLIENTS_BY_SELLER,
        data: {
          getClientsBySeller: getClientsBySeller.filter(
            (currentClient) => currentClient.id !== id
          ),
        },
      });
    },
  });

  const confirmDeleteClient = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete it?",
      text: "You won't be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // delete client from the database
          const { data } = await deleteClient({
            variables: {
              id,
            },
          });
          // show message
          Swal.fire("Deleted", data.deleteClient, "success");
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  const editClient = (id) => {
    Router.push({
      pathname: "/editclient/[id]",
      query: { id },
    });
  };

  return (
    <tr className="font-medium border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-4 py-2">{name}</td>
      <td className="px-4 py-2">{lastName}</td>
      <td className="px-4 py-2">{company}</td>
      <td className="px-4 py-2">{email}</td>
      <td colSpan={2} className="px-4 py-2 flex items-center gap-3">
        <button
          type="button"
          className="flex items-center justify-center font-semibold border border-red-500 text-red-500 text-sm px-4 py-2 rounded hover:bg-red-400 hover:text-white whitespace-nowrap"
          onClick={() => confirmDeleteClient(id)}
        >
          <TrashIcon className="mr-2 h-4 w-4" /> Delete Client
        </button>
        <button
          type="button"
          className="flex items-center justify-center font-semibold border border-blue-500 text-blue-500 text-sm px-4 py-2 rounded hover:bg-blue-400 hover:text-white whitespace-nowrap"
          onClick={() => editClient(id)}
        >
          <PencilIcon className="mr-2 h-4 w-4" /> Edit Client
        </button>
      </td>
    </tr>
  );
};

export default Client;
