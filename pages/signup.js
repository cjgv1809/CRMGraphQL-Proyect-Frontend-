import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";

const NEW_USER = gql`
  mutation newUser($input: UserInput!) {
    newUser(input: $input) {
      id
      name
      lastName
      email
    }
  }
`;

const SignUp = () => {
  // mutation to create a new user in the database. It works with [] instead of {} as useQuery
  const [newUser] = useMutation(NEW_USER);
  // message to display: success or error
  const [message, setMessage] = useState(null);
  // router to redirect to the login page
  const router = useRouter();

  // form validation
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { name, lastName, email, password } = values;

      try {
        const { data } = await newUser({
          variables: {
            input: {
              name,
              lastName,
              email,
              password,
            },
          },
        });
        // user created successfully
        setMessage(`User created successfully: ${data.newUser.name}`);
        setTimeout(() => {
          setMessage(null);
          // redirect to the login page
          router.push("/login");
        }, 3000);
      } catch (error) {
        setMessage(error.message.replace("GraphQL error: ", ""));
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    },
  });

  const showMessage = () => {
    return (
      <div
        className={`py-2 px-3 w-full my-3 font-semibold max-w-sm mx-auto text-center text-white rounded ${
          message === "User already exists" ? "bg-red-500" : "bg-green-500"
        }`}
      >
        <p>{message}</p>
      </div>
    );
  };

  return (
    <>
      <Layout>
        {message && showMessage()}
        <h1 className="text-white text-2xl font-light text-center">Sign Up</h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
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
                  className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:text-red-500 after:ml-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-none"
                  type="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <input
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 text-white w-full font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                value="Sign Up"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SignUp;
