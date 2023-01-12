import React from "react";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Layout from "../../components/Layout";

const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      name
      price
      stock
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      id
      name
      price
      stock
    }
  }
`;

const EditProduct = () => {
  // get the current id
  const router = useRouter();

  const {
    query: { id },
  } = router;

  // get the product data from the database
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  // update the product
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    stock: Yup.number()
      .required("Stock is required")
      .positive("Stock must be positive")
      .integer("Stock must be an integer number"),
  });

  if (loading) return <p>Loading...</p>;

  if (!data) return router.push("/products");

  const { getProduct } = data;

  // update the product in the database
  const updateProductInfo = async (values) => {
    const { name, price, stock } = values;

    try {
      const { data } = await updateProduct({
        variables: {
          id,
          input: {
            name,
            price,
            stock,
          },
        },
      });
      // show a success message
      Swal.fire("Updated!", "The product has been updated", "success");
      // redirect to the client page
      router.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl text-center text-gray-800 font-light">
        Edit Product
      </h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={getProduct}
            onSubmit={(values) => {
              updateProductInfo(values);
            }}
          >
            {(props) => {
              return (
                <form
                  className="bg-white rounded shadow-md p-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:text-red-500 after:ml-1"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-none"
                      type="text"
                      placeholder="Enter product name"
                      value={props.values.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.name && props.errors.name && (
                      <p className="text-red-500 text-sm mt-2">
                        {props.errors.name}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:text-red-500 after:ml-1"
                      htmlFor="price"
                    >
                      Price
                    </label>
                    <input
                      id="price"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-none"
                      type="number"
                      placeholder="Enter product price"
                      value={props.values.price}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.price && props.errors.price && (
                      <p className="text-red-500 text-sm mt-2">
                        {props.errors.price}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="stock"
                    >
                      Stock
                    </label>
                    <input
                      id="stock"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-none"
                      type="number"
                      placeholder="Enter product stock"
                      value={props.values.stock}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.stock && props.errors.stock && (
                      <p className="text-red-500 text-sm mt-2">
                        {props.errors.stock}
                      </p>
                    )}
                  </div>

                  <input
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-400 text-white w-full font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                    value="Edit Product"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
