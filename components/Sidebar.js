import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MenuIcon, XIcon } from "@heroicons/react/solid";

const Sidebar = () => {
  const router = useRouter();

  // state to know if the mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  // add or remove classes to the main element when the mobile menu is open or closed
  useEffect(() => {
    if (isOpen) {
      document
        .querySelector("main")
        .classList.add(
          "overflow-hidden",
          "bg-black",
          "opacity-20",
          "pointer-events-none",
          "fixed",
          "inset-0",
          "z-30"
        );
    } else {
      document
        .querySelector("main")
        .classList.remove(
          "overflow-hidden",
          "bg-black",
          "opacity-20",
          "pointer-events-none",
          "fixed",
          "inset-0",
          "z-30"
        );
    }
  }, [isOpen]);

  return (
    <>
      <aside className="bg-gray-800 w-1/3 sm:w-1/3 xl:w-1/5 sm:min-h-screen sm:block p-5 hidden">
        <div>
          <p className="text-white text-2xl font-bold">CRM Clients</p>
        </div>

        <nav className="mt-5 list-none">
          <ul>
            <li
              className={`p-2 mb-2 rounded-md font-semibold cursor-pointer hover:bg-blue-400 ${
                router.pathname === "/" && "bg-blue-500"
              }`}
            >
              <Link href="/">
                <a className="text-white">Clients</a>
              </Link>
            </li>
            <li
              className={`p-2 mb-2 rounded-md font-semibold cursor-pointer hover:bg-blue-400 ${
                router.pathname === "/orders" && "bg-blue-500"
              }`}
            >
              <Link href="/orders">
                <a className="text-white">Orders</a>
              </Link>
            </li>
            <li
              className={`p-2 mb-2 rounded-md font-semibold cursor-pointer hover:bg-blue-400 ${
                router.pathname === "/products" && "bg-blue-500"
              }`}
            >
              <Link href="/products">
                <a className="text-white">Products</a>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sm:mt-5">
          <p className="text-white text-2xl font-bold">Other options</p>
        </div>
        <nav className="mt-5 list-none">
          <ul>
            <li
              className={`p-2 mb-2 rounded-md font-semibold cursor-pointer hover:bg-blue-400 ${
                router.pathname === "/bestsellers" && "bg-blue-500"
              }`}
            >
              <Link href="/bestsellers">
                <a className="text-white">Best sellers</a>
              </Link>
            </li>
            <li
              className={`p-2 mb-2 rounded-md font-semibold cursor-pointer hover:bg-blue-400 ${
                router.pathname === "/bestclients" && "bg-blue-500"
              }`}
            >
              <Link href="/bestclients">
                <a className="text-white">Best clients</a>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile menu */}
      <div className="sm:hidden absolute top-0 left-0 bg-gray-800 w-full h-5 p-8">
        <button
          className="sm:hidden absolute top-0 left-0 z-50 p-4 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <XIcon className="h-8 w-8 text-gray-200 transition-all duration-300" />
          ) : (
            <MenuIcon className="h-8 w-8 text-gray-200 transition-all duration-300" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="sm:hidden absolute top-0 left-0 bg-gray-800 p-4 min-h-screen w-1/2 transition-all duration-300 z-40">
          <nav className="mt-20 list-none rounded-md min-h-screen">
            <ul>
              <li
                className={`p-2 mb-2 rounded-md font-semibold cursor-pointer hover:bg-blue-400 ${
                  router.pathname === "/" && "bg-blue-500"
                }`}
              >
                <Link href="/">
                  <a className="text-gray-200">Clients</a>
                </Link>
              </li>
              <li
                className={`p-2 mb-2 rounded-md font-semibold cursor-pointer hover:bg-blue-400 ${
                  router.pathname === "/orders" && "bg-blue-500"
                }`}
              >
                <Link href="/orders">
                  <a className="text-gray-200">Orders</a>
                </Link>
              </li>
              <li
                className={`p-2 mb-2 rounded-md font-semibold cursor-pointer hover:bg-blue-400 ${
                  router.pathname === "/products" && "bg-blue-500"
                }`}
              >
                <Link href="/products">
                  <a className="text-gray-200">Products</a>
                </Link>
              </li>
              <hr className="mt-4 mb-4" />
              <li
                className={`p-2 mb-2 rounded-md font-semibold cursor-pointer hover:bg-blue-400 ${
                  router.pathname === "/bestsellers" && "bg-blue-500"
                }`}
              >
                <Link href="/bestsellers">
                  <a className="text-gray-200">Best sellers</a>
                </Link>
              </li>
              <li
                className={`p-2 mb-2 rounded-md font-semibold cursor-pointer hover:bg-blue-400 ${
                  router.pathname === "/bestclients" && "bg-blue-500"
                }`}
              >
                <Link href="/bestclients">
                  <a className="text-gray-200">Best clients</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;
