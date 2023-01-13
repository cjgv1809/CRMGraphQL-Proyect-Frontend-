import React, { useReducer } from "react";
import OrderContext from "./OrderContext";
import OrderReducer from "./OrderReducer";
import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  QUANTITY_PRODUCTS,
  UPDATE_TOTAL,
} from "../../types";

const OrderState = ({ children }) => {
  // state of orders
  const initialState = {
    client: [],
    products: [],
    total: 0,
  };

  // useReducer with dispatch to execute the functions
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // function that selects the client for the order
  const addClient = (client) => {
    dispatch({
      type: SELECT_CLIENT,
      payload: client,
    });
  };

  // function that selects the products for the order
  const addProducts = (productsSelected) => {
    let newProducts;
    if (state.products.length > 0) {
      // take the id of the new products and compare it with the existing ones
      newProducts = productsSelected.map((product) => {
        const newObject = state.products.find(
          (productState) => productState.id === product.id
        );
        return { ...product, ...newObject };
      });
    } else {
      newProducts = productsSelected;
    }

    dispatch({
      type: SELECT_PRODUCT,
      payload: newProducts,
    });
  };

  // modify the quantity of products
  const quantityProducts = (newProduct) => {
    dispatch({
      type: QUANTITY_PRODUCTS,
      payload: newProduct,
    });
  };

  // calculate the total to pay
  const updateTotal = () => {
    dispatch({
      type: UPDATE_TOTAL,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        client: state.client,
        products: state.products,
        total: state.total,
        addClient,
        addProducts,
        quantityProducts,
        updateTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
