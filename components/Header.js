import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      lastName
      email
    }
  }
`;

const Header = () => {
  // routing
  const router = useRouter();
  // get user data from the database
  const { loading, error, data } = useQuery(GET_USER);

  // check if data is not available yet and protect ourselves from errors
  if (loading) return null;

  // If there is no data, redirect to login page
  if (!data) return router.push("/login");

  const { name, lastName, email } = data.getUser;

  const signOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4 mb-6 rounded">
      <div className="flex items-center justify-between font-semibold">
        <p className="truncate capitalize">
          Hi, {name} {lastName}
        </p>
        <button
          type="button"
          onClick={signOut}
          className="border border-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400 whitespace-nowrap"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
