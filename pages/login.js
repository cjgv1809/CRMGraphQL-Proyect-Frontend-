import React from "react";
import Layout from "../components/Layout";

const Login = () => {
  return (
    <>
      <Layout>
        <h1 className="text-white text-2xl font-light text-center">Login</h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form className="bg-white rounded shadow-md p-8 mb-4 ">
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
                />
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
                />
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
