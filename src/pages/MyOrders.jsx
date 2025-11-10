import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/orders?email=${user.email}`
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

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.text("My Orders Report", 14, 15);
    doc.save("my_orders.pdf");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 && <p>No orders found.</p>}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Buyer Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order.productName}</td>
                <td className="border px-4 py-2">{order.buyerName}</td>
                <td className="border px-4 py-2">{order.price}</td>
                <td className="border px-4 py-2">{order.quantity}</td>
                <td className="border px-4 py-2">{order.address}</td>
                <td className="border px-4 py-2">{order.date}</td>
                <td className="border px-4 py-2">{order.phone}</td>
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
