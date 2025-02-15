"use client";

import { useState, useEffect } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseChart from "@/components/ExpenseChart";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [aiSuggestion, setAiSuggestion] = useState("");

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (newExpense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    analyzeExpenses(updatedExpenses);
  };

  const analyzeExpenses = async (expensesData) => {
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expenses: expensesData }),
      });

      if (!response.ok) {
        throw new Error(`Lỗi API: ${response.status}`);
      }

      const data = await response.json();
      if (!data.suggestion) {
        throw new Error("API không trả về gợi ý.");
      }

      setAiSuggestion(data.suggestion);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setAiSuggestion("Không thể lấy gợi ý, vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-2xl rounded-2xl p-10 border border-gray-200">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
        💰 Quản Lý Chi Tiêu
      </h1>

      <ExpenseForm onAddExpense={handleAddExpense} />

      <div className="mt-8">
        <label className="block text-lg font-semibold text-gray-800">
          📂 Lọc theo danh mục:
        </label>
        <select
          className="w-full border border-gray-400 p-3 rounded-lg mt-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 text-gray-900"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Tất cả">Tất cả</option>
          {Array.from(new Set(expenses.map((e) => e.category))).map(
            (category) => (
              <option key={category} value={category} className="text-gray-700">
                {category}
              </option>
            )
          )}
        </select>
      </div>

      <ExpenseChart expenses={expenses} selectedCategory={selectedCategory} />

      <ul className="mt-8 space-y-4">
        {expenses
          .filter(
            (expense) =>
              selectedCategory === "Tất cả" ||
              expense.category === selectedCategory
          )
          .map((expense, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-5 bg-gray-100 rounded-xl shadow-md border border-gray-300 hover:bg-gray-200 transition-all"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💸</span>
                <div>
                  <span className="font-semibold text-blue-700">
                    {expense.category}
                  </span>
                  :
                  <span className="ml-1 font-medium text-gray-900">
                    {expense.amount}K
                  </span>
                  <p className="text-gray-500 text-sm">{expense.date}</p>
                </div>
              </div>
              <span className="text-gray-600 text-sm italic">
                {expense.description}
              </span>
            </li>
          ))}
      </ul>

      {aiSuggestion && (
  <div className="mt-6 p-4 bg-yellow-100 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold">💡 Gợi Ý Tiết Kiệm</h3>
    <div className="text-gray-700 whitespace-pre-line">{aiSuggestion}</div>
  </div>
)}

    </div>
  );
}
