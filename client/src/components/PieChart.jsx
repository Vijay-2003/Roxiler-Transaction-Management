import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart as RechartsPieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4567",
  "#6A5ACD",
];

import monthMapping from "../monthmap";

const PieChart = ({ month }) => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/category-statistics/${month}`
        );
        if (res.status === 200) {
          setPieChartData(res.data);
        }
      } catch (error) {
        console.error("Error fetching category statistics:", error);
      }
    };

    if (month) {
      fetchCategoryData();
    }
  }, [month]);

  return month ? (
    <div>
      <h1 className=" text-white flex justify-center p-2">
        Pie Chart for {monthMapping[month]}
      </h1>
      <RechartsPieChart width={600} height={300}>
        <Pie
          data={pieChartData}
          dataKey="count"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </div>
  ) : <div className=" p-10">
     <h1 className=" text-white border border-red-400 p-4 text-lg">Please Select A Month To View Its Pie Chart</h1>
  </div>;
};

export default PieChart;
