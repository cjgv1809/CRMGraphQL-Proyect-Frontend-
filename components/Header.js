import React from "react";
import { LogoutIcon } from "@heroicons/react/solid";
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

  // render an icon to sign out for mobile devices and a button for desktop devices
  const renderSignOut = () => {
    if (window.innerWidth <= 480) {
      return (
        <div className="bg-gray-600 rounded p-2">
          <LogoutIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => signOut()}
          />
        </div>
      );
    } else {
      return (
        <button
          type="button"
          onClick={signOut}
          className="border border-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400 whitespace-nowrap"
        >
          Sign Out
        </button>
      );
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 mb-6 mt-14 sm:mt-0 rounded">
      <div className="flex items-center justify-between font-semibold">
        <p className="truncate capitalize">
          Hi, {name} {lastName}
        </p>
        {renderSignOut()}
      </div>
    </header>
  );
};

export default Header;
