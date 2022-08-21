import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-bold">CRM Clients</p>
      </div>

      <nav className="mt-5 list-none">
        <ul>
          <li
            className={`p-2 mb-2 rounded-md font-semibold hover:bg-blue-400 ${
              router.pathname === "/" && "bg-blue-500"
            }`}
          >
            <Link href="/">
              <a className="text-white">Clients</a>
            </Link>
          </li>
          <li
            className={`p-2 mb-2 rounded-md font-semibold hover:bg-blue-400 ${
              router.pathname === "/orders" && "bg-blue-500"
            }`}
          >
            <Link href="/orders">
              <a className="text-white">Orders</a>
            </Link>
          </li>
          <li
            className={`p-2 mb-2 rounded-md font-semibold hover:bg-blue-400 ${
              router.pathname === "/products" && "bg-blue-500"
            }`}
          >
            <Link href="/products">
              <a className="text-white">Products</a>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
