"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ExpenseChart({ expenses, selectedCategory }) {
  const filteredExpenses = expenses.filter(
    (expense) => selectedCategory === "Tất cả" || expense.category === selectedCategory
  );

  const categoryTotals = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Số Tiền (VNĐ)",
        data: Object.values(categoryTotals),
        backgroundColor: ["#60a5fa", "#fb923c", "#f472b6"],
        hoverBackgroundColor: ["#3b82f6", "#f97316", "#ec4899"],
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [5, 5],
          color: "#e5e7eb",
        },
        ticks: {
          callback: (value) => `${value}VNĐ`,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8 p-6 bg-white rounded-2xl shadow-xl ring-1 ring-gray-200">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6 flex items-center justify-center gap-2">
        <span>📊</span> Biểu Đồ Chi Tiêu
      </h2>
      <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
