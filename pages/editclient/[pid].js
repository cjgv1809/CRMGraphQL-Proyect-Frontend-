import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useQuery, gql } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";

const GET_CLIENT = gql`
  query getClient($id: ID!) {
    getClient(id: $id) {
      name
      lastName
      email
      phone
      company
    }
  }
`;

const EditClient = () => {
  // get the current id
  const router = useRouter();

  const { id } = router.query;

  console.log("ROUTER", router);

  // get the client data from the database
  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: {
      id,
    },
  });

  console.log("DATA", data);
  console.log("LOADING", loading);
  console.log("ERROR", error);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Last name is required"),
    company: Yup.string().required("Company is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  if (loading) return <p>Loading...</p>;

  const { getClient } = data;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Edit Client</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={getClient}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {(props) => (
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
                    placeholder="Enter your name"
                    // value={values.name}
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
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-none"
                    type="text"
                    placeholder="Enter your last name"
                    // value={values.lastName}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  {props.touched.lastName && props.errors.lastName && (
                    <p className="text-red-500 text-sm mt-2">
                      {props.errors.lastName}
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
                    // value={values.company}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  {props.touched.company && props.errors.company && (
                    <p className="text-red-500 text-sm mt-2">
                      {props.errors.company}
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
                    // value={values.email}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  {props.touched.email && props.errors.email && (
                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
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
                    // value={values.phone}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>

                <input
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-400 text-white w-full font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                  value="Sign Up"
                />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditClient;
