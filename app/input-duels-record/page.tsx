"use client";

import { useState } from "react";
import "../globals.css";

export default function Page() {
  const [playerName, setPlayerName] = useState("");
  const [myDeck, setMyDeck] = useState("");
  const [rivalDeck, setRivalDeck] = useState("");

  const [coinToss, setCoinToss] = useState("");
  const [firstTurn, setFirstTurn] = useState("");
  const [duelResult, setDuelResult] = useState("");
  const [excuse, setExcuse] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/duels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player_name: playerName,
        my_deck: myDeck,
        rival_deck: rivalDeck,
        coin_toss: coinToss,
        first_turn: firstTurn,
        duel_result: duelResult,
        excuse: excuse,
      }),
    });
    const data = await res.json();

    if (data.success) {
      alert("저장 완료!");
    } else {
      alert("저장 실패:\n" + (data.details?.join("\n") || data.error));
    }
  };

  return (
    <main>
      <div className="setBoard">
        <div className="textStyleCase">
          <label htmlFor="playerName">플레이어명</label>

          <input
            type="text"
            className="hoverFocus"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>

        <div className="textStyleCase">
          <label htmlFor="myDeck">내 덱</label>

          <input
            type="text"
            className="hoverFocus"
            id="myDeck"
            value={myDeck}
            onChange={(e) => setMyDeck(e.target.value)}
          />
        </div>

        <div className="textStyleCase">
          <label htmlFor="rivalDeck">상대 덱</label>

          <input
            type="text"
            className="hoverFocus"
            id="rivalDeck"
            value={rivalDeck}
            onChange={(e) => setRivalDeck(e.target.value)}
          />
        </div>

        <div className="coinCase">
          <div className="btnCase">
            <label htmlFor="coinToss">코인 토스</label>

            <div className="labelCase">
              <input
                type="button"
                id="coinToss"
                value="앞면"
                className={coinToss === "앞면" ? "selected" : "unselected"}
                onClick={() => setCoinToss("앞면")}
              />

              <input
                type="button"
                value="뒷면"
                className={coinToss === "뒷면" ? "selected" : "unselected"}
                onClick={() => setCoinToss("뒷면")}
              />
            </div>
          </div>

          <div className="btnCase">
            <label htmlFor="firstTurn">선/후공</label>

            <div className="labelCase">
              <input
                type="button"
                id="firstTurn"
                value="선공"
                className={firstTurn === "선공" ? "selected" : "unselected"}
                onClick={() => setFirstTurn("선공")}
              />

              <input
                type="button"
                value="후공"
                className={firstTurn === "후공" ? "selected" : "unselected"}
                onClick={() => setFirstTurn("후공")}
              />
            </div>
          </div>

          <div className="btnCase">
            <label htmlFor="duelResult">결과</label>

            <div className="labelCase">
              <input
                type="button"
                id="duelResult"
                value="승리"
                className={duelResult === "승리" ? "selected" : "unselected"}
                onClick={() => setDuelResult("승리")}
              />

              <input
                type="button"
                value="패배"
                className={duelResult === "패배" ? "selected" : "unselected"}
                onClick={() => setDuelResult("패배")}
              />
            </div>
          </div>
        </div>

        <div className="textArea">
          <label htmlFor="excuse">메모</label>
          <textarea
            className="hoverFocus"
            placeholder="메모"
            id="excuse"
            value={excuse}
            maxLength={100}
            onChange={(e) => setExcuse(e.target.value)}
          />
        </div>

        <button
          className="submitBtn mainColorHover"
          id="saveBtn"
          onClick={handleSubmit}
        >
          <span>저장</span>
        </button>
      </div>
    </main>
  );
}
