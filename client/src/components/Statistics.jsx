import React, { useEffect, useState } from "react";
import axios from "axios";
import monthMapping from "../utils/monthmap";
import BASE_URL from "../utils/Config";

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({
    totalSold: 0,
    totalNotSold: 0,
    totalSale: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/getstatistics${
            month ? `?month=${month}` : ""
          }`
        );
        if (res.status === 200) {
          setStats(res.data);
          // console.log(res.data);
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [month]);

  return (
    <div className="statistics">
      <h3 className="text-2xl font-semibold">
        Statistics for {month ? monthMapping[month] : "All The Available Data"}
      </h3>
      <div className="mt-4">
        <div>Total Sold: {stats.totalSold}</div>
        <div>Total Not Sold: {stats.totalNotSold}</div>
        <div>Total Sales: ${stats.totalSale.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Statistics;
