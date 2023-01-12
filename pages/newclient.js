import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      lastName
      company
      email
      phone
    }
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

const NewClient = () => {
  // mutation to create a new client in the database and refresh the cache to update the list of clients
  const [newClient] = useMutation(NEW_CLIENT, {
    update(cache, { data: { newClient } }) {
      // get the object from the cache and update it
      const { getClientsBySeller } = cache.readQuery({
        query: GET_CLIENTS_BY_SELLER,
      });
      // the cache is updated with the new client and it should never be modified directly
      cache.writeQuery({
        query: GET_CLIENTS_BY_SELLER,
        data: { getClientsBySeller: [...getClientsBySeller, newClient] },
      });
    },
  });
  // message to display: success or error
  const [message, setMessage] = useState(null);

  // routing to redirect to client page
  const router = useRouter();

  // form validation
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      lastName: Yup.string().required("Last name is required"),
      company: Yup.string().required("Company is required"),
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      const { name, lastName, company, email, phone } = values;

      try {
        const { data } = await newClient({
          variables: {
            input: {
              name,
              lastName,
              company,
              email,
              phone,
            },
          },
        });
        // user created successfully
        setMessage("Client added successfully");
        setTimeout(() => {
          setMessage(null);
          router.push("/");
        }, 2000);
      } catch (error) {
        setMessage(error.message.replace("GraphQL error: ", ""));
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        console.log(error);
      }
    },
  });

  const showMessage = () => {
    return (
      <div
        className={`py-2 px-3 w-full my-3 font-semibold max-w-lg mx-auto text-center text-white rounded ${
          message === "Client already exists" ? "bg-red-500" : "bg-green-500"
        }`}
      >
        <p>{message}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-3xl text-gray-800 font-light text-center mb-10">
        Create New Client
      </h1>

      {message && showMessage()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white rounded shadow-md p-8 mb-4"
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
                placeholder="Enter your name"
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
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                id="lastName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-none"
                type="text"
                placeholder="Enter your last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.lastName}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:text-red-500 after:ml-1"
                htmlFor="company"
              >
                Company
              </label>
              <input
                id="company"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-none"
                type="text"
                placeholder="Enter your company name"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.company && formik.errors.company && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.company}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:text-red-500 after:ml-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-none"
                type="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                id="phone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-none"
                type="tel"
                placeholder="Enter your phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <input
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white w-full font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              value="Register Client"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewClient;
