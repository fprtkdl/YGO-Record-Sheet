import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    return NextResponse.json({ success: true, rows });
  } catch (err) {
    console.error("❌ MySQL 연결 실패:", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}
