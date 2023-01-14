import React, { useState, useEffect } from "react";
import { TrashIcon, MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";

const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $input: OrderInput) {
    updateOrder(id: $id, input: $input) {
      status
    }
  }
`;

const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;

const GET_ORDERS = gql`
  query GetOrdersBySeller {
    getOrdersBySeller {
      id
    }
  }
`;

const Order = ({ order }) => {
  const { status } = order;

  // state to change the order status
  const [statusOrder, setStatusOrder] = useState(status);
  // state to show the order status
  const [statusColor, setStatusColor] = useState("");

  // mutation to update the order status
  const [updateOrder] = useMutation(UPDATE_ORDER);
  // mutation to delete the order
  const [deleteOrder] = useMutation(DELETE_ORDER, {
    update(cache) {
      // get a copy of the object from the cache
      const { getOrdersBySeller } = cache.readQuery({ query: GET_ORDERS });

      // rewrite the cache (the cache never must be modified)
      cache.writeQuery({
        query: GET_ORDERS,
        data: {
          getOrdersBySeller: getOrdersBySeller.filter(
            (currentOrder) => currentOrder.id !== order.id
          ),
        },
      });
    },
  });

  // change the order status
  useEffect(() => {
    if (statusOrder) {
      setStatusOrder(statusOrder);
    }
    changeStatusColor(statusOrder);
  }, [statusOrder]);

  // change the order status color
  const changeStatusColor = (status) => {
    switch (status) {
      case "Pending":
        setStatusColor("border-yellow-500 border-t-4");
        break;
      case "Delivered":
        setStatusColor("border-green-500 border-t-4");
        break;
      case "Cancelled":
        setStatusColor("border-red-500 border-t-4");
        break;
      default:
        break;
    }
  };

  // update the order status
  const changeOrderStatus = async (newStatus) => {
    try {
      const { data } = await updateOrder({
        variables: {
          id: order.id,
          input: {
            status: newStatus,
            client: order.client.id,
          },
        },
      });
      setStatusOrder(data.updateOrder.status);
    } catch (error) {
      console.log(error);
    }
  };

  // confirm if the user wants to delete the order
  const confirmDeleteOrder = () => {
    Swal.fire({
      title: "Are you sure you want to delete this order?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.value) {
        // delete the order
        try {
          const { data } = await deleteOrder({
            variables: {
              id: order.id,
            },
          });
          Swal.fire("Deleted!", data.deleteOrder, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div
      className={`${statusColor} mt-5 bg-gray-200 rounded text-gray-700 p-4 md:grid md:grid-cols-3 md:gap-4 shadow-lg`}
    >
      <div className="flex flex-col">
        <h3 className="text-gray-800 font-bold">
          Client:{" "}
          <span className="font-light text-gray-600">
            {order.client.name} {order.client.lastName}
          </span>
        </h3>
        <div className="flex-grow">
          {order.client.email && (
            <div className="flex items-center">
              <MailIcon className="h-4 w-4 mr-2" />
              <p className="font-light text-gray-600">{order.client.email}</p>
            </div>
          )}
          {order.client.phone && (
            <div className="flex items-center">
              <PhoneIcon className="h-4 w-4 mr-2" />
              <p className="font-light text-gray-600">{order.client.phone}</p>
            </div>
          )}
        </div>
        <h3 className="text-gray-800 font-bold">
          Total to pay:{" "}
          <span className="text-gray-600 text-lg font-medium">
            $ {order.total.toFixed(2)}
          </span>
        </h3>
      </div>

      <div className="flex flex-col">
        <div className="flex-grow">
          <h3 className="flex text-gray-800 font-bold">
            Status:{" "}
            <select
              className="ml-4 p-2 font-semibold rounded focus:outline-none"
              value={statusOrder}
              onChange={(e) => changeOrderStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </h3>
        </div>
        {order.order.map((product) => (
          <div key={product.id} className="mt-4">
            <h3 className="text-gray-800 font-bold">
              Product:{" "}
              <span className="font-light text-gray-600">{product.name}</span>
            </h3>
            <h3 className="text-gray-800 font-bold">
              Quantity:{" "}
              <span className="font-light text-gray-600">
                {product.quantity}
              </span>
            </h3>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-end">
        <div className="flex-grow">
          <h3 className="text-gray-800 font-bold">
            Order date:{" "}
            <span className="text-gray-600 font-light">
              {new Date(parseInt(order.createdAt)).toLocaleDateString()}
            </span>
          </h3>
        </div>
        <div>
          <button
            type="button"
            className="flex items-center justify-center font-semibold border border-red-500 text-red-500 text-sm px-4 py-2 rounded hover:bg-red-400 hover:text-white whitespace-nowrap"
            onClick={() => confirmDeleteOrder()}
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
