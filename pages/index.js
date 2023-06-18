import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import Layout from "../components/Layout";
import Client from "../components/Client";

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

export default function Home() {
  const router = useRouter();
  // get clients by seller
  const { data, loading, error } = useQuery(GET_CLIENTS_BY_SELLER);

  if (loading) return <p>Loading...</p>;

  if (!data.getClientsBySeller) return router.push("/login");

  return (
    <div>
      <Layout>
        <div className="bg-white rounded min-h-max p-4 shadow-md">
          <div className="sm:flex sm:justify-between items-center mb-4">
            <h1 className="text-2xl text-gray-800 font-light mb-5 sm:mb-0">
              Clients
            </h1>

            <Link href="/newclient">
              <a className="bg-blue-500 text-white text-center px-4 py-2 w-full inline-block sm:block sm:w-auto rounded font-semibold hover:bg-blue-400 whitespace-nowrap">
                Add New Client
              </a>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto shadow-md w-full max-w-7xl">
              <thead className="bg-gray-800 border-b">
                <tr className="text-gray-200 text-left">
                  <th scope="col" className="px-4 py-2 font-bold">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-2 font-bold">
                    Last Name
                  </th>
                  <th scope="col" className="px-4 py-2 font-bold">
                    Company
                  </th>
                  <th scope="col" className="px-4 py-2 font-bold">
                    Email
                  </th>
                  <th scope="col" colSpan={2} className="px-4 py-2 font-bold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.getClientsBySeller.map((client) => (
                  <Client key={client.id} client={client} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}
