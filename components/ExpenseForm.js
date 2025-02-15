import { useState } from "react";

export default function ExpenseForm({ onAddExpense }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category) return;

    onAddExpense({ amount: parseFloat(amount), category, description, date });

    setAmount("");
    setCategory("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]); 
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded-2xl bg-white shadow-lg ring-1 ring-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">📌 Nhập Chi Tiêu</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-gray-300 text-gray-600 p-3 rounded-lg w-full text-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
      />

      <input
        type="number"
        placeholder="💵 Nhập số tiền..."
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-gray-300 text-gray-600 p-3 rounded-lg w-full text-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 text-gray-600 p-3 rounded-lg w-full text-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
      >
        <option value="">📂 Chọn danh mục</option>
        <option value="Ăn uống">🍔 Ăn uống</option>
        <option value="Giải trí">🎬 Giải trí</option>
        <option value="Hóa đơn">💡 Hóa đơn</option>
        <option value="Khác">💰 Khác</option>
      </select>

      <input
        type="text"
        placeholder="📝 Mô tả (không bắt buộc)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 text-gray-600 p-3 rounded-lg w-full text-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
      />

      <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition font-semibold text-lg">
        ➕ Thêm Chi Tiêu
      </button>
    </form>
  );
}
