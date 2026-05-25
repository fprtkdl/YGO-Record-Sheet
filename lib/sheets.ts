import { google } from "googleapis";
import path from "path";
import pool from "@/lib/db";

const SHEET_NAME = process.env.GOOGLE_SHEET_NAME!;
const CRED_PATH = path.join(process.cwd(), "credentials.json");

// 구글 인증 클라이언트
const auth = new google.auth.GoogleAuth({
  keyFile: CRED_PATH,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ],
});

// 시트 ID 캐시 (매번 검색 안 하려고)
let cachedSheetId: string | null = null;

async function getSheetId(): Promise<string> {
  if (cachedSheetId) return cachedSheetId;

  const drive = google.drive({ version: "v3", auth });
  const res = await drive.files.list({
    q: `name='${SHEET_NAME}' and mimeType='application/vnd.google-apps.spreadsheet'`,
    fields: "files(id, name)",
  });

  const file = res.data.files?.[0];
  if (!file?.id) throw new Error(`시트 '${SHEET_NAME}'를 찾을 수 없습니다.`);

  cachedSheetId = file.id;
  return file.id;
}

// DB 전체를 시트에 덮어쓰기
export async function syncDuelsToSheet() {
  const sheetId = await getSheetId();
  const sheets = google.sheets({ version: "v4", auth });

  // 1) DB 조회
  const [rows] = await pool.query(
    `SELECT duel_id, player_name, my_deck, rival_deck,
            coin_toss, first_turn, duel_result, excuse
     FROM duel_record
     ORDER BY duel_id`,
  );

  const header = [
    "듀얼ID",
    "플레이어",
    "내 덱",
    "상대 덱",
    "코인토스",
    "선/후공",
    "결과",
    "메모",
  ];

  const data = (rows as Record<string, unknown>[]).map((r) => [
    r.duel_id,
    r.player_name,
    r.my_deck,
    r.rival_deck,
    r.coin_toss,
    r.first_turn,
    r.duel_result,
    r.excuse ?? "",
  ]);

  // 2) 기존 내용 지우기
  await sheets.spreadsheets.values.clear({
    spreadsheetId: sheetId,
    range: "A:Z",
  });

  // 3) 새로 쓰기
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: "A1",
    valueInputOption: "RAW",
    requestBody: { values: [header, ...data] },
  });
}
