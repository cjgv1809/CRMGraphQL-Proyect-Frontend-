import React from "react";
import Router from "next/router";
import { gql, useMutation } from "@apollo/client";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import Swal from "sweetalert2";

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

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

const Product = ({ product: { id, name, price, stock } }) => {
  // mutation to delete a client from the database.
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update(cache) {
      // get the object from the cache
      const { getProducts } = cache.readQuery({
        query: GET_PRODUCTS,
      });
      // rewrites the cache with the new client list
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: getProducts.filter(
            (currentProduct) => currentProduct.id !== id
          ),
        },
      });
    },
  });

  const confirmDeleteProduct = (id) => {
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
          const { data } = await deleteProduct({
            variables: {
              id,
            },
          });
          // show message
          Swal.fire("Deleted", data.deleteProduct, "success");
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  const editProduct = (id) => {
    Router.push({
      pathname: "/editproduct/[id]",
      query: { id },
    });
  };

  return (
    <tr className="border-b font-medium transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-4 py-2">{name}</td>
      <td className="px-4 py-2">${price}</td>
      <td className="px-4 py-2">{stock}</td>
      <td colSpan={2} className="px-4 py-2 flex items-center gap-3">
        <button
          type="button"
          className="flex items-center justify-center font-semibold border border-red-500 text-red-500 text-sm px-4 py-2 rounded hover:bg-red-400 hover:text-white whitespace-nowrap"
          onClick={() => confirmDeleteProduct(id)}
        >
          <TrashIcon className="mr-2 h-4 w-4" /> Delete Product
        </button>
        <button
          type="button"
          className="flex items-center justify-center font-semibold border border-blue-500 text-blue-500 text-sm px-4 py-2 rounded hover:bg-blue-400 hover:text-white whitespace-nowrap"
          onClick={() => editProduct(id)}
        >
          <PencilIcon className="mr-2 h-4 w-4" /> Edit Product
        </button>
      </td>
    </tr>
  );
};

export default Product;
