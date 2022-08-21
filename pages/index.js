import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";

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
        <div className="bg-white rounded min-h-max p-8 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl text-gray-800 font-light">Clients</h1>
            <Link href="/newclient">
              <a className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-400">
                Add New Client
              </a>
            </Link>
          </div>

          <table className="table-auto shadow-md w-full max-w-7xl">
            <thead className="bg-gray-800">
              <tr className="text-gray-200">
                <th className="px-4 py-2 font-bold">Name</th>
                <th className="px-4 py-2 font-bold">Last Name</th>
                <th className="px-4 py-2 font-bold">Company</th>
                <th className="px-4 py-2 font-bold">Email</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.getClientsBySeller.map((client) => (
                <tr key={client.id} className="text-center font-medium">
                  <td className="border px-4 py-2">{client.name}</td>
                  <td className="border px-4 py-2">{client.lastName}</td>
                  <td className="border px-4 py-2">{client.company}</td>
                  <td className="border px-4 py-2">{client.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
}
