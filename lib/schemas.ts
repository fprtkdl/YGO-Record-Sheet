import { z } from "zod";

export const duelSchema = z.object({
  player_name: z.string().trim().min(1, "플레이어명을 입력하세요").max(20),
  my_deck: z.string().trim().min(1, "내 덱을 입력하세요").max(30),
  rival_deck: z.string().trim().min(1, "상대 덱을 입력하세요").max(30),
  coin_toss: z.enum(["앞면", "뒷면"], { message: "코인 토스를 선택하세요" }),
  first_turn: z.enum(["선공", "후공"], { message: "선/후공을 선택하세요" }),
  duel_result: z.enum(["승리", "무승부", "패배"], {
    message: "결과를 선택하세요",
  }),
  excuse: z.string().max(100).optional().or(z.literal("")),
});

export type DuelInput = z.infer<typeof duelSchema>;
