import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { gql, useMutation } from "@apollo/client";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Layout from "../components/Layout";

const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      price
      stock
    }
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

const NewProduct = () => {
  // routing to redirect to client page
  const router = useRouter();

  // mutation to create a new product in the database
  const [newProduct] = useMutation(NEW_PRODUCT, {
    update(cache, { data: { newProduct } }) {
      // get the object from the cache and update it
      const { getProducts } = cache.readQuery({
        query: GET_PRODUCTS,
      });
      // the cache is updated with the new product and it should never be modified directly
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: { getProducts: [...getProducts, newProduct] },
      });
    },
  });

  // form validation
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      stock: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      stock: Yup.number()
        .required("Stock is required")
        .positive("Stock must be positive")
        .integer("Stock must be an integer number"),
    }),
    onSubmit: async (values) => {
      const { name, price, stock } = values;

      try {
        const { data } = await newProduct({
          variables: {
            input: {
              name,
              price,
              stock,
            },
          },
        });
        console.log("data", data);
        // user created successfully
        Swal.fire("Created", "Product created successfully", "success");

        // redirect to products page
        router.push("/products");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Layout>
      <h1 className="text-3xl text-gray-800 font-light text-center mb-10">
        Create New Product
      </h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white rounded shadow-md p-6 mb-4"
            onSubmit={formik.handleSubmit}
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
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.name}
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
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.price}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:text-red-500 after:ml-1"
                htmlFor="stock"
              >
                Stock
              </label>
              <input
                id="stock"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-none"
                type="number"
                placeholder="Enter product stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.stock && formik.errors.stock && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.stock}
                </p>
              )}
            </div>

            <input
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white w-full font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              value="Create Product"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewProduct;
