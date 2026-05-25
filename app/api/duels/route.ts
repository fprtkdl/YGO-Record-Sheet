import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { duelSchema } from "@/lib/schemas";
import { syncDuelsToSheet } from "@/lib/sheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = duelSchema.safeParse(body);
    if (!parsed.success) {
      const messages = parsed.error.issues.map((i) => i.message);
      return NextResponse.json(
        { success: false, error: "유효성 검사 실패", details: messages },
        { status: 400 },
      );
    }

    const d = parsed.data;
    await pool.query(
      `INSERT INTO duel_record
        (player_name, my_deck, rival_deck, coin_toss, first_turn, duel_result, excuse)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        d.player_name,
        d.my_deck,
        d.rival_deck,
        d.coin_toss,
        d.first_turn,
        d.duel_result,
        d.excuse || null,
      ],
    );

    // 시트 동기화 (실패해도 INSERT는 성공 상태 유지)
    try {
      await syncDuelsToSheet();
    } catch (sheetErr) {
      console.error("⚠️ 시트 동기화 실패:", sheetErr);
      return NextResponse.json({
        success: true,
        warning: "DB 저장은 됐지만 시트 동기화 실패",
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ INSERT 실패:", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}
