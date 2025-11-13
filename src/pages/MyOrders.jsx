import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `https://assignment10-server-nine-eta.vercel.app/orders?email=${user.email}`
      );
      setOrders(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Product Name",
      "Buyer Name",
      "Price",
      "Quantity",
      "Address",
      "Date",
      "Phone",
    ];
    const tableRows = [];

    orders.forEach((order) => {
      const orderData = [
        order.productName,
        order.buyerName,
        order.price,
        order.quantity,
        order.address,
        order.date,
        order.phone,
      ];
      tableRows.push(orderData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("My Orders Report", 14, 15);
    doc.save("my_orders.pdf");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen max-w-[1440px] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 && <p>No orders found.</p>}
      <div className="overflow-x-auto bg-white">
        <table className="table-auto w-full border border-gray-300 ">
          <thead>
            <tr className="bg-gray-200 ">
              <th className="border border-gray-200 text-gray-600 px-4 py-2 text-black">
                Product Name
              </th>
              <th className="border border-gray-200 text-gray-600 px-4 py-2 text-black">
                Buyer Name
              </th>
              <th className="border border-gray-200 text-gray-600 px-4 py-2 text-black">
                Price
              </th>
              <th className="border border-gray-200 text-gray-600 px-4 py-2 text-black">
                Quantity
              </th>
              <th className="border border-gray-200 text-gray-600 px-4 py-2 text-black">
                Address
              </th>
              <th className="border border-gray-200 text-gray-600 px-4 py-2 text-black">
                Date
              </th>
              <th className="border border-gray-200 text-gray-600 px-4 py-2 text-black">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border border-gray-200 text-gray-600 px-4 py-2 text-black">
                  {order.productName}
                </td>
                <td className="border border-gray-200 text-gray-600  px-4 py-2 text-black">
                  {order.buyerName}
                </td>
                <td className="border border-gray-200 text-gray-600 px-4 py-2 text-black">
                  {order.price}
                </td>
                <td className="border border-gray-200 text-gray-600 px-4 py-2 text-black">
                  {order.quantity}
                </td>
                <td className="border border-gray-200 text-gray-600 px-4 py-2 text-black">
                  {order.address}
                </td>
                <td className="border border-gray-200 text-gray-600 px-4 py-2 text-black">
                  {order.date}
                </td>
                <td className="border border-gray-200 text-gray-600 px-4 py-2 text-black">
                  {order.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length > 0 && (
        <button
          onClick={handleDownloadPDF}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download Report
        </button>
      )}
    </div>
  );
};

export default MyOrders;
