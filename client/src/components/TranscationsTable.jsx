import React, { useEffect, useState } from "react";
import axios from "axios";
import Statistics from "./Statistics";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import BASE_URL from '../utils/Config'

const TransactionsTable = () => {
  const [data, getdata] = useState([]);
  const [pagenumber, getpagenumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    getpagenumber(1); 
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value); 
    getpagenumber(1);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/gettransactions?page=${pagenumber}&search=${searchTerm}&month=${selectedMonth}`
      );
      if (res.status === 200) {
        getdata(res.data.transactions);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [pagenumber, searchTerm, selectedMonth]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="bg-white/30 backdrop-blur-lg p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-8">
              <Statistics month={selectedMonth} />{" "}
            </h2>

            <div className="mb-4 flex gap-4 text-black">
              <input
                type="text"
                placeholder="Search by title, description, or price"
                value={searchTerm}
                onChange={handleSearchChange}
                className="text-black w-[1000px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                className=" bg-white px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() =>
                  document
                    .getElementById("barview")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                View Bar Graph
              </button>
              <button
                className=" bg-white px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() =>
                  document
                    .getElementById("pieview")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                View Pie Chart
              </button>

              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>

            <table className="min-w-full table-auto bg-white/60 rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Sold</th>
                  <th className="px-4 py-2 text-left">Image</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {data.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="transition-all duration-200 ease-in-out hover:bg-gray-100"
                  >
                    <td className="px-4 py-2">{transaction.id}</td>
                    <td className="px-4 py-2">{transaction.title}</td>
                    <td className="px-4 py-2">{transaction.description}</td>
                    <td className="px-4 py-2">{transaction.price}</td>
                    <td className="px-4 py-2">{transaction.category}</td>
                    <td className="px-4 py-2">
                      {transaction.sold ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2">
                      <img
                        src={transaction.image}
                        alt="transaction image"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-6">
              <div>
                {pagenumber !== 1 ? (
                  <button
                    onClick={() => getpagenumber(pagenumber - 1)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out"
                  >
                    Previous
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
                  >
                    Previous
                  </button>
                )}
              </div>

              <div>
                {pagenumber !== totalPages ? (
                  <button
                    onClick={() => getpagenumber(pagenumber + 1)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="nav" className=" flex justify-center gap-2 bg-black">
        <div id="barview">
          <BarChart month={selectedMonth} />
        </div>
        <div id="pieview">
          <PieChart month={selectedMonth} />
        </div>
      </div>
    </>
  );
};

export default TransactionsTable;
