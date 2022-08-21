import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";

const AUTHENTICATE_USER = gql`
  mutation authenticateUser($input: AuthenticateInput!) {
    authenticateUser(input: $input) {
      token
    }
  }
`;

const Login = () => {
  // mutation to authenticate a user in the database.
  const [authenticateUser] = useMutation(AUTHENTICATE_USER);
  // message to display: success or error
  const [message, setMessage] = useState(null);
  // router to redirect to Home page
  const router = useRouter();

  // form validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;

      try {
        const { data } = await authenticateUser({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
        console.log(data);
        // user authenticated successfully
        setMessage("Authenticating");
        // save token in local storage
        localStorage.setItem("token", data.authenticateUser.token);
        setTimeout(() => {
          setMessage(null);
          // redirect to Home page
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
        className={`py-2 px-3 w-full my-3 font-semibold max-w-sm mx-auto text-center text-white rounded ${
          message === "Authenticating" ? "bg-green-500" : "bg-red-500"
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
        <h1 className="text-white text-2xl font-light text-center">Login</h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md p-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
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
                className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                value="Sign In"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
