"use client";
import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 Tooltip,
 PointElement,
 LineElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
// Register ChartJS components using ChartJS.register
ChartJS.register(
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 Tooltip
);


const PriceChart = ({ prices, dates }: {prices:number[], dates: number[]}) => {

    const data = {
      labels: dates.slice().reverse().map((entry: number) => new Date(entry*1000).toLocaleDateString()),
      datasets: [
        {
          label: "Price (USD)",
          data: prices.slice().reverse().map((entry: any) => entry.toFixed(2)),
          borderColor: "orange",
          borderWidth: 2,
          pointRadius: 4,
        },
      ],
    };
  
    return (
      <div>
        <Line data={data} />
      </div>
    );
};

export default PriceChart;
