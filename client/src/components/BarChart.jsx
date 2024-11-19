import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import monthMapping from "../utils/monthmap";
import BASE_URL from "../utils/Config";

const BarChart = ({ month }) => {
  const [barChartData, setBarChartData] = useState([]);

  console.log(month);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/price-range-statistics/${month}`
        );
        if (res.status === 200) {
          setBarChartData(res.data);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    if (month) {
      fetchData();
    }
  }, [month]);

  return month ? (
    <div>
      <h1 className=" text-white flex justify-center p-2">
        Bar Chart for {monthMapping[month]}
      </h1>
      <RechartsBarChart
        width={600}
        height={300}
        data={barChartData}
        margin={{ top: 2, right: 10, left: 10, bottom: 1 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </RechartsBarChart>
    </div>
  ) : (
    <div className=" p-10">
      <h1 className=" text-white border border-red-400 p-4 text-lg">
        Please Select A Month To View Its Bar Graph
      </h1>
    </div>
  );
};

export default BarChart;
