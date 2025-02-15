import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY; // Thêm API key vào file .env.local
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req: Request) {
  try {
    const { expenses } = await req.json();

    // Định dạng dữ liệu để gửi lên Gemini
    const formattedExpenses = expenses
      .map((exp) => `${exp.category}: ${exp.amount}K - ${exp.description}`)
      .join("\n");

    // Gọi Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Dưới đây là danh sách chi tiêu của tôi:\n${formattedExpenses}\nBạn có gợi ý nào để tiết kiệm không?`;
    const response = await model.generateContent(prompt);
    const suggestion = response.response.text() || "Không có gợi ý nào.";

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error("Lỗi AI:", error);
    return NextResponse.json({ error: "Lỗi khi gọi Gemini AI" }, { status: 500 });
  }
}
